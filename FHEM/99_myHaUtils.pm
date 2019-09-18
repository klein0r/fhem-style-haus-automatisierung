##############################################
# $Id: 99_myHaUtils.pm 7570 2019-09-18 18:31:44Z matthiaskleine $
#

package main;

use strict;
use warnings;
use POSIX;
use List::MoreUtils qw(minmax); # apt-get install liblist-moreutils-perl

sub myHaUtils_Initialize($$)
{
    my ($hash) = @_;
}

# Test set magic
# example:
#           {haTestSetMagic("Das Attribut version des Global-Gerätes hat den Wert: [a:global:version]")}

sub haTestSetMagic($)
{
    my ($str) = @_;
    my $hash = $defs{global};

    my ($err, $str) = ReplaceSetMagic($hash, 1, $str) if ($featurelevel >= 5.7);

    return $err if ($err);
    return $str;
}

# Returns an array with all device readings of a given device
# example:
#           {haGetAllDeviceReadings("WEB")}

sub haGetAllDeviceReadings($)
{
    my ($d) = @_;

    if (defined($defs{$d}) && ref($defs{$d}) eq "HASH" && defined($defs{$d}{READINGS})) {
        return sort keys %{$defs{$d}{READINGS}};
    }

    return undef;
}

# Returns an array of all available FHEM modules
# example:
#           {haGetAllAvailableModules()}

sub haGetAllAvailableModules()
{
    return join(',', sort keys %modules);
}

# Returns an array of all available FHEM device types (not starting with 99)
# example:
#           {haGetAllDeviceTypes()}

sub haGetAllDeviceTypes()
{
    my $modpath = $attr{global}{modpath} . '/FHEM';
    my @moduleList = ();

    opendir(DH, $modpath) || return "Can't read $modpath: $!";
    
    foreach my $module (readdir(DH)) {
        next if($module !~ m/^([0-9][0-9])_(.*)\.pm$/);
        if ($1 < 99) {
            push(@moduleList, $2);
        }
    }

    closedir(DH);

    return join(',', sort @moduleList);
}

# Counts all devices of a given devspec
# example:
#           {haDeviceCount("TYPE=dummy")}

sub haDeviceCount($)
{
    my ($devspec) = @_;

    return scalar(devspec2array($devspec));
}

# Returns the minimum and maximum of a reading over multiple devices
# example:
#           {haMinMaxReadingsNum("YouTubeData_.*", "subscribers_diff")}

sub haMinMaxReadingsNum($$)
{
    my ($devspec, $n) = @_;
    my @values = ();

    foreach my $d (devspec2array($devspec)) {
        my $val = ReadingsNum($d, $n, undef);
        if ($val != undef) {
            push(@values, $val);
        }
    }

    return minmax(@values);
}

# Returns the minimum of a reading over multiple devices
# example:
#           {haMinReadingsNum("YouTubeData_.*", "subscribers_diff")}

sub haMinReadingsNum($$)
{
    my ($devspec, $n) = @_;
    my ($min, $max) = haMinMaxReadingsNum($devspec, $n);

    return $min;
}

# Returns the maximum of a reading over multiple devices
# example:
#           {haMaxReadingsNum("YouTubeData_.*", "subscribers_diff")}

sub haMaxReadingsNum($$)
{
    my ($devspec, $n) = @_;
    my ($min, $max) = haMinMaxReadingsNum($devspec, $n);

    return $max;
}

# Increments the current reading value of a given device
# example:
#           {haIncrementReading("Garage", "counter")}

sub haIncrementReading($$)
{
    my ($dev, $n) = @_;

    my $currentVal = ReadingsNum($dev, $n, undef);
    if (defined($currentVal)) {
        $currentVal++;

        fhem("setreading $dev $n $currentVal");

        return $currentVal;
    }

    return undef;
}

# Checks if a reading with a given value exists (independent of the name)
# and returns the name of the first matching reading
# example:
#           {haHasReadingWithValue("FritzBox", "raspberrypi-fhem")} => mac_B8_27_EB_BF_D9_B4

sub haHasReadingWithValue($$)
{
    my ($d, $v) = @_;

    foreach my $r (haGetAllDeviceReadings($d)) {
        return $r if (ReadingsVal($d, $r, undef)) eq $v;
    }

    return undef;
}

# Checks if a device has a given reading
# example:
#           {haHasReading("FritzBox", "mac_B8_27_EB_BF_D9_B4")}

sub haHasReading($$)
{
    my ($dev, $n) = @_;

    return defined(ReadingsVal($dev, $n, undef));
}

# Checks if a device has a given attribute
# example:
#           {haHasAttribute("global", "perlSyntaxCheck")}

sub haHasAttribute($$) {
	my ($dev, $n) = @_;

	return defined AttrVal($dev, $n, undef);
}

# Checks if a device has a given internal
# example:
#           {haHasInternal("global", "FVERSION")}

sub haHasInternal($$) {
	my ($dev, $n) = @_;

	return defined InternalVal($dev, $n, undef);
}

# Returns an array with all device attributes of a given device
# example:
#           {haGetAllDeviceAttributes("WEB")}

sub haGetAllDeviceAttributes($)
{
    my ($d) = @_;

    if (defined($defs{$d}) && ref($defs{$d}) eq "HASH") {
        return sort keys %{$attr{$d}};
    }

    return undef;
}

# Executes the given statement on the first DbRep device
# example:
#           {haDbQuery("SELECT COUNT(*) FROM history")}

sub haDbQuery($)
{
    my ($q) = @_;

    my @dbLogDevices = devspec2array("TYPE=DbRep");
    if (scalar(@dbLogDevices) >= 1) {
        return fhem('get ' . $dbLogDevices[0] . ' dbValue ' . $q);
    }

    return undef;
}

# Converts time to seconds
# example:
#           {haTimeToSeconds("15")} => 54000
#           {haTimeToSeconds("15:00")} => 54000
#           {haTimeToSeconds("15:00:00")} => 54000
#           {haTimeToSeconds("15:00:00")} => 54000
#           {haTimeToSeconds("15:42:12")} => 56532

sub haTimeToSeconds($) {
	my ($h, $m, $s) = split(":", shift);
	$m = 0 if (!$m);
	$s = 0 if (!$s);

	return 3600 * $h + 60 * $m + $s;
}

# Calculates the difference between two times in seconds
# example:
#           {haDiffSeconds("0", "1")} => 3600
#           {haDiffSeconds("00", "01")} => 3600
#           {haDiffSeconds("00:00", "01:00")} => 3600
#           {haDiffSeconds("00:00", "14:20")} => 51600
#           {haDiffSeconds("13:37", "14:20")} => 2580
#           {haDiffSeconds("13:37:20", "14:20:42")} => 2602

sub haDiffSeconds($$) {
    my ($from, $to) = @_;

    my $fromSeconds = haTimeToSeconds($from);
    my $toSeconds = haTimeToSeconds($to);

    return $toSeconds - $fromSeconds;
}

# Calculates the difference between two times in minutes
# example:
#           {haDiffMinutes("0", "1")} => 60
#           {haDiffMinutes("00", "01")} => 60
#           {haDiffMinutes("00:00", "01:00")} => 60
#           {haDiffMinutes("00:00", "14:20")} => 860
#           {haDiffMinutes("13:37", "14:20")} => 43
#           {haDiffMinutes("13:37:20", "14:20:42")} => 43.3666666666667

sub haDiffMinutes($$) {
    my ($from, $to) = @_;

    return haDiffSeconds($from, $to) / 60;
}

# Calculates the difference between two times and return a formatted result
# example:
#           {haDiffTime("0", "1")} => 01:00:00
#           {haDiffTime("00", "01")} => 01:00:00
#           {haDiffTime("00:00", "01:00")} => 01:00:00
#           {haDiffTime("00:00", "14:20")} => 14:20:00
#           {haDiffTime("13:37", "14:20")} => 00:43:00
#           {haDiffTime("13:37:20", "14:20:42")} => 00:43:22

sub haDiffTime($$) {
    my ($from, $to) = @_;

    my $diff = haDiffSeconds($from, $to);

    return sprintf("%02d:%02d:%02d", $diff / 3600, ($diff / 60) % 60, $diff % 60);
}

sub haLog($$$)
{
    my ($filename, $loglevel, $text) = @_;

    return if ($loglevel > $attr{global}{verbose});

    my ($seconds, $microseconds) = gettimeofday();
    my @t = localtime($seconds);
    my $nfile = ResolveDateWildcards($filename, @t);

    my $tim = sprintf("%04d.%02d.%02d %02d:%02d:%02d", $t[5] + 1900, $t[4] + 1, $t[3], $t[2], $t[1], $t[0]);
    if ($attr{global}{mseclog}) {
        $tim .= sprintf(".%03d", $microseconds / 1000);
    }

    open(my $fh, '>>', $nfile);
    print $fh "$tim $loglevel: $text\n";
    close $fh;

    return undef;
}

1;
graph 
  = "ffmpeg" (space+ option)* (space+ input)* (space+ filter)* (space+ output)*

option = "-re"  
	/ "-framerate" space+ digit+

input = "-i" space+ url
filter = bitstreamFilter 
	/ videoFilter 
    / audioFilter 
    / encodeFilter
bitstreamFilter = "-bsf"
videoFilter = "-vsf"
audioFilter = "-asf"
encodeFilter = "-c:v" (space+ codec) encodeOption*
output = protocol path

codec = "libx264" 
	/ "libx265" 
    / "copy"

encodeOption = (space+ preset) 
	/ (space+ crf) 
    / (space + maxrate) 
    / (space + bufsize)
    / (space+ pass)
    / (space+ profile)
    / (space+ level)
    / (space+ tune) 
    / (space+ x264Param) 

preset = "-preset" space+ presetValue
presetValue = "ultrafast" 
	/ "superfast" 
    / "veryfast" 
    / "faster" 
    / "fast" 
    / "medium" 
    / "slow" 
    / "slower" 
    / "veryslow"
    
crf = "-crf" space+ crfValue
crfValue = digit+
maxrate = "-maxrate" space+ digit+ unit? 
bufsize = "-bufsize" space+ digit+ unit?
unit = "K" / "M"
pass = "-pass" space+ digit
tune = "-tune" space+ tuneValue
profile = "-profile:v" space+ profileValue 
level = "-level" space+ digit "." digit+
profileValue = "baseline"
	/ "main"
    / "high"
tuneValue = "film" 
	/ "animationgrain" 
    / "stillimage" 
    / "fastdecode" 
    / "zerolatency" 
    / "psnr" 
    / "ssim"

x264Param = "-x264-params" space+ x264ParaValue
x264ParaValue = paramChar+
paramChar = [a-zA-Z0-9:=\-]


url = protocol path
protocol = http 
	/ rtmp 
    / rtsp 
    / file
http = "http://"
rtmp = "rtmp://"
rtsp = "rtsp://"
file = "/"
path = letter+
letter = [a-zA-Z0-9]
digit = [0-9]
space = [" "\t]














ffmpeg -re -framerate 30 -i /input -c:v libx264 -preset ultrafast -pass 2 -profile:v baseline -level 3.0 -x264-params keyint=123:min-keyint=20 -maxrate 1M -bufsize 2M -crf 0 -preset medium -tune ssim /mp4



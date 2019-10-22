require 'net/http'

ENDPOINT   = "http://ec2-3-105-241-196.ap-southeast-2.compute.amazonaws.com:8080/canta-galo"
SLEEP_TIME = 3 # Seconds
SOUND_PATH = "sound.mp3"

def play_sound
  if RUBY_PLATFORM.include?('darwin')
    system "afplay #{SOUND_PATH}"
  else
    system "omxplayer -o local #{SOUND_PATH}"
  end
end

loop do
  begin
    response = Net::HTTP.get(URI(ENDPOINT))
    puts response
    if "canta" == response
      play_sound
    end
  rescue Exception => e
    puts e
  end

  sleep SLEEP_TIME
end

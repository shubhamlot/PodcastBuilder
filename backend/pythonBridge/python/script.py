import speech_recognition as sr
import sys
from pydub import AudioSegment


name = sys.argv[1]
filename = "D:/ProjectFolder/Podcast Builder/backend/public/audio/"+name#input()
path="D:/ProjectFolder/Podcast Builder/backend/public/audio/"

stereo_audio = AudioSegment.from_file(filename,format="wav")

mono_audios = stereo_audio.split_to_mono()


mono_left = mono_audios[0].export(
    "D:/ProjectFolder/Podcast Builder/backend/public/audio/"+name,
    format="wav"
)





import soundfile as sf
import numpy as np
from scipy.io.wavfile import write
import noisereduce as nr





# import soundfile as sf
from noisereduce.generate_noise import band_limited_noise
data, rate = sf.read(filename)
data = data

noise_len = 2 # seconds
noise = band_limited_noise(min_freq=500, max_freq = 2000, samples=len(data), samplerate=rate)*10
noise_clip = noise[:rate*noise_len]
audio_clip_band_limited = data+noise


noise_reduced = nr.reduce_noise(audio_clip=audio_clip_band_limited, noise_clip=noise_clip, prop_decrease=1.0, verbose=False)


scaled = np.int16(noise_reduced/np.max(np.abs(data)) * rate)
write((path+name), 44100, scaled)
# write('test.wav', 44100, scaled)

r = sr.Recognizer()

# open the file
with sr.AudioFile(filename) as source:
    # listen for the data (load audio to memory)
    audio_data = r.record(source)
    # recognize (convert from speech to text)
    text = r.recognize_google(audio_data)
    print(text)

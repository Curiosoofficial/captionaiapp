import { useEffect, useRef, useState } from "react";
import SparklesIcon from "./SparklesIcon";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { transcriptionItemsToSrt } from "@/libs/awsTranscriptionsHelpers";
import roboto from './../fonts/Roboto-Regular.ttf'; 
import robotoBold from './../fonts/Roboto-Bold.ttf'; 

export default function resultVideo({ filename, transcriptionItems }) {
  const videoUrl = "https://luka-caption-app.s3.eu-central-1.amazonaws.com/" + filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#ffffff')
  const [outlineColor, setOutlineColor] = useState('#000000')
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = videoUrl
    load();
  }, []);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    ffmpeg.writeFile('/tmp/Roboto-Regular.ttf', await fetchFile(roboto))
    ffmpeg.writeFile('/tmp/Roboto-Bold.ttf', await fetchFile(robotoBold))
    setLoaded(true);
  };

  function toFFmpegColor(rgb) {
    return '&H' + rgb.split('').reverse('').join('') + '&';
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile('subs.srt', srt);
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });
    await ffmpeg.exec([
      '-i', filename,
      '-preset', 'ultrafast',
      '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      'output.mp4']);
    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
  };

  return (
    <>
      <div className="mb-4">
        <button onClick={transcode} className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer">
          <SparklesIcon />
          <span>Apply captions</span>
        </button>

        <div className="grid grid-cols-2 mt-4">
          <div>
            <p>Primary Color:</p>
            <input 
              type="color" 
              value={primaryColor} 
              onChange={ev => setPrimaryColor(ev.target.value)}
            />
          </div>
          
          
          <div>
            <p>Outline Color:</p>
            <input 
              type="color" 
              value={outlineColor} 
              onChange={ev => setOutlineColor(ev.target.value)}
            />
          </div>
          
          
          
        </div>
      </div>
      <div className="rounded-xl overflow-hidden">
        <video ref={videoRef} controls></video>
      </div>
    </>
  );
}


// 3:51:23

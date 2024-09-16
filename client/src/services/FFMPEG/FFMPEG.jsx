import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
// import { fetchFile } from '@ffmpeg/util';
export default async function FFMPEG(file, timeStart, timeEnd, filename) {
  const ffmpeg = new FFmpeg();
  const loadFFmpeg = async () => {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }
  };

  try {
    if (!file || timeStart >= timeEnd) {
      return;
    }
    await loadFFmpeg();

    // Write the input video to memory using ffmpeg.writeFile
    await ffmpeg.writeFile('input.mp4', await fetchFile(file));

    // Execute the ffmpeg command to trim the video
    await ffmpeg.exec([
      '-i',
      'input.mp4', // Input file
      '-ss',
      `${timeStart}`, // Start time
      '-to',
      `${timeEnd}`, // End time
      '-c',
      'copy', // Copy without re-encoding
      'output.mp4', // Output file
    ]);

    // Read the result using ffmpeg.readFile
    const data = await ffmpeg.readFile('output.mp4');

    // Convert the data to a URL for playback and download
    const url = new File([data.buffer], filename, { type: 'video/mp4' });

    return url;
  } catch (e) {
    console.log(e);
  }
}

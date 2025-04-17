{ pkgs }: {
  deps = [
    pkgs.wget
    pkgs.ffmpeg_6-full
  ];
  env = {
    IMAGEIO_FFMPEG_EXE = "${pkgs.ffmpeg_6-full}/bin/ffmpeg";
  };
}
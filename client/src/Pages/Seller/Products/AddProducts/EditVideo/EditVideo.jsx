import classNames from 'classnames/bind';
import styles from './EditVideo.module.scss';
import Translate from '~/layout/Component/Translate';
import Button from '~/components/Button';
import { useImmer } from 'use-immer';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '~/layout/Component/Icon/CloseIcon';
import Video from '~/components/Video';
import PlayIcon from '~/layout/Component/Icon/PlayIcon';
import PauseIcon from '~/layout/Component/Icon/PauseIcon';
import Unsigned from '~/hooks/Unsigned';

const cx = classNames.bind(styles);

export default function EditVideo({ data, onToggle = () => {} }) {
  const videoRef = useRef();
  const playRef = useRef();
  const pauseRef = useRef();
  const dragPointRef = useRef();
  const dragParentRef = useRef();
  const dragCutParentRef = useRef();
  const progressLineRef = useRef();
  const fragmentRightRef = useRef();
  const fragmentLeftRef = useRef();

  const [value, setValue] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [mouseDown, setMouseDown] = useImmer({
    point: false,
    line: false,
    fragment_left: false,
    fragment_right: false,
  });
  const [durationVideo, setdurationVideo] = useImmer({
    cut: '',
    video: '',
    watching: 0,
    min: 0,
  });

  const paddingOfProgressContainer = 15; // use padding for ui and minus it in handle UI line,point,fragment
  const widthOfFragment = 22; // use padding for ui and minus it in handle UI line,point,fragment
  const instanceFragAndBarsLine = paddingOfProgressContainer - widthOfFragment / 2; // value for position fragment

  /** handle play video */
  const handlePlayVideo = (e) => {
    const video = videoRef.current;
    video.play();
    setIsRunning(true);
    playRef.current.classList.remove('active');
    pauseRef.current.classList.add('active');
  };

  /** handle pause video */
  const handlePauseVideo = (e) => {
    const video = videoRef.current;
    if (video) {
      setIsRunning(false);
      video.pause();
      pauseRef.current.classList.remove('active');
      playRef.current.classList.add('active');
    }
  };

  /**
   *
   * function auto pause video when it max length of cut
   */

  useEffect(() => {
    const pauseVideo = setTimeout(() => {
      if (isRunning) {
        handlePauseVideo();
      }
    }, (durationVideo.min + durationVideo.cut - durationVideo.watching) * 1000 + 1000);
    return () => {
      clearTimeout(pauseVideo);
    };
  }, [isRunning]);

  /**
   * function handle when video is playing
   */
  const handleOnTimeUpdate = () => {
    const video = videoRef.current;
    const line = progressLineRef.current;
    const bars = dragParentRef.current;
    const point = dragPointRef.current;
    const eachPoint = (line.offsetWidth - paddingOfProgressContainer * 2) / durationVideo.cut; //each point of width on quantity of video cut
    const left = line.getBoundingClientRect().left - bars.getBoundingClientRect().left;
    if (video) {
      point.style.left = left + (durationVideo.watching - durationVideo.min) * eachPoint + 'px';
      setdurationVideo((draft) => {
        draft.watching = parseInt(video.currentTime);
      });
    }
  };

  /**
   * function handle time of video to duration video
   */
  const TimeOfVideo = (time) => {
    if (time !== '') {
      const roundOfLength = Math.floor(time / 60);
      const residiual = Math.floor(time % 60);
      return (
        (roundOfLength < 10 ? '0' + roundOfLength : roundOfLength) +
        ':' +
        (residiual < 10 ? '0' + residiual : residiual)
      );
    }
  };

  /**
   *when video start time will start
   * @param {} time
   */
  const TimeOfStart = (time) => {
    if (time >= 0) {
      const minute = Math.floor(time / 60);
      const residiualOfMinute = Math.floor(time % 60);
      return (
        (minute < 10 && minute > 0 ? '0' + minute : minute === 10 ? minute : '00') +
        ':' +
        (residiualOfMinute < 10 ? '0' + residiualOfMinute : residiualOfMinute)
      );
    }
  };

  const handleConfirmSelectCat = (e) => {};

  // handle data to FileReader for Video
  useEffect(() => {
    const fileReader = () => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setValue(reader.result);
      };
      if (data) {
        reader.readAsDataURL(data);
      }
    };

    fileReader();
  }, [data, value]);

  //handle UI for first render
  useEffect(() => {
    const handleUI = () => {
      const bars = dragParentRef.current;
      const line = progressLineRef.current;
      const video = document.createElement('video');
      const fragmentRight = fragmentRightRef.current;
      const fragmentLeft = fragmentLeftRef.current;

      video.preload = 'metadata';

      // set the video source
      const url = URL.createObjectURL(data);
      video.src = url;
      video.onloadeddata = () => {
        const duration = parseInt(video.duration.toFixed(0));
        if (line) {
          const dragLineWidth = (60 / duration) * 100;
          line.style.width = dragLineWidth + '%';
          fragmentLeft.style.left =
            line.getBoundingClientRect().left - bars.getBoundingClientRect().left + instanceFragAndBarsLine + 'px';
          fragmentRight.style.left =
            line.getBoundingClientRect().right - bars.getBoundingClientRect().left + instanceFragAndBarsLine + 'px';
        }
        if (duration) {
          setdurationVideo((draft) => {
            draft.cut = duration <= 60 ? duration : 60;
            draft.video = duration;
          });
        }
      };
    };
    handleUI();
  }, [value]);

  //handle move dragging bars
  useEffect(() => {
    const bars = dragParentRef.current;
    const line = progressLineRef.current;
    const point = dragPointRef.current;
    const fragmentLeft = fragmentLeftRef.current;
    const fragmentRight = fragmentRightRef.current;
    let direction = '', //move diredtion of mouse
      totalPoint = 0, //total point when mouse move
      oldX = 0; // old of mouse point
    const handleLineMouseDown = () => {
      setMouseDown((draft) => {
        draft.line = true;
      });
    };
    const handleLineMouseMove = (e) => {
      if (mouseDown.line) {
        totalPoint = oldX - e.pageX;
        const positionLeft = line.getBoundingClientRect().left - bars.getBoundingClientRect().left; //use position for fragment left, point, line
        const positionRight = line.getBoundingClientRect().right - bars.getBoundingClientRect().left; //use position for fragmentRight
        const right = bars.getBoundingClientRect().right - line.getBoundingClientRect().right;
        const eachPoint = bars.offsetWidth / durationVideo.video;
        if (e.pageX < oldX) {
          direction = 'left';
        } else {
          direction = 'right';
        }
        if (direction === 'left') {
          line.style.right = 'auto';
          if (positionLeft > 0) {
            if (!(positionLeft - totalPoint < 0)) {
              fragmentLeft.style.left = positionLeft - totalPoint + instanceFragAndBarsLine + 'px';
              fragmentRight.style.left = positionRight - totalPoint + instanceFragAndBarsLine + 'px';
              point.style.left = positionLeft - totalPoint + 'px';
              line.style.left = positionLeft - totalPoint + 'px';
            }
          } else {
            line.style.left = '0px';
            fragmentLeft.style.left = instanceFragAndBarsLine + 'px';
            fragmentRight.style.left = positionRight + instanceFragAndBarsLine + 'px';
          }
        } else {
          if (right > 0) {
            //avoid mouse point out line dragParent
            if (!(right + totalPoint < 0)) {
              fragmentLeft.style.left = positionLeft - totalPoint + instanceFragAndBarsLine + 'px';
              fragmentRight.style.left = positionRight - totalPoint + instanceFragAndBarsLine + 'px';
              point.style.left = positionLeft - totalPoint + 'px';
              line.style.left = positionLeft - totalPoint + 'px';
            }
          } else {
            fragmentLeft.style.left = positionLeft + instanceFragAndBarsLine + 'px';
            fragmentRight.style.left = positionRight + instanceFragAndBarsLine + 'px';
            line.style.left = 'auto';
            line.style.right = '0px';
          }
        }
        setdurationVideo((draft) => {
          draft.min = Unsigned.toUnsignedZero(parseFloat((positionLeft / eachPoint).toFixed()));
          draft.watching = Unsigned.toUnsignedZero(parseFloat((positionLeft / eachPoint).toFixed()));
        });
        oldX = e.pageX;
      }
    };
    const handleLineMouseUp = () => {
      setMouseDown((draft) => {
        draft.line = false;
      });
    };
    if (line) {
      line.addEventListener('mousedown', handleLineMouseDown);
      window.addEventListener('mousemove', handleLineMouseMove);
      window.addEventListener('mouseup', handleLineMouseUp);
    }
    return () => {
      if (line) {
        line.removeEventListener('mousedown', handleLineMouseDown);
        window.removeEventListener('mousemove', handleLineMouseMove);
        window.removeEventListener('mouseup', handleLineMouseUp);
      }
    };
  }, [value, mouseDown.line]);

  /** handle move dragging point */
  useEffect(() => {
    const point = dragPointRef.current;
    const line = progressLineRef.current;
    const bars = dragParentRef.current;
    let direction = '',
      oldX = 0; // old of mouse point

    const handleMouseDown = () => {
      setMouseDown((draft) => {
        draft.point = true;
      });
    };
    const handleMouseMove = (event) => {
      if (mouseDown.point) {
        const minLeft = line.getBoundingClientRect().left - bars.getBoundingClientRect().left;
        const maxRight = minLeft + line.offsetWidth - paddingOfProgressContainer;
        const position = event.clientX - bars.getBoundingClientRect().left;
        const left = event.clientX - bars.getBoundingClientRect().left;
        const eachPoint = (line.offsetWidth - paddingOfProgressContainer * 2) / durationVideo.cut;
        //when mouse point less than position left of line
        if (event.pageX < oldX) {
          direction = 'left';
        } else {
          direction = 'right';
        }
        if (left < minLeft) {
          point.style.left = minLeft + 'px';
        }
        //when  mouse point more than position right of line
        else if (left > maxRight) {
          point.style.left = maxRight + 'px';
        } else {
          point.style.left = position + 'px';
        }
        //set value for  watching
        if (direction === 'left') {
          setdurationVideo((draft) => {
            draft.watching = Unsigned.toUnsignedCustom(
              durationVideo.min +
                Unsigned.toUnsignedZero(
                  parseInt((point.getBoundingClientRect().left - line.getBoundingClientRect().left) / eachPoint),
                ),
              durationVideo.min,
              false,
            );
          });
        } else {
          setdurationVideo((draft) => {
            draft.watching = Unsigned.toUnsignedCustom(
              durationVideo.min +
                Unsigned.toUnsignedZero(
                  parseInt((point.getBoundingClientRect().left - line.getBoundingClientRect().left) / eachPoint),
                ),
              durationVideo.min + durationVideo.cut,
            );
          });
        }
        oldX = event.pageX;
      }
    };
    const handleMouseUp = (e) => {
      setMouseDown((draft) => {
        draft.point = false;
      });
    };
    if (point) {
      point.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (point) {
        point.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [value, durationVideo.min, mouseDown.point]);
  console.log(durationVideo);

  /**
   * handle move for cut video
   */
  useEffect(() => {
    const parent = dragCutParentRef.current;
    const bars = dragParentRef.current;
    const fragmentLeft = fragmentLeftRef.current;
    const fragmentRight = fragmentRightRef.current;
    const line = progressLineRef.current;
    const point = dragPointRef.current;
    const lengthMaxOfVideo = durationVideo.video <= 60 ? durationVideo.video : 60; //second
    const lengthMinOfVideo = 10; //second
    let eachPoint = 0;
    if (bars) {
      eachPoint = bars.offsetWidth / durationVideo.video;
    }

    const handleFragmentLeftMouseDown = (e) => {
      setMouseDown((draft) => {
        draft.fragment_left = true;
      });
    };
    const handleFragmentLeftMouseMove = (e) => {
      if (mouseDown.fragment_left) {
        const left = e.clientX - parent.getBoundingClientRect().left;
        const maxRight =
          fragmentRight.getBoundingClientRect().left -
          parent.getBoundingClientRect().left -
          lengthMinOfVideo * eachPoint;
        const minLeft =
          line.getBoundingClientRect().left -
          bars.getBoundingClientRect().left +
          (lengthMaxOfVideo - durationVideo.cut) * eachPoint;
        if (left < minLeft && line.getBoundingClientRect().left - bars.getBoundingClientRect().left === 0) {
          fragmentLeft.style.left = instanceFragAndBarsLine + 'px';
        } else if (left > maxRight) {
          fragmentLeft.style.left = maxRight + 'px';
          setdurationVideo((draft) => {
            draft.min = durationVideo.min + durationVideo.cut - 10;
          });
        } else {
          setdurationVideo((draft) => {
            draft.min = Unsigned.toUnsignedZero(parseInt(left / eachPoint));
          });
          line.style.width =
            fragmentRight.getBoundingClientRect().left - parent.getBoundingClientRect().left - left + 'px';
          line.style.left = left + paddingOfProgressContainer + 'px';
          point.style.left = left + paddingOfProgressContainer + 'px';
          fragmentLeft.style.left = left + 'px';
        }
        setdurationVideo((draft) => {
          draft.watching =
            durationVideo.min >= durationVideo.watching
              ? (draft.watching = durationVideo.min + durationVideo.cut - 10)
              : '';
        });
      }
    };
    const handleFragmentLeftMouseUp = (e) => {
      setMouseDown((draft) => {
        draft.fragment_left = false;
      });
    };

    const handleFragmentRightMouseDown = (e) => {
      setMouseDown((draft) => {
        draft.fragment_right = true;
      });
    };

    const handleFragmentRightMouseMove = (e) => {
      if (mouseDown.fragment_right) {
        const right = e.clientX - parent.getBoundingClientRect().left;
        const maxRight =
          line.getBoundingClientRect().right - bars.getBoundingClientRect().left - paddingOfProgressContainer;
        const minLeft =
          fragmentLeft.getBoundingClientRect().left -
          parent.getBoundingClientRect().left +
          line.offsetWidth / durationVideo.cut;
        if (right > maxRight) {
          fragmentRight.style.left = maxRight + 'px';
        } else if (right < minLeft) {
          fragmentRight.style.left = minLeft + 'px';
        } else {
          fragmentRight.style.left = right + 'px';
        }
      }
    };

    const handleFragmentRightMouseUp = (e) => {
      setMouseDown((draft) => {
        draft.fragment_right = false;
      });
    };

    if (fragmentLeft) {
      fragmentLeft.addEventListener('mousedown', handleFragmentLeftMouseDown);
      window.addEventListener('mousemove', handleFragmentLeftMouseMove);
      window.addEventListener('mouseup', handleFragmentLeftMouseUp);
    }
    if (fragmentRight) {
      fragmentRight.addEventListener('mousedown', handleFragmentRightMouseDown);
      window.addEventListener('mousemove', handleFragmentRightMouseMove);
      window.addEventListener('mouseup', handleFragmentRightMouseUp);
    }
    return () => {
      if (fragmentLeft) {
        fragmentLeft.removeEventListener('mousedown', handleFragmentLeftMouseDown);
        window.removeEventListener('mousemove', handleFragmentLeftMouseMove);
        window.removeEventListener('mouseup', handleFragmentLeftMouseUp);
      }
      if (fragmentRight) {
        fragmentRight.removeEventListener('mousedown', handleFragmentRightMouseDown);
        window.removeEventListener('mousemove', handleFragmentRightMouseMove);
        window.removeEventListener('mouseup', handleFragmentRightMouseUp);
      }
    };
  }, [value, mouseDown.fragment_left, mouseDown.fragment_right]);

  /**
   * set current time for video
   */
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = durationVideo.watching;
    }
    if (mouseDown.fragment_left || mouseDown.fragment_right || mouseDown.line || mouseDown.point) {
      handlePauseVideo();
    }
  }, [mouseDown.point, mouseDown.fragment_left, mouseDown.fragment_right, mouseDown.line]);
  return (
    value && (
      <section
        id="add_product_edit_video"
        className={cx('wrapper', 'd-flex justify-content-center align-items-center')}
        style={{ '--padding_of_progress': `${paddingOfProgressContainer}px` }}
      >
        <div className={cx('contain')}>
          <div className={cx('header', 'd-flex flex-row justify-content-between')}>
            <h4 className="text-capitalize">
              <Translate>edit_video</Translate>
            </h4>
            <Button
              onClick={() => {
                onToggle();
              }}
              type="button"
              none_size
              transparent
            >
              <CloseIcon />
            </Button>
          </div>
          <div id="main" className={cx('main', 'd-flex flex-column')}>
            <div className={cx('video')}>
              <Video ref={videoRef} src={value} controls={false} autoPlay={false} onTimeUpdate={handleOnTimeUpdate} />
              <div id="play" className={cx('play')}>
                <PlayIcon ref={playRef} onClick={handlePlayVideo} className={cx('btn_video', 'play_item active')} />
                <PauseIcon ref={pauseRef} onClick={handlePauseVideo} className={cx('btn_video', 'pause_item')} />
              </div>
            </div>
            <div className={cx('handle_video')}>
              <div className={cx('progress_container', 'd-flex flex-row align-items-center justify-content-between')}>
                <div ref={dragParentRef} className={cx('progress_bars')}>
                  <span ref={dragPointRef} className={cx('progress_point')}></span>
                  <span ref={progressLineRef} className={cx('progress_line')}></span>
                </div>
                <div className={cx('progress_time')}>
                  {TimeOfStart(durationVideo.watching)}/{TimeOfVideo(durationVideo.video)}
                </div>
              </div>
              <div className={cx('video_cropper_container', 'd-flex flex-column justify-content-start')}>
                <div
                  ref={dragCutParentRef}
                  className={cx('fragment_container')}
                  style={{ '--width_of_fragment': `${widthOfFragment}px` }}
                >
                  <div ref={fragmentLeftRef} className={cx('fragment', 'fragment-left')}>
                    <span className={cx('fragment_fill')}></span>
                  </div>
                  <div ref={fragmentRightRef} className={cx('fragment', 'fragment-right')}>
                    <span className={cx('fragment_fill')}></span>
                  </div>
                </div>
                <p className={cx('duration')}>Đã chọn {durationVideo.cut}</p>
              </div>
            </div>
          </div>
          <div className={cx('footer', 'd-flex flex-row justify-content-between flex-end')}>
            <div className={cx('footer_left', 'd-flex flex-row align-items-center')}>
              <span>
                <Translate>pages.seller.add_product.edit_category_note</Translate>
              </span>
            </div>
            <div className={cx('footer_right', 'd-flex flex-row')}>
              <Button
                onClick={() => {
                  onToggle();
                }}
                type="button"
                small
                outline
              >
                <Translate>cancel</Translate>
              </Button>
              <Button onClick={handleConfirmSelectCat} primary type="button" small>
                <Translate>confirm</Translate>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

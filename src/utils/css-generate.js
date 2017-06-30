/**
 * 用于生成动画 keyframes 字符串
 *
 * @name { String } animation-name
 * @animation { Object } animation's properties
 * @stops { Array } key frames
 * @needFormat { Boolean } default is true
 *
 * @return { String }
 */

export function getAnimateCss (name, animation, stops, needFormat = true) {
  var properties = ['duration', 'timing', 'delay', 'iteration', 'direction', 'fill'];
  var values = [name];

  properties.map(val => {
    if (animation[val] === undefined) return;
    if (val === 'duration' || val === 'delay') {
      values.push(animation[val] + 's')
    } else if (val === 'iteration') {
      values.push(animation[val] == 0 ? 'infinite' : animation[val])
    } else {
      values.push(animation[val])
    }
  })

  var animateCss = 'animation: ' + values.join(' ') + ';';

  // 生成 keyframes 代码
  var keyframes = [];
  if (needFormat) {
    stops.map(val => {
      keyframes.push('\0\0' + val.stop + '% {\n');
      keyframes.push('\0\0\0\0' + val.css + '\n\0\0}\n');
    })
  } else {
    stops.map(val => {
      keyframes.push(val.stop + '% {');
      keyframes.push(val.css + '}');
    })
  }
  var keyframeCss = keyframes.join('');

  var output = 
`
.anm-${name} {
  -webkit-${animateCss}
  ${animateCss}
}
@keyframes ${name} {
${keyframeCss}}
@-webkit-keyframes ${name} {
${keyframeCss}}
`
  return output
}
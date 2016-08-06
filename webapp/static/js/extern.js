/**
 * This was generated using https://github.com/eredo/tsd2cce, but due to
 * https://github.com/eredo/tsd2cce/issues/6, I had to clone it and patch it
 * with:
diff --git a/src/parser.js b/src/parser.js
index f4954df..aa754ac 100644
--- a/src/parser.js
+++ b/src/parser.js
@@ -274,6 +275,9 @@ class Parser {
       let type = {};

       node.type.members.forEach((member) => {
+        if (!member.name) {
+          return;
+        }
         type[member.name.text] = {};
         this.appendType_(type[member.name.text], member);
       });
 * Then the file generated was a little buggy, so removed the extra 'var's from
 * 'var THREE.Whatever' and the first 'use strict' line.
 */

var THREE = {};


/**
 * @type {string}
 */
THREE.REVISION;


/**

*/
THREE.MOUSE = {};


/**

*/
THREE.MOUSE.LEFT = {};


/**

*/
THREE.MOUSE.MIDDLE = {};


/**

*/
THREE.MOUSE.RIGHT = {};


/**

*/
THREE.CullFace = {};


/**
 * @type {THREE.CullFace}
 */
THREE.CullFaceNone;


/**
 * @type {THREE.CullFace}
 */
THREE.CullFaceBack;


/**
 * @type {THREE.CullFace}
 */
THREE.CullFaceFront;


/**
 * @type {THREE.CullFace}
 */
THREE.CullFaceFrontBack;


/**

*/
THREE.FrontFaceDirection = {};


/**
 * @type {THREE.FrontFaceDirection}
 */
THREE.FrontFaceDirectionCW;


/**
 * @type {THREE.FrontFaceDirection}
 */
THREE.FrontFaceDirectionCCW;


/**

*/
THREE.ShadowMapType = {};


/**
 * @type {THREE.ShadowMapType}
 */
THREE.BasicShadowMap;


/**
 * @type {THREE.ShadowMapType}
 */
THREE.PCFShadowMap;


/**
 * @type {THREE.ShadowMapType}
 */
THREE.PCFSoftShadowMap;


/**

*/
THREE.Side = {};


/**
 * @type {THREE.Side}
 */
THREE.FrontSide;


/**
 * @type {THREE.Side}
 */
THREE.BackSide;


/**
 * @type {THREE.Side}
 */
THREE.DoubleSide;


/**

*/
THREE.Shading = {};


/**
 * @type {THREE.Shading}
 */
THREE.FlatShading;


/**
 * @type {THREE.Shading}
 */
THREE.SmoothShading;


/**

*/
THREE.Colors = {};


/**
 * @type {THREE.Colors}
 */
THREE.NoColors;


/**
 * @type {THREE.Colors}
 */
THREE.FaceColors;


/**
 * @type {THREE.Colors}
 */
THREE.VertexColors;


/**

*/
THREE.Blending = {};


/**
 * @type {THREE.Blending}
 */
THREE.NoBlending;


/**
 * @type {THREE.Blending}
 */
THREE.NormalBlending;


/**
 * @type {THREE.Blending}
 */
THREE.AdditiveBlending;


/**
 * @type {THREE.Blending}
 */
THREE.SubtractiveBlending;


/**
 * @type {THREE.Blending}
 */
THREE.MultiplyBlending;


/**
 * @type {THREE.Blending}
 */
THREE.CustomBlending;


/**

*/
THREE.BlendingEquation = {};


/**
 * @type {THREE.BlendingEquation}
 */
THREE.AddEquation;


/**
 * @type {THREE.BlendingEquation}
 */
THREE.SubtractEquation;


/**
 * @type {THREE.BlendingEquation}
 */
THREE.ReverseSubtractEquation;


/**
 * @type {THREE.BlendingEquation}
 */
THREE.MinEquation;


/**
 * @type {THREE.BlendingEquation}
 */
THREE.MaxEquation;


/**

*/
THREE.BlendingDstFactor = {};


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.ZeroFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.OneFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.SrcColorFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.OneMinusSrcColorFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.SrcAlphaFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.OneMinusSrcAlphaFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.DstAlphaFactor;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.OneMinusDstAlphaFactor;


/**

*/
THREE.BlendingSrcFactor = {};


/**
 * @type {THREE.BlendingSrcFactor}
 */
THREE.DstColorFactor;


/**
 * @type {THREE.BlendingSrcFactor}
 */
THREE.OneMinusDstColorFactor;


/**
 * @type {THREE.BlendingSrcFactor}
 */
THREE.SrcAlphaSaturateFactor;


/**

*/
THREE.DepthModes = {};


/**
 * @type {THREE.DepthModes}
 */
THREE.NeverDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.AlwaysDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.LessDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.LessEqualDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.EqualDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.GreaterEqualDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.GreaterDepth;


/**
 * @type {THREE.DepthModes}
 */
THREE.NotEqualDepth;


/**

*/
THREE.Combine = {};


/**
 * @type {THREE.Combine}
 */
THREE.MultiplyOperation;


/**
 * @type {THREE.Combine}
 */
THREE.MixOperation;


/**
 * @type {THREE.Combine}
 */
THREE.AddOperation;


/**

*/
THREE.ToneMapping = {};


/**
 * @type {THREE.ToneMapping}
 */
THREE.NoToneMapping;


/**
 * @type {THREE.ToneMapping}
 */
THREE.LinearToneMapping;


/**
 * @type {THREE.ToneMapping}
 */
THREE.ReinhardToneMapping;


/**
 * @type {THREE.ToneMapping}
 */
THREE.Uncharted2ToneMapping;


/**
 * @type {THREE.ToneMapping}
 */
THREE.CineonToneMapping;


/**

*/
THREE.Mapping = {};


/**
 * @type {THREE.Mapping}
 */
THREE.UVMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.CubeReflectionMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.CubeRefractionMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.EquirectangularReflectionMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.EquirectangularRefractionMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.SphericalReflectionMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.CubeUVReflectionMapping;


/**
 * @type {THREE.Mapping}
 */
THREE.CubeUVRefractionMapping;


/**

*/
THREE.Wrapping = {};


/**
 * @type {THREE.Wrapping}
 */
THREE.RepeatWrapping;


/**
 * @type {THREE.Wrapping}
 */
THREE.ClampToEdgeWrapping;


/**
 * @type {THREE.Wrapping}
 */
THREE.MirroredRepeatWrapping;


/**

*/
THREE.TextureFilter = {};


/**
 * @type {THREE.TextureFilter}
 */
THREE.NearestFilter;


/**
 * @type {THREE.TextureFilter}
 */
THREE.NearestMipMapNearestFilter;


/**
 * @type {THREE.TextureFilter}
 */
THREE.NearestMipMapLinearFilter;


/**
 * @type {THREE.TextureFilter}
 */
THREE.LinearFilter;


/**
 * @type {THREE.TextureFilter}
 */
THREE.LinearMipMapNearestFilter;


/**
 * @type {THREE.TextureFilter}
 */
THREE.LinearMipMapLinearFilter;


/**

*/
THREE.TextureDataType = {};


/**
 * @type {THREE.TextureDataType}
 */
THREE.UnsignedByteType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.ByteType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.ShortType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.UnsignedShortType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.IntType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.UnsignedIntType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.FloatType;


/**
 * @type {THREE.TextureDataType}
 */
THREE.HalfFloatType;


/**

*/
THREE.PixelType = {};


/**
 * @type {THREE.PixelType}
 */
THREE.UnsignedShort4444Type;


/**
 * @type {THREE.PixelType}
 */
THREE.UnsignedShort5551Type;


/**
 * @type {THREE.PixelType}
 */
THREE.UnsignedShort565Type;


/**

*/
THREE.PixelFormat = {};


/**
 * @type {THREE.PixelFormat}
 */
THREE.AlphaFormat;


/**
 * @type {THREE.PixelFormat}
 */
THREE.RGBFormat;


/**
 * @type {THREE.PixelFormat}
 */
THREE.RGBAFormat;


/**
 * @type {THREE.PixelFormat}
 */
THREE.LuminanceFormat;


/**
 * @type {THREE.PixelFormat}
 */
THREE.LuminanceAlphaFormat;


/**
 * @type {THREE.PixelFormat}
 */
THREE.RGBEFormat;


/**
 * @type {THREE.PixelFormat}
 */
THREE.DepthFormat;


/**

*/
THREE.CompressedPixelFormat = {};


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGB_S3TC_DXT1_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGBA_S3TC_DXT1_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGBA_S3TC_DXT3_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGBA_S3TC_DXT5_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGB_PVRTC_4BPPV1_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGB_PVRTC_2BPPV1_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGBA_PVRTC_4BPPV1_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGBA_PVRTC_2BPPV1_Format;


/**
 * @type {THREE.CompressedPixelFormat}
 */
THREE.RGB_ETC1_Format;


/**

*/
THREE.AnimationActionLoopStyles = {};


/**
 * @type {THREE.AnimationActionLoopStyles}
 */
THREE.LoopOnce;


/**
 * @type {THREE.AnimationActionLoopStyles}
 */
THREE.LoopRepeat;


/**
 * @type {THREE.AnimationActionLoopStyles}
 */
THREE.LoopPingPong;


/**

*/
THREE.InterpolationModes = {};


/**
 * @type {THREE.InterpolationModes}
 */
THREE.InterpolateDiscrete;


/**
 * @type {THREE.InterpolationModes}
 */
THREE.InterpolateLinear;


/**
 * @type {THREE.InterpolationModes}
 */
THREE.InterpolateSmooth;


/**

*/
THREE.InterpolationEndingModes = {};


/**
 * @type {THREE.InterpolationEndingModes}
 */
THREE.ZeroCurvatureEnding;


/**
 * @type {THREE.InterpolationEndingModes}
 */
THREE.ZeroSlopeEnding;


/**
 * @type {THREE.InterpolationEndingModes}
 */
THREE.WrapAroundEnding;


/**

*/
THREE.TrianglesDrawModes = {};


/**
 * @type {THREE.TrianglesDrawModes}
 */
THREE.TrianglesDrawModesMode;


/**
 * @type {THREE.TrianglesDrawModes}
 */
THREE.TriangleStripDrawMode;


/**
 * @type {THREE.TrianglesDrawModes}
 */
THREE.TriangleFanDrawMode;


/**

*/
THREE.TextureEncoding = {};


/**
 * @type {THREE.TextureEncoding}
 */
THREE.LinearEncoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.sRGBEncoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.GammaEncoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.RGBEEncoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.LogLuvEncoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.RGBM7Encoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.RGBM16Encoding;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.RGBDEncoding;


/**

*/
THREE.DepthPackingStrategies = {};


/**
 * @type {THREE.DepthPackingStrategies}
 */
THREE.BasicDepthPacking;


/**
 * @type {THREE.DepthPackingStrategies}
 */
THREE.RGBADepthPacking;


/**
 * @param {*=} opt_message
 * @param {any=} opt_optionalParams
 */
THREE.warn = function(opt_message, opt_optionalParams) {};


/**
 * @param {*=} opt_message
 * @param {any=} opt_optionalParams
 */
THREE.error = function(opt_message, opt_optionalParams) {};


/**
 * @param {*=} opt_message
 * @param {any=} opt_optionalParams
 */
THREE.log = function(opt_message, opt_optionalParams) {};


/**
 * @constructor
 */
THREE.AnimationAction = function() {};


/**
 * @type {boolean}
 */
THREE.AnimationAction.prototype.loop;


/**
 * @type {number}
 */
THREE.AnimationAction.prototype.time;


/**
 * @type {number}
 */
THREE.AnimationAction.prototype.timeScale;


/**
 * @type {number}
 */
THREE.AnimationAction.prototype.weight;


/**
 * @type {number}
 */
THREE.AnimationAction.prototype.repetitions;


/**
 * @type {boolean}
 */
THREE.AnimationAction.prototype.paused;


/**
 * @type {boolean}
 */
THREE.AnimationAction.prototype.enabled;


/**
 * @type {boolean}
 */
THREE.AnimationAction.prototype.clampWhenFinished;


/**
 * @type {boolean}
 */
THREE.AnimationAction.prototype.zeroSlopeAtStart;


/**
 * @type {boolean}
 */
THREE.AnimationAction.prototype.zeroSlopeAtEnd;


/**
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.play = function() {};


/**
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.stop = function() {};


/**
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.reset = function() {};


/**
 * @return {boolean}
 */
THREE.AnimationAction.prototype.isRunning = function() {};


/**
 * @param {number} time
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.startAt = function(time) {};


/**
 * @param {boolean} mode
 * @param {number} repetitions
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.setLoop = function(mode, repetitions) {};


/**
 * @param {number} weight
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.setEffectiveWeight = function(weight) {};


/**
 * @return {number}
 */
THREE.AnimationAction.prototype.getEffectiveWeight = function() {};


/**
 * @param {number} duration
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.fadeIn = function(duration) {};


/**
 * @param {number} duration
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.fadeOut = function(duration) {};


/**
 * @param {THREE.AnimationAction} fadeOutAction
 * @param {number} duration
 * @param {boolean} warp
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.crossFadeFrom = function(fadeOutAction, duration, warp) {};


/**
 * @param {THREE.AnimationAction} fadeInAction
 * @param {number} duration
 * @param {boolean} warp
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.crossFadeTo = function(fadeInAction, duration, warp) {};


/**
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.stopFading = function() {};


/**
 * @param {number} timeScale
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.setEffectiveTimeScale = function(timeScale) {};


/**
 * @return {number}
 */
THREE.AnimationAction.prototype.getEffectiveTimeScale = function() {};


/**
 * @param {number} duration
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.setDuration = function(duration) {};


/**
 * @param {THREE.AnimationAction} action
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.syncWith = function(action) {};


/**
 * @param {number} duration
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.halt = function(duration) {};


/**
 * @param {number} statTimeScale
 * @param {number} endTimeScale
 * @param {number} duration
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.warp = function(statTimeScale, endTimeScale, duration) {};


/**
 * @return {THREE.AnimationAction}
 */
THREE.AnimationAction.prototype.stopWarping = function() {};


/**
 * @return {THREE.AnimationMixer}
 */
THREE.AnimationAction.prototype.getMixer = function() {};


/**
 * @return {THREE.AnimationClip}
 */
THREE.AnimationAction.prototype.getClip = function() {};


/**
 * @return {*}
 */
THREE.AnimationAction.prototype.getRoot = function() {};


/**
 * @constructor
 * @param {string=} opt_name
 * @param {number=} opt_duration
 * @param {Array<THREE.KeyframeTrack>=} opt_tracks
 */
THREE.AnimationClip = function(opt_name, opt_duration, opt_tracks) {};


/**
 * @param {string} name
 * @param {Array<THREE.MorphTarget>} morphTargetSequence
 * @param {number} fps
 * @param {boolean} noLoop
 * @return {THREE.AnimationClip}
 */
THREE.AnimationClip.CreateFromMorphTargetSequence = function(name, morphTargetSequence, fps, noLoop) {};


/**
 * @param {THREE.AnimationClip} clipArray
 * @param {string} name
 * @return {THREE.AnimationClip}
 */
THREE.AnimationClip.findByName = function(clipArray, name) {};


/**
 * @param {Array<THREE.MorphTarget>} morphTargets
 * @param {number} fps
 * @param {boolean} noLoop
 * @return {Array<THREE.AnimationClip>}
 */
THREE.AnimationClip.CreateClipsFromMorphTargetSequences = function(morphTargets, fps, noLoop) {};


/**
 * @param {*} json
 * @return {THREE.AnimationClip}
 */
THREE.AnimationClip.parse = function(json) {};


/**
 * @param {*} animation
 * @param {Array<THREE.Bone>} bones
 * @param {string} nodeName
 * @return {THREE.AnimationClip}
 */
THREE.AnimationClip.parseAnimation = function(animation, bones, nodeName) {};


/**
 * @return {*}
 */
THREE.AnimationClip.toJSON = function() {};


/**
 * @type {string}
 */
THREE.AnimationClip.prototype.name;


/**
 * @type {Array<THREE.KeyframeTrack>}
 */
THREE.AnimationClip.prototype.tracks;


/**
 * @type {number}
 */
THREE.AnimationClip.prototype.duration;


/**
 * @type {string}
 */
THREE.AnimationClip.prototype.uuid;


/**
 * @type {Array<*>}
 */
THREE.AnimationClip.prototype.results;


/**

*/
THREE.AnimationClip.prototype.resetDuration = function() {};


/**
 * @return {THREE.AnimationClip}
 */
THREE.AnimationClip.prototype.trim = function() {};


/**
 * @return {THREE.AnimationClip}
 */
THREE.AnimationClip.prototype.optimize = function() {};


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 * @param {*} root
 */
THREE.AnimationMixer = function(root) {};


/**
 * @type {number}
 */
THREE.AnimationMixer.prototype.time;


/**
 * @type {number}
 */
THREE.AnimationMixer.prototype.timeScale;


/**
 * @param {THREE.AnimationClip} clip
 * @param {*=} opt_root
 * @return {THREE.AnimationAction}
 */
THREE.AnimationMixer.prototype.clipAction = function(clip, opt_root) {};


/**
 * @param {THREE.AnimationClip} clip
 * @param {*=} opt_root
 * @return {THREE.AnimationAction}
 */
THREE.AnimationMixer.prototype.existingAction = function(clip, opt_root) {};


/**
 * @param {THREE.AnimationClip} clip
 * @param {*=} opt_root
 * @return {THREE.AnimationMixer}
 */
THREE.AnimationMixer.prototype.stopAllAction = function(clip, opt_root) {};


/**
 * @param {number} deltaTime
 * @return {THREE.AnimationMixer}
 */
THREE.AnimationMixer.prototype.update = function(deltaTime) {};


/**
 * @return {*}
 */
THREE.AnimationMixer.prototype.getRoot = function() {};


/**
 * @param {THREE.AnimationClip} clip
 */
THREE.AnimationMixer.prototype.uncacheClip = function(clip) {};


/**
 * @param {*} root
 */
THREE.AnimationMixer.prototype.uncacheRoot = function(root) {};


/**
 * @param {THREE.AnimationClip} clip
 * @param {*=} opt_root
 */
THREE.AnimationMixer.prototype.uncacheAction = function(clip, opt_root) {};


/**
 * @constructor
 * @param {any} args
 */
THREE.AnimationObjectGroup = function(args) {};


/**
 * @type {string}
 */
THREE.AnimationObjectGroup.prototype.uuid;


/**
 * @type {{bindingsPerObject: number, objects: {total: number, inUse: number}}}
 */
THREE.AnimationObjectGroup.prototype.stats;


/**
 * @param {any} args
 */
THREE.AnimationObjectGroup.prototype.add = function(args) {};


/**
 * @param {any} args
 */
THREE.AnimationObjectGroup.prototype.remove = function(args) {};


/**
 * @param {any} args
 */
THREE.AnimationObjectGroup.prototype.uncache = function(args) {};


THREE.AnimationUtils = {};


/**
 * @param {*} array
 * @param {number} from
 * @param {number} to
 * @return {*}
 */
THREE.AnimationUtils.arraySlice = function(array, from, to) {};


/**
 * @param {*} array
 * @param {*} type
 * @param {boolean} forceClone
 * @return {*}
 */
THREE.AnimationUtils.convertArray = function(array, type, forceClone) {};


/**
 * @param {*} object
 * @return {boolean}
 */
THREE.AnimationUtils.isTypedArray = function(object) {};


/**
 * @param {number} times
 * @return {Array<number>}
 */
THREE.AnimationUtils.getKeyFrameOrder = function(times) {};


/**
 * @param {Array<*>} values
 * @param {number} stride
 * @param {Array<number>} order
 * @return {Array<*>}
 */
THREE.AnimationUtils.sortedArray = function(values, stride, order) {};


/**
 * @param {Array<string>} jsonKeys
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {string} valuePropertyName
 */
THREE.AnimationUtils.flattenJSON = function(jsonKeys, times, values, valuePropertyName) {};


/**
 * @constructor
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.KeyframeTrack = function(name, times, values, interpolation) {};


/**
 * @param {*} json
 * @return {THREE.KeyframeTrack}
 */
THREE.KeyframeTrack.parse = function(json) {};


/**
 * @param {THREE.KeyframeTrack} track
 * @return {*}
 */
THREE.KeyframeTrack.toJSON = function(track) {};


/**
 * @type {string}
 */
THREE.KeyframeTrack.prototype.name;


/**
 * @type {Array<*>}
 */
THREE.KeyframeTrack.prototype.times;


/**
 * @type {Array<*>}
 */
THREE.KeyframeTrack.prototype.values;


/**
 * @type {string}
 */
THREE.KeyframeTrack.prototype.ValueTypeName;


/**
 * @type {THREE.Float32Array}
 */
THREE.KeyframeTrack.prototype.TimeBufferType;


/**
 * @type {THREE.Float32Array}
 */
THREE.KeyframeTrack.prototype.ValueBufferType;


/**
 * @type {THREE.InterpolationModes}
 */
THREE.KeyframeTrack.prototype.DefaultInterpolation;


/**
 * @param {*} result
 * @return {THREE.DiscreteInterpolant}
 */
THREE.KeyframeTrack.prototype.InterpolantFactoryMethodDiscrete = function(result) {};


/**
 * @param {*} result
 * @return {THREE.LinearInterpolant}
 */
THREE.KeyframeTrack.prototype.InterpolantFactoryMethodLinear = function(result) {};


/**
 * @param {*} result
 * @return {THREE.CubicInterpolant}
 */
THREE.KeyframeTrack.prototype.InterpolantFactoryMethodSmooth = function(result) {};


/**
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.KeyframeTrack.prototype.setInterpolation = function(interpolation) {};


/**
 * @return {THREE.InterpolationModes}
 */
THREE.KeyframeTrack.prototype.getInterpolation = function() {};


/**
 * @return {number}
 */
THREE.KeyframeTrack.prototype.getValuesize = function() {};


/**
 * @param {number} timeOffset
 * @return {THREE.KeyframeTrack}
 */
THREE.KeyframeTrack.prototype.shift = function(timeOffset) {};


/**
 * @param {number} timeScale
 * @return {THREE.KeyframeTrack}
 */
THREE.KeyframeTrack.prototype.scale = function(timeScale) {};


/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {THREE.KeyframeTrack}
 */
THREE.KeyframeTrack.prototype.trim = function(startTime, endTime) {};


/**
 * @return {boolean}
 */
THREE.KeyframeTrack.prototype.validate = function() {};


/**
 * @return {THREE.KeyframeTrack}
 */
THREE.KeyframeTrack.prototype.optimize = function() {};


THREE.PropertyBinding = {};


/**
 * @param {*} root
 * @param {*} path
 * @param {*=} opt_parsedPath
 * @return {(THREE.PropertyBinding|THREE.PropertyBinding.Composite)}
 */
THREE.PropertyBinding.create = function(root, path, opt_parsedPath) {};


/**
 * @param {string} trackName
 * @return {*}
 */
THREE.PropertyBinding.parseTrackName = function(trackName) {};


/**
 * @param {*} root
 * @param {string} nodeName
 * @return {*}
 */
THREE.PropertyBinding.findNode = function(root, nodeName) {};


/**
 * @constructor
 * @param {*} targetGroup
 * @param {*} path
 * @param {*=} opt_parsedPath
 */
THREE.PropertyBinding.Composite = function(targetGroup, path, opt_parsedPath) {};


/**
 * @param {*} array
 * @param {number} offset
 * @return {*}
 */
THREE.PropertyBinding.Composite.prototype.getValue = function(array, offset) {};


/**
 * @param {*} array
 * @param {number} offset
 */
THREE.PropertyBinding.Composite.prototype.setValue = function(array, offset) {};


/**

*/
THREE.PropertyBinding.Composite.prototype.bind = function() {};


/**

*/
THREE.PropertyBinding.Composite.prototype.unbind = function() {};


/**
 * @constructor
 * @param {*} binding
 * @param {string} typeName
 * @param {number} valueSize
 */
THREE.PropertyMixer = function(binding, typeName, valueSize) {};


/**
 * @type {*}
 */
THREE.PropertyMixer.prototype.binding;


/**
 * @type {number}
 */
THREE.PropertyMixer.prototype.valueSize;


/**
 * @type {*}
 */
THREE.PropertyMixer.prototype.buffer;


/**
 * @type {number}
 */
THREE.PropertyMixer.prototype.cumulativeWeight;


/**
 * @type {number}
 */
THREE.PropertyMixer.prototype.useCount;


/**
 * @type {number}
 */
THREE.PropertyMixer.prototype.referenceCount;


/**
 * @param {number} accuIndex
 * @param {number} weight
 */
THREE.PropertyMixer.prototype.accumulate = function(accuIndex, weight) {};


/**
 * @param {number} accuIndex
 */
THREE.PropertyMixer.prototype.apply = function(accuIndex) {};


/**

*/
THREE.PropertyMixer.prototype.saveOriginalState = function() {};


/**

*/
THREE.PropertyMixer.prototype.restoreOriginalState = function() {};


/**
 * @constructor
 * @extends {THREE.KeyframeTrack}
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 */
THREE.BooleanKeyframeTrack = function(name, times, values) {};


/**
 * @constructor
 * @extends {THREE.KeyframeTrack}
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.ColorKeyframeTrack = function(name, times, values, interpolation) {};


/**
 * @constructor
 * @extends {THREE.KeyframeTrack}
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.NumberKeyframeTrack = function(name, times, values, interpolation) {};


/**
 * @constructor
 * @extends {THREE.KeyframeTrack}
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.QuaternionKeyframeTrack = function(name, times, values, interpolation) {};


/**
 * @constructor
 * @extends {THREE.KeyframeTrack}
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.StringKeyframeTrack = function(name, times, values, interpolation) {};


/**
 * @constructor
 * @extends {THREE.KeyframeTrack}
 * @param {string} name
 * @param {Array<*>} times
 * @param {Array<*>} values
 * @param {THREE.InterpolationModes} interpolation
 */
THREE.VectorKeyframeTrack = function(name, times, values, interpolation) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 */
THREE.Camera = function() {};


/**
 * @type {THREE.Matrix4}
 */
THREE.Camera.prototype.matrixWorldInverse;


/**
 * @type {THREE.Matrix4}
 */
THREE.Camera.prototype.projectionMatrix;


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Camera.prototype.getWorldDirection = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} vector
 */
THREE.Camera.prototype.lookAt = function(vector) {};


/**
 * @return {THREE.Camera}
 */
THREE.Camera.prototype.clone = function() {};


/**
 * @param {THREE.Camera=} opt_camera
 * @return {THREE.Camera}
 */
THREE.Camera.prototype.copy = function(opt_camera) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {number=} opt_near
 * @param {number=} opt_far
 * @param {number=} opt_cubeResolution
 */
THREE.CubeCamera = function(opt_near, opt_far, opt_cubeResolution) {};


/**
 * @type {THREE.WebGLRenderTargetCube}
 */
THREE.CubeCamera.prototype.renderTarget;


/**
 * @param {THREE.Renderer} renderer
 * @param {THREE.Scene} scene
 */
THREE.CubeCamera.prototype.updateCubeMap = function(renderer, scene) {};


/**
 * @constructor
 * @extends {THREE.Camera}
 * @param {number} left
 * @param {number} right
 * @param {number} top
 * @param {number} bottom
 * @param {number=} opt_near
 * @param {number=} opt_far
 */
THREE.OrthographicCamera = function(left, right, top, bottom, opt_near, opt_far) {};


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.zoom;


/**
 * @type {{fullWidth: number, fullHeight: number, offsetX: number, offsetY: number, width: number, height: number}}
 */
THREE.OrthographicCamera.prototype.view;


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.left;


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.right;


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.top;


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.bottom;


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.near;


/**
 * @type {number}
 */
THREE.OrthographicCamera.prototype.far;


/**

*/
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {};


/**
 * @param {number} fullWidth
 * @param {number} fullHeight
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {number} width
 * @param {number} height
 */
THREE.OrthographicCamera.prototype.setViewOffset = function(fullWidth, fullHeight, offsetX, offsetY, width, height) {};


/**

*/
THREE.OrthographicCamera.prototype.clearViewOffset = function() {};


/**
 * @return {THREE.OrthographicCamera}
 */
THREE.OrthographicCamera.prototype.clone = function() {};


/**
 * @param {THREE.OrthographicCamera} source
 * @return {THREE.OrthographicCamera}
 */
THREE.OrthographicCamera.prototype.copy = function(source) {};


/**
 * @param {*=} opt_meta
 * @return {*}
 */
THREE.OrthographicCamera.prototype.toJSON = function(opt_meta) {};


/**
 * @constructor
 * @extends {THREE.Camera}
 * @param {number=} opt_fov
 * @param {number=} opt_aspect
 * @param {number=} opt_near
 * @param {number=} opt_far
 */
THREE.PerspectiveCamera = function(opt_fov, opt_aspect, opt_near, opt_far) {};


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.zoom;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.fov;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.aspect;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.near;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.far;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.focus;


/**
 * @type {{fullWidth: number, fullHeight: number, offsetX: number, offsetY: number, width: number, height: number}}
 */
THREE.PerspectiveCamera.prototype.view;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.filmGauge;


/**
 * @type {number}
 */
THREE.PerspectiveCamera.prototype.filmOffset;


/**
 * @param {number} focalLength
 */
THREE.PerspectiveCamera.prototype.setFocalLength = function(focalLength) {};


/**
 * @return {number}
 */
THREE.PerspectiveCamera.prototype.getFocalLength = function() {};


/**
 * @return {number}
 */
THREE.PerspectiveCamera.prototype.getEffectiveFOV = function() {};


/**
 * @return {number}
 */
THREE.PerspectiveCamera.prototype.getFilmWidth = function() {};


/**
 * @return {number}
 */
THREE.PerspectiveCamera.prototype.getFilmHeight = function() {};


/**
 * @param {number} fullWidth
 * @param {number} fullHeight
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
THREE.PerspectiveCamera.prototype.setViewOffset = function(fullWidth, fullHeight, x, y, width, height) {};


/**

*/
THREE.PerspectiveCamera.prototype.clearViewOffset = function() {};


/**

*/
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {};


/**
 * @return {THREE.PerspectiveCamera}
 */
THREE.PerspectiveCamera.prototype.clone = function() {};


/**
 * @param {*=} opt_meta
 * @return {*}
 */
THREE.PerspectiveCamera.prototype.toJSON = function(opt_meta) {};


/**
 * @param {number} focalLength
 * @param {number=} opt_frameHeight
 */
THREE.PerspectiveCamera.prototype.setLens = function(focalLength, opt_frameHeight) {};


/**
 * @constructor
 * @extends {THREE.Camera}
 */
THREE.StereoCamera = function() {};


/**
 * @type {number}
 */
THREE.StereoCamera.prototype.aspect;


/**
 * @type {THREE.PerspectiveCamera}
 */
THREE.StereoCamera.prototype.cameraL;


/**
 * @type {THREE.PerspectiveCamera}
 */
THREE.StereoCamera.prototype.cameraR;


/**
 * @param {THREE.PerspectiveCamera} camera
 */
THREE.StereoCamera.prototype.update = function(camera) {};


/**
 * @constructor
 * @param {THREE.ArrayLike} array
 * @param {number} itemSize
 * @param {boolean=} opt_normalized
 */
THREE.BufferAttribute = function(array, itemSize, opt_normalized) {};


/**
 * @type {string}
 */
THREE.BufferAttribute.prototype.uuid;


/**
 * @type {THREE.ArrayLike}
 */
THREE.BufferAttribute.prototype.array;


/**
 * @type {number}
 */
THREE.BufferAttribute.prototype.itemSize;


/**
 * @type {boolean}
 */
THREE.BufferAttribute.prototype.dynamic;


/**
 * @type {{offset: number, count: number}}
 */
THREE.BufferAttribute.prototype.updateRange;


/**
 * @type {number}
 */
THREE.BufferAttribute.prototype.version;


/**
 * @type {boolean}
 */
THREE.BufferAttribute.prototype.normalized;


/**
 * @type {boolean}
 */
THREE.BufferAttribute.prototype.needsUpdate;


/**
 * @type {number}
 */
THREE.BufferAttribute.prototype.count;


/**
 * @param {boolean} dynamic
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setDynamic = function(dynamic) {};


/**
 * @return {(THREE.BufferAttribute|THREE.BufferAttribute)}
 */
THREE.BufferAttribute.prototype.clone = function() {};


/**
 * @param {THREE.BufferAttribute} source
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copy = function(source) {};


/**
 * @param {number} index1
 * @param {THREE.BufferAttribute} attribute
 * @param {number} index2
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyAt = function(index1, attribute, index2) {};


/**
 * @param {THREE.ArrayLike} array
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyArray = function(array) {};


/**
 * @param {Array<THREE.{r:number, g:number, b:number}>} colors
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyColorsArray = function(colors) {};


/**
 * @param {Array<THREE.{a:number, b:number, c:number}>} indices
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyIndicesArray = function(indices) {};


/**
 * @param {Array<THREE.{x:number, y:number}>} vectors
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyVector2sArray = function(vectors) {};


/**
 * @param {Array<THREE.{x:number, y:number, z:number}>} vectors
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyVector3sArray = function(vectors) {};


/**
 * @param {Array<THREE.{x:number, y:number, z:number, w:number}>} vectors
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.copyVector4sArray = function(vectors) {};


/**
 * @param {THREE.ArrayLike} value
 * @param {number=} opt_offset
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.set = function(value, opt_offset) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.BufferAttribute.prototype.getX = function(index) {};


/**
 * @param {number} index
 * @param {number} x
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setX = function(index, x) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.BufferAttribute.prototype.getY = function(index) {};


/**
 * @param {number} index
 * @param {number} y
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setY = function(index, y) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.BufferAttribute.prototype.getZ = function(index) {};


/**
 * @param {number} index
 * @param {number} z
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setZ = function(index, z) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.BufferAttribute.prototype.getW = function(index) {};


/**
 * @param {number} index
 * @param {number} z
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setW = function(index, z) {};


/**
 * @param {number} index
 * @param {number} x
 * @param {number} y
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setXY = function(index, x, y) {};


/**
 * @param {number} index
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setXYZ = function(index, x, y, z) {};


/**
 * @param {number} index
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @return {THREE.BufferAttribute}
 */
THREE.BufferAttribute.prototype.setXYZW = function(index, x, y, z, w) {};


/**
 * @type {number}
 */
THREE.BufferAttribute.prototype.length;


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Int8Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Uint8Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Uint8ClampedAttribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Int16Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Uint16Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Int32Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Uint32Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Float32Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {*} array
 * @param {number} itemSize
 */
THREE.Float64Attribute = function(array, itemSize) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 */
THREE.DynamicBufferAttribute = function() {};


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 */
THREE.BufferGeometry = function() {};


/**
 * @type {number}
 */
THREE.BufferGeometry.prototype.MaxIndex;


/**
 * @type {number}
 */
THREE.BufferGeometry.prototype.id;


/**
 * @type {string}
 */
THREE.BufferGeometry.prototype.uuid;


/**
 * @type {string}
 */
THREE.BufferGeometry.prototype.name;


/**
 * @type {string}
 */
THREE.BufferGeometry.prototype.type;


/**
 * @type {THREE.BufferAttribute}
 */
THREE.BufferGeometry.prototype.index;


/**
 * @type {(THREE.BufferAttribute|Array<THREE.InterleavedBufferAttribute>)}
 */
THREE.BufferGeometry.prototype.attributes;


/**
 * @type {*}
 */
THREE.BufferGeometry.prototype.morphAttributes;


/**
 * @type {Array<THREE.{start: number, count: number, materialIndex?: number}>}
 */
THREE.BufferGeometry.prototype.groups;


/**
 * @type {THREE.Box3}
 */
THREE.BufferGeometry.prototype.boundingBox;


/**
 * @type {THREE.Sphere}
 */
THREE.BufferGeometry.prototype.boundingSphere;


/**
 * @type {{start: number, count: number}}
 */
THREE.BufferGeometry.prototype.drawRange;


/**
 * @return {THREE.BufferAttribute}
 */
THREE.BufferGeometry.prototype.getIndex = function() {};


/**
 * @param {THREE.BufferAttribute} index
 */
THREE.BufferGeometry.prototype.setIndex = function(index) {};


/**
 * @param {(string|*)} name
 * @param {(THREE.BufferAttribute|THREE.InterleavedBufferAttribute|*)} attribute
 * @param {*} itemSize
 * @return {(THREE.BufferGeometry|*)}
 */
THREE.BufferGeometry.prototype.addAttribute = function(name, attribute, itemSize) {};


/**
 * @param {string} name
 * @return {(THREE.BufferAttribute|THREE.InterleavedBufferAttribute)}
 */
THREE.BufferGeometry.prototype.getAttribute = function(name) {};


/**
 * @param {string} name
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.removeAttribute = function(name) {};


/**
 * @param {number} start
 * @param {number} count
 * @param {number=} opt_materialIndex
 */
THREE.BufferGeometry.prototype.addGroup = function(start, count, opt_materialIndex) {};


/**

*/
THREE.BufferGeometry.prototype.clearGroups = function() {};


/**
 * @param {number} start
 * @param {number} count
 */
THREE.BufferGeometry.prototype.setDrawRange = function(start, count) {};


/**
 * @param {THREE.Matrix4} matrix
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.applyMatrix = function(matrix) {};


/**
 * @param {number} angle
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.rotateX = function(angle) {};


/**
 * @param {number} angle
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.rotateY = function(angle) {};


/**
 * @param {number} angle
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.rotateZ = function(angle) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.translate = function(x, y, z) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.scale = function(x, y, z) {};


/**
 * @param {THREE.Vector3} v
 */
THREE.BufferGeometry.prototype.lookAt = function(v) {};


/**
 * @return {THREE.Vector3}
 */
THREE.BufferGeometry.prototype.center = function() {};


/**
 * @param {THREE.Object3D} object
 */
THREE.BufferGeometry.prototype.setFromObject = function(object) {};


/**
 * @param {THREE.Object3D} object
 */
THREE.BufferGeometry.prototype.updateFromObject = function(object) {};


/**
 * @param {THREE.Geometry} geometry
 * @param {*=} opt_settings
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.fromGeometry = function(geometry, opt_settings) {};


/**
 * @param {THREE.DirectGeometry} geometry
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.fromDirectGeometry = function(geometry) {};


/**

*/
THREE.BufferGeometry.prototype.computeBoundingBox = function() {};


/**

*/
THREE.BufferGeometry.prototype.computeBoundingSphere = function() {};


/**

*/
THREE.BufferGeometry.prototype.computeVertexNormals = function() {};


/**
 * @param {THREE.BufferGeometry} geometry
 * @param {number} offset
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.merge = function(geometry, offset) {};


/**

*/
THREE.BufferGeometry.prototype.normalizeNormals = function() {};


/**
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.toNonIndexed = function() {};


/**
 * @return {*}
 */
THREE.BufferGeometry.prototype.toJSON = function() {};


/**
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.clone = function() {};


/**
 * @param {THREE.BufferGeometry} source
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometry.prototype.copy = function(source) {};


/**

*/
THREE.BufferGeometry.prototype.dispose = function() {};


/**
 * @type {*}
 */
THREE.BufferGeometry.prototype.drawcalls;


/**
 * @type {*}
 */
THREE.BufferGeometry.prototype.offsets;


/**
 * @param {*} index
 */
THREE.BufferGeometry.prototype.addIndex = function(index) {};


/**
 * @param {*} start
 * @param {*} count
 * @param {*=} opt_indexOffset
 */
THREE.BufferGeometry.prototype.addDrawCall = function(start, count, opt_indexOffset) {};


/**

*/
THREE.BufferGeometry.prototype.clearDrawCalls = function() {};


/**
 * @constructor
 * @param {boolean=} opt_autoStart
 */
THREE.Clock = function(opt_autoStart) {};


/**
 * @type {boolean}
 */
THREE.Clock.prototype.autoStart;


/**
 * @type {number}
 */
THREE.Clock.prototype.startTime;


/**
 * @type {number}
 */
THREE.Clock.prototype.oldTime;


/**
 * @type {number}
 */
THREE.Clock.prototype.elapsedTime;


/**
 * @type {boolean}
 */
THREE.Clock.prototype.running;


/**

*/
THREE.Clock.prototype.start = function() {};


/**

*/
THREE.Clock.prototype.stop = function() {};


/**
 * @return {number}
 */
THREE.Clock.prototype.getElapsedTime = function() {};


/**
 * @return {number}
 */
THREE.Clock.prototype.getDelta = function() {};


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 */
THREE.DirectGeometry = function() {};


/**
 * @type {number}
 */
THREE.DirectGeometry.prototype.id;


/**
 * @type {string}
 */
THREE.DirectGeometry.prototype.uuid;


/**
 * @type {string}
 */
THREE.DirectGeometry.prototype.name;


/**
 * @type {string}
 */
THREE.DirectGeometry.prototype.type;


/**
 * @type {Array<number>}
 */
THREE.DirectGeometry.prototype.indices;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.DirectGeometry.prototype.vertices;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.DirectGeometry.prototype.normals;


/**
 * @type {Array<THREE.Color>}
 */
THREE.DirectGeometry.prototype.colors;


/**
 * @type {Array<THREE.Vector2>}
 */
THREE.DirectGeometry.prototype.uvs;


/**
 * @type {Array<THREE.Vector2>}
 */
THREE.DirectGeometry.prototype.uvs2;


/**
 * @type {Array<THREE.{start: number, materialIndex: number}>}
 */
THREE.DirectGeometry.prototype.groups;


/**
 * @type {Array<THREE.MorphTarget>}
 */
THREE.DirectGeometry.prototype.morphTargets;


/**
 * @type {Array<number>}
 */
THREE.DirectGeometry.prototype.skinWeights;


/**
 * @type {Array<number>}
 */
THREE.DirectGeometry.prototype.skinIndices;


/**
 * @type {THREE.Box3}
 */
THREE.DirectGeometry.prototype.boundingBox;


/**
 * @type {THREE.Sphere}
 */
THREE.DirectGeometry.prototype.boundingSphere;


/**
 * @type {boolean}
 */
THREE.DirectGeometry.prototype.verticesNeedUpdate;


/**
 * @type {boolean}
 */
THREE.DirectGeometry.prototype.normalsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.DirectGeometry.prototype.colorsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.DirectGeometry.prototype.uvsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.DirectGeometry.prototype.groupsNeedUpdate;


/**

*/
THREE.DirectGeometry.prototype.computeBoundingBox = function() {};


/**

*/
THREE.DirectGeometry.prototype.computeBoundingSphere = function() {};


/**
 * @param {THREE.Geometry} geometry
 */
THREE.DirectGeometry.prototype.computeGroups = function(geometry) {};


/**
 * @param {THREE.Geometry} geometry
 * @return {THREE.DirectGeometry}
 */
THREE.DirectGeometry.prototype.fromGeometry = function(geometry) {};


/**

*/
THREE.DirectGeometry.prototype.dispose = function() {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.DirectGeometry.prototype.addEventListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.DirectGeometry.prototype.hasEventListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.DirectGeometry.prototype.removeEventListener = function(type, listener) {};


/**
 * @param {{type: string}} event
 */
THREE.DirectGeometry.prototype.dispatchEvent = function(event) {};


/**
 * @constructor
 */
THREE.EventDispatcher = function() {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.EventDispatcher.prototype.addEventListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.EventDispatcher.prototype.hasEventListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.EventDispatcher.prototype.removeEventListener = function(type, listener) {};


/**
 * @param {{type: string}} event
 */
THREE.EventDispatcher.prototype.dispatchEvent = function(event) {};


/**
 * @param {*} target
 */
THREE.EventDispatcher.prototype.apply = function(target) {};


/**
 * @interface
 */
THREE.Event = function() {};


/**
 * @constructor
 * @param {(number|number|number|number)} a
 * @param {(number|number|number|number)} b
 * @param {(number|number|number|number)} c
 * @param {(THREE.Vector3|THREE.Vector3|Array<THREE.Vector3>|Array<THREE.Vector3>)=} opt_normal
 * @param {(THREE.Color|Array<THREE.Color>|THREE.Color|Array<THREE.Color>)=} opt_color
 * @param {(number|number|number|number)=} opt_materialIndex
 */
THREE.Face3 = function(a, b, c, opt_normal, opt_color, opt_materialIndex) {};


/**
 * @type {number}
 */
THREE.Face3.prototype.a;


/**
 * @type {number}
 */
THREE.Face3.prototype.b;


/**
 * @type {number}
 */
THREE.Face3.prototype.c;


/**
 * @type {THREE.Vector3}
 */
THREE.Face3.prototype.normal;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.Face3.prototype.vertexNormals;


/**
 * @type {THREE.Color}
 */
THREE.Face3.prototype.color;


/**
 * @type {Array<THREE.Color>}
 */
THREE.Face3.prototype.vertexColors;


/**
 * @type {number}
 */
THREE.Face3.prototype.materialIndex;


/**
 * @return {THREE.Face3}
 */
THREE.Face3.prototype.clone = function() {};


/**
 * @param {THREE.Face3} source
 * @return {THREE.Face3}
 */
THREE.Face3.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Face3}
 */
THREE.Face4 = function() {};


/**
 * @interface
 */
THREE.MorphTarget = function() {};


/**
 * @interface
 */
THREE.MorphColor = function() {};


/**
 * @interface
 */
THREE.MorphNormals = function() {};


/**
 * @type {number}
 */
THREE.GeometryIdCount;


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 */
THREE.Geometry = function() {};


/**
 * @type {number}
 */
THREE.Geometry.prototype.id;


/**
 * @type {string}
 */
THREE.Geometry.prototype.uuid;


/**
 * @type {string}
 */
THREE.Geometry.prototype.name;


/**
 * @type {string}
 */
THREE.Geometry.prototype.type;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.Geometry.prototype.vertices;


/**
 * @type {Array<THREE.Color>}
 */
THREE.Geometry.prototype.colors;


/**
 * @type {Array<THREE.Face3>}
 */
THREE.Geometry.prototype.faces;


/**
 * @type {Array<THREE.Vector2[][]>}
 */
THREE.Geometry.prototype.faceVertexUvs;


/**
 * @type {Array<THREE.MorphTarget>}
 */
THREE.Geometry.prototype.morphTargets;


/**
 * @type {Array<THREE.MorphNormals>}
 */
THREE.Geometry.prototype.morphNormals;


/**
 * @type {Array<number>}
 */
THREE.Geometry.prototype.skinWeights;


/**
 * @type {Array<number>}
 */
THREE.Geometry.prototype.skinIndices;


/**
 * @type {Array<number>}
 */
THREE.Geometry.prototype.lineDistances;


/**
 * @type {THREE.Box3}
 */
THREE.Geometry.prototype.boundingBox;


/**
 * @type {THREE.Sphere}
 */
THREE.Geometry.prototype.boundingSphere;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.verticesNeedUpdate;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.elementsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.uvsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.normalsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.colorsNeedUpdate;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.lineDistancesNeedUpdate;


/**
 * @type {boolean}
 */
THREE.Geometry.prototype.groupsNeedUpdate;


/**
 * @param {THREE.Matrix4} matrix
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.applyMatrix = function(matrix) {};


/**
 * @param {number} angle
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.rotateX = function(angle) {};


/**
 * @param {number} angle
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.rotateY = function(angle) {};


/**
 * @param {number} angle
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.rotateZ = function(angle) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.translate = function(x, y, z) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.scale = function(x, y, z) {};


/**
 * @param {THREE.Vector3} vector
 */
THREE.Geometry.prototype.lookAt = function(vector) {};


/**
 * @param {THREE.BufferGeometry} geometry
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.fromBufferGeometry = function(geometry) {};


/**
 * @return {THREE.Vector3}
 */
THREE.Geometry.prototype.center = function() {};


/**
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.normalize = function() {};


/**

*/
THREE.Geometry.prototype.computeFaceNormals = function() {};


/**
 * @param {boolean=} opt_areaWeighted
 */
THREE.Geometry.prototype.computeVertexNormals = function(opt_areaWeighted) {};


/**

*/
THREE.Geometry.prototype.computeMorphNormals = function() {};


/**

*/
THREE.Geometry.prototype.computeLineDistances = function() {};


/**

*/
THREE.Geometry.prototype.computeBoundingBox = function() {};


/**

*/
THREE.Geometry.prototype.computeBoundingSphere = function() {};


/**
 * @param {THREE.Geometry} geometry
 * @param {THREE.Matrix} matrix
 * @param {number=} opt_materialIndexOffset
 */
THREE.Geometry.prototype.merge = function(geometry, matrix, opt_materialIndexOffset) {};


/**
 * @param {THREE.Mesh} mesh
 */
THREE.Geometry.prototype.mergeMesh = function(mesh) {};


/**
 * @return {number}
 */
THREE.Geometry.prototype.mergeVertices = function() {};


/**

*/
THREE.Geometry.prototype.sortFacesByMaterialIndex = function() {};


/**
 * @return {*}
 */
THREE.Geometry.prototype.toJSON = function() {};


/**
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.clone = function() {};


/**
 * @param {THREE.Geometry} source
 * @return {THREE.Geometry}
 */
THREE.Geometry.prototype.copy = function(source) {};


/**

*/
THREE.Geometry.prototype.dispose = function() {};


/**
 * @type {Array<THREE.Bone>}
 */
THREE.Geometry.prototype.bones;


/**
 * @type {THREE.AnimationClip}
 */
THREE.Geometry.prototype.animation;


/**
 * @type {Array<THREE.AnimationClip>}
 */
THREE.Geometry.prototype.animations;


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.Geometry.prototype.addEventListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.Geometry.prototype.hasEventListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(event:THREE.Event)} listener
 */
THREE.Geometry.prototype.removeEventListener = function(type, listener) {};


/**
 * @param {{type: string}} event
 */
THREE.Geometry.prototype.dispatchEvent = function(event) {};


THREE.GeometryUtils = {};


/**
 * @param {*} geometry1
 * @param {*} geometry2
 * @param {*=} opt_materialIndexOffset
 * @return {*}
 */
THREE.GeometryUtils.merge = function(geometry1, geometry2, opt_materialIndexOffset) {};


/**
 * @param {*} geometry
 * @return {*}
 */
THREE.GeometryUtils.center = function(geometry) {};


/**
 * @constructor
 * @extends {THREE.BufferAttribute}
 * @param {THREE.ArrayLike} data
 * @param {number} itemSize
 * @param {number=} opt_meshPerAttribute
 */
THREE.InstancedBufferAttribute = function(data, itemSize, opt_meshPerAttribute) {};


/**
 * @type {number}
 */
THREE.InstancedBufferAttribute.prototype.meshPerAttribute;


/**
 * @return {THREE.InstancedBufferAttribute}
 */
THREE.InstancedBufferAttribute.prototype.clone = function() {};


/**
 * @param {THREE.InstancedBufferAttribute} source
 * @return {THREE.InstancedBufferAttribute}
 */
THREE.InstancedBufferAttribute.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 */
THREE.InstancedBufferGeometry = function() {};


/**
 * @type {Array<THREE.{start:number, count:number, instances:number}>}
 */
THREE.InstancedBufferGeometry.prototype.groups;


/**
 * @type {number}
 */
THREE.InstancedBufferGeometry.prototype.maxInstancedCount;


/**
 * @param {number} start
 * @param {number} count
 * @param {number} instances
 */
THREE.InstancedBufferGeometry.prototype.addGroup = function(start, count, instances) {};


/**
 * @return {THREE.InstancedBufferGeometry}
 */
THREE.InstancedBufferGeometry.prototype.clone = function() {};


/**
 * @param {THREE.InstancedBufferGeometry} source
 * @return {THREE.InstancedBufferGeometry}
 */
THREE.InstancedBufferGeometry.prototype.copy = function(source) {};


/**
 * @constructor
 * @param {THREE.ArrayLike} array
 * @param {number} stride
 */
THREE.InterleavedBuffer = function(array, stride) {};


/**
 * @type {THREE.ArrayLike}
 */
THREE.InterleavedBuffer.prototype.array;


/**
 * @type {number}
 */
THREE.InterleavedBuffer.prototype.stride;


/**
 * @type {boolean}
 */
THREE.InterleavedBuffer.prototype.dynamic;


/**
 * @type {{offset: number, count: number}}
 */
THREE.InterleavedBuffer.prototype.updateRange;


/**
 * @type {number}
 */
THREE.InterleavedBuffer.prototype.version;


/**
 * @type {number}
 */
THREE.InterleavedBuffer.prototype.length;


/**
 * @type {number}
 */
THREE.InterleavedBuffer.prototype.count;


/**
 * @type {boolean}
 */
THREE.InterleavedBuffer.prototype.needsUpdate;


/**
 * @param {boolean} dynamic
 * @return {THREE.InterleavedBuffer}
 */
THREE.InterleavedBuffer.prototype.setDynamic = function(dynamic) {};


/**
 * @return {(THREE.InterleavedBuffer|THREE.InterleavedBuffer)}
 */
THREE.InterleavedBuffer.prototype.clone = function() {};


/**
 * @param {THREE.InterleavedBuffer} source
 * @return {THREE.InterleavedBuffer}
 */
THREE.InterleavedBuffer.prototype.copy = function(source) {};


/**
 * @param {number} index1
 * @param {THREE.InterleavedBufferAttribute} attribute
 * @param {number} index2
 * @return {THREE.InterleavedBuffer}
 */
THREE.InterleavedBuffer.prototype.copyAt = function(index1, attribute, index2) {};


/**
 * @param {THREE.ArrayLike} value
 * @param {number} index
 * @return {THREE.InterleavedBuffer}
 */
THREE.InterleavedBuffer.prototype.set = function(value, index) {};


/**
 * @constructor
 * @extends {THREE.InterleavedBuffer}
 * @param {THREE.ArrayLike} array
 * @param {number} stride
 * @param {number=} opt_meshPerAttribute
 */
THREE.InstancedInterleavedBuffer = function(array, stride, opt_meshPerAttribute) {};


/**
 * @type {number}
 */
THREE.InstancedInterleavedBuffer.prototype.meshPerAttribute;


/**
 * @return {THREE.InstancedInterleavedBuffer}
 */
THREE.InstancedInterleavedBuffer.prototype.clone = function() {};


/**
 * @param {THREE.InstancedInterleavedBuffer} source
 * @return {THREE.InstancedInterleavedBuffer}
 */
THREE.InstancedInterleavedBuffer.prototype.copy = function(source) {};


/**
 * @constructor
 * @param {THREE.InterleavedBuffer} interleavedBuffer
 * @param {number} itemSize
 * @param {number} offset
 * @param {boolean} normalized
 */
THREE.InterleavedBufferAttribute = function(interleavedBuffer, itemSize, offset, normalized) {};


/**
 * @type {string}
 */
THREE.InterleavedBufferAttribute.prototype.uuid;


/**
 * @type {THREE.InterleavedBuffer}
 */
THREE.InterleavedBufferAttribute.prototype.data;


/**
 * @type {number}
 */
THREE.InterleavedBufferAttribute.prototype.itemSize;


/**
 * @type {number}
 */
THREE.InterleavedBufferAttribute.prototype.offset;


/**
 * @type {number}
 */
THREE.InterleavedBufferAttribute.prototype.count;


/**
 * @type {boolean}
 */
THREE.InterleavedBufferAttribute.prototype.normalized;


/**
 * @type {Array<*>}
 */
THREE.InterleavedBufferAttribute.prototype.array;


/**
 * @param {number} index
 * @return {number}
 */
THREE.InterleavedBufferAttribute.prototype.getX = function(index) {};


/**
 * @param {number} index
 * @param {number} x
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setX = function(index, x) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.InterleavedBufferAttribute.prototype.getY = function(index) {};


/**
 * @param {number} index
 * @param {number} y
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setY = function(index, y) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.InterleavedBufferAttribute.prototype.getZ = function(index) {};


/**
 * @param {number} index
 * @param {number} z
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setZ = function(index, z) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.InterleavedBufferAttribute.prototype.getW = function(index) {};


/**
 * @param {number} index
 * @param {number} z
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setW = function(index, z) {};


/**
 * @param {number} index
 * @param {number} x
 * @param {number} y
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setXY = function(index, x, y) {};


/**
 * @param {number} index
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setXYZ = function(index, x, y, z) {};


/**
 * @param {number} index
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @return {THREE.InterleavedBufferAttribute}
 */
THREE.InterleavedBufferAttribute.prototype.setXYZW = function(index, x, y, z, w) {};


/**
 * @type {number}
 */
THREE.InterleavedBufferAttribute.prototype.length;


/**
 * @type {number}
 */
THREE.Object3DIdCount;


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 */
THREE.Object3D = function() {};


/**
 * @type {number}
 */
THREE.Object3D.prototype.id;


/**
 * @type {string}
 */
THREE.Object3D.prototype.uuid;


/**
 * @type {string}
 */
THREE.Object3D.prototype.name;


/**
 * @type {string}
 */
THREE.Object3D.prototype.type;


/**
 * @type {THREE.Object3D}
 */
THREE.Object3D.prototype.parent;


/**
 * @type {Array<THREE.Object3D>}
 */
THREE.Object3D.prototype.children;


/**
 * @type {THREE.Vector3}
 */
THREE.Object3D.prototype.up;


/**
 * @type {THREE.Vector3}
 */
THREE.Object3D.prototype.position;


/**
 * @type {THREE.Euler}
 */
THREE.Object3D.prototype.rotation;


/**
 * @type {THREE.Quaternion}
 */
THREE.Object3D.prototype.quaternion;


/**
 * @type {THREE.Vector3}
 */
THREE.Object3D.prototype.scale;


/**
 * @type {THREE.Matrix4}
 */
THREE.Object3D.prototype.modelViewMatrix;


/**
 * @type {THREE.Matrix3}
 */
THREE.Object3D.prototype.normalMatrix;


/**
 * @type {THREE.Matrix4}
 */
THREE.Object3D.prototype.matrix;


/**
 * @type {THREE.Matrix4}
 */
THREE.Object3D.prototype.matrixWorld;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.matrixAutoUpdate;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.matrixWorldNeedsUpdate;


/**
 * @type {THREE.Layers}
 */
THREE.Object3D.prototype.layers;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.visible;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.castShadow;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.receiveShadow;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.frustumCulled;


/**
 * @type {number}
 */
THREE.Object3D.prototype.renderOrder;


/**
 * @type {*}
 */
THREE.Object3D.prototype.userData;


/**
 * @type {THREE.Vector3}
 */
THREE.Object3D.prototype.DefaultUp;


/**
 * @type {boolean}
 */
THREE.Object3D.prototype.DefaultMatrixAutoUpdate;


/**
 * @param {THREE.Matrix4} matrix
 */
THREE.Object3D.prototype.applyMatrix = function(matrix) {};


/**
 * @param {THREE.Vector3} axis
 * @param {number} angle
 */
THREE.Object3D.prototype.setRotationFromAxisAngle = function(axis, angle) {};


/**
 * @param {THREE.Euler} euler
 */
THREE.Object3D.prototype.setRotationFromEuler = function(euler) {};


/**
 * @param {THREE.Matrix4} m
 */
THREE.Object3D.prototype.setRotationFromMatrix = function(m) {};


/**
 * @param {THREE.Quaternion} q
 */
THREE.Object3D.prototype.setRotationFromQuaternion = function(q) {};


/**
 * @param {THREE.Vector3} axis
 * @param {number} angle
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.rotateOnAxis = function(axis, angle) {};


/**
 * @param {number} angle
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.rotateX = function(angle) {};


/**
 * @param {number} angle
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.rotateY = function(angle) {};


/**
 * @param {number} angle
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.rotateZ = function(angle) {};


/**
 * @param {THREE.Vector3} axis
 * @param {number} distance
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.translateOnAxis = function(axis, distance) {};


/**
 * @param {number} distance
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.translateX = function(distance) {};


/**
 * @param {number} distance
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.translateY = function(distance) {};


/**
 * @param {number} distance
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.translateZ = function(distance) {};


/**
 * @param {THREE.Vector3} vector
 * @return {THREE.Vector3}
 */
THREE.Object3D.prototype.localToWorld = function(vector) {};


/**
 * @param {THREE.Vector3} vector
 * @return {THREE.Vector3}
 */
THREE.Object3D.prototype.worldToLocal = function(vector) {};


/**
 * @param {THREE.Vector3} vector
 */
THREE.Object3D.prototype.lookAt = function(vector) {};


/**
 * @param {THREE.Object3D} object
 */
THREE.Object3D.prototype.add = function(object) {};


/**
 * @param {THREE.Object3D} object
 */
THREE.Object3D.prototype.remove = function(object) {};


/**
 * @param {number} id
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.getObjectById = function(id) {};


/**
 * @param {string} name
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.getObjectByName = function(name) {};


/**
 * @param {string} name
 * @param {string} value
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.getObjectByProperty = function(name, value) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Object3D.prototype.getWorldPosition = function(opt_optionalTarget) {};


/**
 * @param {THREE.Quaternion=} opt_optionalTarget
 * @return {THREE.Quaternion}
 */
THREE.Object3D.prototype.getWorldQuaternion = function(opt_optionalTarget) {};


/**
 * @param {THREE.Euler=} opt_optionalTarget
 * @return {THREE.Euler}
 */
THREE.Object3D.prototype.getWorldRotation = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Object3D.prototype.getWorldScale = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Object3D.prototype.getWorldDirection = function(opt_optionalTarget) {};


/**
 * @param {THREE.Raycaster} raycaster
 * @param {*} intersects
 */
THREE.Object3D.prototype.raycast = function(raycaster, intersects) {};


/**
 * @param {function(object:THREE.Object3D):*} callback
 */
THREE.Object3D.prototype.traverse = function(callback) {};


/**
 * @param {function(object:THREE.Object3D):*} callback
 */
THREE.Object3D.prototype.traverseVisible = function(callback) {};


/**
 * @param {function(object:THREE.Object3D):*} callback
 */
THREE.Object3D.prototype.traverseAncestors = function(callback) {};


/**

*/
THREE.Object3D.prototype.updateMatrix = function() {};


/**
 * @param {boolean} force
 */
THREE.Object3D.prototype.updateMatrixWorld = function(force) {};


/**
 * @param {{geometries: *, materials: *, textures: *, images: *}} opt_meta
 * @return {*}
 */
THREE.Object3D.prototype.toJSON = function(opt_meta) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.clone = function(opt_recursive) {};


/**
 * @param {THREE.Object3D} source
 * @param {boolean=} opt_recursive
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.copy = function(source, opt_recursive) {};


/**
 * @type {string}
 */
THREE.Object3D.prototype.eulerOrder;


/**
 * @param {string} name
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.getChildByName = function(name) {};


/**
 * @param {number} distance
 * @param {THREE.Vector3} axis
 * @return {THREE.Object3D}
 */
THREE.Object3D.prototype.translate = function(distance, axis) {};


/**
 * @interface
 */
THREE.Intersection = function() {};


/**
 * @interface
 */
THREE.RaycasterParameters = function() {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_origin
 * @param {THREE.Vector3=} opt_direction
 * @param {number=} opt_near
 * @param {number=} opt_far
 */
THREE.Raycaster = function(opt_origin, opt_direction, opt_near, opt_far) {};


/**
 * @type {THREE.Ray}
 */
THREE.Raycaster.prototype.ray;


/**
 * @type {number}
 */
THREE.Raycaster.prototype.near;


/**
 * @type {number}
 */
THREE.Raycaster.prototype.far;


/**
 * @type {THREE.RaycasterParameters}
 */
THREE.Raycaster.prototype.params;


/**
 * @type {number}
 */
THREE.Raycaster.prototype.precision;


/**
 * @type {number}
 */
THREE.Raycaster.prototype.linePrecision;


/**
 * @param {THREE.Vector3} origin
 * @param {THREE.Vector3} direction
 */
THREE.Raycaster.prototype.set = function(origin, direction) {};


/**
 * @param {{x: number, y: number}} coords
 * @param {THREE.Camera} camera
 */
THREE.Raycaster.prototype.setFromCamera = function(coords, camera) {};


/**
 * @param {THREE.Object3D} object
 * @param {boolean=} opt_recursive
 * @return {Array<THREE.Intersection>}
 */
THREE.Raycaster.prototype.intersectObject = function(object, opt_recursive) {};


/**
 * @param {Array<THREE.Object3D>} objects
 * @param {boolean=} opt_recursive
 * @return {Array<THREE.Intersection>}
 */
THREE.Raycaster.prototype.intersectObjects = function(objects, opt_recursive) {};


/**
 * @constructor
 */
THREE.Layers = function() {};


/**
 * @type {number}
 */
THREE.Layers.prototype.mask;


/**
 * @param {number} channel
 */
THREE.Layers.prototype.set = function(channel) {};


/**
 * @param {number} channel
 */
THREE.Layers.prototype.enable = function(channel) {};


/**
 * @param {number} channel
 */
THREE.Layers.prototype.toggle = function(channel) {};


/**
 * @param {number} channel
 */
THREE.Layers.prototype.disable = function(channel) {};


/**
 * @param {THREE.Layers} layers
 * @return {boolean}
 */
THREE.Layers.prototype.test = function(layers) {};


/**
 * @constructor
 * @param {string} jsondata
 */
THREE.Font = function(jsondata) {};


/**
 * @type {string}
 */
THREE.Font.prototype.data;


/**
 * @param {string} text
 * @param {number} size
 * @param {number} divisions
 * @return {Array<*>}
 */
THREE.Font.prototype.generateShapes = function(text, size, divisions) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {(number|string)=} opt_hex
 * @param {number=} opt_intensity
 */
THREE.Light = function(opt_hex, opt_intensity) {};


/**
 * @type {THREE.Color}
 */
THREE.Light.prototype.color;


/**
 * @type {number}
 */
THREE.Light.prototype.intensity;


/**
 * @type {boolean}
 */
THREE.Light.prototype.receiveShadow;


/**
 * @type {THREE.LightShadow}
 */
THREE.Light.prototype.shadow;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraFov;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraLeft;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraRight;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraTop;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraBottom;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraNear;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowCameraFar;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowBias;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowMapWidth;


/**
 * @type {*}
 */
THREE.Light.prototype.shadowMapHeight;


/**
 * @param {THREE.Light} source
 * @return {THREE.Light}
 */
THREE.Light.prototype.copy = function(source) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.Light}
 */
THREE.Light.prototype.clone = function(opt_recursive) {};


/**
 * @constructor
 * @param {THREE.Camera} camera
 */
THREE.LightShadow = function(camera) {};


/**
 * @type {THREE.Camera}
 */
THREE.LightShadow.prototype.camera;


/**
 * @type {number}
 */
THREE.LightShadow.prototype.bias;


/**
 * @type {number}
 */
THREE.LightShadow.prototype.radius;


/**
 * @type {THREE.Vector2}
 */
THREE.LightShadow.prototype.mapSize;


/**
 * @type {THREE.RenderTarget}
 */
THREE.LightShadow.prototype.map;


/**
 * @type {THREE.Matrix4}
 */
THREE.LightShadow.prototype.matrix;


/**
 * @param {THREE.LightShadow} source
 * @return {THREE.LightShadow}
 */
THREE.LightShadow.prototype.copy = function(source) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.LightShadow}
 */
THREE.LightShadow.prototype.clone = function(opt_recursive) {};


/**
 * @constructor
 * @extends {THREE.Light}
 * @param {(number|string)=} opt_hex
 * @param {number=} opt_intensity
 */
THREE.AmbientLight = function(opt_hex, opt_intensity) {};


/**
 * @type {boolean}
 */
THREE.AmbientLight.prototype.castShadow;


/**
 * @param {THREE.AmbientLight} source
 * @return {THREE.AmbientLight}
 */
THREE.AmbientLight.prototype.copy = function(source) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.AmbientLight}
 */
THREE.AmbientLight.prototype.clone = function(opt_recursive) {};


/**
 * @constructor
 * @extends {THREE.Light}
 * @param {(number|string)=} opt_hex
 * @param {number=} opt_intensity
 */
THREE.DirectionalLight = function(opt_hex, opt_intensity) {};


/**
 * @type {THREE.Object3D}
 */
THREE.DirectionalLight.prototype.target;


/**
 * @type {number}
 */
THREE.DirectionalLight.prototype.intensity;


/**
 * @type {THREE.LightShadow}
 */
THREE.DirectionalLight.prototype.shadow;


/**
 * @param {THREE.DirectionalLight} source
 * @return {THREE.DirectionalLight}
 */
THREE.DirectionalLight.prototype.copy = function(source) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.HemisphereLight}
 */
THREE.DirectionalLight.prototype.clone = function(opt_recursive) {};


/**
 * @constructor
 * @extends {THREE.LightShadow}
 */
THREE.DirectionalLightShadow = function() {};


/**
 * @constructor
 * @extends {THREE.Light}
 * @param {(number|string)=} opt_skyColorHex
 * @param {(number|string)=} opt_groundColorHex
 * @param {number=} opt_intensity
 */
THREE.HemisphereLight = function(opt_skyColorHex, opt_groundColorHex, opt_intensity) {};


/**
 * @type {THREE.Color}
 */
THREE.HemisphereLight.prototype.groundColor;


/**
 * @type {number}
 */
THREE.HemisphereLight.prototype.intensity;


/**
 * @param {THREE.HemisphereLight} source
 * @return {THREE.HemisphereLight}
 */
THREE.HemisphereLight.prototype.copy = function(source) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.HemisphereLight}
 */
THREE.HemisphereLight.prototype.clone = function(opt_recursive) {};


/**
 * @constructor
 * @extends {THREE.Light}
 * @param {(number|string)=} opt_hex
 * @param {number=} opt_intensity
 * @param {number=} opt_distance
 * @param {number=} opt_decay
 */
THREE.PointLight = function(opt_hex, opt_intensity, opt_distance, opt_decay) {};


/**
 * @type {number}
 */
THREE.PointLight.prototype.intensity;


/**
 * @type {number}
 */
THREE.PointLight.prototype.distance;


/**
 * @type {number}
 */
THREE.PointLight.prototype.decay;


/**
 * @type {THREE.LightShadow}
 */
THREE.PointLight.prototype.shadow;


/**
 * @type {number}
 */
THREE.PointLight.prototype.power;


/**
 * @param {THREE.PointLight} source
 * @return {THREE.PointLight}
 */
THREE.PointLight.prototype.copy = function(source) {};


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.PointLight}
 */
THREE.PointLight.prototype.clone = function(opt_recursive) {};


/**
 * @constructor
 * @extends {THREE.Light}
 * @param {(number|string)=} opt_hex
 * @param {number=} opt_intensity
 * @param {number=} opt_distance
 * @param {number=} opt_angle
 * @param {number=} opt_exponent
 * @param {number=} opt_decay
 */
THREE.SpotLight = function(opt_hex, opt_intensity, opt_distance, opt_angle, opt_exponent, opt_decay) {};


/**
 * @type {THREE.Object3D}
 */
THREE.SpotLight.prototype.target;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.intensity;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.distance;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.angle;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.exponent;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.decay;


/**
 * @type {THREE.SpotLightShadow}
 */
THREE.SpotLight.prototype.shadow;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.power;


/**
 * @type {number}
 */
THREE.SpotLight.prototype.penumbra;


/**
 * @param {boolean=} opt_recursive
 * @return {THREE.SpotLight}
 */
THREE.SpotLight.prototype.clone = function(opt_recursive) {};


/**
 * @param {THREE.PointLight} source
 * @return {THREE.SpotLight}
 */
THREE.SpotLight.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.LightShadow}
 */
THREE.SpotLightShadow = function() {};


/**
 * @param {THREE.Light} light
 */
THREE.SpotLightShadow.prototype.update = function(light) {};


/**
 * @constructor
 */
THREE.Loader = function() {};


/**
 * @type {function}
 */
THREE.Loader.prototype.onLoadStart;


/**
 * @type {function}
 */
THREE.Loader.prototype.onLoadProgress;


/**
 * @type {function}
 */
THREE.Loader.prototype.onLoadComplete;


/**
 * @type {string}
 */
THREE.Loader.prototype.crossOrigin;


/**
 * @param {string} url
 * @return {string}
 */
THREE.Loader.prototype.extractUrlBase = function(url) {};


/**
 * @param {Array<THREE.Material>} materials
 * @param {string} texturePath
 * @return {Array<THREE.Material>}
 */
THREE.Loader.prototype.initMaterials = function(materials, texturePath) {};


/**
 * @param {THREE.Material} m
 * @param {string} texturePath
 * @param {string=} opt_crossOrigin
 * @return {boolean}
 */
THREE.Loader.prototype.createMaterial = function(m, texturePath, opt_crossOrigin) {};


/**
 * @type {THREE.LoaderHandler}
 */
THREE.Loader.prototype.Handlers;


/**
 * @interface
 */
THREE.LoaderHandler = function() {};


/**
 * @param {THREE.RegExp} regex
 * @param {THREE.Loader} loader
 */
THREE.LoaderHandler.prototype.add = function(regex, loader) {};


/**
 * @param {string} file
 * @return {THREE.Loader}
 */
THREE.LoaderHandler.prototype.get = function(file) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.XHRLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.XHRLoader.prototype.manager;


/**
 * @type {string}
 */
THREE.XHRLoader.prototype.path;


/**
 * @type {string}
 */
THREE.XHRLoader.prototype.responseType;


/**
 * @type {boolean}
 */
THREE.XHRLoader.prototype.withCredentials;


/**
 * @param {string} url
 * @param {function(responseText:string)=} opt_onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 * @return {*}
 */
THREE.XHRLoader.prototype.load = function(url, opt_onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {string} path
 * @return {THREE.XHRLoader}
 */
THREE.XHRLoader.prototype.setPath = function(path) {};


/**
 * @param {string} responseType
 * @return {THREE.XHRLoader}
 */
THREE.XHRLoader.prototype.setResponseType = function(responseType) {};


/**
 * @param {boolean} withCredentials
 * @return {THREE.XHRLoader}
 */
THREE.XHRLoader.prototype.setWithCredentials = function(withCredentials) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.FontLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.FontLoader.prototype.manager;


/**
 * @param {string} url
 * @param {function(responseText:string)=} opt_onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 */
THREE.FontLoader.prototype.load = function(url, opt_onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {string} json
 * @return {THREE.Font}
 */
THREE.FontLoader.prototype.parse = function(json) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.ImageLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.ImageLoader.prototype.manager;


/**
 * @type {string}
 */
THREE.ImageLoader.prototype.crossOrigin;


/**
 * @type {string}
 */
THREE.ImageLoader.prototype.path;


/**
 * @param {string} url
 * @param {function(image:THREE.HTMLImageElement)=} opt_onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 * @return {THREE.HTMLImageElement}
 */
THREE.ImageLoader.prototype.load = function(url, opt_onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {string} crossOrigin
 * @return {THREE.ImageLoader}
 */
THREE.ImageLoader.prototype.setCrossOrigin = function(crossOrigin) {};


/**
 * @param {*} value
 * @return {THREE.ImageLoader}
 */
THREE.ImageLoader.prototype.setPath = function(value) {};


/**
 * @constructor
 * @extends {THREE.Loader}
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.JSONLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.JSONLoader.prototype.manager;


/**
 * @type {boolean}
 */
THREE.JSONLoader.prototype.withCredentials;


/**
 * @param {string} url
 * @param {function(geometry:THREE.Geometry,materials:Array<THREE.Material>)=} opt_onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 */
THREE.JSONLoader.prototype.load = function(url, opt_onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {string} value
 */
THREE.JSONLoader.prototype.setTexturePath = function(value) {};


/**
 * @param {*} json
 * @param {string=} opt_texturePath
 * @return {{geometry: THREE.Geometry, materials: Array<THREE.Material>=}}
 */
THREE.JSONLoader.prototype.parse = function(json, opt_texturePath) {};


/**
 * @constructor
 * @param {function=} opt_onLoad
 * @param {function(url:string,loaded:number,total:number)=} opt_onProgress
 * @param {function=} opt_onError
 */
THREE.LoadingManager = function(opt_onLoad, opt_onProgress, opt_onError) {};


/**
 * @type {function}
 */
THREE.LoadingManager.prototype.onStart;


/**
 * @type {function}
 */
THREE.LoadingManager.prototype.onLoad;


/**
 * @type {function(item:*,loaded:number,total:number)}
 */
THREE.LoadingManager.prototype.onProgress;


/**
 * @type {function}
 */
THREE.LoadingManager.prototype.onError;


/**
 * @param {string} url
 */
THREE.LoadingManager.prototype.itemStart = function(url) {};


/**
 * @param {string} url
 */
THREE.LoadingManager.prototype.itemEnd = function(url) {};


/**
 * @param {string} url
 */
THREE.LoadingManager.prototype.itemError = function(url) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.DefaultLoadingManager;


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.BufferGeometryLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.BufferGeometryLoader.prototype.manager;


/**
 * @param {string} url
 * @param {function(bufferGeometry:THREE.BufferGeometry)} onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 */
THREE.BufferGeometryLoader.prototype.load = function(url, onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {*} json
 * @return {THREE.BufferGeometry}
 */
THREE.BufferGeometryLoader.prototype.parse = function(json) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.MaterialLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.MaterialLoader.prototype.manager;


/**
 * @type {Object<string,THREE.Texture>}
 */
THREE.MaterialLoader.prototype.textures;


/**
 * @param {string} url
 * @param {function(material:THREE.Material)} onLoad
 */
THREE.MaterialLoader.prototype.load = function(url, onLoad) {};


/**
 * @param {Object<string,THREE.Texture>} textures
 */
THREE.MaterialLoader.prototype.setTextures = function(textures) {};


/**
 * @param {string} name
 * @return {THREE.Texture}
 */
THREE.MaterialLoader.prototype.getTexture = function(name) {};


/**
 * @param {*} json
 * @return {THREE.Material}
 */
THREE.MaterialLoader.prototype.parse = function(json) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.ObjectLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.ObjectLoader.prototype.manager;


/**
 * @type {string}
 */
THREE.ObjectLoader.prototype.texturePass;


/**
 * @type {string}
 */
THREE.ObjectLoader.prototype.crossOrigin;


/**
 * @param {string} url
 * @param {function(object:THREE.Object3D)=} opt_onLoad
 */
THREE.ObjectLoader.prototype.load = function(url, opt_onLoad) {};


/**
 * @param {string} value
 */
THREE.ObjectLoader.prototype.setTexturePath = function(value) {};


/**
 * @param {string} crossOrigin
 */
THREE.ObjectLoader.prototype.setCrossOrigin = function(crossOrigin) {};


/**
 * @param {*} json
 * @param {function(object:THREE.Object3D)=} opt_onLoad
 * @return {THREE.T}
 */
THREE.ObjectLoader.prototype.parse = function(json, opt_onLoad) {};


/**
 * @param {*} json
 * @return {Array<*>}
 */
THREE.ObjectLoader.prototype.parseGeometries = function(json) {};


/**
 * @param {*} json
 * @param {Array<THREE.Texture>} textures
 * @return {Array<THREE.Material>}
 */
THREE.ObjectLoader.prototype.parseMaterials = function(json, textures) {};


/**
 * @param {*} json
 * @return {Array<THREE.AnimationClip>}
 */
THREE.ObjectLoader.prototype.parseAnimations = function(json) {};


/**
 * @param {*} json
 * @param {function} onLoad
 * @return {Array<*>}
 */
THREE.ObjectLoader.prototype.parseImages = function(json, onLoad) {};


/**
 * @param {*} json
 * @param {*} images
 * @return {Array<THREE.Texture>}
 */
THREE.ObjectLoader.prototype.parseTextures = function(json, images) {};


/**
 * @param {*} data
 * @param {Array<*>} geometries
 * @param {Array<THREE.Material>} materials
 * @return {THREE.T}
 */
THREE.ObjectLoader.prototype.parseObject = function(data, geometries, materials) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.TextureLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.TextureLoader.prototype.manager;


/**
 * @type {string}
 */
THREE.TextureLoader.prototype.crossOrigin;


/**
 * @type {string}
 */
THREE.TextureLoader.prototype.path;


/**
 * @param {string} url
 * @param {function(texture:THREE.Texture)=} opt_onLoad
 * @return {THREE.Texture}
 */
THREE.TextureLoader.prototype.load = function(url, opt_onLoad) {};


/**
 * @param {string} crossOrigin
 * @return {THREE.TextureLoader}
 */
THREE.TextureLoader.prototype.setCrossOrigin = function(crossOrigin) {};


/**
 * @param {string} path
 * @return {THREE.TextureLoader}
 */
THREE.TextureLoader.prototype.setPath = function(path) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.CubeTextureLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.CubeTextureLoader.prototype.manager;


/**
 * @type {string}
 */
THREE.CubeTextureLoader.prototype.corssOrigin;


/**
 * @type {string}
 */
THREE.CubeTextureLoader.prototype.path;


/**
 * @param {THREE.Array} urls
 * @param {function(texture:THREE.CubeTexture)=} opt_onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 */
THREE.CubeTextureLoader.prototype.load = function(urls, opt_onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {string} crossOrigin
 * @return {THREE.CubeTextureLoader}
 */
THREE.CubeTextureLoader.prototype.setCrossOrigin = function(crossOrigin) {};


/**
 * @param {string} path
 * @return {THREE.CubeTextureLoader}
 */
THREE.CubeTextureLoader.prototype.setPath = function(path) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.BinaryTextureLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.BinaryTextureLoader.prototype.manager;


/**
 * @param {string} url
 * @param {function(dataTexture:THREE.DataTexture)} onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 */
THREE.BinaryTextureLoader.prototype.load = function(url, onLoad, opt_onProgress, opt_onError) {};


/**
 * @constructor
 * @extends {THREE.BinaryTextureLoader}
 */
THREE.DataTextureLoader = function() {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.CompressedTextureLoader = function(opt_manager) {};


/**
 * @type {THREE.LoadingManager}
 */
THREE.CompressedTextureLoader.prototype.manager;


/**
 * @type {string}
 */
THREE.CompressedTextureLoader.prototype.path;


/**
 * @param {string} url
 * @param {function(texture:THREE.CompressedTexture)} onLoad
 * @param {function(event:*)=} opt_onProgress
 * @param {function(event:*)=} opt_onError
 */
THREE.CompressedTextureLoader.prototype.load = function(url, onLoad, opt_onProgress, opt_onError) {};


/**
 * @param {string} path
 * @return {THREE.CompressedTextureLoader}
 */
THREE.CompressedTextureLoader.prototype.setPath = function(path) {};


/**
 * @constructor
 * @param {THREE.LoadingManager=} opt_manager
 */
THREE.AudioLoader = function(opt_manager) {};


/**
 * @param {string} url
 * @param {THREE.Function} onLoad
 * @param {THREE.Function} onPrgress
 * @param {THREE.Function} onError
 */
THREE.AudioLoader.prototype.load = function(url, onLoad, onPrgress, onError) {};


THREE.Cache = {};


/**
 * @type {boolean}
 */
THREE.Cache.enabled;


/**
 * @type {*}
 */
THREE.Cache.files;


/**
 * @param {string} key
 * @param {*} file
 */
THREE.Cache.add = function(key, file) {};


/**
 * @param {string} key
 * @return {*}
 */
THREE.Cache.get = function(key) {};


/**
 * @param {string} key
 */
THREE.Cache.remove = function(key) {};


/**

*/
THREE.Cache.clear = function() {};


/**
 * @type {number}
 */
THREE.MaterialIdCount;


/**
 * @interface
 */
THREE.MaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 */
THREE.Material = function() {};


/**
 * @type {number}
 */
THREE.Material.prototype.id;


/**
 * @type {string}
 */
THREE.Material.prototype.uuid;


/**
 * @type {string}
 */
THREE.Material.prototype.name;


/**
 * @type {string}
 */
THREE.Material.prototype.type;


/**
 * @type {THREE.Side}
 */
THREE.Material.prototype.side;


/**
 * @type {number}
 */
THREE.Material.prototype.opacity;


/**
 * @type {boolean}
 */
THREE.Material.prototype.transparent;


/**
 * @type {THREE.Blending}
 */
THREE.Material.prototype.blending;


/**
 * @type {THREE.BlendingDstFactor}
 */
THREE.Material.prototype.blendSrc;


/**
 * @type {THREE.BlendingSrcFactor}
 */
THREE.Material.prototype.blendDst;


/**
 * @type {THREE.BlendingEquation}
 */
THREE.Material.prototype.blendEquation;


/**
 * @type {number}
 */
THREE.Material.prototype.blendSrcAlpha;


/**
 * @type {number}
 */
THREE.Material.prototype.blendDstAlpha;


/**
 * @type {number}
 */
THREE.Material.prototype.blendEquationAlpha;


/**
 * @type {THREE.DepthModes}
 */
THREE.Material.prototype.depthFunc;


/**
 * @type {boolean}
 */
THREE.Material.prototype.depthTest;


/**
 * @type {boolean}
 */
THREE.Material.prototype.depthWrite;


/**
 * @type {*}
 */
THREE.Material.prototype.clippingPlanes;


/**
 * @type {boolean}
 */
THREE.Material.prototype.clipShadows;


/**
 * @type {boolean}
 */
THREE.Material.prototype.colorWrite;


/**
 * @type {*}
 */
THREE.Material.prototype.precision;


/**
 * @type {boolean}
 */
THREE.Material.prototype.polygonOffset;


/**
 * @type {number}
 */
THREE.Material.prototype.polygonOffsetFactor;


/**
 * @type {number}
 */
THREE.Material.prototype.polygonOffsetUnits;


/**
 * @type {number}
 */
THREE.Material.prototype.alphaTest;


/**
 * @type {boolean}
 */
THREE.Material.prototype.premultipliedAlpha;


/**
 * @type {number}
 */
THREE.Material.prototype.overdraw;


/**
 * @type {boolean}
 */
THREE.Material.prototype.visible;


/**
 * @type {boolean}
 */
THREE.Material.prototype.needsUpdate;


/**
 * @type {boolean}
 */
THREE.Material.prototype.fog;


/**
 * @type {boolean}
 */
THREE.Material.prototype.lights;


/**
 * @type {THREE.Shading}
 */
THREE.Material.prototype.shading;


/**
 * @type {THREE.Colors}
 */
THREE.Material.prototype.vertexColors;


/**
 * @param {THREE.MaterialParameters} parameters
 */
THREE.Material.prototype.setValues = function(parameters) {};


/**
 * @param {*=} opt_meta
 * @return {*}
 */
THREE.Material.prototype.toJSON = function(opt_meta) {};


/**
 * @return {THREE.Material}
 */
THREE.Material.prototype.clone = function() {};


/**
 * @param {THREE.Material} source
 * @return {THREE.Material}
 */
THREE.Material.prototype.copy = function(source) {};


/**

*/
THREE.Material.prototype.update = function() {};


/**

*/
THREE.Material.prototype.dispose = function() {};


/**
 * @type {THREE.Color}
 */
THREE.Material.prototype.warpRGB;


/**
 * @interface
 */
THREE.LineBasicMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.LineBasicMaterialParameters=} opt_parameters
 */
THREE.LineBasicMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.LineBasicMaterial.prototype.color;


/**
 * @type {number}
 */
THREE.LineBasicMaterial.prototype.linewidth;


/**
 * @type {string}
 */
THREE.LineBasicMaterial.prototype.linecap;


/**
 * @type {string}
 */
THREE.LineBasicMaterial.prototype.linejoin;


/**
 * @param {THREE.LineBasicMaterialParameters} parameters
 */
THREE.LineBasicMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.LineBasicMaterial}
 */
THREE.LineBasicMaterial.prototype.clone = function() {};


/**
 * @param {THREE.LineBasicMaterial} source
 * @return {THREE.LineBasicMaterial}
 */
THREE.LineBasicMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.LineDashedMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.LineDashedMaterialParameters=} opt_parameters
 */
THREE.LineDashedMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.LineDashedMaterial.prototype.color;


/**
 * @type {number}
 */
THREE.LineDashedMaterial.prototype.linewidth;


/**
 * @type {number}
 */
THREE.LineDashedMaterial.prototype.scale;


/**
 * @type {number}
 */
THREE.LineDashedMaterial.prototype.dashSize;


/**
 * @type {number}
 */
THREE.LineDashedMaterial.prototype.gapSize;


/**
 * @param {THREE.LineDashedMaterialParameters} parameters
 */
THREE.LineDashedMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.LineDashedMaterial}
 */
THREE.LineDashedMaterial.prototype.clone = function() {};


/**
 * @param {THREE.LineDashedMaterial} source
 * @return {THREE.LineDashedMaterial}
 */
THREE.LineDashedMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshBasicMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.MeshBasicMaterialParameters=} opt_parameters
 */
THREE.MeshBasicMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.MeshBasicMaterial.prototype.color;


/**
 * @type {THREE.Texture}
 */
THREE.MeshBasicMaterial.prototype.map;


/**
 * @type {THREE.Texture}
 */
THREE.MeshBasicMaterial.prototype.aoMap;


/**
 * @type {number}
 */
THREE.MeshBasicMaterial.prototype.aoMapIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshBasicMaterial.prototype.specularMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshBasicMaterial.prototype.alphaMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshBasicMaterial.prototype.envMap;


/**
 * @type {THREE.Combine}
 */
THREE.MeshBasicMaterial.prototype.combine;


/**
 * @type {number}
 */
THREE.MeshBasicMaterial.prototype.reflectivity;


/**
 * @type {number}
 */
THREE.MeshBasicMaterial.prototype.refractionRatio;


/**
 * @type {THREE.Shading}
 */
THREE.MeshBasicMaterial.prototype.shading;


/**
 * @type {boolean}
 */
THREE.MeshBasicMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.MeshBasicMaterial.prototype.wireframeLinewidth;


/**
 * @type {string}
 */
THREE.MeshBasicMaterial.prototype.wireframeLinecap;


/**
 * @type {string}
 */
THREE.MeshBasicMaterial.prototype.wireframeLinejoin;


/**
 * @type {boolean}
 */
THREE.MeshBasicMaterial.prototype.skinning;


/**
 * @type {boolean}
 */
THREE.MeshBasicMaterial.prototype.morphTargets;


/**
 * @param {THREE.MeshBasicMaterialParameters} parameters
 */
THREE.MeshBasicMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.MeshBasicMaterial}
 */
THREE.MeshBasicMaterial.prototype.clone = function() {};


/**
 * @param {THREE.MeshBasicMaterial} source
 * @return {THREE.MeshBasicMaterial}
 */
THREE.MeshBasicMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshDepthMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.MeshDepthMaterialParameters=} opt_parameters
 */
THREE.MeshDepthMaterial = function(opt_parameters) {};


/**
 * @type {boolean}
 */
THREE.MeshDepthMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.MeshDepthMaterial.prototype.wireframeLinewidth;


/**
 * @param {THREE.MeshDepthMaterialParameters} parameters
 */
THREE.MeshDepthMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.MeshDepthMaterial}
 */
THREE.MeshDepthMaterial.prototype.clone = function() {};


/**
 * @param {THREE.MeshDepthMaterial} source
 * @return {THREE.MeshDepthMaterial}
 */
THREE.MeshDepthMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshLambertMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.MeshLambertMaterialParameters=} opt_parameters
 */
THREE.MeshLambertMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.MeshLambertMaterial.prototype.color;


/**
 * @type {(number|string)}
 */
THREE.MeshLambertMaterial.prototype.emissive;


/**
 * @type {number}
 */
THREE.MeshLambertMaterial.prototype.emissiveIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.emissiveMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.map;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.lighhtMap;


/**
 * @type {number}
 */
THREE.MeshLambertMaterial.prototype.lightMapIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.aoMap;


/**
 * @type {number}
 */
THREE.MeshLambertMaterial.prototype.aoMapIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.specularMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.alphaMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshLambertMaterial.prototype.envMap;


/**
 * @type {THREE.Combine}
 */
THREE.MeshLambertMaterial.prototype.combine;


/**
 * @type {number}
 */
THREE.MeshLambertMaterial.prototype.reflectivity;


/**
 * @type {number}
 */
THREE.MeshLambertMaterial.prototype.refractionRatio;


/**
 * @type {boolean}
 */
THREE.MeshLambertMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.MeshLambertMaterial.prototype.wireframeLinewidth;


/**
 * @type {string}
 */
THREE.MeshLambertMaterial.prototype.wireframeLinecap;


/**
 * @type {string}
 */
THREE.MeshLambertMaterial.prototype.wireframeLinejoin;


/**
 * @type {boolean}
 */
THREE.MeshLambertMaterial.prototype.skinning;


/**
 * @type {boolean}
 */
THREE.MeshLambertMaterial.prototype.morphTargets;


/**
 * @type {boolean}
 */
THREE.MeshLambertMaterial.prototype.morphNormals;


/**
 * @param {THREE.MeshLambertMaterialParameters} parameters
 */
THREE.MeshLambertMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.MeshLambertMaterial}
 */
THREE.MeshLambertMaterial.prototype.clone = function() {};


/**
 * @param {THREE.MeshLambertMaterial} source
 * @return {THREE.MeshLambertMaterial}
 */
THREE.MeshLambertMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshStandardMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.MeshStandardMaterialParameters=} opt_parameters
 */
THREE.MeshStandardMaterial = function(opt_parameters) {};


/**
 * @type {*}
 */
THREE.MeshStandardMaterial.prototype.defines;


/**
 * @type {THREE.Color}
 */
THREE.MeshStandardMaterial.prototype.color;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.roughness;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.metalness;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.map;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.lighhtMap;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.lightMapIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.aoMap;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.aoMapIntensity;


/**
 * @type {THREE.Color}
 */
THREE.MeshStandardMaterial.prototype.emissive;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.emissiveIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.emissiveMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.bumpMap;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.bumpScale;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.normalMap;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.normalScale;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.displacementMap;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.displacementScale;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.displacementBias;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.roughnessMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.metalMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.alphaMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshStandardMaterial.prototype.envMap;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.envMapIntensity;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.refractionRatio;


/**
 * @type {boolean}
 */
THREE.MeshStandardMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.MeshStandardMaterial.prototype.wireframeLinewidth;


/**
 * @type {boolean}
 */
THREE.MeshStandardMaterial.prototype.skinning;


/**
 * @type {boolean}
 */
THREE.MeshStandardMaterial.prototype.morphTargets;


/**
 * @type {boolean}
 */
THREE.MeshStandardMaterial.prototype.morphNormals;


/**
 * @param {THREE.MeshStandardMaterialParameters} parameters
 */
THREE.MeshStandardMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.MeshStandardMaterial}
 */
THREE.MeshStandardMaterial.prototype.clone = function() {};


/**
 * @param {THREE.MeshStandardMaterial} source
 * @return {THREE.MeshStandardMaterial}
 */
THREE.MeshStandardMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshNormalMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.MeshNormalMaterialParameters=} opt_parameters
 */
THREE.MeshNormalMaterial = function(opt_parameters) {};


/**
 * @type {boolean}
 */
THREE.MeshNormalMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.MeshNormalMaterial.prototype.wireframeLinewidth;


/**
 * @type {boolean}
 */
THREE.MeshNormalMaterial.prototype.morphTargets;


/**
 * @param {THREE.MeshNormalMaterialParameters} parameters
 */
THREE.MeshNormalMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.MeshNormalMaterial}
 */
THREE.MeshNormalMaterial.prototype.clone = function() {};


/**
 * @param {THREE.MeshNormalMaterial} source
 * @return {THREE.MeshNormalMaterial}
 */
THREE.MeshNormalMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshPhongMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.MeshPhongMaterialParameters=} opt_parameters
 */
THREE.MeshPhongMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.MeshPhongMaterial.prototype.color;


/**
 * @type {THREE.Color}
 */
THREE.MeshPhongMaterial.prototype.specular;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.shininess;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.map;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.lightMap;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.lightMapIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.aoMap;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.aoMapIntensity;


/**
 * @type {THREE.Color}
 */
THREE.MeshPhongMaterial.prototype.emissive;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.emissiveIntensity;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.emissiveMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.bumpMap;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.bumpScale;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.normalMap;


/**
 * @type {THREE.Vector2}
 */
THREE.MeshPhongMaterial.prototype.normalScale;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.displacementMap;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.displacementScale;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.displacementBias;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.specularMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.alphaMap;


/**
 * @type {THREE.Texture}
 */
THREE.MeshPhongMaterial.prototype.envMap;


/**
 * @type {THREE.Combine}
 */
THREE.MeshPhongMaterial.prototype.combine;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.reflectivity;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.refractionRatio;


/**
 * @type {boolean}
 */
THREE.MeshPhongMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.MeshPhongMaterial.prototype.wireframeLinewidth;


/**
 * @type {string}
 */
THREE.MeshPhongMaterial.prototype.wireframeLinecap;


/**
 * @type {string}
 */
THREE.MeshPhongMaterial.prototype.wireframeLinejoin;


/**
 * @type {boolean}
 */
THREE.MeshPhongMaterial.prototype.skinning;


/**
 * @type {boolean}
 */
THREE.MeshPhongMaterial.prototype.morphTargets;


/**
 * @type {boolean}
 */
THREE.MeshPhongMaterial.prototype.morphNormals;


/**
 * @type {boolean}
 */
THREE.MeshPhongMaterial.prototype.metal;


/**
 * @param {THREE.MeshPhongMaterialParameters} parameters
 */
THREE.MeshPhongMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.MeshPhongMaterial}
 */
THREE.MeshPhongMaterial.prototype.clone = function() {};


/**
 * @param {THREE.MeshPhongMaterial} source
 * @return {THREE.MeshPhongMaterial}
 */
THREE.MeshPhongMaterial.prototype.copy = function(source) {};


/**
 * @interface
 */
THREE.MeshPhysicalMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.MeshStandardMaterial}
 * @param {THREE.MeshPhysicalMaterialParameters} parameters
 */
THREE.MeshPhysicalMaterial = function(parameters) {};


/**
 * @type {*}
 */
THREE.MeshPhysicalMaterial.prototype.defines;


/**
 * @type {number}
 */
THREE.MeshPhysicalMaterial.prototype.reflectivity;


/**
 * @type {number}
 */
THREE.MeshPhysicalMaterial.prototype.clearCoat;


/**
 * @type {number}
 */
THREE.MeshPhysicalMaterial.prototype.clearCoatRoughness;


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {Array<THREE.Material>=} opt_materials
 */
THREE.MultiMaterial = function(opt_materials) {};


/**
 * @type {Array<THREE.Material>}
 */
THREE.MultiMaterial.prototype.materials;


/**
 * @param {*} meta
 * @return {*}
 */
THREE.MultiMaterial.prototype.toJSON = function(meta) {};


/**
 * @return {THREE.MultiMaterial}
 */
THREE.MultiMaterial.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.MultiMaterial}
 */
THREE.MeshFaceMaterial = function() {};


/**
 * @interface
 */
THREE.PointsMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.PointsMaterialParameters=} opt_parameters
 */
THREE.PointsMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.PointsMaterial.prototype.color;


/**
 * @type {THREE.Texture}
 */
THREE.PointsMaterial.prototype.map;


/**
 * @type {number}
 */
THREE.PointsMaterial.prototype.size;


/**
 * @type {boolean}
 */
THREE.PointsMaterial.prototype.sizeAttenuation;


/**
 * @param {THREE.PointsMaterialParameters} parameters
 */
THREE.PointsMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.PointsMaterial}
 */
THREE.PointsMaterial.prototype.clone = function() {};


/**
 * @param {THREE.PointsMaterial} source
 * @return {THREE.PointsMaterial}
 */
THREE.PointsMaterial.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.PointsMaterial}
 */
THREE.PointCloudMaterial = function() {};


/**
 * @constructor
 * @extends {THREE.PointsMaterial}
 */
THREE.ParticleBasicMaterial = function() {};


/**
 * @constructor
 * @extends {THREE.PointsMaterial}
 */
THREE.ParticleSystemMaterial = function() {};


/**
 * @interface
 */
THREE.ShaderMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.ShaderMaterialParameters=} opt_parameters
 */
THREE.ShaderMaterial = function(opt_parameters) {};


/**
 * @type {*}
 */
THREE.ShaderMaterial.prototype.defines;


/**
 * @type {*}
 */
THREE.ShaderMaterial.prototype.uniforms;


/**
 * @type {string}
 */
THREE.ShaderMaterial.prototype.vertexShader;


/**
 * @type {string}
 */
THREE.ShaderMaterial.prototype.fragmentShader;


/**
 * @type {number}
 */
THREE.ShaderMaterial.prototype.linewidth;


/**
 * @type {boolean}
 */
THREE.ShaderMaterial.prototype.wireframe;


/**
 * @type {number}
 */
THREE.ShaderMaterial.prototype.wireframeLinewidth;


/**
 * @type {boolean}
 */
THREE.ShaderMaterial.prototype.lights;


/**
 * @type {boolean}
 */
THREE.ShaderMaterial.prototype.clipping;


/**
 * @type {boolean}
 */
THREE.ShaderMaterial.prototype.skinning;


/**
 * @type {boolean}
 */
THREE.ShaderMaterial.prototype.morphTargets;


/**
 * @type {boolean}
 */
THREE.ShaderMaterial.prototype.morphNormals;


/**
 * @type {*}
 */
THREE.ShaderMaterial.prototype.derivatives;


/**
 * @type {{derivatives: boolean, fragDepth: boolean, drawBuffers: boolean, shaderTextureLOD: boolean}}
 */
THREE.ShaderMaterial.prototype.extensions;


/**
 * @type {*}
 */
THREE.ShaderMaterial.prototype.defaultAttributeValues;


/**
 * @type {string}
 */
THREE.ShaderMaterial.prototype.index0AttributeName;


/**
 * @param {THREE.ShaderMaterialParameters} parameters
 */
THREE.ShaderMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.ShaderMaterial}
 */
THREE.ShaderMaterial.prototype.clone = function() {};


/**
 * @param {THREE.ShaderMaterial} source
 * @return {THREE.ShaderMaterial}
 */
THREE.ShaderMaterial.prototype.copy = function(source) {};


/**
 * @param {*} meta
 * @return {*}
 */
THREE.ShaderMaterial.prototype.toJSON = function(meta) {};


/**
 * @constructor
 * @extends {THREE.ShaderMaterial}
 * @param {THREE.ShaderMaterialParameters=} opt_parameters
 */
THREE.RawShaderMaterial = function(opt_parameters) {};


/**
 * @interface
 */
THREE.SpriteMaterialParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Material}
 * @param {THREE.SpriteMaterialParameters=} opt_parameters
 */
THREE.SpriteMaterial = function(opt_parameters) {};


/**
 * @type {THREE.Color}
 */
THREE.SpriteMaterial.prototype.color;


/**
 * @type {THREE.Texture}
 */
THREE.SpriteMaterial.prototype.map;


/**
 * @type {number}
 */
THREE.SpriteMaterial.prototype.rotation;


/**
 * @param {THREE.SpriteMaterialParameters} parameters
 */
THREE.SpriteMaterial.prototype.setValues = function(parameters) {};


/**
 * @return {THREE.SpriteMaterial}
 */
THREE.SpriteMaterial.prototype.clone = function() {};


/**
 * @param {THREE.SpriteMaterial} source
 * @return {THREE.SpriteMaterial}
 */
THREE.SpriteMaterial.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.ShaderMaterial}
 * @param {THREE.ShaderMaterialParameters=} opt_parameters
 */
THREE.ShadowMaterial = function(opt_parameters) {};


/**
 * @constructor
 * @param {THREE.Vector2=} opt_min
 * @param {THREE.Vector2=} opt_max
 */
THREE.Box2 = function(opt_min, opt_max) {};


/**
 * @type {THREE.Vector2}
 */
THREE.Box2.prototype.max;


/**
 * @type {THREE.Vector2}
 */
THREE.Box2.prototype.min;


/**
 * @param {THREE.Vector2} min
 * @param {THREE.Vector2} max
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.set = function(min, max) {};


/**
 * @param {Array<THREE.Vector2>} points
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.setFromPoints = function(points) {};


/**
 * @param {THREE.Vector2} center
 * @param {THREE.Vector2} size
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.setFromCenterAndSize = function(center, size) {};


/**
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.clone = function() {};


/**
 * @param {THREE.Box2} box
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.copy = function(box) {};


/**
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.makeEmpty = function() {};


/**
 * @return {boolean}
 */
THREE.Box2.prototype.isEmpty = function() {};


/**
 * @param {THREE.Vector2=} opt_optionalTarget
 * @return {THREE.Vector2}
 */
THREE.Box2.prototype.center = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector2=} opt_optionalTarget
 * @return {THREE.Vector2}
 */
THREE.Box2.prototype.size = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector2} point
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.expandByPoint = function(point) {};


/**
 * @param {THREE.Vector2} vector
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.expandByVector = function(vector) {};


/**
 * @param {number} scalar
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.expandByScalar = function(scalar) {};


/**
 * @param {THREE.Vector2} point
 * @return {boolean}
 */
THREE.Box2.prototype.containsPoint = function(point) {};


/**
 * @param {THREE.Box2} box
 * @return {boolean}
 */
THREE.Box2.prototype.containsBox = function(box) {};


/**
 * @param {THREE.Vector2} point
 * @return {THREE.Vector2}
 */
THREE.Box2.prototype.getParameter = function(point) {};


/**
 * @param {THREE.Box2} box
 * @return {boolean}
 */
THREE.Box2.prototype.intersectsBox = function(box) {};


/**
 * @param {THREE.Vector2} point
 * @param {THREE.Vector2=} opt_optionalTarget
 * @return {THREE.Vector2}
 */
THREE.Box2.prototype.clampPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Vector2} point
 * @return {number}
 */
THREE.Box2.prototype.distanceToPoint = function(point) {};


/**
 * @param {THREE.Box2} box
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.intersect = function(box) {};


/**
 * @param {THREE.Box2} box
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.union = function(box) {};


/**
 * @param {THREE.Vector2} offset
 * @return {THREE.Box2}
 */
THREE.Box2.prototype.translate = function(offset) {};


/**
 * @param {THREE.Box2} box
 * @return {boolean}
 */
THREE.Box2.prototype.equals = function(box) {};


/**
 * @return {*}
 */
THREE.Box2.prototype.empty = function() {};


/**
 * @param {*} b
 * @return {*}
 */
THREE.Box2.prototype.isIntersectionBox = function(b) {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_min
 * @param {THREE.Vector3=} opt_max
 */
THREE.Box3 = function(opt_min, opt_max) {};


/**
 * @type {THREE.Vector3}
 */
THREE.Box3.prototype.max;


/**
 * @type {THREE.Vector3}
 */
THREE.Box3.prototype.min;


/**
 * @param {THREE.Vector3} min
 * @param {THREE.Vector3} max
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.set = function(min, max) {};


/**
 * @param {THREE.ArrayLike} array
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.setFromArray = function(array) {};


/**
 * @param {Array<THREE.Vector3>} points
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.setFromPoints = function(points) {};


/**
 * @param {THREE.Vector3} center
 * @param {THREE.Vector3} size
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.setFromCenterAndSize = function(center, size) {};


/**
 * @param {THREE.Object3D} object
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.setFromObject = function(object) {};


/**
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.clone = function() {};


/**
 * @param {THREE.Box3} box
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.copy = function(box) {};


/**
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.makeEmpty = function() {};


/**
 * @return {boolean}
 */
THREE.Box3.prototype.isEmpty = function() {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Box3.prototype.center = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Box3.prototype.size = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.expandByPoint = function(point) {};


/**
 * @param {THREE.Vector3} vector
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.expandByVector = function(vector) {};


/**
 * @param {number} scalar
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.expandByScalar = function(scalar) {};


/**
 * @param {THREE.Vector3} point
 * @return {boolean}
 */
THREE.Box3.prototype.containsPoint = function(point) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Box3.prototype.containsBox = function(box) {};


/**
 * @param {THREE.Vector3} point
 * @return {THREE.Vector3}
 */
THREE.Box3.prototype.getParameter = function(point) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Box3.prototype.intersectsBox = function(box) {};


/**
 * @param {THREE.Sphere} sphere
 * @return {boolean}
 */
THREE.Box3.prototype.intersectsSphere = function(sphere) {};


/**
 * @param {THREE.Plane} plane
 * @return {boolean}
 */
THREE.Box3.prototype.intersectsPlane = function(plane) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Box3.prototype.clampPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @return {number}
 */
THREE.Box3.prototype.distanceToPoint = function(point) {};


/**
 * @param {THREE.Sphere=} opt_optionalTarget
 * @return {THREE.Sphere}
 */
THREE.Box3.prototype.getBoundingSphere = function(opt_optionalTarget) {};


/**
 * @param {THREE.Box3} box
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.intersect = function(box) {};


/**
 * @param {THREE.Box3} box
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.union = function(box) {};


/**
 * @param {THREE.Matrix4} matrix
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.applyMatrix4 = function(matrix) {};


/**
 * @param {THREE.Vector3} offset
 * @return {THREE.Box3}
 */
THREE.Box3.prototype.translate = function(offset) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Box3.prototype.equals = function(box) {};


/**
 * @return {*}
 */
THREE.Box3.prototype.empty = function() {};


/**
 * @param {*} b
 * @return {*}
 */
THREE.Box3.prototype.isIntersectionBox = function(b) {};


/**
 * @param {*} s
 * @return {*}
 */
THREE.Box3.prototype.isIntersectionSphere = function(s) {};


/**
 * @interface
 */
THREE.HSL = function() {};


/**
 * @constructor
 * @param {(THREE.Color|string|number|number)=} opt_color
 * @param {number=} opt_g
 * @param {number=} opt_b
 */
THREE.Color = function(opt_color, opt_g, opt_b) {};


/**
 * @type {number}
 */
THREE.Color.prototype.r;


/**
 * @type {number}
 */
THREE.Color.prototype.g;


/**
 * @type {number}
 */
THREE.Color.prototype.b;


/**
 * @param {(THREE.Color|number|string)} color
 * @return {(THREE.Color|THREE.Color|THREE.Color)}
 */
THREE.Color.prototype.set = function(color) {};


/**
 * @param {number} scalar
 * @return {THREE.Color}
 */
THREE.Color.prototype.setScalar = function(scalar) {};


/**
 * @param {number} hex
 * @return {THREE.Color}
 */
THREE.Color.prototype.setHex = function(hex) {};


/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {THREE.Color}
 */
THREE.Color.prototype.setRGB = function(r, g, b) {};


/**
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @return {THREE.Color}
 */
THREE.Color.prototype.setHSL = function(h, s, l) {};


/**
 * @param {string} style
 * @return {THREE.Color}
 */
THREE.Color.prototype.setStyle = function(style) {};


/**
 * @return {THREE.Color}
 */
THREE.Color.prototype.clone = function() {};


/**
 * @param {THREE.Color} color
 * @return {THREE.Color}
 */
THREE.Color.prototype.copy = function(color) {};


/**
 * @param {THREE.Color} color
 * @param {number=} opt_gammaFactor
 * @return {THREE.Color}
 */
THREE.Color.prototype.copyGammaToLinear = function(color, opt_gammaFactor) {};


/**
 * @param {THREE.Color} color
 * @param {number=} opt_gammaFactor
 * @return {THREE.Color}
 */
THREE.Color.prototype.copyLinearToGamma = function(color, opt_gammaFactor) {};


/**
 * @return {THREE.Color}
 */
THREE.Color.prototype.convertGammaToLinear = function() {};


/**
 * @return {THREE.Color}
 */
THREE.Color.prototype.convertLinearToGamma = function() {};


/**
 * @return {number}
 */
THREE.Color.prototype.getHex = function() {};


/**
 * @return {string}
 */
THREE.Color.prototype.getHexString = function() {};


/**
 * @return {THREE.HSL}
 */
THREE.Color.prototype.getHSL = function() {};


/**
 * @return {string}
 */
THREE.Color.prototype.getStyle = function() {};


/**
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @return {THREE.Color}
 */
THREE.Color.prototype.offsetHSL = function(h, s, l) {};


/**
 * @param {THREE.Color} color
 * @return {THREE.Color}
 */
THREE.Color.prototype.add = function(color) {};


/**
 * @param {THREE.Color} color1
 * @param {THREE.Color} color2
 * @return {THREE.Color}
 */
THREE.Color.prototype.addColors = function(color1, color2) {};


/**
 * @param {number} s
 * @return {THREE.Color}
 */
THREE.Color.prototype.addScalar = function(s) {};


/**
 * @param {THREE.Color} color
 * @return {THREE.Color}
 */
THREE.Color.prototype.sub = function(color) {};


/**
 * @param {THREE.Color} color
 * @return {THREE.Color}
 */
THREE.Color.prototype.multiply = function(color) {};


/**
 * @param {number} s
 * @return {THREE.Color}
 */
THREE.Color.prototype.multiplyScalar = function(s) {};


/**
 * @param {THREE.Color} color
 * @param {number} alpha
 * @return {THREE.Color}
 */
THREE.Color.prototype.lerp = function(color, alpha) {};


/**
 * @param {THREE.Color} color
 * @return {boolean}
 */
THREE.Color.prototype.equals = function(color) {};


/**
 * @param {Array<number>} rgb
 * @param {number=} opt_offset
 * @return {THREE.Color}
 */
THREE.Color.prototype.fromArray = function(rgb, opt_offset) {};


/**
 * @param {Array<number>=} opt_array
 * @param {number=} opt_offset
 * @return {Array<number>}
 */
THREE.Color.prototype.toArray = function(opt_array, opt_offset) {};


THREE.ColorKeywords = {};


/**
 * @type {number}
 */
THREE.ColorKeywords.aliceblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.antiquewhite;


/**
 * @type {number}
 */
THREE.ColorKeywords.aqua;


/**
 * @type {number}
 */
THREE.ColorKeywords.aquamarine;


/**
 * @type {number}
 */
THREE.ColorKeywords.azure;


/**
 * @type {number}
 */
THREE.ColorKeywords.beige;


/**
 * @type {number}
 */
THREE.ColorKeywords.bisque;


/**
 * @type {number}
 */
THREE.ColorKeywords.black;


/**
 * @type {number}
 */
THREE.ColorKeywords.blanchedalmond;


/**
 * @type {number}
 */
THREE.ColorKeywords.blue;


/**
 * @type {number}
 */
THREE.ColorKeywords.blueviolet;


/**
 * @type {number}
 */
THREE.ColorKeywords.brown;


/**
 * @type {number}
 */
THREE.ColorKeywords.burlywood;


/**
 * @type {number}
 */
THREE.ColorKeywords.cadetblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.chartreuse;


/**
 * @type {number}
 */
THREE.ColorKeywords.chocolate;


/**
 * @type {number}
 */
THREE.ColorKeywords.coral;


/**
 * @type {number}
 */
THREE.ColorKeywords.cornflowerblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.cornsilk;


/**
 * @type {number}
 */
THREE.ColorKeywords.crimson;


/**
 * @type {number}
 */
THREE.ColorKeywords.cyan;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkcyan;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkgoldenrod;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkgray;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkgreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkgrey;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkkhaki;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkmagenta;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkolivegreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkorange;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkorchid;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkred;


/**
 * @type {number}
 */
THREE.ColorKeywords.darksalmon;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkseagreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkslateblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkslategray;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkslategrey;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkturquoise;


/**
 * @type {number}
 */
THREE.ColorKeywords.darkviolet;


/**
 * @type {number}
 */
THREE.ColorKeywords.deeppink;


/**
 * @type {number}
 */
THREE.ColorKeywords.deepskyblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.dimgray;


/**
 * @type {number}
 */
THREE.ColorKeywords.dimgrey;


/**
 * @type {number}
 */
THREE.ColorKeywords.dodgerblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.firebrick;


/**
 * @type {number}
 */
THREE.ColorKeywords.floralwhite;


/**
 * @type {number}
 */
THREE.ColorKeywords.forestgreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.fuchsia;


/**
 * @type {number}
 */
THREE.ColorKeywords.gainsboro;


/**
 * @type {number}
 */
THREE.ColorKeywords.ghostwhite;


/**
 * @type {number}
 */
THREE.ColorKeywords.gold;


/**
 * @type {number}
 */
THREE.ColorKeywords.goldenrod;


/**
 * @type {number}
 */
THREE.ColorKeywords.gray;


/**
 * @type {number}
 */
THREE.ColorKeywords.green;


/**
 * @type {number}
 */
THREE.ColorKeywords.greenyellow;


/**
 * @type {number}
 */
THREE.ColorKeywords.grey;


/**
 * @type {number}
 */
THREE.ColorKeywords.honeydew;


/**
 * @type {number}
 */
THREE.ColorKeywords.hotpink;


/**
 * @type {number}
 */
THREE.ColorKeywords.indianred;


/**
 * @type {number}
 */
THREE.ColorKeywords.indigo;


/**
 * @type {number}
 */
THREE.ColorKeywords.ivory;


/**
 * @type {number}
 */
THREE.ColorKeywords.khaki;


/**
 * @type {number}
 */
THREE.ColorKeywords.lavender;


/**
 * @type {number}
 */
THREE.ColorKeywords.lavenderblush;


/**
 * @type {number}
 */
THREE.ColorKeywords.lawngreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.lemonchiffon;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightcoral;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightcyan;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightgoldenrodyellow;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightgray;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightgreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightgrey;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightpink;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightsalmon;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightseagreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightskyblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightslategray;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightslategrey;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightsteelblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.lightyellow;


/**
 * @type {number}
 */
THREE.ColorKeywords.lime;


/**
 * @type {number}
 */
THREE.ColorKeywords.limegreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.linen;


/**
 * @type {number}
 */
THREE.ColorKeywords.magenta;


/**
 * @type {number}
 */
THREE.ColorKeywords.maroon;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumaquamarine;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumorchid;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumpurple;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumseagreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumslateblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumspringgreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumturquoise;


/**
 * @type {number}
 */
THREE.ColorKeywords.mediumvioletred;


/**
 * @type {number}
 */
THREE.ColorKeywords.midnightblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.mintcream;


/**
 * @type {number}
 */
THREE.ColorKeywords.mistyrose;


/**
 * @type {number}
 */
THREE.ColorKeywords.moccasin;


/**
 * @type {number}
 */
THREE.ColorKeywords.navajowhite;


/**
 * @type {number}
 */
THREE.ColorKeywords.navy;


/**
 * @type {number}
 */
THREE.ColorKeywords.oldlace;


/**
 * @type {number}
 */
THREE.ColorKeywords.olive;


/**
 * @type {number}
 */
THREE.ColorKeywords.olivedrab;


/**
 * @type {number}
 */
THREE.ColorKeywords.orange;


/**
 * @type {number}
 */
THREE.ColorKeywords.orangered;


/**
 * @type {number}
 */
THREE.ColorKeywords.orchid;


/**
 * @type {number}
 */
THREE.ColorKeywords.palegoldenrod;


/**
 * @type {number}
 */
THREE.ColorKeywords.palegreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.paleturquoise;


/**
 * @type {number}
 */
THREE.ColorKeywords.palevioletred;


/**
 * @type {number}
 */
THREE.ColorKeywords.papayawhip;


/**
 * @type {number}
 */
THREE.ColorKeywords.peachpuff;


/**
 * @type {number}
 */
THREE.ColorKeywords.peru;


/**
 * @type {number}
 */
THREE.ColorKeywords.pink;


/**
 * @type {number}
 */
THREE.ColorKeywords.plum;


/**
 * @type {number}
 */
THREE.ColorKeywords.powderblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.purple;


/**
 * @type {number}
 */
THREE.ColorKeywords.red;


/**
 * @type {number}
 */
THREE.ColorKeywords.rosybrown;


/**
 * @type {number}
 */
THREE.ColorKeywords.royalblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.saddlebrown;


/**
 * @type {number}
 */
THREE.ColorKeywords.salmon;


/**
 * @type {number}
 */
THREE.ColorKeywords.sandybrown;


/**
 * @type {number}
 */
THREE.ColorKeywords.seagreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.seashell;


/**
 * @type {number}
 */
THREE.ColorKeywords.sienna;


/**
 * @type {number}
 */
THREE.ColorKeywords.silver;


/**
 * @type {number}
 */
THREE.ColorKeywords.skyblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.slateblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.slategray;


/**
 * @type {number}
 */
THREE.ColorKeywords.slategrey;


/**
 * @type {number}
 */
THREE.ColorKeywords.snow;


/**
 * @type {number}
 */
THREE.ColorKeywords.springgreen;


/**
 * @type {number}
 */
THREE.ColorKeywords.steelblue;


/**
 * @type {number}
 */
THREE.ColorKeywords.tan;


/**
 * @type {number}
 */
THREE.ColorKeywords.teal;


/**
 * @type {number}
 */
THREE.ColorKeywords.thistle;


/**
 * @type {number}
 */
THREE.ColorKeywords.tomato;


/**
 * @type {number}
 */
THREE.ColorKeywords.turquoise;


/**
 * @type {number}
 */
THREE.ColorKeywords.violet;


/**
 * @type {number}
 */
THREE.ColorKeywords.wheat;


/**
 * @type {number}
 */
THREE.ColorKeywords.white;


/**
 * @type {number}
 */
THREE.ColorKeywords.whitesmoke;


/**
 * @type {number}
 */
THREE.ColorKeywords.yellow;


/**
 * @type {number}
 */
THREE.ColorKeywords.yellowgreen;


/**
 * @constructor
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_z
 * @param {string=} opt_order
 */
THREE.Euler = function(opt_x, opt_y, opt_z, opt_order) {};


/**
 * @type {number}
 */
THREE.Euler.prototype.x;


/**
 * @type {number}
 */
THREE.Euler.prototype.y;


/**
 * @type {number}
 */
THREE.Euler.prototype.z;


/**
 * @type {string}
 */
THREE.Euler.prototype.order;


/**
 * @type {THREE.Function}
 */
THREE.Euler.prototype.onChangeCallback;


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string=} opt_order
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.set = function(x, y, z, opt_order) {};


/**
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.clone = function() {};


/**
 * @param {THREE.Euler} euler
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.copy = function(euler) {};


/**
 * @param {THREE.Matrix4} m
 * @param {string=} opt_order
 * @param {boolean=} opt_update
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.setFromRotationMatrix = function(m, opt_order, opt_update) {};


/**
 * @param {THREE.Quaternion} q
 * @param {string=} opt_order
 * @param {boolean=} opt_update
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.setFromQuaternion = function(q, opt_order, opt_update) {};


/**
 * @param {THREE.Vector3} v
 * @param {string=} opt_order
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.setFromVector3 = function(v, opt_order) {};


/**
 * @param {string} newOrder
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.reorder = function(newOrder) {};


/**
 * @param {THREE.Euler} euler
 * @return {boolean}
 */
THREE.Euler.prototype.equals = function(euler) {};


/**
 * @param {Array<*>} xyzo
 * @return {THREE.Euler}
 */
THREE.Euler.prototype.fromArray = function(xyzo) {};


/**
 * @param {Array<number>=} opt_array
 * @param {number=} opt_offset
 * @return {Array<number>}
 */
THREE.Euler.prototype.toArray = function(opt_array, opt_offset) {};


/**
 * @param {THREE.Vector3=} opt_optionalResult
 * @return {THREE.Vector3}
 */
THREE.Euler.prototype.toVector3 = function(opt_optionalResult) {};


/**
 * @param {THREE.Function} callback
 */
THREE.Euler.prototype.onChange = function(callback) {};


/**
 * @type {Array<string>}
 */
THREE.Euler.prototype.RotationOrders;


/**
 * @type {string}
 */
THREE.Euler.prototype.DefaultOrder;


/**
 * @constructor
 * @param {THREE.Plane=} opt_p0
 * @param {THREE.Plane=} opt_p1
 * @param {THREE.Plane=} opt_p2
 * @param {THREE.Plane=} opt_p3
 * @param {THREE.Plane=} opt_p4
 * @param {THREE.Plane=} opt_p5
 */
THREE.Frustum = function(opt_p0, opt_p1, opt_p2, opt_p3, opt_p4, opt_p5) {};


/**
 * @type {Array<THREE.Plane>}
 */
THREE.Frustum.prototype.planes;


/**
 * @param {number=} opt_p0
 * @param {number=} opt_p1
 * @param {number=} opt_p2
 * @param {number=} opt_p3
 * @param {number=} opt_p4
 * @param {number=} opt_p5
 * @return {THREE.Frustum}
 */
THREE.Frustum.prototype.set = function(opt_p0, opt_p1, opt_p2, opt_p3, opt_p4, opt_p5) {};


/**
 * @return {THREE.Frustum}
 */
THREE.Frustum.prototype.clone = function() {};


/**
 * @param {THREE.Frustum} frustum
 * @return {THREE.Frustum}
 */
THREE.Frustum.prototype.copy = function(frustum) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Frustum}
 */
THREE.Frustum.prototype.setFromMatrix = function(m) {};


/**
 * @param {(THREE.Object3D|THREE.Sprite)} object
 * @return {(boolean|boolean)}
 */
THREE.Frustum.prototype.intersectsObject = function(object) {};


/**
 * @param {THREE.Sphere} sphere
 * @return {boolean}
 */
THREE.Frustum.prototype.intersectsSphere = function(sphere) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Frustum.prototype.intersectsBox = function(box) {};


/**
 * @param {THREE.Vector3} point
 * @return {boolean}
 */
THREE.Frustum.prototype.containsPoint = function(point) {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_start
 * @param {THREE.Vector3=} opt_end
 */
THREE.Line3 = function(opt_start, opt_end) {};


/**
 * @type {THREE.Vector3}
 */
THREE.Line3.prototype.start;


/**
 * @type {THREE.Vector3}
 */
THREE.Line3.prototype.end;


/**
 * @param {THREE.Vector3=} opt_start
 * @param {THREE.Vector3=} opt_end
 * @return {THREE.Line3}
 */
THREE.Line3.prototype.set = function(opt_start, opt_end) {};


/**
 * @return {THREE.Line3}
 */
THREE.Line3.prototype.clone = function() {};


/**
 * @param {THREE.Line3} line
 * @return {THREE.Line3}
 */
THREE.Line3.prototype.copy = function(line) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Line3.prototype.center = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Line3.prototype.delta = function(opt_optionalTarget) {};


/**
 * @return {number}
 */
THREE.Line3.prototype.distanceSq = function() {};


/**
 * @return {number}
 */
THREE.Line3.prototype.distance = function() {};


/**
 * @param {number} t
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Line3.prototype.at = function(t, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @param {boolean=} opt_clampToLine
 * @return {number}
 */
THREE.Line3.prototype.closestPointToPointParameter = function(point, opt_clampToLine) {};


/**
 * @param {THREE.Vector3} point
 * @param {boolean=} opt_clampToLine
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Line3.prototype.closestPointToPoint = function(point, opt_clampToLine, opt_optionalTarget) {};


/**
 * @param {THREE.Matrix4} matrix
 * @return {THREE.Line3}
 */
THREE.Line3.prototype.applyMatrix4 = function(matrix) {};


/**
 * @param {THREE.Line3} line
 * @return {boolean}
 */
THREE.Line3.prototype.equals = function(line) {};


THREE.Math = {};


/**
 * @type {number}
 */
THREE.Math.DEG2RAD;


/**
 * @type {number}
 */
THREE.Math.RAD2DEG;


/**
 * @return {string}
 */
THREE.Math.generateUUID = function() {};


/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
THREE.Math.clamp = function(value, min, max) {};


/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
THREE.Math.euclideanModulo = function(n, m) {};


/**
 * @param {number} x
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 * @return {number}
 */
THREE.Math.mapLinear = function(x, a1, a2, b1, b2) {};


/**
 * @param {number} x
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
THREE.Math.smoothstep = function(x, min, max) {};


/**
 * @param {number} x
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
THREE.Math.smootherstep = function(x, min, max) {};


/**
 * @return {number}
 */
THREE.Math.random16 = function() {};


/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
THREE.Math.randInt = function(low, high) {};


/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
THREE.Math.randFloat = function(low, high) {};


/**
 * @param {number} range
 * @return {number}
 */
THREE.Math.randFloatSpread = function(range) {};


/**
 * @param {number} degrees
 * @return {number}
 */
THREE.Math.degToRad = function(degrees) {};


/**
 * @param {number} radians
 * @return {number}
 */
THREE.Math.radToDeg = function(radians) {};


/**
 * @param {number} value
 * @return {boolean}
 */
THREE.Math.isPowerOfTwo = function(value) {};


/**
 * @param {number} value
 * @return {number}
 */
THREE.Math.nearestPowerOfTwo = function(value) {};


/**
 * @param {number} value
 * @return {number}
 */
THREE.Math.nextPowerOfTwo = function(value) {};


/**
 * @interface
 */
THREE.Matrix = function() {};


/**
 * @return {THREE.Matrix}
 */
THREE.Matrix.prototype.identity = function() {};


/**
 * @param {THREE.Matrix} m
 * @return {THREE.Matrix}
 */
THREE.Matrix.prototype.copy = function(m) {};


/**
 * @param {number} s
 * @return {THREE.Matrix}
 */
THREE.Matrix.prototype.multiplyScalar = function(s) {};


/**
 * @return {number}
 */
THREE.Matrix.prototype.determinant = function() {};


/**
 * @param {THREE.Matrix} matrix
 * @param {boolean=} opt_throwOnInvertible
 * @return {THREE.Matrix}
 */
THREE.Matrix.prototype.getInverse = function(matrix, opt_throwOnInvertible) {};


/**
 * @return {THREE.Matrix}
 */
THREE.Matrix.prototype.transpose = function() {};


/**
 * @return {THREE.Matrix}
 */
THREE.Matrix.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.Matrix}
 */
THREE.Matrix3 = function() {};


/**
 * @type {THREE.Float32Array}
 */
THREE.Matrix3.prototype.elements;


/**
 * @param {number} n11
 * @param {number} n12
 * @param {number} n13
 * @param {number} n21
 * @param {number} n22
 * @param {number} n23
 * @param {number} n31
 * @param {number} n32
 * @param {number} n33
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.set = function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {};


/**
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.identity = function() {};


/**
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.clone = function() {};


/**
 * @param {THREE.Matrix3} m
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.copy = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.setFromMatrix4 = function(m) {};


/**
 * @param {THREE.ArrayLike} array
 * @param {number=} opt_offset
 * @param {number=} opt_length
 * @return {THREE.ArrayLike}
 */
THREE.Matrix3.prototype.applyToVector3Array = function(array, opt_offset, opt_length) {};


/**
 * @param {THREE.BufferAttribute} buffer
 * @param {number=} opt_offset
 * @param {number=} opt_length
 * @return {THREE.BufferAttribute}
 */
THREE.Matrix3.prototype.applyToBuffer = function(buffer, opt_offset, opt_length) {};


/**
 * @param {number} s
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.multiplyScalar = function(s) {};


/**
 * @return {number}
 */
THREE.Matrix3.prototype.determinant = function() {};


/**
 * @param {(THREE.Matrix3|THREE.Matrix4)} matrix
 * @param {(boolean|boolean)=} opt_throwOnDegenerate
 * @return {(THREE.Matrix3|THREE.Matrix3)}
 */
THREE.Matrix3.prototype.getInverse = function(matrix, opt_throwOnDegenerate) {};


/**
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.transpose = function() {};


/**
 * @param {THREE.Matrix4} matrix4
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.getNormalMatrix = function(matrix4) {};


/**
 * @param {Array<number>} r
 * @return {Array<number>}
 */
THREE.Matrix3.prototype.transposeIntoArray = function(r) {};


/**
 * @param {Array<number>} array
 * @return {THREE.Matrix3}
 */
THREE.Matrix3.prototype.fromArray = function(array) {};


/**
 * @return {Array<number>}
 */
THREE.Matrix3.prototype.toArray = function() {};


/**
 * @param {THREE.Vector3} vector
 * @return {*}
 */
THREE.Matrix3.prototype.multiplyVector3 = function(vector) {};


/**
 * @param {*} a
 * @return {*}
 */
THREE.Matrix3.prototype.multiplyVector3Array = function(a) {};


/**
 * @param {Array<number>} array
 * @param {number} offset
 * @return {Array<number>}
 */
THREE.Matrix3.prototype.flattenToArrayOffset = function(array, offset) {};


/**
 * @constructor
 * @extends {THREE.Matrix}
 */
THREE.Matrix4 = function() {};


/**
 * @type {THREE.Float32Array}
 */
THREE.Matrix4.prototype.elements;


/**
 * @param {number} n11
 * @param {number} n12
 * @param {number} n13
 * @param {number} n14
 * @param {number} n21
 * @param {number} n22
 * @param {number} n23
 * @param {number} n24
 * @param {number} n31
 * @param {number} n32
 * @param {number} n33
 * @param {number} n34
 * @param {number} n41
 * @param {number} n42
 * @param {number} n43
 * @param {number} n44
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.set = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {};


/**
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.identity = function() {};


/**
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.clone = function() {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.copy = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.copyPosition = function(m) {};


/**
 * @param {THREE.Vector3} xAxis
 * @param {THREE.Vector3} yAxis
 * @param {THREE.Vector3} zAxis
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.extractBasis = function(xAxis, yAxis, zAxis) {};


/**
 * @param {THREE.Vector3} xAxis
 * @param {THREE.Vector3} yAxis
 * @param {THREE.Vector3} zAxis
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeBasis = function(xAxis, yAxis, zAxis) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.extractRotation = function(m) {};


/**
 * @param {THREE.Euler} euler
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeRotationFromEuler = function(euler) {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeRotationFromQuaternion = function(q) {};


/**
 * @param {THREE.Vector3} eye
 * @param {THREE.Vector3} target
 * @param {THREE.Vector3} up
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.lookAt = function(eye, target, up) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.multiply = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.premultiply = function(m) {};


/**
 * @param {THREE.Matrix4} a
 * @param {THREE.Matrix4} b
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.multiplyMatrices = function(a, b) {};


/**
 * @param {THREE.Matrix4} a
 * @param {THREE.Matrix4} b
 * @param {Array<number>} r
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.multiplyToArray = function(a, b, r) {};


/**
 * @param {number} s
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.multiplyScalar = function(s) {};


/**
 * @param {THREE.ArrayLike} array
 * @param {number=} opt_offset
 * @param {number=} opt_length
 * @return {THREE.ArrayLike}
 */
THREE.Matrix4.prototype.applyToVector3Array = function(array, opt_offset, opt_length) {};


/**
 * @param {THREE.BufferAttribute} buffer
 * @param {number=} opt_offset
 * @param {number=} opt_length
 * @return {THREE.BufferAttribute}
 */
THREE.Matrix4.prototype.applyToBuffer = function(buffer, opt_offset, opt_length) {};


/**
 * @return {number}
 */
THREE.Matrix4.prototype.determinant = function() {};


/**
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.transpose = function() {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.setPosition = function(v) {};


/**
 * @param {THREE.Matrix4} m
 * @param {boolean=} opt_throwOnDegeneratee
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.getInverse = function(m, opt_throwOnDegeneratee) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.scale = function(v) {};


/**
 * @return {number}
 */
THREE.Matrix4.prototype.getMaxScaleOnAxis = function() {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeTranslation = function(x, y, z) {};


/**
 * @param {number} theta
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeRotationX = function(theta) {};


/**
 * @param {number} theta
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeRotationY = function(theta) {};


/**
 * @param {number} theta
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeRotationZ = function(theta) {};


/**
 * @param {THREE.Vector3} axis
 * @param {number} angle
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeRotationAxis = function(axis, angle) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeScale = function(x, y, z) {};


/**
 * @param {THREE.Vector3} translation
 * @param {THREE.Quaternion} rotation
 * @param {THREE.Vector3} scale
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.compose = function(translation, rotation, scale) {};


/**
 * @param {THREE.Vector3=} opt_translation
 * @param {THREE.Quaternion=} opt_rotation
 * @param {THREE.Vector3=} opt_scale
 * @return {Array<Object>}
 */
THREE.Matrix4.prototype.decompose = function(opt_translation, opt_rotation, opt_scale) {};


/**
 * @param {number} left
 * @param {number} right
 * @param {number} bottom
 * @param {number} top
 * @param {number} near
 * @param {number} far
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeFrustum = function(left, right, bottom, top, near, far) {};


/**
 * @param {number} fov
 * @param {number} aspect
 * @param {number} near
 * @param {number} far
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makePerspective = function(fov, aspect, near, far) {};


/**
 * @param {number} left
 * @param {number} right
 * @param {number} top
 * @param {number} bottom
 * @param {number} near
 * @param {number} far
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.makeOrthographic = function(left, right, top, bottom, near, far) {};


/**
 * @param {THREE.Matrix4} matrix
 * @return {boolean}
 */
THREE.Matrix4.prototype.equals = function(matrix) {};


/**
 * @param {Array<number>} array
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.fromArray = function(array) {};


/**
 * @return {Array<number>}
 */
THREE.Matrix4.prototype.toArray = function() {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.extractPosition = function(m) {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Matrix4}
 */
THREE.Matrix4.prototype.setRotationFromQuaternion = function(q) {};


/**
 * @param {*} v
 * @return {*}
 */
THREE.Matrix4.prototype.multiplyVector3 = function(v) {};


/**
 * @param {*} v
 * @return {*}
 */
THREE.Matrix4.prototype.multiplyVector4 = function(v) {};


/**
 * @param {Array<number>} array
 * @return {Array<number>}
 */
THREE.Matrix4.prototype.multiplyVector3Array = function(array) {};


/**
 * @param {*} v
 */
THREE.Matrix4.prototype.rotateAxis = function(v) {};


/**
 * @param {*} v
 */
THREE.Matrix4.prototype.crossVector = function(v) {};


/**
 * @param {Array<number>} array
 * @param {number} offset
 * @return {Array<number>}
 */
THREE.Matrix4.prototype.flattenToArrayOffset = function(array, offset) {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_normal
 * @param {number=} opt_constant
 */
THREE.Plane = function(opt_normal, opt_constant) {};


/**
 * @type {THREE.Vector3}
 */
THREE.Plane.prototype.normal;


/**
 * @type {number}
 */
THREE.Plane.prototype.constant;


/**
 * @param {THREE.Vector3} normal
 * @param {number} constant
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.set = function(normal, constant) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.setComponents = function(x, y, z, w) {};


/**
 * @param {THREE.Vector3} normal
 * @param {THREE.Vector3} point
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.setFromNormalAndCoplanarPoint = function(normal, point) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.setFromCoplanarPoints = function(a, b, c) {};


/**
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.clone = function() {};


/**
 * @param {THREE.Plane} plane
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.copy = function(plane) {};


/**
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.normalize = function() {};


/**
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.negate = function() {};


/**
 * @param {THREE.Vector3} point
 * @return {number}
 */
THREE.Plane.prototype.distanceToPoint = function(point) {};


/**
 * @param {THREE.Sphere} sphere
 * @return {number}
 */
THREE.Plane.prototype.distanceToSphere = function(sphere) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Plane.prototype.projectPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Plane.prototype.orthoPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Line3} line
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Plane.prototype.intersectLine = function(line, opt_optionalTarget) {};


/**
 * @param {THREE.Line3} line
 * @return {boolean}
 */
THREE.Plane.prototype.intersectsLine = function(line) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Plane.prototype.intersectsBox = function(box) {};


/**
 * @param {boolean=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Plane.prototype.coplanarPoint = function(opt_optionalTarget) {};


/**
 * @param {THREE.Matrix4} matrix
 * @param {THREE.Matrix3=} opt_optionalNormalMatrix
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.applyMatrix4 = function(matrix, opt_optionalNormalMatrix) {};


/**
 * @param {THREE.Vector3} offset
 * @return {THREE.Plane}
 */
THREE.Plane.prototype.translate = function(offset) {};


/**
 * @param {THREE.Plane} plane
 * @return {boolean}
 */
THREE.Plane.prototype.equals = function(plane) {};


/**
 * @param {*} l
 * @return {*}
 */
THREE.Plane.prototype.isIntersectionLine = function(l) {};


/**
 * @constructor
 * @param {number=} opt_radius
 * @param {number=} opt_phi
 * @param {number=} opt_theta
 */
THREE.Spherical = function(opt_radius, opt_phi, opt_theta) {};


/**
 * @param {number} radius
 * @param {number} phi
 * @param {number} theta
 * @return {THREE.Spherical}
 */
THREE.Spherical.prototype.set = function(radius, phi, theta) {};


/**
 * @return {THREE.Spherical}
 */
THREE.Spherical.prototype.clone = function() {};


/**
 * @param {THREE.Spherical} other
 * @return {THREE.Spherical}
 */
THREE.Spherical.prototype.copy = function(other) {};


/**

*/
THREE.Spherical.prototype.makeSafe = function() {};


/**
 * @param {THREE.Vector3} vec3
 * @return {THREE.Spherical}
 */
THREE.Spherical.prototype.setFromVector3 = function(vec3) {};


/**
 * @constructor
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_z
 * @param {number=} opt_w
 */
THREE.Quaternion = function(opt_x, opt_y, opt_z, opt_w) {};


/**
 * @param {THREE.Quaternion} qa
 * @param {THREE.Quaternion} qb
 * @param {THREE.Quaternion} qm
 * @param {number} t
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.slerp = function(qa, qb, qm, t) {};


/**
 * @param {Array<number>} dst
 * @param {number} dstOffset
 * @param {Array<number>} src0
 * @param {number} srcOffset
 * @param {Array<number>} src1
 * @param {number} stcOffset1
 * @param {number} t
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.slerpFlat = function(dst, dstOffset, src0, srcOffset, src1, stcOffset1, t) {};


/**
 * @type {number}
 */
THREE.Quaternion.prototype.x;


/**
 * @type {number}
 */
THREE.Quaternion.prototype.y;


/**
 * @type {number}
 */
THREE.Quaternion.prototype.z;


/**
 * @type {number}
 */
THREE.Quaternion.prototype.w;


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.set = function(x, y, z, w) {};


/**
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.clone = function() {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.copy = function(q) {};


/**
 * @param {THREE.Euler} euler
 * @param {boolean=} opt_update
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.setFromEuler = function(euler, opt_update) {};


/**
 * @param {THREE.Vector3} axis
 * @param {number} angle
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.setFromAxisAngle = function(axis, angle) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.setFromRotationMatrix = function(m) {};


/**
 * @param {THREE.Vector3} vFrom
 * @param {THREE.Vector3} vTo
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.setFromUnitVectors = function(vFrom, vTo) {};


/**
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.inverse = function() {};


/**
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.conjugate = function() {};


/**
 * @param {THREE.Vector3} v
 * @return {number}
 */
THREE.Quaternion.prototype.dot = function(v) {};


/**
 * @return {number}
 */
THREE.Quaternion.prototype.lengthSq = function() {};


/**
 * @return {number}
 */
THREE.Quaternion.prototype.length = function() {};


/**
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.normalize = function() {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.multiply = function(q) {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.premultiply = function(q) {};


/**
 * @param {THREE.Quaternion} a
 * @param {THREE.Quaternion} b
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.multiplyQuaternions = function(a, b) {};


/**
 * @param {THREE.Quaternion} qb
 * @param {number} t
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.slerp = function(qb, t) {};


/**
 * @param {THREE.Quaternion} v
 * @return {boolean}
 */
THREE.Quaternion.prototype.equals = function(v) {};


/**
 * @param {(Array<number>|Array<number>)} n
 * @param {number=} opt_offset
 * @return {(THREE.Quaternion|THREE.Quaternion)}
 */
THREE.Quaternion.prototype.fromArray = function(n, opt_offset) {};


/**
 * @param {Array<number>=} opt_xyzw
 * @param {number=} opt_offset
 * @return {(Array<number>|Array<number>)}
 */
THREE.Quaternion.prototype.toArray = function(opt_xyzw, opt_offset) {};


/**
 * @param {THREE.Function} callback
 * @return {THREE.Quaternion}
 */
THREE.Quaternion.prototype.onChange = function(callback) {};


/**
 * @type {THREE.Function}
 */
THREE.Quaternion.prototype.onChangeCallback;


/**
 * @param {*} v
 * @return {*}
 */
THREE.Quaternion.prototype.multiplyVector3 = function(v) {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_origin
 * @param {THREE.Vector3=} opt_direction
 */
THREE.Ray = function(opt_origin, opt_direction) {};


/**
 * @type {THREE.Vector3}
 */
THREE.Ray.prototype.origin;


/**
 * @type {THREE.Vector3}
 */
THREE.Ray.prototype.direction;


/**
 * @param {THREE.Vector3} origin
 * @param {THREE.Vector3} direction
 * @return {THREE.Ray}
 */
THREE.Ray.prototype.set = function(origin, direction) {};


/**
 * @return {THREE.Ray}
 */
THREE.Ray.prototype.clone = function() {};


/**
 * @param {THREE.Ray} ray
 * @return {THREE.Ray}
 */
THREE.Ray.prototype.copy = function(ray) {};


/**
 * @param {number} t
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.at = function(t, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.lookAt = function(v) {};


/**
 * @param {number} t
 * @return {THREE.Ray}
 */
THREE.Ray.prototype.recast = function(t) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.closestPointToPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @return {number}
 */
THREE.Ray.prototype.distanceToPoint = function(point) {};


/**
 * @param {THREE.Vector3} point
 * @return {number}
 */
THREE.Ray.prototype.distanceSqToPoint = function(point) {};


/**
 * @param {THREE.Vector3} v0
 * @param {THREE.Vector3} v1
 * @param {THREE.Vector3=} opt_optionalPointOnRay
 * @param {THREE.Vector3=} opt_optionalPointOnSegment
 * @return {number}
 */
THREE.Ray.prototype.distanceSqToSegment = function(v0, v1, opt_optionalPointOnRay, opt_optionalPointOnSegment) {};


/**
 * @param {THREE.Sphere} sphere
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.intersectSphere = function(sphere, opt_optionalTarget) {};


/**
 * @param {THREE.Sphere} sphere
 * @return {boolean}
 */
THREE.Ray.prototype.intersectsSphere = function(sphere) {};


/**
 * @param {THREE.Plane} plane
 * @return {number}
 */
THREE.Ray.prototype.distanceToPlane = function(plane) {};


/**
 * @param {THREE.Plane} plane
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.intersectPlane = function(plane, opt_optionalTarget) {};


/**
 * @param {THREE.Plane} plane
 * @return {boolean}
 */
THREE.Ray.prototype.intersectsPlane = function(plane) {};


/**
 * @param {THREE.Box3} box
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.intersectBox = function(box, opt_optionalTarget) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Ray.prototype.intersectsBox = function(box) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @param {boolean} backfaceCulling
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Ray.prototype.intersectTriangle = function(a, b, c, backfaceCulling, opt_optionalTarget) {};


/**
 * @param {THREE.Matrix4} matrix4
 * @return {THREE.Ray}
 */
THREE.Ray.prototype.applyMatrix4 = function(matrix4) {};


/**
 * @param {THREE.Ray} ray
 * @return {boolean}
 */
THREE.Ray.prototype.equals = function(ray) {};


/**
 * @param {*} b
 * @return {*}
 */
THREE.Ray.prototype.isIntersectionBox = function(b) {};


/**
 * @param {*} p
 * @return {*}
 */
THREE.Ray.prototype.isIntersectionPlane = function(p) {};


/**
 * @param {*} s
 * @return {*}
 */
THREE.Ray.prototype.isIntersectionSphere = function(s) {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_center
 * @param {number=} opt_radius
 */
THREE.Sphere = function(opt_center, opt_radius) {};


/**
 * @type {THREE.Vector3}
 */
THREE.Sphere.prototype.center;


/**
 * @type {number}
 */
THREE.Sphere.prototype.radius;


/**
 * @param {THREE.Vector3} center
 * @param {number} radius
 * @return {THREE.Sphere}
 */
THREE.Sphere.prototype.set = function(center, radius) {};


/**
 * @param {Array<THREE.Vector3>} points
 * @param {THREE.Vector3=} opt_optionalCenter
 * @return {THREE.Sphere}
 */
THREE.Sphere.prototype.setFromPoints = function(points, opt_optionalCenter) {};


/**
 * @return {THREE.Sphere}
 */
THREE.Sphere.prototype.clone = function() {};


/**
 * @param {THREE.Sphere} sphere
 * @return {THREE.Sphere}
 */
THREE.Sphere.prototype.copy = function(sphere) {};


/**
 * @return {boolean}
 */
THREE.Sphere.prototype.empty = function() {};


/**
 * @param {THREE.Vector3} point
 * @return {boolean}
 */
THREE.Sphere.prototype.containsPoint = function(point) {};


/**
 * @param {THREE.Vector3} point
 * @return {number}
 */
THREE.Sphere.prototype.distanceToPoint = function(point) {};


/**
 * @param {THREE.Sphere} sphere
 * @return {boolean}
 */
THREE.Sphere.prototype.intersectsSphere = function(sphere) {};


/**
 * @param {THREE.Box3} box
 * @return {boolean}
 */
THREE.Sphere.prototype.intersectsBox = function(box) {};


/**
 * @param {THREE.Plane} plane
 * @return {boolean}
 */
THREE.Sphere.prototype.intersectsPlane = function(plane) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Sphere.prototype.clampPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Box3=} opt_optionalTarget
 * @return {THREE.Box3}
 */
THREE.Sphere.prototype.getBoundingBox = function(opt_optionalTarget) {};


/**
 * @param {THREE.Matrix4} matrix
 * @return {THREE.Sphere}
 */
THREE.Sphere.prototype.applyMatrix4 = function(matrix) {};


/**
 * @param {THREE.Vector3} offset
 * @return {THREE.Sphere}
 */
THREE.Sphere.prototype.translate = function(offset) {};


/**
 * @param {THREE.Sphere} sphere
 * @return {boolean}
 */
THREE.Sphere.prototype.equals = function(sphere) {};


/**
 * @interface
 */
THREE.SplineControlPoint = function() {};


/**
 * @constructor
 * @param {Array<THREE.SplineControlPoint>} points
 */
THREE.Spline = function(points) {};


/**
 * @type {Array<THREE.SplineControlPoint>}
 */
THREE.Spline.prototype.points;


/**
 * @param {Array<THREE.number[]>} a
 */
THREE.Spline.prototype.initFromArray = function(a) {};


/**
 * @param {number} k
 * @return {THREE.SplineControlPoint}
 */
THREE.Spline.prototype.getPoint = function(k) {};


/**
 * @return {Array<THREE.number[]>}
 */
THREE.Spline.prototype.getControlPointsArray = function() {};


/**
 * @param {number=} opt_nSubDivisions
 * @return {{chunks: Array<number>, total: number}}
 */
THREE.Spline.prototype.getLength = function(opt_nSubDivisions) {};


/**
 * @param {number} samplingCoef
 */
THREE.Spline.prototype.reparametrizeByArcLength = function(samplingCoef) {};


/**
 * @constructor
 * @param {THREE.Vector3=} opt_a
 * @param {THREE.Vector3=} opt_b
 * @param {THREE.Vector3=} opt_c
 */
THREE.Triangle = function(opt_a, opt_b, opt_c) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Triangle.normal = function(a, b, c, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @param {THREE.Vector3} optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Triangle.barycoordFromPoint = function(point, a, b, c, optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @return {boolean}
 */
THREE.Triangle.containsPoint = function(point, a, b, c) {};


/**
 * @type {THREE.Vector3}
 */
THREE.Triangle.prototype.a;


/**
 * @type {THREE.Vector3}
 */
THREE.Triangle.prototype.b;


/**
 * @type {THREE.Vector3}
 */
THREE.Triangle.prototype.c;


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @param {THREE.Vector3} c
 * @return {THREE.Triangle}
 */
THREE.Triangle.prototype.set = function(a, b, c) {};


/**
 * @param {Array<THREE.Vector3>} points
 * @param {number} i0
 * @param {number} i1
 * @param {number} i2
 * @return {THREE.Triangle}
 */
THREE.Triangle.prototype.setFromPointsAndIndices = function(points, i0, i1, i2) {};


/**
 * @return {THREE.Triangle}
 */
THREE.Triangle.prototype.clone = function() {};


/**
 * @param {THREE.Triangle} triangle
 * @return {THREE.Triangle}
 */
THREE.Triangle.prototype.copy = function(triangle) {};


/**
 * @return {number}
 */
THREE.Triangle.prototype.area = function() {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Triangle.prototype.midpoint = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Triangle.prototype.normal = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Plane}
 */
THREE.Triangle.prototype.plane = function(opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @param {THREE.Vector3=} opt_optionalTarget
 * @return {THREE.Vector3}
 */
THREE.Triangle.prototype.barycoordFromPoint = function(point, opt_optionalTarget) {};


/**
 * @param {THREE.Vector3} point
 * @return {boolean}
 */
THREE.Triangle.prototype.containsPoint = function(point) {};


/**
 * @return {THREE.Vector3}
 */
THREE.Triangle.prototype.closestPointToPoint = function() {};


/**
 * @param {THREE.Triangle} triangle
 * @return {boolean}
 */
THREE.Triangle.prototype.equals = function(triangle) {};


/**
 * @interface
 */
THREE.Vector = function() {};


/**
 * @param {number} index
 * @param {number} value
 */
THREE.Vector.prototype.setComponent = function(index, value) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.Vector.prototype.getComponent = function(index) {};


/**
 * @param {THREE.Vector} v
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.copy = function(v) {};


/**
 * @param {THREE.Vector} v
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.add = function(v) {};


/**
 * @param {THREE.Vector} a
 * @param {THREE.Vector} b
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.addVectors = function(a, b) {};


/**
 * @param {THREE.Vector} v
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.sub = function(v) {};


/**
 * @param {THREE.Vector} a
 * @param {THREE.Vector} b
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.subVectors = function(a, b) {};


/**
 * @param {number} s
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.multiplyScalar = function(s) {};


/**
 * @param {number} s
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.divideScalar = function(s) {};


/**
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.negate = function() {};


/**
 * @param {THREE.Vector} v
 * @return {number}
 */
THREE.Vector.prototype.dot = function(v) {};


/**
 * @return {number}
 */
THREE.Vector.prototype.lengthSq = function() {};


/**
 * @return {number}
 */
THREE.Vector.prototype.length = function() {};


/**
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.normalize = function() {};


/**
 * @param {THREE.Vector} v
 * @return {number=}
 */
THREE.Vector.prototype.distanceTo = function(v) {};


/**
 * @param {THREE.Vector} v
 * @return {number=}
 */
THREE.Vector.prototype.distanceToSquared = function(v) {};


/**
 * @param {number} l
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.setLength = function(l) {};


/**
 * @param {THREE.Vector} v
 * @param {number} alpha
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.lerp = function(v, alpha) {};


/**
 * @param {THREE.Vector} v
 * @return {boolean}
 */
THREE.Vector.prototype.equals = function(v) {};


/**
 * @return {THREE.Vector}
 */
THREE.Vector.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.Vector}
 * @param {number=} opt_x
 * @param {number=} opt_y
 */
THREE.Vector2 = function(opt_x, opt_y) {};


/**
 * @type {number}
 */
THREE.Vector2.prototype.x;


/**
 * @type {number}
 */
THREE.Vector2.prototype.y;


/**
 * @type {number}
 */
THREE.Vector2.prototype.width;


/**
 * @type {number}
 */
THREE.Vector2.prototype.height;


/**
 * @param {number} x
 * @param {number} y
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.set = function(x, y) {};


/**
 * @param {number} scalar
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.setScalar = function(scalar) {};


/**
 * @param {number} x
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.setX = function(x) {};


/**
 * @param {number} y
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.setY = function(y) {};


/**
 * @param {number} index
 * @param {number} value
 */
THREE.Vector2.prototype.setComponent = function(index, value) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.Vector2.prototype.getComponent = function(index) {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.clone = function() {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.copy = function(v) {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.add = function(v) {};


/**
 * @param {number} s
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.addScalar = function(s) {};


/**
 * @param {THREE.Vector2} a
 * @param {THREE.Vector2} b
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.addVectors = function(a, b) {};


/**
 * @param {THREE.Vector2} v
 * @param {number} s
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.addScaledVector = function(v, s) {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.sub = function(v) {};


/**
 * @param {THREE.Vector2} a
 * @param {THREE.Vector2} b
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.subVectors = function(a, b) {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.multiply = function(v) {};


/**
 * @param {number} scalar
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.multiplyScalar = function(scalar) {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.divide = function(v) {};


/**
 * @param {number} s
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.divideScalar = function(s) {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.min = function(v) {};


/**
 * @param {THREE.Vector2} v
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.max = function(v) {};


/**
 * @param {THREE.Vector2} min
 * @param {THREE.Vector2} max
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.clamp = function(min, max) {};


/**
 * @param {number} min
 * @param {number} max
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.clampScalar = function(min, max) {};


/**
 * @param {number} min
 * @param {number} max
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.clampLength = function(min, max) {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.floor = function() {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.ceil = function() {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.round = function() {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.roundToZero = function() {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.negate = function() {};


/**
 * @param {THREE.Vector2} v
 * @return {number}
 */
THREE.Vector2.prototype.dot = function(v) {};


/**
 * @return {number}
 */
THREE.Vector2.prototype.lengthSq = function() {};


/**
 * @return {number}
 */
THREE.Vector2.prototype.length = function() {};


/**
 * @return {number}
 */
THREE.Vector2.prototype.lengthManhattan = function() {};


/**
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.normalize = function() {};


/**
 * @return {number}
 */
THREE.Vector2.prototype.angle = function() {};


/**
 * @param {THREE.Vector2} v
 * @return {number}
 */
THREE.Vector2.prototype.distanceTo = function(v) {};


/**
 * @param {THREE.Vector2} v
 * @return {number}
 */
THREE.Vector2.prototype.distanceToSquared = function(v) {};


/**
 * @param {THREE.Vector2} v
 * @return {number}
 */
THREE.Vector2.prototype.distanceToManhattan = function(v) {};


/**
 * @param {number} length
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.setLength = function(length) {};


/**
 * @param {THREE.Vector2} v
 * @param {number} alpha
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.lerp = function(v, alpha) {};


/**
 * @param {THREE.Vector2} v1
 * @param {THREE.Vector2} v2
 * @param {number} alpha
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.lerpVectors = function(v1, v2, alpha) {};


/**
 * @param {THREE.Vector2} v
 * @return {boolean}
 */
THREE.Vector2.prototype.equals = function(v) {};


/**
 * @param {Array<number>} xy
 * @param {number=} opt_offset
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.fromArray = function(xy, opt_offset) {};


/**
 * @param {Array<number>=} opt_xy
 * @param {number=} opt_offset
 * @return {Array<number>}
 */
THREE.Vector2.prototype.toArray = function(opt_xy, opt_offset) {};


/**
 * @param {THREE.BufferAttribute} attribute
 * @param {number} index
 * @param {number=} opt_offset
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.fromAttribute = function(attribute, index, opt_offset) {};


/**
 * @param {THREE.Vector2} center
 * @param {number} angle
 * @return {THREE.Vector2}
 */
THREE.Vector2.prototype.rotateAround = function(center, angle) {};


/**
 * @constructor
 * @extends {THREE.Vector}
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_z
 */
THREE.Vector3 = function(opt_x, opt_y, opt_z) {};


/**
 * @type {number}
 */
THREE.Vector3.prototype.x;


/**
 * @type {number}
 */
THREE.Vector3.prototype.y;


/**
 * @type {number}
 */
THREE.Vector3.prototype.z;


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.set = function(x, y, z) {};


/**
 * @param {number} scalar
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setScalar = function(scalar) {};


/**
 * @param {number} x
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setX = function(x) {};


/**
 * @param {number} y
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setY = function(y) {};


/**
 * @param {number} z
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setZ = function(z) {};


/**
 * @param {number} index
 * @param {number} value
 */
THREE.Vector3.prototype.setComponent = function(index, value) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.Vector3.prototype.getComponent = function(index) {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.clone = function() {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.copy = function(v) {};


/**
 * @param {THREE.Vector3} a
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.add = function(a) {};


/**
 * @param {number} s
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.addScalar = function(s) {};


/**
 * @param {THREE.Vector3} v
 * @param {number} s
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.addScaledVector = function(v, s) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.addVectors = function(a, b) {};


/**
 * @param {THREE.Vector3} a
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.sub = function(a) {};


/**
 * @param {number} s
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.subScalar = function(s) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.subVectors = function(a, b) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.multiply = function(v) {};


/**
 * @param {number} s
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.multiplyScalar = function(s) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.multiplyVectors = function(a, b) {};


/**
 * @param {THREE.Euler} euler
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.applyEuler = function(euler) {};


/**
 * @param {THREE.Vector3} axis
 * @param {number} angle
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.applyAxisAngle = function(axis, angle) {};


/**
 * @param {THREE.Matrix3} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.applyMatrix3 = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.applyMatrix4 = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.applyProjection = function(m) {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.applyQuaternion = function(q) {};


/**
 * @param {THREE.Camera} camrea
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.project = function(camrea) {};


/**
 * @param {THREE.Camera} camera
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.unproject = function(camera) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.transformDirection = function(m) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.divide = function(v) {};


/**
 * @param {number} s
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.divideScalar = function(s) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.min = function(v) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.max = function(v) {};


/**
 * @param {THREE.Vector3} min
 * @param {THREE.Vector3} max
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.clamp = function(min, max) {};


/**
 * @param {number} min
 * @param {number} max
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.clampScalar = function(min, max) {};


/**
 * @param {number} min
 * @param {number} max
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.clampLength = function(min, max) {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.floor = function() {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.ceil = function() {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.round = function() {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.roundToZero = function() {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.negate = function() {};


/**
 * @param {THREE.Vector3} v
 * @return {number}
 */
THREE.Vector3.prototype.dot = function(v) {};


/**
 * @return {number}
 */
THREE.Vector3.prototype.lengthSq = function() {};


/**
 * @return {number}
 */
THREE.Vector3.prototype.length = function() {};


/**
 * @return {number}
 */
THREE.Vector3.prototype.lengthManhattan = function() {};


/**
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.normalize = function() {};


/**
 * @param {number} l
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setLength = function(l) {};


/**
 * @param {THREE.Vector3} v
 * @param {number} alpha
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.lerp = function(v, alpha) {};


/**
 * @param {THREE.Vector3} v1
 * @param {THREE.Vector3} v2
 * @param {number} alpha
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.lerpVectors = function(v1, v2, alpha) {};


/**
 * @param {THREE.Vector3} a
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.cross = function(a) {};


/**
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.crossVectors = function(a, b) {};


/**
 * @param {THREE.Vector3} v
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.projectOnVector = function(v) {};


/**
 * @param {THREE.Vector3} planeNormal
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.projectOnPlane = function(planeNormal) {};


/**
 * @param {THREE.Vector3} vector
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.reflect = function(vector) {};


/**
 * @param {THREE.Vector3} v
 * @return {number}
 */
THREE.Vector3.prototype.angleTo = function(v) {};


/**
 * @param {THREE.Vector3} v
 * @return {number}
 */
THREE.Vector3.prototype.distanceTo = function(v) {};


/**
 * @param {THREE.Vector3} v
 * @return {number}
 */
THREE.Vector3.prototype.distanceToSquared = function(v) {};


/**
 * @param {THREE.Vector3} v
 * @return {number}
 */
THREE.Vector3.prototype.distanceToManhattan = function(v) {};


/**
 * @param {THREE.Spherical} s
 * @return {THREE.Matrix3}
 */
THREE.Vector3.prototype.setFromSpherical = function(s) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setFromMatrixPosition = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setFromMatrixScale = function(m) {};


/**
 * @param {THREE.Matrix4} matrix
 * @param {number} index
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.setFromMatrixColumn = function(matrix, index) {};


/**
 * @param {THREE.Vector3} v
 * @return {boolean}
 */
THREE.Vector3.prototype.equals = function(v) {};


/**
 * @param {Array<number>} xyz
 * @param {number=} opt_offset
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.fromArray = function(xyz, opt_offset) {};


/**
 * @param {Array<number>=} opt_xyz
 * @param {number=} opt_offset
 * @return {Array<number>}
 */
THREE.Vector3.prototype.toArray = function(opt_xyz, opt_offset) {};


/**
 * @param {THREE.BufferAttribute} attribute
 * @param {number} index
 * @param {number=} opt_offset
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.fromAttribute = function(attribute, index, opt_offset) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.getPositionFromMatrix = function(m) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.getScaleFromMatrix = function(m) {};


/**
 * @param {number} index
 * @param {THREE.Matrix4} matrix
 * @return {THREE.Vector3}
 */
THREE.Vector3.prototype.getColumnFromMatrix = function(index, matrix) {};


/**
 * @constructor
 * @extends {THREE.Vector3}
 */
THREE.Vertex = function() {};


/**
 * @constructor
 * @extends {THREE.Vector}
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_z
 * @param {number=} opt_w
 */
THREE.Vector4 = function(opt_x, opt_y, opt_z, opt_w) {};


/**
 * @type {number}
 */
THREE.Vector4.prototype.x;


/**
 * @type {number}
 */
THREE.Vector4.prototype.y;


/**
 * @type {number}
 */
THREE.Vector4.prototype.z;


/**
 * @type {number}
 */
THREE.Vector4.prototype.w;


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.set = function(x, y, z, w) {};


/**
 * @param {number} scalar
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setScalar = function(scalar) {};


/**
 * @param {number} x
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setX = function(x) {};


/**
 * @param {number} y
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setY = function(y) {};


/**
 * @param {number} z
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setZ = function(z) {};


/**
 * @param {number} w
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setW = function(w) {};


/**
 * @param {number} index
 * @param {number} value
 */
THREE.Vector4.prototype.setComponent = function(index, value) {};


/**
 * @param {number} index
 * @return {number}
 */
THREE.Vector4.prototype.getComponent = function(index) {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.clone = function() {};


/**
 * @param {THREE.Vector4} v
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.copy = function(v) {};


/**
 * @param {THREE.Vector4} v
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.add = function(v) {};


/**
 * @param {number} s
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.addScalar = function(s) {};


/**
 * @param {THREE.Vector4} a
 * @param {THREE.Vector4} b
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.addVectors = function(a, b) {};


/**
 * @param {THREE.Vector4} v
 * @param {number} s
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.addScaledVector = function(v, s) {};


/**
 * @param {THREE.Vector4} v
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.sub = function(v) {};


/**
 * @param {number} s
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.subScalar = function(s) {};


/**
 * @param {THREE.Vector4} a
 * @param {THREE.Vector4} b
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.subVectors = function(a, b) {};


/**
 * @param {number} s
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.multiplyScalar = function(s) {};


/**
 * @param {THREE.Matrix4} m
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.applyMatrix4 = function(m) {};


/**
 * @param {number} s
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.divideScalar = function(s) {};


/**
 * @param {THREE.Quaternion} q
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setAxisAngleFromQuaternion = function(q) {};


/**
 * @param {THREE.Matrix3} m
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setAxisAngleFromRotationMatrix = function(m) {};


/**
 * @param {THREE.Vector4} v
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.min = function(v) {};


/**
 * @param {THREE.Vector4} v
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.max = function(v) {};


/**
 * @param {THREE.Vector4} min
 * @param {THREE.Vector4} max
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.clamp = function(min, max) {};


/**
 * @param {number} min
 * @param {number} max
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.clampScalar = function(min, max) {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.floor = function() {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.ceil = function() {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.round = function() {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.roundToZero = function() {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.negate = function() {};


/**
 * @param {THREE.Vector4} v
 * @return {number}
 */
THREE.Vector4.prototype.dot = function(v) {};


/**
 * @return {number}
 */
THREE.Vector4.prototype.lengthSq = function() {};


/**
 * @return {number}
 */
THREE.Vector4.prototype.length = function() {};


/**
 * @return {number}
 */
THREE.Vector4.prototype.lengthManhattan = function() {};


/**
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.normalize = function() {};


/**
 * @param {number} length
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.setLength = function(length) {};


/**
 * @param {THREE.Vector4} v
 * @param {number} alpha
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.lerp = function(v, alpha) {};


/**
 * @param {THREE.Vector4} v1
 * @param {THREE.Vector4} v2
 * @param {number} alpha
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.lerpVectors = function(v1, v2, alpha) {};


/**
 * @param {THREE.Vector4} v
 * @return {boolean}
 */
THREE.Vector4.prototype.equals = function(v) {};


/**
 * @param {Array<number>} xyzw
 * @param {number=} opt_offset
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.fromArray = function(xyzw, opt_offset) {};


/**
 * @param {Array<number>=} opt_xyzw
 * @param {number=} opt_offset
 * @return {Array<number>}
 */
THREE.Vector4.prototype.toArray = function(opt_xyzw, opt_offset) {};


/**
 * @param {THREE.BufferAttribute} attribute
 * @param {number} index
 * @param {number=} opt_offset
 * @return {THREE.Vector4}
 */
THREE.Vector4.prototype.fromAttribute = function(attribute, index, opt_offset) {};


/**
 * @constructor
 * @param {*} parameterPositions
 * @param {*} samplesValues
 * @param {number} sampleSize
 * @param {*=} opt_resultBuffer
 */
THREE.Interpolant = function(parameterPositions, samplesValues, sampleSize, opt_resultBuffer) {};


/**
 * @type {*}
 */
THREE.Interpolant.prototype.parameterPositions;


/**
 * @type {*}
 */
THREE.Interpolant.prototype.samplesValues;


/**
 * @type {number}
 */
THREE.Interpolant.prototype.valueSize;


/**
 * @type {*}
 */
THREE.Interpolant.prototype.resultBuffer;


/**
 * @param {number} time
 * @return {*}
 */
THREE.Interpolant.prototype.evaluate = function(time) {};


/**
 * @constructor
 * @extends {THREE.Interpolant}
 * @param {*} parameterPositions
 * @param {*} samplesValues
 * @param {number} sampleSize
 * @param {*=} opt_resultBuffer
 */
THREE.CubicInterpolant = function(parameterPositions, samplesValues, sampleSize, opt_resultBuffer) {};


/**
 * @param {number} i1
 * @param {number} t0
 * @param {number} t
 * @param {number} t1
 * @return {*}
 */
THREE.CubicInterpolant.prototype.interpolate_ = function(i1, t0, t, t1) {};


/**
 * @constructor
 * @extends {THREE.Interpolant}
 * @param {*} parameterPositions
 * @param {*} samplesValues
 * @param {number} sampleSize
 * @param {*=} opt_resultBuffer
 */
THREE.DiscreteInterpolant = function(parameterPositions, samplesValues, sampleSize, opt_resultBuffer) {};


/**
 * @param {number} i1
 * @param {number} t0
 * @param {number} t
 * @param {number} t1
 * @return {*}
 */
THREE.DiscreteInterpolant.prototype.interpolate_ = function(i1, t0, t, t1) {};


/**
 * @constructor
 * @extends {THREE.Interpolant}
 * @param {*} parameterPositions
 * @param {*} samplesValues
 * @param {number} sampleSize
 * @param {*=} opt_resultBuffer
 */
THREE.LinearInterpolant = function(parameterPositions, samplesValues, sampleSize, opt_resultBuffer) {};


/**
 * @param {number} i1
 * @param {number} t0
 * @param {number} t
 * @param {number} t1
 * @return {*}
 */
THREE.LinearInterpolant.prototype.interpolate_ = function(i1, t0, t, t1) {};


/**
 * @constructor
 * @extends {THREE.Interpolant}
 * @param {*} parameterPositions
 * @param {*} samplesValues
 * @param {number} sampleSize
 * @param {*=} opt_resultBuffer
 */
THREE.QuaternionLinearInterpolant = function(parameterPositions, samplesValues, sampleSize, opt_resultBuffer) {};


/**
 * @param {number} i1
 * @param {number} t0
 * @param {number} t
 * @param {number} t1
 * @return {*}
 */
THREE.QuaternionLinearInterpolant.prototype.interpolate_ = function(i1, t0, t, t1) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.SkinnedMesh} skin
 */
THREE.Bone = function(skin) {};


/**
 * @type {THREE.SkinnedMesh}
 */
THREE.Bone.prototype.skin;


/**
 * @return {THREE.Bone}
 */
THREE.Bone.prototype.clone = function() {};


/**
 * @param {THREE.Bone} source
 * @return {THREE.Bone}
 */
THREE.Bone.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 */
THREE.Group = function() {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 */
THREE.LOD = function() {};


/**
 * @type {Array<*>}
 */
THREE.LOD.prototype.levels;


/**
 * @param {THREE.Object3D} object
 * @param {number=} opt_distance
 */
THREE.LOD.prototype.addLevel = function(object, opt_distance) {};


/**
 * @param {number} distance
 * @return {THREE.Object3D}
 */
THREE.LOD.prototype.getObjectForDistance = function(distance) {};


/**
 * @param {THREE.Raycaster} raycaster
 * @param {*} intersects
 */
THREE.LOD.prototype.raycast = function(raycaster, intersects) {};


/**
 * @param {THREE.Camera} camera
 */
THREE.LOD.prototype.update = function(camera) {};


/**
 * @return {THREE.LOD}
 */
THREE.LOD.prototype.clone = function() {};


/**
 * @param {THREE.LOD} source
 * @return {THREE.LOD}
 */
THREE.LOD.prototype.copy = function(source) {};


/**
 * @param {*} meta
 * @return {*}
 */
THREE.LOD.prototype.toJSON = function(meta) {};


/**
 * @type {Array<*>}
 */
THREE.LOD.prototype.objects;


/**
 * @interface
 */
THREE.LensFlareProperty = function() {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Texture=} opt_texture
 * @param {number=} opt_size
 * @param {number=} opt_distance
 * @param {THREE.Blending=} opt_blending
 * @param {THREE.Color=} opt_color
 */
THREE.LensFlare = function(opt_texture, opt_size, opt_distance, opt_blending, opt_color) {};


/**
 * @type {Array<THREE.LensFlareProperty>}
 */
THREE.LensFlare.prototype.lensFlares;


/**
 * @type {THREE.Vector3}
 */
THREE.LensFlare.prototype.positionScreen;


/**
 * @type {function(object:THREE.LensFlare)}
 */
THREE.LensFlare.prototype.customUpdateCallback;


/**
 * @param {(THREE.Object3D|THREE.Texture)} object
 * @param {number=} opt_size
 * @param {number=} opt_distance
 * @param {THREE.Blending=} opt_blending
 * @param {THREE.Color=} opt_color
 */
THREE.LensFlare.prototype.add = function(object, opt_size, opt_distance, opt_blending, opt_color) {};


/**

*/
THREE.LensFlare.prototype.updateLensFlares = function() {};


/**
 * @return {THREE.LensFlare}
 */
THREE.LensFlare.prototype.clone = function() {};


/**
 * @param {THREE.LensFlare} source
 * @return {THREE.LensFlare}
 */
THREE.LensFlare.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {(THREE.Geometry |THREE. BufferGeometry)=} opt_geometry
 * @param {(THREE.LineDashedMaterial |THREE. LineBasicMaterial |THREE. ShaderMaterial)=} opt_material
 * @param {number=} opt_mode
 */
THREE.Line = function(opt_geometry, opt_material, opt_mode) {};


/**
 * @type {(THREE.Geometry|THREE.BufferGeometry)}
 */
THREE.Line.prototype.geometry;


/**
 * @type {THREE.Material}
 */
THREE.Line.prototype.material;


/**
 * @param {THREE.Raycaster} raycaster
 * @param {*} intersects
 */
THREE.Line.prototype.raycast = function(raycaster, intersects) {};


/**
 * @return {THREE.Line}
 */
THREE.Line.prototype.clone = function() {};


/**
 * @param {THREE.Line} source
 * @return {THREE.Line}
 */
THREE.Line.prototype.copy = function(source) {};


/**
 * @type {number}
 */
THREE.LineStrip;


/**
 * @type {number}
 */
THREE.LinePieces;


/**
 * @constructor
 * @extends {THREE.Line}
 * @param {(THREE.Geometry |THREE. BufferGeometry)=} opt_geometry
 * @param {(THREE.LineDashedMaterial |THREE. LineBasicMaterial |THREE. ShaderMaterial)=} opt_material
 * @param {number=} opt_mode
 */
THREE.LineSegments = function(opt_geometry, opt_material, opt_mode) {};


/**
 * @return {THREE.LineSegments}
 */
THREE.LineSegments.prototype.clone = function() {};


/**
 * @param {THREE.LineSegments} source
 * @return {THREE.LineSegments}
 */
THREE.LineSegments.prototype.copy = function(source) {};


/**

*/
THREE.LineMode = {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {(THREE.Geometry|THREE.BufferGeometry)=} opt_geometry
 * @param {(THREE.Material|THREE.Material)=} opt_material
 */
THREE.Mesh = function(opt_geometry, opt_material) {};


/**
 * @type {(THREE.Geometry|THREE.BufferGeometry)}
 */
THREE.Mesh.prototype.geometry;


/**
 * @type {THREE.Material}
 */
THREE.Mesh.prototype.material;


/**
 * @type {THREE.TrianglesDrawModes}
 */
THREE.Mesh.prototype.drawMode;


/**
 * @param {THREE.TrianglesDrawModes} drawMode
 */
THREE.Mesh.prototype.setDrawMode = function(drawMode) {};


/**

*/
THREE.Mesh.prototype.updateMorphTargets = function() {};


/**
 * @param {string} name
 * @return {number}
 */
THREE.Mesh.prototype.getMorphTargetIndexByName = function(name) {};


/**
 * @param {THREE.Raycaster} raycaster
 * @param {*} intersects
 */
THREE.Mesh.prototype.raycast = function(raycaster, intersects) {};


/**
 * @return {THREE.Mesh}
 */
THREE.Mesh.prototype.clone = function() {};


/**
 * @param {THREE.Mesh} source
 * @return {THREE.Mesh}
 */
THREE.Mesh.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {(THREE.Geometry |THREE. BufferGeometry)=} opt_geometry
 * @param {THREE.Material=} opt_material
 */
THREE.Points = function(opt_geometry, opt_material) {};


/**
 * @type {(THREE.Geometry |THREE. BufferGeometry)}
 */
THREE.Points.prototype.geometry;


/**
 * @type {THREE.Material}
 */
THREE.Points.prototype.material;


/**
 * @param {THREE.Raycaster} raycaster
 * @param {*} intersects
 */
THREE.Points.prototype.raycast = function(raycaster, intersects) {};


/**
 * @return {THREE.Points}
 */
THREE.Points.prototype.clone = function() {};


/**
 * @param {THREE.Points} source
 * @return {THREE.Points}
 */
THREE.Points.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Points}
 */
THREE.PointCloud = function() {};


/**
 * @constructor
 * @extends {THREE.Points}
 */
THREE.ParticleSystem = function() {};


/**
 * @constructor
 * @param {Array<THREE.Bone>} bones
 * @param {Array<THREE.Matrix4>=} opt_boneInverses
 * @param {boolean=} opt_useVertexTexture
 */
THREE.Skeleton = function(bones, opt_boneInverses, opt_useVertexTexture) {};


/**
 * @type {boolean}
 */
THREE.Skeleton.prototype.useVertexTexture;


/**
 * @type {THREE.Matrix4}
 */
THREE.Skeleton.prototype.identityMatrix;


/**
 * @type {Array<THREE.Bone>}
 */
THREE.Skeleton.prototype.bones;


/**
 * @type {number}
 */
THREE.Skeleton.prototype.boneTextureWidth;


/**
 * @type {number}
 */
THREE.Skeleton.prototype.boneTextureHeight;


/**
 * @type {THREE.Float32Array}
 */
THREE.Skeleton.prototype.boneMatrices;


/**
 * @type {THREE.DataTexture}
 */
THREE.Skeleton.prototype.boneTexture;


/**
 * @type {Array<THREE.Matrix4>}
 */
THREE.Skeleton.prototype.boneInverses;


/**
 * @param {THREE.Bone} bone
 */
THREE.Skeleton.prototype.calculateInverses = function(bone) {};


/**

*/
THREE.Skeleton.prototype.pose = function() {};


/**

*/
THREE.Skeleton.prototype.update = function() {};


/**
 * @return {THREE.Skeleton}
 */
THREE.Skeleton.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.Mesh}
 * @param {(THREE.Geometry|THREE.BufferGeometry|THREE.Geometry,THREE.BufferGeometry|THREE.Geometry,THREE.BufferGeometry|THREE.Geometry,THREE.BufferGeometry|THREE.Geometry,THREE.BufferGeometry|THREE.Geometry,THREE.BufferGeometry|THREE.Geometry,THREE.BufferGeometry)=} opt_geometry
 * @param {(THREE.MeshBasicMaterial|THREE.MeshDepthMaterial|THREE.MultiMaterial|THREE.MeshLambertMaterial|THREE.MeshNormalMaterial|THREE.MeshPhongMaterial|THREE.ShaderMaterial)=} opt_material
 * @param {(boolean|boolean|boolean|boolean|boolean|boolean|boolean)=} opt_useVertexTexture
 */
THREE.SkinnedMesh = function(opt_geometry, opt_material, opt_useVertexTexture) {};


/**
 * @type {string}
 */
THREE.SkinnedMesh.prototype.bindMode;


/**
 * @type {THREE.Matrix4}
 */
THREE.SkinnedMesh.prototype.bindMatrix;


/**
 * @type {THREE.Matrix4}
 */
THREE.SkinnedMesh.prototype.bindMatrixInverse;


/**
 * @type {THREE.Skeleton}
 */
THREE.SkinnedMesh.prototype.skeleton;


/**
 * @param {THREE.Skeleton} skeleton
 * @param {THREE.Matrix4=} opt_bindMatrix
 */
THREE.SkinnedMesh.prototype.bind = function(skeleton, opt_bindMatrix) {};


/**

*/
THREE.SkinnedMesh.prototype.pose = function() {};


/**

*/
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function() {};


/**
 * @param {boolean=} opt_force
 */
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(opt_force) {};


/**
 * @return {THREE.SkinnedMesh}
 */
THREE.SkinnedMesh.prototype.clone = function() {};


/**
 * @param {THREE.SkinnedMesh} source
 * @return {THREE.SkinnedMesh}
 */
THREE.SkinnedMesh.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Material=} opt_material
 */
THREE.Sprite = function(opt_material) {};


/**
 * @type {THREE.BufferGeometry}
 */
THREE.Sprite.prototype.geometry;


/**
 * @type {THREE.SpriteMaterial}
 */
THREE.Sprite.prototype.material;


/**
 * @param {THREE.Raycaster} raycaster
 * @param {*} intersects
 */
THREE.Sprite.prototype.raycast = function(raycaster, intersects) {};


/**
 * @return {THREE.Sprite}
 */
THREE.Sprite.prototype.clone = function() {};


/**
 * @param {THREE.Sprite} source
 * @return {THREE.Sprite}
 */
THREE.Sprite.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Sprite}
 */
THREE.Particle = function() {};


/**
 * @interface
 */
THREE.Renderer = function() {};


/**
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 */
THREE.Renderer.prototype.render = function(scene, camera) {};


/**
 * @param {number} width
 * @param {number} height
 * @param {boolean=} opt_updateStyle
 */
THREE.Renderer.prototype.setSize = function(width, height, opt_updateStyle) {};


/**
 * @interface
 */
THREE.WebGLRendererParameters = function() {};


/**
 * @constructor
 * @extends {THREE.Renderer}
 * @param {THREE.WebGLRendererParameters=} opt_parameters
 */
THREE.WebGLRenderer = function(opt_parameters) {};


/**
 * @type {THREE.HTMLCanvasElement}
 */
THREE.WebGLRenderer.prototype.domElement;


/**
 * @type {THREE.WebGLRenderingContext}
 */
THREE.WebGLRenderer.prototype.context;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.autoClear;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.autoClearColor;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.autoClearDepth;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.autoClearStencil;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.sortObjects;


/**
 * @type {Array<*>}
 */
THREE.WebGLRenderer.prototype.clippingPlanes;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.localClippingEnabled;


/**
 * @type {THREE.WebGLExtensions}
 */
THREE.WebGLRenderer.prototype.extensions;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.gammaInput;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.gammaOutput;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.physicallyCorrectLights;


/**
 * @type {THREE.ToneMapping}
 */
THREE.WebGLRenderer.prototype.toneMapping;


/**
 * @type {number}
 */
THREE.WebGLRenderer.prototype.toneMappingExposure;


/**
 * @type {number}
 */
THREE.WebGLRenderer.prototype.toneMappingWhitePoint;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.shadowMapDebug;


/**
 * @type {number}
 */
THREE.WebGLRenderer.prototype.maxMorphTargets;


/**
 * @type {number}
 */
THREE.WebGLRenderer.prototype.maxMorphNormals;


/**
 * @type {{memory: {geometries: number, textures: number}, render: {calls: number, vertices: number, faces: number, points: number}, programs: number}}
 */
THREE.WebGLRenderer.prototype.info;


/**
 * @type {THREE.WebGLShadowMap}
 */
THREE.WebGLRenderer.prototype.shadowMap;


/**
 * @type {number}
 */
THREE.WebGLRenderer.prototype.pixelRation;


/**
 * @type {THREE.WebGLCapabilities}
 */
THREE.WebGLRenderer.prototype.capabilities;


/**
 * @type {THREE.WebGLProperties}
 */
THREE.WebGLRenderer.prototype.properties;


/**
 * @type {THREE.WebGLState}
 */
THREE.WebGLRenderer.prototype.state;


/**
 * @type {*}
 */
THREE.WebGLRenderer.prototype.allocTextureUnit;


/**
 * @return {THREE.WebGLRenderingContext}
 */
THREE.WebGLRenderer.prototype.getContext = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.getContextAttributes = function() {};


/**

*/
THREE.WebGLRenderer.prototype.forceContextLoss = function() {};


/**
 * @return {number}
 */
THREE.WebGLRenderer.prototype.getMaxAnisotropy = function() {};


/**
 * @return {string}
 */
THREE.WebGLRenderer.prototype.getPrecision = function() {};


/**
 * @return {number}
 */
THREE.WebGLRenderer.prototype.getPixelRatio = function() {};


/**
 * @param {number} value
 */
THREE.WebGLRenderer.prototype.setPixelRatio = function(value) {};


/**
 * @return {{width: number, height: number}}
 */
THREE.WebGLRenderer.prototype.getSize = function() {};


/**
 * @param {number} width
 * @param {number} height
 * @param {boolean=} opt_updateStyle
 */
THREE.WebGLRenderer.prototype.setSize = function(width, height, opt_updateStyle) {};


/**
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_width
 * @param {number=} opt_height
 */
THREE.WebGLRenderer.prototype.setViewport = function(opt_x, opt_y, opt_width, opt_height) {};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
THREE.WebGLRenderer.prototype.setScissor = function(x, y, width, height) {};


/**
 * @param {boolean} enable
 */
THREE.WebGLRenderer.prototype.setScissorTest = function(enable) {};


/**
 * @return {THREE.Color}
 */
THREE.WebGLRenderer.prototype.getClearColor = function() {};


/**
 * @param {(THREE.Color|string|number)} color
 * @param {(number|number|number)=} opt_alpha
 */
THREE.WebGLRenderer.prototype.setClearColor = function(color, opt_alpha) {};


/**
 * @return {number}
 */
THREE.WebGLRenderer.prototype.getClearAlpha = function() {};


/**
 * @param {number} alpha
 */
THREE.WebGLRenderer.prototype.setClearAlpha = function(alpha) {};


/**
 * @param {boolean=} opt_color
 * @param {boolean=} opt_depth
 * @param {boolean=} opt_stencil
 */
THREE.WebGLRenderer.prototype.clear = function(opt_color, opt_depth, opt_stencil) {};


/**

*/
THREE.WebGLRenderer.prototype.clearColor = function() {};


/**

*/
THREE.WebGLRenderer.prototype.clearDepth = function() {};


/**

*/
THREE.WebGLRenderer.prototype.clearStencil = function() {};


/**
 * @param {THREE.WebGLRenderTarget} renderTarget
 * @param {boolean} color
 * @param {boolean} depth
 * @param {boolean} stencil
 */
THREE.WebGLRenderer.prototype.clearTarget = function(renderTarget, color, depth, stencil) {};


/**

*/
THREE.WebGLRenderer.prototype.resetGLState = function() {};


/**

*/
THREE.WebGLRenderer.prototype.dispose = function() {};


/**
 * @param {THREE.Object3D} object
 * @param {THREE.Object} program
 * @param {THREE.Material} material
 */
THREE.WebGLRenderer.prototype.renderBufferImmediate = function(object, program, material) {};


/**
 * @param {THREE.Camera} camera
 * @param {THREE.Fog} fog
 * @param {THREE.Material} material
 * @param {*} geometryGroup
 * @param {THREE.Object3D} object
 */
THREE.WebGLRenderer.prototype.renderBufferDirect = function(camera, fog, material, geometryGroup, object) {};


/**
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {THREE.RenderTarget=} opt_renderTarget
 * @param {boolean=} opt_forceClear
 */
THREE.WebGLRenderer.prototype.render = function(scene, camera, opt_renderTarget, opt_forceClear) {};


/**
 * @param {THREE.CullFace=} opt_cullFace
 * @param {THREE.FrontFaceDirection=} opt_frontFace
 */
THREE.WebGLRenderer.prototype.setFaceCulling = function(opt_cullFace, opt_frontFace) {};


/**
 * @param {THREE.Texture} texture
 * @param {number} slot
 */
THREE.WebGLRenderer.prototype.setTexture = function(texture, slot) {};


/**
 * @param {THREE.Texture} texture
 * @param {number} slot
 */
THREE.WebGLRenderer.prototype.setTexture2D = function(texture, slot) {};


/**
 * @param {THREE.Texture} texture
 * @param {number} slot
 */
THREE.WebGLRenderer.prototype.setTextureCube = function(texture, slot) {};


/**
 * @return {THREE.RenderTarget}
 */
THREE.WebGLRenderer.prototype.getCurrentRenderTarget = function() {};


/**
 * @param {THREE.RenderTarget} renderTarget
 */
THREE.WebGLRenderer.prototype.setRenderTarget = function(renderTarget) {};


/**
 * @param {THREE.RenderTarget} renderTarget
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {*} buffer
 */
THREE.WebGLRenderer.prototype.readRenderTargetPixels = function(renderTarget, x, y, width, height, buffer) {};


/**
 * @type {number}
 */
THREE.WebGLRenderer.prototype.gammaFactor;


/**
 * @type {boolean}
 */
THREE.WebGLRenderer.prototype.shadowMapEnabled;


/**
 * @type {THREE.ShadowMapType}
 */
THREE.WebGLRenderer.prototype.shadowMapType;


/**
 * @type {THREE.CullFace}
 */
THREE.WebGLRenderer.prototype.shadowMapCullFace;


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsFloatTextures = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsHalfFloatTextures = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsStandardDerivatives = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsCompressedTextureS3TC = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsCompressedTexturePVRTC = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsBlendMinMax = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsVertexTextures = function() {};


/**
 * @return {*}
 */
THREE.WebGLRenderer.prototype.supportsInstancedArrays = function() {};


/**
 * @param {*} boolean
 * @return {*}
 */
THREE.WebGLRenderer.prototype.enableScissorTest = function(boolean) {};


/**
 * @interface
 */
THREE.RenderTarget = function() {};


/**
 * @interface
 */
THREE.WebGLRenderTargetOptions = function() {};


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 * @param {number} width
 * @param {number} height
 * @param {THREE.WebGLRenderTargetOptions=} opt_options
 */
THREE.WebGLRenderTarget = function(width, height, opt_options) {};


/**
 * @type {string}
 */
THREE.WebGLRenderTarget.prototype.uuid;


/**
 * @type {number}
 */
THREE.WebGLRenderTarget.prototype.width;


/**
 * @type {number}
 */
THREE.WebGLRenderTarget.prototype.height;


/**
 * @type {THREE.Vector4}
 */
THREE.WebGLRenderTarget.prototype.scissor;


/**
 * @type {boolean}
 */
THREE.WebGLRenderTarget.prototype.scissorTest;


/**
 * @type {THREE.Vector4}
 */
THREE.WebGLRenderTarget.prototype.viewpport;


/**
 * @type {THREE.Texture}
 */
THREE.WebGLRenderTarget.prototype.texture;


/**
 * @type {boolean}
 */
THREE.WebGLRenderTarget.prototype.depthBuffer;


/**
 * @type {boolean}
 */
THREE.WebGLRenderTarget.prototype.stencilBuffer;


/**
 * @type {THREE.Texture}
 */
THREE.WebGLRenderTarget.prototype.depthTexture;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.wrapS;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.wrapT;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.magFilter;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.minFilter;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.anisotropy;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.offset;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.repeat;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.format;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.type;


/**
 * @type {*}
 */
THREE.WebGLRenderTarget.prototype.generateMipmaps;


/**
 * @param {number} width
 * @param {number} height
 */
THREE.WebGLRenderTarget.prototype.setSize = function(width, height) {};


/**
 * @return {THREE.WebGLRenderTarget}
 */
THREE.WebGLRenderTarget.prototype.clone = function() {};


/**
 * @param {THREE.WebGLRenderTarget} source
 * @return {THREE.WebGLRenderTarget}
 */
THREE.WebGLRenderTarget.prototype.copy = function(source) {};


/**

*/
THREE.WebGLRenderTarget.prototype.dispose = function() {};


/**
 * @constructor
 * @extends {THREE.WebGLRenderTarget}
 * @param {number} width
 * @param {number} height
 * @param {THREE.WebGLRenderTargetOptions=} opt_options
 */
THREE.WebGLRenderTargetCube = function(width, height, opt_options) {};


/**
 * @type {number}
 */
THREE.WebGLRenderTargetCube.prototype.activeCubeFace;


/**
 * @type {number}
 */
THREE.WebGLRenderTargetCube.prototype.activeMipMapLevel;


/**
 * @type {Object<string,string>}
 */
THREE.ShaderChunk;


/**
 * @interface
 */
THREE.Shader = function() {};


/**
 * @type {Object<string,THREE.Shader>}
 */
THREE.ShaderLib;


/**
 * @interface
 */
THREE.IUniform = function() {};


/**
 * @type {{common: {diffuse: THREE.IUniform, opacity: THREE.IUniform, map: THREE.IUniform, offsetRepeat: THREE.IUniform, specularMap: THREE.IUniform, alphaMap: THREE.IUniform, envMap: THREE.IUniform, flipEnvMap: THREE.IUniform, reflectivity: THREE.IUniform, refractionRation: THREE.IUniform}, aomap: {aoMap: THREE.IUniform, aoMapIntensity: THREE.IUniform}, lightmap: {lightMap: THREE.IUniform, lightMapIntensity: THREE.IUniform}, emissivemap: {emissiveMap: THREE.IUniform}, bumpmap: {bumpMap: THREE.IUniform, bumpScale: THREE.IUniform}, normalmap: {normalMap: THREE.IUniform, normalScale: THREE.IUniform}, displacementmap: {displacementMap: THREE.IUniform, displacementScale: THREE.IUniform, displacementBias: THREE.IUniform}, roughnessmap: {roughnessMap: THREE.IUniform}, metalnessmap: {metalnessMap: THREE.IUniform}, fog: {fogDensity: THREE.IUniform, fogNear: THREE.IUniform, fogFar: THREE.IUniform, fogColor: THREE.IUniform}, lights: {ambientLightColor: THREE.IUniform, directionalLights: {value: Array<*>, properties: {direction: THREE.{}, color: THREE.{}, shadow: THREE.{}, shadowBias: THREE.{}, shadowRadius: THREE.{}, shadowMapSize: THREE.{}}}, directionalShadowMap: THREE.IUniform, directionalShadowMatrix: THREE.IUniform, spotLights: {value: Array<*>, properties: {color: THREE.{}, position: THREE.{}, direction: THREE.{}, distance: THREE.{}, coneCos: THREE.{}, penumbraCos: THREE.{}, decay: THREE.{}, shadow: THREE.{}, shadowBias: THREE.{}, shadowRadius: THREE.{}, shadowMapSize: THREE.{}}}, spotShadowMap: THREE.IUniform, spotShadowMatrix: THREE.IUniform, pointLights: {value: Array<*>, properties: {color: THREE.{}, position: THREE.{}, decay: THREE.{}, distance: THREE.{}, shadow: THREE.{}, shadowBias: THREE.{}, shadowRadius: THREE.{}, shadowMapSize: THREE.{}}}, pointShadowMap: THREE.IUniform, pointShadowMatrix: THREE.IUniform, hemisphereLigtts: {value: Array<*>, properties: {direction: THREE.{}, skycolor: THREE.{}, groundColor: THREE.{}}}}, points: {diffuse: THREE.IUniform, opacity: THREE.IUniform, size: THREE.IUniform, scale: THREE.IUniform, map: THREE.IUniform, offsetRepeat: THREE.IUniform}}}
 */
THREE.UniformsLib;


THREE.UniformsUtils = {};


/**
 * @param {Array<*>} uniforms
 * @return {*}
 */
THREE.UniformsUtils.merge = function(uniforms) {};


/**
 * @param {*} uniforms_src
 * @return {*}
 */
THREE.UniformsUtils.clone = function(uniforms_src) {};


/**
 * @constructor
 * @param {(*|string)} value1
 * @param {*} value2
 */
THREE.Uniform = function(value1, value2) {};


/**
 * @type {string}
 */
THREE.Uniform.prototype.type;


/**
 * @type {*}
 */
THREE.Uniform.prototype.value;


/**
 * @type {boolean}
 */
THREE.Uniform.prototype.dynamic;


/**
 * @type {THREE.Function}
 */
THREE.Uniform.prototype.onUpdateCallback;


/**
 * @param {THREE.Function} callback
 * @return {THREE.Uniform}
 */
THREE.Uniform.prototype.onUpdate = function(callback) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} _gl
 * @param {*} extensions
 * @param {*} _infoRender
 */
THREE.WebGLBufferRenderer = function(_gl, extensions, _infoRender) {};


/**
 * @param {*} value
 */
THREE.WebGLBufferRenderer.prototype.setMode = function(value) {};


/**
 * @param {*} start
 * @param {number} count
 */
THREE.WebGLBufferRenderer.prototype.render = function(start, count) {};


/**
 * @param {*} geometry
 */
THREE.WebGLBufferRenderer.prototype.renderInstances = function(geometry) {};


/**
 * @constructor
 */
THREE.WebGLClipping = function() {};


/**
 * @type {{value: *, needsUpdate: boolean}}
 */
THREE.WebGLClipping.prototype.uniform;


/**
 * @type {number}
 */
THREE.WebGLClipping.prototype.numPlanes;


/**
 * @param {Array<*>} planes
 * @param {boolean} enableLocalClipping
 * @param {THREE.Camera} camera
 * @return {boolean}
 */
THREE.WebGLClipping.prototype.init = function(planes, enableLocalClipping, camera) {};


/**

*/
THREE.WebGLClipping.prototype.beginShadows = function() {};


/**

*/
THREE.WebGLClipping.prototype.endShadows = function() {};


/**
 * @param {Array<*>} planes
 * @param {boolean} clipShadows
 * @param {THREE.Camera} camera
 * @param {boolean} cache
 * @param {boolean} fromCache
 */
THREE.WebGLClipping.prototype.setState = function(planes, clipShadows, camera, cache, fromCache) {};


/**
 * @interface
 */
THREE.WebGLCapabilitiesParameters = function() {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} gl
 * @param {*} extensions
 * @param {THREE.WebGLCapabilitiesParameters} parameters
 */
THREE.WebGLCapabilities = function(gl, extensions, parameters) {};


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.precision;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.logarithmicDepthBuffer;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxTextures;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxVertexTextures;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxTextureSize;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxCubemapSize;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxAttributes;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxVertexUniforms;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxVaryings;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.maxFragmentUniforms;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.vertexTextures;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.floatFragmentTextures;


/**
 * @type {*}
 */
THREE.WebGLCapabilities.prototype.floatVertexTextures;


/**
 * @return {number}
 */
THREE.WebGLCapabilities.prototype.getMaxAnisotropy = function() {};


/**
 * @param {string} precision
 * @return {string}
 */
THREE.WebGLCapabilities.prototype.getMaxPrecision = function(precision) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} gl
 */
THREE.WebGLExtensions = function(gl) {};


/**
 * @param {string} name
 * @return {*}
 */
THREE.WebGLExtensions.prototype.get = function(name) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} gl
 * @param {*} extensions
 * @param {*} _infoRender
 */
THREE.WebGLGeometries = function(gl, extensions, _infoRender) {};


/**
 * @param {*} object
 * @return {*}
 */
THREE.WebGLGeometries.prototype.get = function(object) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} gl
 * @param {*} properties
 * @param {*} info
 */
THREE.WebGLLights = function(gl, properties, info) {};


/**
 * @param {*} light
 * @return {*}
 */
THREE.WebGLLights.prototype.get = function(light) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} gl
 * @param {*} properties
 * @param {*} info
 */
THREE.WebGLIndexedBufferRenderer = function(gl, properties, info) {};


/**
 * @param {*} value
 */
THREE.WebGLIndexedBufferRenderer.prototype.setMode = function(value) {};


/**
 * @param {*} index
 */
THREE.WebGLIndexedBufferRenderer.prototype.setIndex = function(index) {};


/**
 * @param {*} start
 * @param {number} count
 */
THREE.WebGLIndexedBufferRenderer.prototype.render = function(start, count) {};


/**
 * @param {*} geometry
 * @param {*} start
 * @param {number} count
 */
THREE.WebGLIndexedBufferRenderer.prototype.renderInstances = function(geometry, start, count) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderingContext} gl
 * @param {*} properties
 * @param {*} info
 */
THREE.WebGLObjects = function(gl, properties, info) {};


/**
 * @param {*} attribute
 * @return {*}
 */
THREE.WebGLObjects.prototype.getAttributeBuffer = function(attribute) {};


/**
 * @param {*} geometry
 * @return {*}
 */
THREE.WebGLObjects.prototype.getWireframeAttribute = function(geometry) {};


/**
 * @param {*} object
 */
THREE.WebGLObjects.prototype.update = function(object) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderer} renderer
 * @param {string} code
 * @param {THREE.ShaderMaterial} material
 * @param {THREE.WebGLRendererParameters} parameters
 */
THREE.WebGLProgram = function(renderer, code, material, parameters) {};


/**
 * @type {number}
 */
THREE.WebGLProgram.prototype.id;


/**
 * @type {string}
 */
THREE.WebGLProgram.prototype.code;


/**
 * @type {number}
 */
THREE.WebGLProgram.prototype.usedTimes;


/**
 * @type {*}
 */
THREE.WebGLProgram.prototype.program;


/**
 * @type {THREE.WebGLShader}
 */
THREE.WebGLProgram.prototype.vertexShader;


/**
 * @type {THREE.WebGLShader}
 */
THREE.WebGLProgram.prototype.fragmentShader;


/**
 * @type {*}
 */
THREE.WebGLProgram.prototype.uniforms;


/**
 * @type {*}
 */
THREE.WebGLProgram.prototype.attributes;


/**
 * @return {THREE.WebGLUniforms}
 */
THREE.WebGLProgram.prototype.getUniforms = function() {};


/**
 * @return {*}
 */
THREE.WebGLProgram.prototype.getAttributes = function() {};


/**

*/
THREE.WebGLProgram.prototype.destroy = function() {};


/**
 * @constructor
 * @param {THREE.WebGLRenderer} renderer
 * @param {*} capabilities
 */
THREE.WebGLPrograms = function(renderer, capabilities) {};


/**
 * @type {Array<*>}
 */
THREE.WebGLPrograms.prototype.programs;


/**
 * @param {THREE.ShaderMaterial} material
 * @param {*} lights
 * @param {*} fog
 * @param {number} nClipPlanes
 * @param {*} object
 * @return {*}
 */
THREE.WebGLPrograms.prototype.getParameters = function(material, lights, fog, nClipPlanes, object) {};


/**
 * @param {THREE.ShaderMaterial} material
 * @param {*} parameters
 * @return {string}
 */
THREE.WebGLPrograms.prototype.getProgramCode = function(material, parameters) {};


/**
 * @param {THREE.ShaderMaterial} material
 * @param {*} parameters
 * @param {string} code
 * @return {THREE.WebGLProgram}
 */
THREE.WebGLPrograms.prototype.acquireProgram = function(material, parameters, code) {};


/**
 * @param {THREE.WebGLProgram} program
 */
THREE.WebGLPrograms.prototype.releaseProgram = function(program) {};


/**
 * @constructor
 * @param {*} gl
 * @param {*} extensions
 * @param {*} state
 * @param {*} properties
 * @param {*} capabilities
 * @param {THREE.Function} paramThreeToGL
 * @param {*} info
 */
THREE.WebGLTextures = function(gl, extensions, state, properties, capabilities, paramThreeToGL, info) {};


/**
 * @param {*} texture
 * @param {number} slot
 */
THREE.WebGLTextures.prototype.setTexture2D = function(texture, slot) {};


/**
 * @param {*} texture
 * @param {number} slot
 */
THREE.WebGLTextures.prototype.setTextureCube = function(texture, slot) {};


/**
 * @param {*} texture
 * @param {number} slot
 */
THREE.WebGLTextures.prototype.setTextureCubeDynamic = function(texture, slot) {};


/**
 * @param {*} renderTarget
 */
THREE.WebGLTextures.prototype.setupRenderTarget = function(renderTarget) {};


/**
 * @param {*} renderTarget
 */
THREE.WebGLTextures.prototype.updateRenderTargetMipmap = function(renderTarget) {};


/**
 * @constructor
 * @param {*} gl
 * @param {THREE.WebGLProgram} program
 * @param {THREE.WebGLRenderer} renderer
 */
THREE.WebGLUniforms = function(gl, program, renderer) {};


/**
 * @param {*} gl
 * @param {*} seq
 * @param {Array<*>} values
 * @param {*} renderer
 */
THREE.WebGLUniforms.upload = function(gl, seq, values, renderer) {};


/**
 * @param {*} seq
 * @param {Array<*>} values
 * @return {Array<*>}
 */
THREE.WebGLUniforms.seqWithValue = function(seq, values) {};


/**
 * @param {*} seq
 * @param {Array<*>} values
 * @return {Array<*>}
 */
THREE.WebGLUniforms.splitDynamic = function(seq, values) {};


/**
 * @param {*} seq
 * @param {Array<*>} values
 * @param {*} object
 * @param {*} camera
 * @return {Array<*>}
 */
THREE.WebGLUniforms.evalDynamic = function(seq, values, object, camera) {};


/**
 * @type {THREE.WebGLRenderer}
 */
THREE.WebGLUniforms.prototype.renderer;


/**
 * @param {*} gl
 * @param {*} value
 * @param {*=} opt_renderer
 */
THREE.WebGLUniforms.prototype.setValue = function(gl, value, opt_renderer) {};


/**
 * @param {*} gl
 * @param {*} object
 * @param {string} name
 */
THREE.WebGLUniforms.prototype.set = function(gl, object, name) {};


/**
 * @param {*} gl
 * @param {*} object
 * @param {string} name
 */
THREE.WebGLUniforms.prototype.setOptional = function(gl, object, name) {};


/**
 * @constructor
 */
THREE.WebGLProperties = function() {};


/**
 * @param {*} object
 * @return {*}
 */
THREE.WebGLProperties.prototype.get = function(object) {};


/**
 * @param {*} object
 */
THREE.WebGLProperties.prototype.delete = function(object) {};


/**

*/
THREE.WebGLProperties.prototype.clear = function() {};


/**
 * @constructor
 * @param {*} gl
 * @param {string} type
 * @param {string} string
 */
THREE.WebGLShader = function(gl, type, string) {};


/**
 * @constructor
 * @param {THREE.Renderer} _renderer
 * @param {Array<*>} _lights
 * @param {Array<*>} _objects
 * @param {*} capabilities
 */
THREE.WebGLShadowMap = function(_renderer, _lights, _objects, capabilities) {};


/**
 * @type {boolean}
 */
THREE.WebGLShadowMap.prototype.enabled;


/**
 * @type {boolean}
 */
THREE.WebGLShadowMap.prototype.autoUpdate;


/**
 * @type {boolean}
 */
THREE.WebGLShadowMap.prototype.needsUpdate;


/**
 * @type {THREE.ShadowMapType}
 */
THREE.WebGLShadowMap.prototype.type;


/**
 * @type {boolean}
 */
THREE.WebGLShadowMap.prototype.renderReverseSided;


/**
 * @type {boolean}
 */
THREE.WebGLShadowMap.prototype.renderSingleSided;


/**
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 */
THREE.WebGLShadowMap.prototype.render = function(scene, camera) {};


/**
 * @type {*}
 */
THREE.WebGLShadowMap.prototype.cullFace;


/**
 * @constructor
 * @param {*} gl
 * @param {*} extensions
 * @param {THREE.Function} paramThreeToGL
 */
THREE.WebGLState = function(gl, extensions, paramThreeToGL) {};


/**
 * @type {{color: THREE.WebGLColorBuffer, depth: THREE.WebGLDepthBuffer, stencil: THREE.WebGLStencilBuffer}}
 */
THREE.WebGLState.prototype.buffers;


/**

*/
THREE.WebGLState.prototype.init = function() {};


/**

*/
THREE.WebGLState.prototype.initAttributes = function() {};


/**
 * @param {string} attribute
 */
THREE.WebGLState.prototype.enableAttribute = function(attribute) {};


/**
 * @param {string} attribute
 * @param {*} meshPerAttribute
 * @param {*} extension
 */
THREE.WebGLState.prototype.enableAttributeAndDivisor = function(attribute, meshPerAttribute, extension) {};


/**

*/
THREE.WebGLState.prototype.disableUnusedAttributes = function() {};


/**
 * @param {string} id
 */
THREE.WebGLState.prototype.enable = function(id) {};


/**
 * @param {string} id
 */
THREE.WebGLState.prototype.disable = function(id) {};


/**
 * @return {Array<*>}
 */
THREE.WebGLState.prototype.getCompressedTextureFormats = function() {};


/**
 * @param {number} blending
 * @param {number} blendEquation
 * @param {number} blendSrc
 * @param {number} blendDst
 * @param {number} blendEquationAlpha
 * @param {number} blendSrcAlpha
 * @param {number} blendDstAlpha
 */
THREE.WebGLState.prototype.setBlending = function(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha) {};


/**
 * @param {number} colorWrite
 */
THREE.WebGLState.prototype.setColorWrite = function(colorWrite) {};


/**
 * @param {number} depthTest
 */
THREE.WebGLState.prototype.setDepthTest = function(depthTest) {};


/**
 * @param {number} depthWrite
 */
THREE.WebGLState.prototype.setDepthWrite = function(depthWrite) {};


/**
 * @param {THREE.Function} depthFunc
 */
THREE.WebGLState.prototype.setDepthFunc = function(depthFunc) {};


/**
 * @param {boolean} stencilTest
 */
THREE.WebGLState.prototype.setStencilTest = function(stencilTest) {};


/**
 * @param {*} stencilWrite
 */
THREE.WebGLState.prototype.setStencilWrite = function(stencilWrite) {};


/**
 * @param {THREE.Function} stencilFunc
 * @param {*} stencilRef
 * @param {number} stencilMask
 */
THREE.WebGLState.prototype.setStencilFunc = function(stencilFunc, stencilRef, stencilMask) {};


/**
 * @param {*} stencilFail
 * @param {*} stencilZFail
 * @param {*} stencilZPass
 */
THREE.WebGLState.prototype.setStencilOp = function(stencilFail, stencilZFail, stencilZPass) {};


/**
 * @param {number} flipSided
 */
THREE.WebGLState.prototype.setFlipSided = function(flipSided) {};


/**
 * @param {THREE.CullFace} cullFace
 */
THREE.WebGLState.prototype.setCullFace = function(cullFace) {};


/**
 * @param {number} width
 */
THREE.WebGLState.prototype.setLineWidth = function(width) {};


/**
 * @param {number} polygonoffset
 * @param {number} factor
 * @param {number} units
 */
THREE.WebGLState.prototype.setPolygonOffset = function(polygonoffset, factor, units) {};


/**
 * @param {boolean} scissorTest
 */
THREE.WebGLState.prototype.setScissorTest = function(scissorTest) {};


/**
 * @return {boolean}
 */
THREE.WebGLState.prototype.getScissorTest = function() {};


/**
 * @param {*} webglSlot
 */
THREE.WebGLState.prototype.activeTexture = function(webglSlot) {};


/**
 * @param {*} webglType
 * @param {*} webglTexture
 */
THREE.WebGLState.prototype.bindTexture = function(webglType, webglTexture) {};


/**

*/
THREE.WebGLState.prototype.compressedTexImage2D = function() {};


/**

*/
THREE.WebGLState.prototype.texImage2D = function() {};


/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
THREE.WebGLState.prototype.clearColor = function(r, g, b, a) {};


/**
 * @param {number} depth
 */
THREE.WebGLState.prototype.clearDepth = function(depth) {};


/**
 * @param {*} stencil
 */
THREE.WebGLState.prototype.clearStencil = function(stencil) {};


/**
 * @param {*} scissor
 */
THREE.WebGLState.prototype.scissor = function(scissor) {};


/**
 * @param {*} viewport
 */
THREE.WebGLState.prototype.viewport = function(viewport) {};


/**

*/
THREE.WebGLState.prototype.reset = function() {};


/**
 * @constructor
 * @param {*} gl
 * @param {*} state
 */
THREE.WebGLColorBuffer = function(gl, state) {};


/**
 * @param {number} colorMask
 */
THREE.WebGLColorBuffer.prototype.setMask = function(colorMask) {};


/**
 * @param {boolean} lock
 */
THREE.WebGLColorBuffer.prototype.setLocked = function(lock) {};


/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
THREE.WebGLColorBuffer.prototype.setClear = function(r, g, b, a) {};


/**

*/
THREE.WebGLColorBuffer.prototype.reset = function() {};


/**
 * @constructor
 * @param {*} gl
 * @param {*} state
 */
THREE.WebGLDepthBuffer = function(gl, state) {};


/**
 * @param {boolean} depthTest
 */
THREE.WebGLDepthBuffer.prototype.setTest = function(depthTest) {};


/**
 * @param {number} depthMask
 */
THREE.WebGLDepthBuffer.prototype.sertMask = function(depthMask) {};


/**
 * @param {THREE.Function} depthFunc
 */
THREE.WebGLDepthBuffer.prototype.setFunc = function(depthFunc) {};


/**
 * @param {boolean} lock
 */
THREE.WebGLDepthBuffer.prototype.setLocked = function(lock) {};


/**
 * @param {*} depth
 */
THREE.WebGLDepthBuffer.prototype.setClear = function(depth) {};


/**

*/
THREE.WebGLDepthBuffer.prototype.reset = function() {};


/**
 * @constructor
 * @param {*} gl
 * @param {*} state
 */
THREE.WebGLStencilBuffer = function(gl, state) {};


/**
 * @param {boolean} stencilTest
 */
THREE.WebGLStencilBuffer.prototype.setTest = function(stencilTest) {};


/**
 * @param {number} stencilMask
 */
THREE.WebGLStencilBuffer.prototype.sertMask = function(stencilMask) {};


/**
 * @param {THREE.Function} stencilFunc
 * @param {*} stencilRef
 * @param {number} stencilMask
 */
THREE.WebGLStencilBuffer.prototype.setFunc = function(stencilFunc, stencilRef, stencilMask) {};


/**
 * @param {*} stencilFail
 * @param {*} stencilZFail
 * @param {*} stencilZPass
 */
THREE.WebGLStencilBuffer.prototype.setOp = function(stencilFail, stencilZFail, stencilZPass) {};


/**
 * @param {boolean} lock
 */
THREE.WebGLStencilBuffer.prototype.setLocked = function(lock) {};


/**
 * @param {*} stencil
 */
THREE.WebGLStencilBuffer.prototype.setClear = function(stencil) {};


/**

*/
THREE.WebGLStencilBuffer.prototype.reset = function() {};


/**
 * @constructor
 * @param {THREE.WebGLRenderer} renderer
 * @param {Array<*>} flares
 */
THREE.LensFlarePlugin = function(renderer, flares) {};


/**
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 */
THREE.LensFlarePlugin.prototype.render = function(scene, camera, viewportWidth, viewportHeight) {};


/**
 * @constructor
 * @param {THREE.WebGLRenderer} renderer
 * @param {Array<*>} sprites
 */
THREE.SpritePlugin = function(renderer, sprites) {};


/**
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 */
THREE.SpritePlugin.prototype.render = function(scene, camera, viewportWidth, viewportHeight) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 */
THREE.Scene = function() {};


/**
 * @type {THREE.IFog}
 */
THREE.Scene.prototype.fog;


/**
 * @type {THREE.Material}
 */
THREE.Scene.prototype.overrideMaterial;


/**
 * @type {boolean}
 */
THREE.Scene.prototype.autoUpdate;


/**
 * @type {*}
 */
THREE.Scene.prototype.background;


/**
 * @param {THREE.Scene} source
 * @param {boolean=} opt_recursive
 * @return {THREE.Scene}
 */
THREE.Scene.prototype.copy = function(source, opt_recursive) {};


/**
 * @interface
 */
THREE.IFog = function() {};


/**
 * @return {THREE.IFog}
 */
THREE.IFog.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.IFog}
 * @param {number} hex
 * @param {number=} opt_near
 * @param {number=} opt_far
 */
THREE.Fog = function(hex, opt_near, opt_far) {};


/**
 * @type {string}
 */
THREE.Fog.prototype.name;


/**
 * @type {THREE.Color}
 */
THREE.Fog.prototype.color;


/**
 * @type {number}
 */
THREE.Fog.prototype.near;


/**
 * @type {number}
 */
THREE.Fog.prototype.far;


/**
 * @return {THREE.Fog}
 */
THREE.Fog.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.IFog}
 * @param {(number|string)} hex
 * @param {number=} opt_density
 */
THREE.FogExp2 = function(hex, opt_density) {};


/**
 * @type {string}
 */
THREE.FogExp2.prototype.name;


/**
 * @type {THREE.Color}
 */
THREE.FogExp2.prototype.color;


/**
 * @type {number}
 */
THREE.FogExp2.prototype.density;


/**
 * @return {THREE.FogExp2}
 */
THREE.FogExp2.prototype.clone = function() {};


/**
 * @type {number}
 */
THREE.TextureIdCount;


/**
 * @constructor
 * @extends {THREE.EventDispatcher}
 * @param {(THREE.HTMLImageElement |THREE. HTMLCanvasElement |THREE. HTMLVideoElement)} image
 * @param {THREE.Mapping=} opt_mapping
 * @param {THREE.Wrapping=} opt_wrapS
 * @param {THREE.Wrapping=} opt_wrapT
 * @param {THREE.TextureFilter=} opt_magFilter
 * @param {THREE.TextureFilter=} opt_minFilter
 * @param {THREE.PixelFormat=} opt_format
 * @param {THREE.TextureDataType=} opt_type
 * @param {number=} opt_anisotropy
 * @param {THREE.TextureEncoding=} opt_encoding
 */
THREE.Texture = function(image, opt_mapping, opt_wrapS, opt_wrapT, opt_magFilter, opt_minFilter, opt_format, opt_type, opt_anisotropy, opt_encoding) {};


/**
 * @type {number}
 */
THREE.Texture.prototype.id;


/**
 * @type {string}
 */
THREE.Texture.prototype.uuid;


/**
 * @type {string}
 */
THREE.Texture.prototype.name;


/**
 * @type {string}
 */
THREE.Texture.prototype.sourceFile;


/**
 * @type {*}
 */
THREE.Texture.prototype.image;


/**
 * @type {Array<THREE.ImageData>}
 */
THREE.Texture.prototype.mipmaps;


/**
 * @type {THREE.Mapping}
 */
THREE.Texture.prototype.mapping;


/**
 * @type {THREE.Wrapping}
 */
THREE.Texture.prototype.wrapS;


/**
 * @type {THREE.Wrapping}
 */
THREE.Texture.prototype.wrapT;


/**
 * @type {THREE.TextureFilter}
 */
THREE.Texture.prototype.magFilter;


/**
 * @type {THREE.TextureFilter}
 */
THREE.Texture.prototype.minFilter;


/**
 * @type {number}
 */
THREE.Texture.prototype.anisotropy;


/**
 * @type {THREE.PixelFormat}
 */
THREE.Texture.prototype.format;


/**
 * @type {THREE.TextureDataType}
 */
THREE.Texture.prototype.type;


/**
 * @type {THREE.Vector2}
 */
THREE.Texture.prototype.offset;


/**
 * @type {THREE.Vector2}
 */
THREE.Texture.prototype.repeat;


/**
 * @type {boolean}
 */
THREE.Texture.prototype.generateMipmaps;


/**
 * @type {boolean}
 */
THREE.Texture.prototype.premultiplyAlpha;


/**
 * @type {boolean}
 */
THREE.Texture.prototype.flipY;


/**
 * @type {number}
 */
THREE.Texture.prototype.unpackAlignment;


/**
 * @type {THREE.TextureEncoding}
 */
THREE.Texture.prototype.encoding;


/**
 * @type {number}
 */
THREE.Texture.prototype.version;


/**
 * @type {boolean}
 */
THREE.Texture.prototype.needsUpdate;


/**
 * @type {function}
 */
THREE.Texture.prototype.onUpdate;


/**
 * @type {*}
 */
THREE.Texture.prototype.DEFAULT_IMAGE;


/**
 * @type {*}
 */
THREE.Texture.prototype.DEFAULT_MAPPING;


/**
 * @return {THREE.Texture}
 */
THREE.Texture.prototype.clone = function() {};


/**
 * @param {THREE.Texture} source
 * @return {THREE.Texture}
 */
THREE.Texture.prototype.copy = function(source) {};


/**
 * @param {*} meta
 * @return {*}
 */
THREE.Texture.prototype.toJSON = function(meta) {};


/**

*/
THREE.Texture.prototype.dispose = function() {};


/**
 * @param {THREE.Vector} uv
 */
THREE.Texture.prototype.transformUv = function(uv) {};


/**
 * @constructor
 * @extends {THREE.Texture}
 * @param {number} width
 * @param {number} heighht
 * @param {THREE.TextureDataType=} opt_type
 * @param {THREE.Mapping=} opt_mapping
 * @param {THREE.Wrapping=} opt_wrapS
 * @param {THREE.Wrapping=} opt_wrapT
 * @param {THREE.TextureFilter=} opt_magFilter
 * @param {THREE.TextureFilter=} opt_minFilter
 * @param {number=} opt_anisotropy
 */
THREE.DepthTexture = function(width, heighht, opt_type, opt_mapping, opt_wrapS, opt_wrapT, opt_magFilter, opt_minFilter, opt_anisotropy) {};


/**
 * @type {{width: number, height: number}}
 */
THREE.DepthTexture.prototype.image;


/**
 * @constructor
 * @extends {THREE.Texture}
 * @param {(THREE.HTMLImageElement |THREE. HTMLCanvasElement |THREE. HTMLVideoElement)} canvas
 * @param {THREE.Mapping=} opt_mapping
 * @param {THREE.Wrapping=} opt_wrapS
 * @param {THREE.Wrapping=} opt_wrapT
 * @param {THREE.TextureFilter=} opt_magFilter
 * @param {THREE.TextureFilter=} opt_minFilter
 * @param {THREE.PixelFormat=} opt_format
 * @param {THREE.TextureDataType=} opt_type
 * @param {number=} opt_anisotropy
 */
THREE.CanvasTexture = function(canvas, opt_mapping, opt_wrapS, opt_wrapT, opt_magFilter, opt_minFilter, opt_format, opt_type, opt_anisotropy) {};


/**
 * @return {THREE.CanvasTexture}
 */
THREE.CanvasTexture.prototype.clone = function() {};


/**
 * @param {THREE.CanvasTexture} source
 * @return {THREE.CanvasTexture}
 */
THREE.CanvasTexture.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Texture}
 * @param {Array<*>=} opt_images
 * @param {THREE.Mapping=} opt_mapping
 * @param {THREE.Wrapping=} opt_wrapS
 * @param {THREE.Wrapping=} opt_wrapT
 * @param {THREE.TextureFilter=} opt_magFilter
 * @param {THREE.TextureFilter=} opt_minFilter
 * @param {THREE.PixelFormat=} opt_format
 * @param {THREE.TextureDataType=} opt_type
 * @param {number=} opt_anisotropy
 * @param {THREE.TextureEncoding=} opt_encoding
 */
THREE.CubeTexture = function(opt_images, opt_mapping, opt_wrapS, opt_wrapT, opt_magFilter, opt_minFilter, opt_format, opt_type, opt_anisotropy, opt_encoding) {};


/**
 * @type {*}
 */
THREE.CubeTexture.prototype.images;


/**
 * @param {THREE.CubeTexture} source
 * @return {THREE.CubeTexture}
 */
THREE.CubeTexture.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Texture}
 * @param {Array<THREE.ImageData>} mipmaps
 * @param {number} width
 * @param {number} height
 * @param {THREE.PixelFormat=} opt_format
 * @param {THREE.TextureDataType=} opt_type
 * @param {THREE.Mapping=} opt_mapping
 * @param {THREE.Wrapping=} opt_wrapS
 * @param {THREE.Wrapping=} opt_wrapT
 * @param {THREE.TextureFilter=} opt_magFilter
 * @param {THREE.TextureFilter=} opt_minFilter
 * @param {number=} opt_anisotropy
 * @param {THREE.TextureEncoding=} opt_encoding
 */
THREE.CompressedTexture = function(mipmaps, width, height, opt_format, opt_type, opt_mapping, opt_wrapS, opt_wrapT, opt_magFilter, opt_minFilter, opt_anisotropy, opt_encoding) {};


/**
 * @type {{width: number, height: number}}
 */
THREE.CompressedTexture.prototype.image;


/**
 * @return {THREE.CompressedTexture}
 */
THREE.CompressedTexture.prototype.clone = function() {};


/**
 * @param {THREE.CompressedTexture} source
 * @return {THREE.CompressedTexture}
 */
THREE.CompressedTexture.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Texture}
 * @param {(THREE.ArrayBuffer |THREE. Int8Array |THREE. Uint8Array |THREE. Uint8ClampedArray |THREE. Int16Array |THREE. Uint16Array |THREE. Int32Array |THREE. Uint32Array |THREE. Float32Array |THREE. Float64Array)} data
 * @param {number} width
 * @param {number} height
 * @param {THREE.PixelFormat} format
 * @param {THREE.TextureDataType} type
 * @param {THREE.Mapping} mapping
 * @param {THREE.Wrapping} wrapS
 * @param {THREE.Wrapping} wrapT
 * @param {THREE.TextureFilter} magFilter
 * @param {THREE.TextureFilter} minFilter
 * @param {number=} opt_anisotropy
 * @param {THREE.TextureEncoding=} opt_encoding
 */
THREE.DataTexture = function(data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, opt_anisotropy, opt_encoding) {};


/**
 * @type {{data: THREE.ImageData, width: number, height: number}}
 */
THREE.DataTexture.prototype.image;


/**
 * @return {THREE.DataTexture}
 */
THREE.DataTexture.prototype.clone = function() {};


/**
 * @param {THREE.DataTexture} source
 * @return {THREE.DataTexture}
 */
THREE.DataTexture.prototype.copy = function(source) {};


/**
 * @constructor
 * @extends {THREE.Texture}
 * @param {THREE.HTMLVideoElement} video
 * @param {THREE.Mapping=} opt_mapping
 * @param {THREE.Wrapping=} opt_wrapS
 * @param {THREE.Wrapping=} opt_wrapT
 * @param {THREE.TextureFilter=} opt_magFilter
 * @param {THREE.TextureFilter=} opt_minFilter
 * @param {THREE.PixelFormat=} opt_format
 * @param {THREE.TextureDataType=} opt_type
 * @param {number=} opt_anisotropy
 */
THREE.VideoTexture = function(video, opt_mapping, opt_wrapS, opt_wrapT, opt_magFilter, opt_minFilter, opt_format, opt_type, opt_anisotropy) {};


/**
 * @return {THREE.VideoTexture}
 */
THREE.VideoTexture.prototype.clone = function() {};


/**
 * @param {THREE.VideoTexture} source
 * @return {THREE.VideoTexture}
 */
THREE.VideoTexture.prototype.copy = function(source) {};


THREE.CurveUtils = {};


/**
 * @param {number} t
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @return {number}
 */
THREE.CurveUtils.tangentQuadraticBezier = function(t, p0, p1, p2) {};


/**
 * @param {number} t
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @return {number}
 */
THREE.CurveUtils.tangentCubicBezier = function(t, p0, p1, p2, p3) {};


/**
 * @param {number} t
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @return {number}
 */
THREE.CurveUtils.tangentSpline = function(t, p0, p1, p2, p3) {};


/**
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} t
 * @return {number}
 */
THREE.CurveUtils.interpolate = function(p0, p1, p2, p3, t) {};


THREE.ImageUtils = {};


/**
 * @type {string}
 */
THREE.ImageUtils.crossOrigin;


/**
 * @param {string} url
 * @param {THREE.ImageUtils.Mapping=} opt_mapping
 * @param {function(texture:THREE.ImageUtils.Texture)=} opt_onLoad
 * @param {function(message:string)=} opt_onError
 * @return {THREE.ImageUtils.Texture}
 */
THREE.ImageUtils.loadTexture = function(url, opt_mapping, opt_onLoad, opt_onError) {};


/**
 * @param {Array<string>} array
 * @param {THREE.ImageUtils.Mapping=} opt_mapping
 * @param {function(texture:THREE.ImageUtils.Texture)=} opt_onLoad
 * @param {function(message:string)=} opt_onError
 * @return {THREE.ImageUtils.Texture}
 */
THREE.ImageUtils.loadTextureCube = function(array, opt_mapping, opt_onLoad, opt_onError) {};


THREE.SceneUtils = {};


/**
 * @param {THREE.SceneUtils.Geometry} geometry
 * @param {Array<THREE.SceneUtils.Material>} materials
 * @return {THREE.SceneUtils.Object3D}
 */
THREE.SceneUtils.createMultiMaterialObject = function(geometry, materials) {};


/**
 * @param {THREE.SceneUtils.Object3D} child
 * @param {THREE.SceneUtils.Object3D} parent
 * @param {THREE.SceneUtils.Scene} scene
 */
THREE.SceneUtils.detach = function(child, parent, scene) {};


/**
 * @param {THREE.SceneUtils.Object3D} child
 * @param {THREE.SceneUtils.Scene} scene
 * @param {THREE.SceneUtils.Object3D} parent
 */
THREE.SceneUtils.attach = function(child, scene, parent) {};


THREE.ShapeUtils = {};


/**
 * @param {Array<number>} contour
 * @return {number}
 */
THREE.ShapeUtils.area = function(contour) {};


/**
 * @param {Array<number>} contour
 * @param {boolean} indices
 * @return {Array<number>}
 */
THREE.ShapeUtils.triangulate = function(contour, indices) {};


/**
 * @param {Array<number>} contour
 * @param {Array<*>} holes
 * @return {Array<number>}
 */
THREE.ShapeUtils.triangulateShape = function(contour, holes) {};


/**
 * @param {Array<number>} pts
 * @return {boolean}
 */
THREE.ShapeUtils.isClockWise = function(pts) {};


/**
 * @param {number} t
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @return {number}
 */
THREE.ShapeUtils.b2 = function(t, p0, p1, p2) {};


/**
 * @param {number} t
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @return {number}
 */
THREE.ShapeUtils.b3 = function(t, p0, p1, p2, p3) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.AudioListener} listener
 */
THREE.Audio = function(listener) {};


/**
 * @type {string}
 */
THREE.Audio.prototype.type;


/**
 * @type {THREE.AudioContext}
 */
THREE.Audio.prototype.context;


/**
 * @type {THREE.AudioBufferSourceNode}
 */
THREE.Audio.prototype.source;


/**
 * @type {THREE.GainNode}
 */
THREE.Audio.prototype.gain;


/**
 * @type {boolean}
 */
THREE.Audio.prototype.autoplay;


/**
 * @type {number}
 */
THREE.Audio.prototype.startTime;


/**
 * @type {number}
 */
THREE.Audio.prototype.playbackRate;


/**
 * @type {boolean}
 */
THREE.Audio.prototype.hasPlaybackControl;


/**
 * @type {boolean}
 */
THREE.Audio.prototype.isPlaying;


/**
 * @type {string}
 */
THREE.Audio.prototype.sourceType;


/**
 * @type {Array<*>}
 */
THREE.Audio.prototype.filters;


/**
 * @return {THREE.GainNode}
 */
THREE.Audio.prototype.getOutput = function() {};


/**
 * @param {THREE.AudioBufferSourceNode} audioNode
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.setNodeSource = function(audioNode) {};


/**
 * @param {THREE.AudioBuffer} audioBuffer
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.setBuffer = function(audioBuffer) {};


/**
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.play = function() {};


/**
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.pause = function() {};


/**
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.stop = function() {};


/**
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.connect = function() {};


/**
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.disconnect = function() {};


/**
 * @return {Array<*>}
 */
THREE.Audio.prototype.getFilters = function() {};


/**
 * @param {(Array<*>|*)} value
 * @return {(THREE.Audio|THREE.Audio)}
 */
THREE.Audio.prototype.setFilter = function(value) {};


/**
 * @return {*}
 */
THREE.Audio.prototype.getFilter = function() {};


/**
 * @param {number} value
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.setPlaybackRate = function(value) {};


/**
 * @return {number}
 */
THREE.Audio.prototype.getPlaybackRate = function() {};


/**

*/
THREE.Audio.prototype.onEnded = function() {};


/**
 * @return {boolean}
 */
THREE.Audio.prototype.getLoop = function() {};


/**
 * @param {boolean} value
 */
THREE.Audio.prototype.setLoop = function(value) {};


/**
 * @return {number}
 */
THREE.Audio.prototype.getVolume = function() {};


/**
 * @param {number} value
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.setVolume = function(value) {};


/**
 * @param {string} file
 * @return {THREE.Audio}
 */
THREE.Audio.prototype.load = function(file) {};


/**
 * @constructor
 * @param {*} audio
 * @param {number} fftSize
 */
THREE.AudioAnalyser = function(audio, fftSize) {};


/**
 * @type {*}
 */
THREE.AudioAnalyser.prototype.analyser;


/**
 * @type {THREE.Uint8Array}
 */
THREE.AudioAnalyser.prototype.data;


/**
 * @return {THREE.Uint8Array}
 */
THREE.AudioAnalyser.prototype.getFrequencyData = function() {};


/**
 * @return {number}
 */
THREE.AudioAnalyser.prototype.getAverageFrequency = function() {};


/**
 * @param {*} file
 * @return {*}
 */
THREE.AudioAnalyser.prototype.getData = function(file) {};


/**
 * @type {THREE.AudioContext}
 */
THREE.AudioContext;


/**
 * @constructor
 * @param {*} context
 */
THREE.AudioBuffer = function(context) {};


/**
 * @type {*}
 */
THREE.AudioBuffer.prototype.context;


/**
 * @type {boolean}
 */
THREE.AudioBuffer.prototype.ready;


/**
 * @type {Array<THREE.Function>}
 */
THREE.AudioBuffer.prototype.readyCallbacks;


/**
 * @param {string} file
 * @return {THREE.AudioBuffer}
 */
THREE.AudioBuffer.prototype.load = function(file) {};


/**
 * @param {THREE.Function} callback
 */
THREE.AudioBuffer.prototype.onReady = function(callback) {};


/**
 * @constructor
 * @extends {THREE.Audio}
 * @param {THREE.AudioListener} listener
 */
THREE.PositionalAudio = function(listener) {};


/**
 * @type {THREE.PannerNode}
 */
THREE.PositionalAudio.prototype.panner;


/**
 * @param {number} value
 */
THREE.PositionalAudio.prototype.setRefDistance = function(value) {};


/**
 * @return {number}
 */
THREE.PositionalAudio.prototype.getRefDistance = function() {};


/**
 * @param {number} value
 */
THREE.PositionalAudio.prototype.setRolloffFactor = function(value) {};


/**
 * @return {number}
 */
THREE.PositionalAudio.prototype.getRolloffFactor = function() {};


/**
 * @param {number} value
 */
THREE.PositionalAudio.prototype.setDistanceModel = function(value) {};


/**
 * @return {number}
 */
THREE.PositionalAudio.prototype.getDistanceModel = function() {};


/**
 * @param {number} value
 */
THREE.PositionalAudio.prototype.setMaxDistance = function(value) {};


/**
 * @return {number}
 */
THREE.PositionalAudio.prototype.getMaxDistance = function() {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 */
THREE.AudioListener = function() {};


/**
 * @type {string}
 */
THREE.AudioListener.prototype.type;


/**
 * @type {THREE.AudioContext}
 */
THREE.AudioListener.prototype.context;


/**
 * @type {THREE.GainNode}
 */
THREE.AudioListener.prototype.gain;


/**
 * @return {THREE.GainNode}
 */
THREE.AudioListener.prototype.getInput = function() {};


/**

*/
THREE.AudioListener.prototype.removeFilter = function() {};


/**
 * @param {*} value
 */
THREE.AudioListener.prototype.setFilter = function(value) {};


/**
 * @return {*}
 */
THREE.AudioListener.prototype.getFilter = function() {};


/**
 * @param {number} value
 */
THREE.AudioListener.prototype.setMasterVolume = function(value) {};


/**
 * @return {number}
 */
THREE.AudioListener.prototype.getMasterVolume = function() {};


/**
 * @constructor
 */
THREE.Curve = function() {};


/**
 * @param {THREE.Function} constructorFunc
 * @param {THREE.Function} getPointFunc
 * @return {THREE.Function}
 */
THREE.Curve.create = function(constructorFunc, getPointFunc) {};


/**
 * @param {number} t
 * @return {THREE.T}
 */
THREE.Curve.prototype.getPoint = function(t) {};


/**
 * @param {number} u
 * @return {THREE.T}
 */
THREE.Curve.prototype.getPointAt = function(u) {};


/**
 * @param {number=} opt_divisions
 * @return {Array<THREE.T>}
 */
THREE.Curve.prototype.getPoints = function(opt_divisions) {};


/**
 * @param {number=} opt_divisions
 * @return {Array<THREE.T>}
 */
THREE.Curve.prototype.getSpacedPoints = function(opt_divisions) {};


/**
 * @return {number}
 */
THREE.Curve.prototype.getLength = function() {};


/**
 * @param {number=} opt_divisions
 * @return {Array<number>}
 */
THREE.Curve.prototype.getLengths = function(opt_divisions) {};


/**

*/
THREE.Curve.prototype.updateArcLengths = function() {};


/**
 * @param {number} u
 * @param {number} distance
 * @return {number}
 */
THREE.Curve.prototype.getUtoTmapping = function(u, distance) {};


/**
 * @param {number} t
 * @return {THREE.T}
 */
THREE.Curve.prototype.getTangent = function(t) {};


/**
 * @param {number} u
 * @return {THREE.T}
 */
THREE.Curve.prototype.getTangentAt = function(u) {};


/**
 * @constructor
 * @extends {THREE.Curve}
 */
THREE.CurvePath = function() {};


/**
 * @type {Array<THREE.Curve<T>>}
 */
THREE.CurvePath.prototype.curves;


/**
 * @type {boolean}
 */
THREE.CurvePath.prototype.autoClose;


/**
 * @param {THREE.Curve} curve
 */
THREE.CurvePath.prototype.add = function(curve) {};


/**
 * @return {boolean}
 */
THREE.CurvePath.prototype.checkConnection = function() {};


/**

*/
THREE.CurvePath.prototype.closePath = function() {};


/**
 * @param {number} t
 * @return {THREE.T}
 */
THREE.CurvePath.prototype.getPoint = function(t) {};


/**
 * @return {number}
 */
THREE.CurvePath.prototype.getLength = function() {};


/**

*/
THREE.CurvePath.prototype.updateArcLengths = function() {};


/**
 * @return {Array<number>}
 */
THREE.CurvePath.prototype.getCurveLengths = function() {};


/**
 * @param {number=} opt_divisions
 * @return {Array<THREE.T>}
 */
THREE.CurvePath.prototype.getSpacedPoints = function(opt_divisions) {};


/**
 * @param {number=} opt_divisions
 * @return {Array<THREE.T>}
 */
THREE.CurvePath.prototype.getPoints = function(opt_divisions) {};


/**
 * @param {number} divisions
 * @return {THREE.Geometry}
 */
THREE.CurvePath.prototype.createPointsGeometry = function(divisions) {};


/**
 * @param {number} divisions
 * @return {THREE.Geometry}
 */
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(divisions) {};


/**
 * @param {Array<THREE.T>} points
 * @return {THREE.Geometry}
 */
THREE.CurvePath.prototype.createGeometry = function(points) {};


/**

*/
THREE.PathActions = {};


/**

*/
THREE.PathActions.MOVE_TO = {};


/**

*/
THREE.PathActions.LINE_TO = {};


/**

*/
THREE.PathActions.QUADRATIC_CURVE_TO = {};


/**

*/
THREE.PathActions.BEZIER_CURVE_TO = {};


/**

*/
THREE.PathActions.CSPLINE_THRU = {};


/**

*/
THREE.PathActions.ARC = {};


/**

*/
THREE.PathActions.ELLIPSE = {};


/**
 * @interface
 */
THREE.PathAction = function() {};


/**
 * @constructor
 * @extends {THREE.CurvePath}
 * @param {Array<THREE.Vector2>=} opt_points
 */
THREE.Path = function(opt_points) {};


/**
 * @type {THREE.Vector2}
 */
THREE.Path.prototype.currentPoint;


/**
 * @param {Array<THREE.Vector2>} vectors
 */
THREE.Path.prototype.fromPoints = function(vectors) {};


/**
 * @param {number} x
 * @param {number} y
 */
THREE.Path.prototype.moveTo = function(x, y) {};


/**
 * @param {number} x
 * @param {number} y
 */
THREE.Path.prototype.lineTo = function(x, y) {};


/**
 * @param {number} aCPx
 * @param {number} aCPy
 * @param {number} aX
 * @param {number} aY
 */
THREE.Path.prototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {};


/**
 * @param {number} aCP1x
 * @param {number} aCP1y
 * @param {number} aCP2x
 * @param {number} aCP2y
 * @param {number} aX
 * @param {number} aY
 */
THREE.Path.prototype.bezierCurveTo = function(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {};


/**
 * @param {Array<THREE.Vector2>} pts
 */
THREE.Path.prototype.splineThru = function(pts) {};


/**
 * @param {number} aX
 * @param {number} aY
 * @param {number} aRadius
 * @param {number} aStartAngle
 * @param {number} aEndAngle
 * @param {boolean} aClockwise
 */
THREE.Path.prototype.arc = function(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {};


/**
 * @param {number} aX
 * @param {number} aY
 * @param {number} aRadius
 * @param {number} aStartAngle
 * @param {number} aEndAngle
 * @param {boolean} aClockwise
 */
THREE.Path.prototype.absarc = function(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {};


/**
 * @param {number} aX
 * @param {number} aY
 * @param {number} xRadius
 * @param {number} yRadius
 * @param {number} aStartAngle
 * @param {number} aEndAngle
 * @param {boolean} aClockwise
 * @param {number} aRotation
 */
THREE.Path.prototype.ellipse = function(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {};


/**
 * @param {number} aX
 * @param {number} aY
 * @param {number} xRadius
 * @param {number} yRadius
 * @param {number} aStartAngle
 * @param {number} aEndAngle
 * @param {boolean} aClockwise
 * @param {number} aRotation
 */
THREE.Path.prototype.absellipse = function(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {};


/**
 * @constructor
 */
THREE.ShapePath = function() {};


/**
 * @type {Array<*>}
 */
THREE.ShapePath.prototype.subPaths;


/**
 * @type {*}
 */
THREE.ShapePath.prototype.currentPath;


/**
 * @param {number} x
 * @param {number} y
 */
THREE.ShapePath.prototype.moveTo = function(x, y) {};


/**
 * @param {number} x
 * @param {number} y
 */
THREE.ShapePath.prototype.lineTo = function(x, y) {};


/**
 * @param {number} aCPx
 * @param {number} aCPy
 * @param {number} aX
 * @param {number} aY
 */
THREE.ShapePath.prototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {};


/**
 * @param {number} aCP1x
 * @param {number} aCP1y
 * @param {number} aCP2x
 * @param {number} aCP2y
 * @param {number} aX
 * @param {number} aY
 */
THREE.ShapePath.prototype.bezierCurveTo = function(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {};


/**
 * @param {Array<THREE.Vector2>} pts
 */
THREE.ShapePath.prototype.splineThru = function(pts) {};


/**
 * @param {boolean} isCCW
 * @param {*} noHoles
 * @return {Array<THREE.Shape>}
 */
THREE.ShapePath.prototype.toShapes = function(isCCW, noHoles) {};


/**
 * @constructor
 * @extends {THREE.Path}
 * @param {Array<THREE.Vector2>=} opt_points
 */
THREE.Shape = function(opt_points) {};


/**
 * @type {Array<THREE.Path>}
 */
THREE.Shape.prototype.holes;


/**
 * @param {*=} opt_options
 * @return {THREE.ExtrudeGeometry}
 */
THREE.Shape.prototype.extrude = function(opt_options) {};


/**
 * @param {*=} opt_options
 * @return {THREE.ShapeGeometry}
 */
THREE.Shape.prototype.makeGeometry = function(opt_options) {};


/**
 * @param {number} divisions
 * @return {Array<THREE.Vector2[]>}
 */
THREE.Shape.prototype.getPointsHoles = function(divisions) {};


/**
 * @param {number} divisions
 * @return {{shape: Array<THREE.Vector2>, holes: Array<THREE.Vector2[]>}}
 */
THREE.Shape.prototype.extractAllPoints = function(divisions) {};


/**
 * @param {number} divisions
 * @return {Array<THREE.Vector2>}
 */
THREE.Shape.prototype.extractPoints = function(divisions) {};


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {Array<THREE.Vector3>=} opt_points
 */
THREE.CatmullRomCurve3 = function(opt_points) {};


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.CatmullRomCurve3.prototype.points;


/**
 * @param {number} t
 * @return {THREE.Vector3}
 */
THREE.CatmullRomCurve3.prototype.getPoint = function(t) {};


/**
 * @constructor
 * @extends {THREE.CatmullRomCurve3}
 */
THREE.ClosedSplineCurve3 = function() {};


/**
 * @constructor
 * @extends {THREE.CatmullRomCurve3}
 */
THREE.SplineCurve3 = function() {};


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {THREE.Vector2} v0
 * @param {THREE.Vector2} v1
 * @param {THREE.Vector2} v2
 * @param {THREE.Vector2} v3
 */
THREE.CubicBezierCurve = function(v0, v1, v2, v3) {};


/**
 * @type {THREE.Vector2}
 */
THREE.CubicBezierCurve.prototype.v0;


/**
 * @type {THREE.Vector2}
 */
THREE.CubicBezierCurve.prototype.v1;


/**
 * @type {THREE.Vector2}
 */
THREE.CubicBezierCurve.prototype.v2;


/**
 * @type {THREE.Vector2}
 */
THREE.CubicBezierCurve.prototype.v3;


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {THREE.Vector3} v0
 * @param {THREE.Vector3} v1
 * @param {THREE.Vector3} v2
 * @param {THREE.Vector3} v3
 */
THREE.CubicBezierCurve3 = function(v0, v1, v2, v3) {};


/**
 * @type {THREE.Vector3}
 */
THREE.CubicBezierCurve3.prototype.v0;


/**
 * @type {THREE.Vector3}
 */
THREE.CubicBezierCurve3.prototype.v1;


/**
 * @type {THREE.Vector3}
 */
THREE.CubicBezierCurve3.prototype.v2;


/**
 * @type {THREE.Vector3}
 */
THREE.CubicBezierCurve3.prototype.v3;


/**
 * @param {number} t
 * @return {THREE.Vector3}
 */
THREE.CubicBezierCurve3.prototype.getPoint = function(t) {};


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {number} aX
 * @param {number} aY
 * @param {number} xRadius
 * @param {number} yRadius
 * @param {number} aStartAngle
 * @param {number} aEndAngle
 * @param {boolean} aClockwise
 * @param {number} aRotation
 */
THREE.EllipseCurve = function(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {};


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.aX;


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.aY;


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.xRadius;


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.yRadius;


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.aStartAngle;


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.aEndAngle;


/**
 * @type {boolean}
 */
THREE.EllipseCurve.prototype.aClockwise;


/**
 * @type {number}
 */
THREE.EllipseCurve.prototype.aRotation;


/**
 * @constructor
 * @extends {THREE.EllipseCurve}
 * @param {number} aX
 * @param {number} aY
 * @param {number} aRadius
 * @param {number} aStartAngle
 * @param {number} aEndAngle
 * @param {boolean} aClockwise
 */
THREE.ArcCurve = function(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {};


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {THREE.Vector2} v1
 * @param {THREE.Vector2} v2
 */
THREE.LineCurve = function(v1, v2) {};


/**
 * @type {THREE.Vector2}
 */
THREE.LineCurve.prototype.v1;


/**
 * @type {THREE.Vector2}
 */
THREE.LineCurve.prototype.v2;


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {THREE.Vector3} v1
 * @param {THREE.Vector3} v2
 */
THREE.LineCurve3 = function(v1, v2) {};


/**
 * @type {THREE.Vector3}
 */
THREE.LineCurve3.prototype.v1;


/**
 * @type {THREE.Vector3}
 */
THREE.LineCurve3.prototype.v2;


/**
 * @param {number} t
 * @return {THREE.Vector3}
 */
THREE.LineCurve3.prototype.getPoint = function(t) {};


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {THREE.Vector2} v0
 * @param {THREE.Vector2} v1
 * @param {THREE.Vector2} v2
 */
THREE.QuadraticBezierCurve = function(v0, v1, v2) {};


/**
 * @type {THREE.Vector2}
 */
THREE.QuadraticBezierCurve.prototype.v0;


/**
 * @type {THREE.Vector2}
 */
THREE.QuadraticBezierCurve.prototype.v1;


/**
 * @type {THREE.Vector2}
 */
THREE.QuadraticBezierCurve.prototype.v2;


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {THREE.Vector3} v0
 * @param {THREE.Vector3} v1
 * @param {THREE.Vector3} v2
 */
THREE.QuadraticBezierCurve3 = function(v0, v1, v2) {};


/**
 * @type {THREE.Vector3}
 */
THREE.QuadraticBezierCurve3.prototype.v0;


/**
 * @type {THREE.Vector3}
 */
THREE.QuadraticBezierCurve3.prototype.v1;


/**
 * @type {THREE.Vector3}
 */
THREE.QuadraticBezierCurve3.prototype.v2;


/**
 * @param {number} t
 * @return {THREE.Vector3}
 */
THREE.QuadraticBezierCurve3.prototype.getPoint = function(t) {};


/**
 * @constructor
 * @extends {THREE.Curve}
 * @param {Array<THREE.Vector2>=} opt_points
 */
THREE.SplineCurve = function(opt_points) {};


/**
 * @type {Array<THREE.Vector2>}
 */
THREE.SplineCurve.prototype.points;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @param {number=} opt_widthSegments
 * @param {number=} opt_heightSegments
 * @param {number=} opt_depthSegments
 */
THREE.BoxBufferGeometry = function(width, height, depth, opt_widthSegments, opt_heightSegments, opt_depthSegments) {};


/**
 * @type {{width: number, height: number, depth: number, widthSegments: number, heightSegments: number, depthSegments: number}}
 */
THREE.BoxBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @param {number=} opt_widthSegments
 * @param {number=} opt_heightSegments
 * @param {number=} opt_depthSegments
 */
THREE.BoxGeometry = function(width, height, depth, opt_widthSegments, opt_heightSegments, opt_depthSegments) {};


/**
 * @type {{width: number, height: number, depth: number, widthSegments: number, heightSegments: number, depthSegments: number}}
 */
THREE.BoxGeometry.prototype.parameters;


/**
 * @return {THREE.BoxGeometry}
 */
THREE.BoxGeometry.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.BoxGeometry}
 */
THREE.CubeGeometry = function() {};


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number=} opt_radius
 * @param {number=} opt_segments
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.CircleBufferGeometry = function(opt_radius, opt_segments, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{radius: number, segments: number, thetaStart: number, thetaLength: number}}
 */
THREE.CircleBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number=} opt_radius
 * @param {number=} opt_segments
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.CircleGeometry = function(opt_radius, opt_segments, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{radius: number, segments: number, thetaStart: number, thetaLength: number}}
 */
THREE.CircleGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number=} opt_radiusTop
 * @param {number=} opt_radiusBottom
 * @param {number=} opt_height
 * @param {number=} opt_radialSegments
 * @param {number=} opt_heightSegments
 * @param {boolean=} opt_openEnded
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.CylinderBufferGeometry = function(opt_radiusTop, opt_radiusBottom, opt_height, opt_radialSegments, opt_heightSegments, opt_openEnded, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{radiusTop: number, radiusBottom: number, height: number, radialSegments: number, heightSegments: number, openEnded: boolean, thetaStart: number, thetaLength: number}}
 */
THREE.CylinderBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number=} opt_radiusTop
 * @param {number=} opt_radiusBottom
 * @param {number=} opt_height
 * @param {number=} opt_radiusSegments
 * @param {number=} opt_heightSegments
 * @param {boolean=} opt_openEnded
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.CylinderGeometry = function(opt_radiusTop, opt_radiusBottom, opt_height, opt_radiusSegments, opt_heightSegments, opt_openEnded, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{radiusTop: number, radiusBottom: number, height: number, radialSegments: number, heightSegments: number, openEnded: boolean, thetaStart: number, thetaLength: number}}
 */
THREE.CylinderGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number=} opt_radius
 * @param {number=} opt_height
 * @param {number=} opt_radialSegment
 * @param {number=} opt_heightSegment
 * @param {boolean=} opt_openEnded
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.ConeBufferGeometry = function(opt_radius, opt_height, opt_radialSegment, opt_heightSegment, opt_openEnded, opt_thetaStart, opt_thetaLength) {};


/**
 * @constructor
 * @extends {THREE.CylinderGeometry}
 * @param {number=} opt_radius
 * @param {number=} opt_height
 * @param {number=} opt_radialSegment
 * @param {number=} opt_heightSegment
 * @param {boolean=} opt_openEnded
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.ConeGeometry = function(opt_radius, opt_height, opt_radialSegment, opt_heightSegment, opt_openEnded, opt_thetaStart, opt_thetaLength) {};


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number} radius
 * @param {number} detail
 */
THREE.DodecahedronGeometry = function(radius, detail) {};


/**
 * @type {{radius: number, detail: number}}
 */
THREE.DodecahedronGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {THREE.BufferGeometry} geometry
 * @param {number} thresholdAngle
 */
THREE.EdgesGeometry = function(geometry, thresholdAngle) {};


/**
 * @return {THREE.EdgesGeometry}
 */
THREE.EdgesGeometry.prototype.clone = function() {};


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {(THREE.Shape|Array<THREE.Shape>)=} opt_shape
 * @param {(*|*)=} opt_options
 */
THREE.ExtrudeGeometry = function(opt_shape, opt_options) {};


/**
 * @type {Object<THREE.Geometry,Array<THREE.Vector2>>}
 */
THREE.ExtrudeGeometry.prototype.WorldUVGenerator;


/**
 * @param {Array<THREE.Shape>} shapes
 * @param {*=} opt_options
 */
THREE.ExtrudeGeometry.prototype.addShapeList = function(shapes, opt_options) {};


/**
 * @param {THREE.Shape} shape
 * @param {*=} opt_options
 */
THREE.ExtrudeGeometry.prototype.addShape = function(shape, opt_options) {};


/**
 * @constructor
 * @extends {THREE.PolyhedronGeometry}
 * @param {number} radius
 * @param {number} detail
 */
THREE.IcosahedronGeometry = function(radius, detail) {};


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {Array<THREE.Vector3>} points
 * @param {number=} opt_segments
 * @param {number=} opt_phiStart
 * @param {number=} opt_phiLength
 */
THREE.LatheBufferGeometry = function(points, opt_segments, opt_phiStart, opt_phiLength) {};


/**
 * @type {{points: Array<THREE.Vector3>, segments: number, phiStart: number, phiLength: number}}
 */
THREE.LatheBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {Array<THREE.Vector3>} points
 * @param {number=} opt_segments
 * @param {number=} opt_phiStart
 * @param {number=} opt_phiLength
 */
THREE.LatheGeometry = function(points, opt_segments, opt_phiStart, opt_phiLength) {};


/**
 * @type {{points: Array<THREE.Vector3>, segments: number, phiStart: number, phiLength: number}}
 */
THREE.LatheGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.PolyhedronGeometry}
 * @param {number} radius
 * @param {number} detail
 */
THREE.OctahedronGeometry = function(radius, detail) {};


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {function(u:number,v:number):THREE.Vector3} func
 * @param {number} slices
 * @param {number} stacks
 */
THREE.ParametricGeometry = function(func, slices, stacks) {};


/**
 * @type {{func: function(u:number,v:number):THREE.Vector3, slices: number, stacks: number}}
 */
THREE.ParametricGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number} width
 * @param {number} height
 * @param {number=} opt_widthSegments
 * @param {number=} opt_heightSegments
 */
THREE.PlaneBufferGeometry = function(width, height, opt_widthSegments, opt_heightSegments) {};


/**
 * @type {{width: number, height: number, widthSegments: number, heightSegments: number}}
 */
THREE.PlaneBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number} width
 * @param {number} height
 * @param {number=} opt_widthSegments
 * @param {number=} opt_heightSegments
 */
THREE.PlaneGeometry = function(width, height, opt_widthSegments, opt_heightSegments) {};


/**
 * @type {{width: number, height: number, widthSegments: number, heightSegments: number}}
 */
THREE.PlaneGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {Array<THREE.Vector3>} vertices
 * @param {Array<THREE.Face3>} faces
 * @param {number=} opt_radius
 * @param {number=} opt_detail
 */
THREE.PolyhedronGeometry = function(vertices, faces, opt_radius, opt_detail) {};


/**
 * @type {{vertices: Array<THREE.Vector3>, faces: Array<THREE.Face3>, radius: number, detail: number}}
 */
THREE.PolyhedronGeometry.prototype.parameters;


/**
 * @type {THREE.Sphere}
 */
THREE.PolyhedronGeometry.prototype.boundingSphere;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number=} opt_innerRadius
 * @param {number=} opt_outerRadius
 * @param {number=} opt_thetaSegments
 * @param {number=} opt_phiSegments
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.RingBufferGeometry = function(opt_innerRadius, opt_outerRadius, opt_thetaSegments, opt_phiSegments, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{innerRadius: number, outerRadius: number, thetaSegments: number, phiSegments: number, thetaStart: number, thetaLength: number}}
 */
THREE.RingBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number=} opt_innerRadius
 * @param {number=} opt_outerRadius
 * @param {number=} opt_thetaSegments
 * @param {number=} opt_phiSegments
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.RingGeometry = function(opt_innerRadius, opt_outerRadius, opt_thetaSegments, opt_phiSegments, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{innerRadius: number, outerRadius: number, thetaSegments: number, phiSegments: number, thetaStart: number, thetaLength: number}}
 */
THREE.RingGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {(THREE.Shape|Array<THREE.Shape>)} shape
 * @param {(*|*)=} opt_options
 */
THREE.ShapeGeometry = function(shape, opt_options) {};


/**
 * @param {Array<THREE.Shape>} shapes
 * @param {*} options
 * @return {THREE.ShapeGeometry}
 */
THREE.ShapeGeometry.prototype.addShapeList = function(shapes, options) {};


/**
 * @param {THREE.Shape} shape
 * @param {*=} opt_options
 */
THREE.ShapeGeometry.prototype.addShape = function(shape, opt_options) {};


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number} radius
 * @param {number=} opt_widthSegments
 * @param {number=} opt_heightSegments
 * @param {number=} opt_phiStart
 * @param {number=} opt_phiLength
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.SphereBufferGeometry = function(radius, opt_widthSegments, opt_heightSegments, opt_phiStart, opt_phiLength, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{radius: number, widthSegments: number, heightSegments: number, phiStart: number, phiLength: number, thetaStart: number, thetaLength: number}}
 */
THREE.SphereBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number} radius
 * @param {number=} opt_widthSegments
 * @param {number=} opt_heightSegments
 * @param {number=} opt_phiStart
 * @param {number=} opt_phiLength
 * @param {number=} opt_thetaStart
 * @param {number=} opt_thetaLength
 */
THREE.SphereGeometry = function(radius, opt_widthSegments, opt_heightSegments, opt_phiStart, opt_phiLength, opt_thetaStart, opt_thetaLength) {};


/**
 * @type {{radius: number, widthSegments: number, heightSegments: number, phiStart: number, phiLength: number, thetaStart: number, thetaLength: number}}
 */
THREE.SphereGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.PolyhedronGeometry}
 * @param {number=} opt_radius
 * @param {number=} opt_detail
 */
THREE.TetrahedronGeometry = function(opt_radius, opt_detail) {};


/**
 * @interface
 */
THREE.TextGeometryParameters = function() {};


/**
 * @constructor
 * @extends {THREE.ExtrudeGeometry}
 * @param {string} text
 * @param {THREE.TextGeometryParameters=} opt_parameters
 */
THREE.TextGeometry = function(text, opt_parameters) {};


/**
 * @type {{font: THREE.Font, size: number, height: number, curveSegments: number, bevelEnabled: boolean, bevelThickness: number, bevelSize: number}}
 */
THREE.TextGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number=} opt_radius
 * @param {number=} opt_tube
 * @param {number=} opt_radialSegments
 * @param {number=} opt_tubularSegments
 * @param {number=} opt_arc
 */
THREE.TorusBufferGeometry = function(opt_radius, opt_tube, opt_radialSegments, opt_tubularSegments, opt_arc) {};


/**
 * @type {{radius: number, tube: number, radialSegments: number, tubularSegments: number, arc: number}}
 */
THREE.TorusBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number=} opt_radius
 * @param {number=} opt_tube
 * @param {number=} opt_radialSegments
 * @param {number=} opt_tubularSegments
 * @param {number=} opt_arc
 */
THREE.TorusGeometry = function(opt_radius, opt_tube, opt_radialSegments, opt_tubularSegments, opt_arc) {};


/**
 * @type {{radius: number, tube: number, radialSegments: number, tubularSegments: number, arc: number}}
 */
THREE.TorusGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {number=} opt_radius
 * @param {number=} opt_tube
 * @param {number=} opt_radialSegments
 * @param {number=} opt_tubularSegments
 * @param {number=} opt_p
 * @param {number=} opt_q
 * @param {number=} opt_heightScale
 */
THREE.TorusKnotBufferGeometry = function(opt_radius, opt_tube, opt_radialSegments, opt_tubularSegments, opt_p, opt_q, opt_heightScale) {};


/**
 * @type {{radius: number, tube: number, radialSegments: number, tubularSegments: number, p: number, q: number, heightScale: number}}
 */
THREE.TorusKnotBufferGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {number=} opt_radius
 * @param {number=} opt_tube
 * @param {number=} opt_radialSegments
 * @param {number=} opt_tubularSegments
 * @param {number=} opt_p
 * @param {number=} opt_q
 * @param {number=} opt_heightScale
 */
THREE.TorusKnotGeometry = function(opt_radius, opt_tube, opt_radialSegments, opt_tubularSegments, opt_p, opt_q, opt_heightScale) {};


/**
 * @type {{radius: number, tube: number, radialSegments: number, tubularSegments: number, p: number, q: number, heightScale: number}}
 */
THREE.TorusKnotGeometry.prototype.parameters;


/**
 * @constructor
 * @extends {THREE.Geometry}
 * @param {THREE.Path} path
 * @param {number=} opt_segments
 * @param {number=} opt_radius
 * @param {number=} opt_radiusSegments
 * @param {boolean=} opt_closed
 * @param {function(u:number):number=} opt_taper
 */
THREE.TubeGeometry = function(path, opt_segments, opt_radius, opt_radiusSegments, opt_closed, opt_taper) {};


/**
 * @param {number=} opt_u
 * @return {number}
 */
THREE.TubeGeometry.NoTaper = function(opt_u) {};


/**
 * @param {number} u
 * @return {number}
 */
THREE.TubeGeometry.SinusoidalTaper = function(u) {};


/**
 * @param {THREE.Path} path
 * @param {number} segments
 * @param {boolean} closed
 */
THREE.TubeGeometry.FrenetFrames = function(path, segments, closed) {};


/**
 * @type {{path: THREE.Path, segments: number, radius: number, radialSegments: number, closed: boolean, taper: function(u:number):number}}
 */
THREE.TubeGeometry.prototype.parameters;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.TubeGeometry.prototype.tangents;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.TubeGeometry.prototype.normals;


/**
 * @type {Array<THREE.Vector3>}
 */
THREE.TubeGeometry.prototype.binormals;


/**
 * @constructor
 * @extends {THREE.BufferGeometry}
 * @param {(THREE.Geometry |THREE. BufferGeometry)} geometry
 */
THREE.WireframeGeometry = function(geometry) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Vector3} dir
 * @param {THREE.Vector3=} opt_origin
 * @param {number=} opt_length
 * @param {number=} opt_hex
 * @param {number=} opt_headLength
 * @param {number=} opt_headWidth
 */
THREE.ArrowHelper = function(dir, opt_origin, opt_length, opt_hex, opt_headLength, opt_headWidth) {};


/**
 * @type {THREE.Line}
 */
THREE.ArrowHelper.prototype.line;


/**
 * @type {THREE.Mesh}
 */
THREE.ArrowHelper.prototype.cone;


/**
 * @param {THREE.Vector3} dir
 */
THREE.ArrowHelper.prototype.setDirection = function(dir) {};


/**
 * @param {number} length
 * @param {number=} opt_headLength
 * @param {number=} opt_headWidth
 */
THREE.ArrowHelper.prototype.setLength = function(length, opt_headLength, opt_headWidth) {};


/**
 * @param {number} hex
 */
THREE.ArrowHelper.prototype.setColor = function(hex) {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {number=} opt_size
 */
THREE.AxisHelper = function(opt_size) {};


/**
 * @constructor
 * @extends {THREE.Mesh}
 * @param {THREE.Object3D=} opt_object
 * @param {number=} opt_hex
 */
THREE.BoundingBoxHelper = function(opt_object, opt_hex) {};


/**
 * @type {THREE.Object3D}
 */
THREE.BoundingBoxHelper.prototype.object;


/**
 * @type {THREE.Box3}
 */
THREE.BoundingBoxHelper.prototype.box;


/**

*/
THREE.BoundingBoxHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Object3D=} opt_object
 * @param {THREE.Color=} opt_color
 */
THREE.BoxHelper = function(opt_object, opt_color) {};


/**
 * @param {THREE.Object3D=} opt_object
 */
THREE.BoxHelper.prototype.update = function(opt_object) {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Camera} camera
 */
THREE.CameraHelper = function(camera) {};


/**
 * @type {THREE.Camera}
 */
THREE.CameraHelper.prototype.camera;


/**
 * @type {Object<string,Array<number>>}
 */
THREE.CameraHelper.prototype.pointMap;


/**

*/
THREE.CameraHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Light} light
 * @param {number=} opt_size
 */
THREE.DirectionalLightHelper = function(light, opt_size) {};


/**
 * @type {THREE.Light}
 */
THREE.DirectionalLightHelper.prototype.light;


/**
 * @type {THREE.Line}
 */
THREE.DirectionalLightHelper.prototype.lightPlane;


/**

*/
THREE.DirectionalLightHelper.prototype.dispose = function() {};


/**

*/
THREE.DirectionalLightHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Object3D} object
 * @param {number=} opt_hex
 * @param {number=} opt_thresholdAngle
 */
THREE.EdgesHelper = function(object, opt_hex, opt_thresholdAngle) {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Object3D} object
 * @param {number=} opt_size
 * @param {number=} opt_hex
 * @param {number=} opt_linewidth
 */
THREE.FaceNormalsHelper = function(object, opt_size, opt_hex, opt_linewidth) {};


/**
 * @type {THREE.Object3D}
 */
THREE.FaceNormalsHelper.prototype.object;


/**
 * @type {number}
 */
THREE.FaceNormalsHelper.prototype.size;


/**
 * @param {THREE.Object3D=} opt_object
 */
THREE.FaceNormalsHelper.prototype.update = function(opt_object) {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {number} size
 * @param {number} divisions
 * @param {(THREE.Color|number)=} opt_color1
 * @param {(THREE.Color|number)=} opt_color2
 */
THREE.GridHelper = function(size, divisions, opt_color1, opt_color2) {};


/**
 * @param {(THREE.Color|number)=} opt_color1
 * @param {(THREE.Color|number)=} opt_color2
 */
THREE.GridHelper.prototype.setColors = function(opt_color1, opt_color2) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Light} light
 * @param {number} sphereSize
 */
THREE.HemisphereLightHelper = function(light, sphereSize) {};


/**
 * @type {THREE.Light}
 */
THREE.HemisphereLightHelper.prototype.light;


/**
 * @type {Array<THREE.Color>}
 */
THREE.HemisphereLightHelper.prototype.colors;


/**
 * @type {THREE.Mesh}
 */
THREE.HemisphereLightHelper.prototype.lightSphere;


/**

*/
THREE.HemisphereLightHelper.prototype.dispose = function() {};


/**

*/
THREE.HemisphereLightHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Light} light
 * @param {number} sphereSize
 */
THREE.PointLightHelper = function(light, sphereSize) {};


/**
 * @type {THREE.Light}
 */
THREE.PointLightHelper.prototype.light;


/**

*/
THREE.PointLightHelper.prototype.dispose = function() {};


/**

*/
THREE.PointLightHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Object3D} bone
 */
THREE.SkeletonHelper = function(bone) {};


/**
 * @type {Array<THREE.Bone>}
 */
THREE.SkeletonHelper.prototype.bones;


/**
 * @type {THREE.Object3D}
 */
THREE.SkeletonHelper.prototype.root;


/**
 * @param {THREE.Object3D} object
 * @return {Array<THREE.Bone>}
 */
THREE.SkeletonHelper.prototype.getBoneList = function(object) {};


/**

*/
THREE.SkeletonHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Light} light
 */
THREE.SpotLightHelper = function(light) {};


/**
 * @type {THREE.Light}
 */
THREE.SpotLightHelper.prototype.light;


/**

*/
THREE.SpotLightHelper.prototype.dispose = function() {};


/**

*/
THREE.SpotLightHelper.prototype.update = function() {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Object3D} object
 * @param {number=} opt_size
 * @param {number=} opt_hex
 * @param {number=} opt_linewidth
 */
THREE.VertexNormalsHelper = function(object, opt_size, opt_hex, opt_linewidth) {};


/**
 * @type {THREE.Object3D}
 */
THREE.VertexNormalsHelper.prototype.object;


/**
 * @type {number}
 */
THREE.VertexNormalsHelper.prototype.size;


/**
 * @param {THREE.Object3D=} opt_object
 */
THREE.VertexNormalsHelper.prototype.update = function(opt_object) {};


/**
 * @constructor
 * @extends {THREE.LineSegments}
 * @param {THREE.Object3D} object
 * @param {number=} opt_hex
 */
THREE.WireframeHelper = function(object, opt_hex) {};


/**
 * @constructor
 * @extends {THREE.Object3D}
 * @param {THREE.Material} material
 */
THREE.ImmediateRenderObject = function(material) {};


/**
 * @type {THREE.Material}
 */
THREE.ImmediateRenderObject.prototype.material;


/**
 * @param {THREE.Function} renderCallback
 */
THREE.ImmediateRenderObject.prototype.render = function(renderCallback) {};


/**
 * @interface
 */
THREE.MorphBlendMeshAnimation = function() {};


/**
 * @constructor
 * @extends {THREE.Mesh}
 * @param {THREE.Geometry} geometry
 * @param {THREE.Material} material
 */
THREE.MorphBlendMesh = function(geometry, material) {};


/**
 * @type {Object<string,THREE.MorphBlendMeshAnimation>}
 */
THREE.MorphBlendMesh.prototype.animationsMap;


/**
 * @type {Array<THREE.MorphBlendMeshAnimation>}
 */
THREE.MorphBlendMesh.prototype.animationsList;


/**
 * @param {string} name
 * @param {number} start
 * @param {number} end
 * @param {number} fps
 */
THREE.MorphBlendMesh.prototype.createAnimation = function(name, start, end, fps) {};


/**
 * @param {number} fps
 */
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(fps) {};


/**
 * @param {string} name
 */
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(name) {};


/**
 * @param {string} name
 */
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(name) {};


/**
 * @param {string} name
 * @param {number} fps
 */
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(name, fps) {};


/**
 * @param {string} name
 * @param {number} duration
 */
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(name, duration) {};


/**
 * @param {string} name
 * @param {number} weight
 */
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(name, weight) {};


/**
 * @param {string} name
 * @param {number} time
 */
THREE.MorphBlendMesh.prototype.setAnimationTime = function(name, time) {};


/**
 * @param {string} name
 * @return {number}
 */
THREE.MorphBlendMesh.prototype.getAnimationTime = function(name) {};


/**
 * @param {string} name
 * @return {number}
 */
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(name) {};


/**
 * @param {string} name
 */
THREE.MorphBlendMesh.prototype.playAnimation = function(name) {};


/**
 * @param {string} name
 */
THREE.MorphBlendMesh.prototype.stopAnimation = function(name) {};


/**
 * @param {number} delta
 */
THREE.MorphBlendMesh.prototype.update = function(delta) {};


var three = {};

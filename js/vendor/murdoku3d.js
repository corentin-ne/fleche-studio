/*! murdoku3d — rendu 3D du plateau Murdoku pour Flèche Studio.
 * Généré par tools/build-3d.mjs depuis src3d/ (ne pas modifier à la main).
 * Objets, matériaux, lumières et rendus adaptés de building-builder (House Builder).
 *
 * Contient three.js r186 (0.186.1) — https://threejs.org
 * The MIT License
 * Copyright © 2010-2025 three.js authors
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Au=0,Bc=1,Ru=2;var qr=1,Cu=2,Ei=3,Zn=0,Ht=1,mn=2,Rt=0,Us=1,kc=2,zc=3,Vc=4,zo=5;var gn=100,Pu=101,Iu=102,Lu=103,Du=104,Wi=200,Nu=201,Uu=202,Fu=203,Hc=204,Gc=205,Yr=206,Ou=207,Zr=208,Bu=209,ku=210,zu=211,Vu=212,Hu=213,Gu=214,ro=0,ao=1,oo=2,ys=3,lo=4,co=5,ho=6,uo=7,Vo=0,Wu=1,Xu=2,Pn=0,$r=1,Jr=2,Kr=3,jr=4,Qr=5,ea=6,Xi=7;var Wc=300,Ti=301,qi=302,Ho=303,Go=304,ta=306,pn=1e3,kn=1001,fo=1002,At=1003,qu=1004;var na=1005;var zt=1006,Wo=1007;var Ai=1008;var $t=1009,Xc=1010,qc=1011,Fs=1012,Xo=1013,In=1014,xn=1015,Bt=1016,qo=1017,Yo=1018,Ri=1020,Yc=35902,Zc=35899,$c=1021,Jc=1022,rn=1023,Vn=1026,$n=1027,Zo=1028,$o=1029,Ci=1030,Jo=1031;var Ko=1033,ia=33776,sa=33777,ra=33778,aa=33779,jo=35840,Qo=35841,el=35842,tl=35843,nl=36196,il=37492,sl=37496,rl=37488,al=37489,oa=37490,ol=37491,ll=37808,cl=37809,hl=37810,ul=37811,fl=37812,dl=37813,pl=37814,ml=37815,gl=37816,xl=37817,_l=37818,vl=37819,yl=37820,Ml=37821,Sl=36492,bl=36494,wl=36495,El=36283,Tl=36284,la=36285,Al=36286;var ur=2300,po=2301,io=2302,Ec=2303,Tc=2400,Ac=2401,Rc=2402;var Yu=3200,Kc=3201;var Os=0,Zu=1,oi="",_t="srgb",fr="srgb-linear",dr="linear",lt="srgb";var so=7680;var $u=519,Ju=512,Ku=513,ju=514,Rl=515,Qu=516,ef=517,Cl=518,tf=519,jc=35044;var Qc="300 es",Rn=2e3,Ms=2001;function Gd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Wd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nf(){let i=pr("canvas");return i.style.display="block",i}var Yh={},Ss=null;function mr(...i){let e="THREE."+i.shift();Ss?Ss("log",e,...i):console.log(e,...i)}function sf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=sf(i);let e="THREE."+i.shift();if(Ss)Ss("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ve(...i){i=sf(i);let e="THREE."+i.shift();if(Ss)Ss("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ki(...i){let e=i.join(" ");e in Yh||(Yh[e]=!0,He(...i))}function rf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var af={[ro]:ao,[oo]:ho,[lo]:uo,[ys]:co,[ao]:ro,[ho]:oo,[uo]:lo,[co]:ys},Hn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zh=1234567,or=Math.PI/180,bs=180/Math.PI;function zn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function et(i,e,t){return Math.max(e,Math.min(t,i))}function eh(i,e){return(i%e+e)%e}function Xd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function qd(i,e,t){return i!==e?(t-i)/(e-i):0}function lr(i,e,t){return(1-t)*i+t*e}function Yd(i,e,t,n){return lr(i,e,1-Math.exp(-t*n))}function Zd(i,e=1){return e-Math.abs(eh(i,e*2)-e)}function $d(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Jd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Kd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function jd(i,e){return i+Math.random()*(e-i)}function Qd(i){return i*(.5-Math.random())}function ep(i){i!==void 0&&(Zh=i);let e=Zh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function tp(i){return i*or}function np(i){return i*bs}function ip(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function sp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function rp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ap(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),d=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*f,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*f,o*c);break;case"ZXZ":i.set(l*f,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*h,o*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function An(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Gt={DEG2RAD:or,RAD2DEG:bs,generateUUID:zn,clamp:et,euclideanModulo:eh,mapLinear:Xd,inverseLerp:qd,lerp:lr,damp:Yd,pingpong:Zd,smoothstep:$d,smootherstep:Jd,randInt:Kd,randFloat:jd,randFloatSpread:Qd,seededRandom:ep,degToRad:tp,radToDeg:np,isPowerOfTwo:ip,ceilPowerOfTwo:sp,floorPowerOfTwo:rp,setQuaternionFromProperEuler:ap,normalize:ut,denormalize:An},ah=class ah{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ah.prototype.isVector2=!0;var he=ah,Gn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],d=r[a+1],p=r[a+2],y=r[a+3];if(f!==y||l!==u||c!==d||h!==p){let g=l*u+c*d+h*p+f*y;g<0&&(u=-u,d=-d,p=-p,y=-y,g=-g);let m=1-o;if(g<.9995){let M=Math.acos(g),w=Math.sin(M);m=Math.sin(m*M)/w,o=Math.sin(o*M)/w,l=l*m+u*o,c=c*m+d*o,h=h*m+p*o,f=f*m+y*o}else{l=l*m+u*o,c=c*m+d*o,h=h*m+p*o,f=f*m+y*o;let M=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=M,c*=M,h*=M,f*=M}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+h*f+l*d-c*u,e[t+1]=l*p+h*u+c*f-o*d,e[t+2]=c*p+h*d+o*u-l*f,e[t+3]=h*p-o*f-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),f=o(r/2),u=l(n/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"YZX":this._x=u*h*f+c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f-u*d*p;break;case"XZY":this._x=u*h*f-c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f+u*d*p;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},oh=class oh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($h.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($h.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ec.copy(this).projectOnVector(e),this.sub(ec)}reflect(e){return this.sub(ec.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};oh.prototype.isVector3=!0;var L=oh,ec=new L,$h=new Gn,lh=class lh{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],y=s[0],g=s[3],m=s[6],M=s[1],w=s[4],_=s[7],E=s[2],S=s[5],P=s[8];return r[0]=a*y+o*M+l*E,r[3]=a*g+o*w+l*S,r[6]=a*m+o*_+l*P,r[1]=c*y+h*M+f*E,r[4]=c*g+h*w+f*S,r[7]=c*m+h*_+f*P,r[2]=u*y+d*M+p*E,r[5]=u*g+d*w+p*S,r[8]=u*m+d*_+p*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,p=t*f+n*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=f*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=u*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=d*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ki("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tc.makeScale(e,t)),this}rotate(e){return ki("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tc.makeRotation(-e)),this}translate(e,t){return ki("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lh.prototype.isMatrix3=!0;var Ye=lh,tc=new Ye,Jh=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kh=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function op(){let i={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=vs(s.r),s.g=vs(s.g),s.b=vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?dr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ki("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ki("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[fr]:{primaries:e,whitePoint:n,transfer:dr,toXYZ:Jh,fromXYZ:Kh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Jh,fromXYZ:Kh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}}),i}var it=op();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ts,mo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=pr("canvas")),ts.width=e.width,ts.height=e.height;let s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=pr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ri(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},lp=0,ws=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=zn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nc(s[a].image)):r.push(nc(s[a]))}else r=nc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function nc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?mo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var cp=0,ic=new L,en=class i extends Hn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kn,s=kn,r=zt,a=Ai,o=rn,l=$t,c=i.DEFAULT_ANISOTROPY,h=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=zn(),this.name="",this.source=new ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ic).x}get height(){return this.source.getSize(ic).y}get depth(){return this.source.getSize(ic).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pn:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pn:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Wc;en.DEFAULT_ANISOTROPY=1;var ch=class ch{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,_=(d+1)/2,E=(m+1)/2,S=(h+u)/4,P=(f+y)/4,x=(p+g)/4;return w>_&&w>E?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=S/n,r=P/n):_>E?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=S/s,r=x/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=P/r,s=x/r),this.set(n,s,r,t),this}let M=Math.sqrt((g-p)*(g-p)+(f-y)*(f-y)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(f-y)/M,this.z=(u-h)/M,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ch.prototype.isVector4=!0;var vt=ch,go=class extends Hn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new en(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ws(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},bt=class extends go{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},gr=class extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var xo=class extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ko=class ko{constructor(e,t,n,s,r,a,o,l,c,h,f,u,d,p,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,f,u,d,p,y,g)}set(e,t,n,s,r,a,o,l,c,h,f,u,d,p,y,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ko().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*h,d=a*f,p=o*h,y=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,d=l*f,p=c*h,y=c*f;t[0]=u+y*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-p,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,d=l*f,p=c*h,y=c*f;t[0]=u-y*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,d=a*f,p=o*h,y=o*f;t[0]=l*h,t[4]=p*c-d,t[8]=u*c+y,t[1]=l*f,t[5]=y*c+u,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,d=a*c,p=o*l,y=o*c;t[0]=l*h,t[4]=y-u*f,t[8]=p*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*f+p,t[10]=u-y*f}else if(e.order==="XZY"){let u=a*l,d=a*c,p=o*l,y=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+y,t[5]=a*h,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*h,t[10]=y*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hp,e,up)}lookAt(e,t,n){let s=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),di.crossVectors(n,an),di.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),di.crossVectors(n,an)),di.normalize(),La.crossVectors(an,di),s[0]=di.x,s[4]=La.x,s[8]=an.x,s[1]=di.y,s[5]=La.y,s[9]=an.y,s[2]=di.z,s[6]=La.z,s[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],y=n[6],g=n[10],m=n[14],M=n[3],w=n[7],_=n[11],E=n[15],S=s[0],P=s[4],x=s[8],T=s[12],A=s[1],R=s[5],D=s[9],U=s[13],N=s[2],O=s[6],q=s[10],Y=s[14],te=s[3],H=s[7],J=s[11],$=s[15];return r[0]=a*S+o*A+l*N+c*te,r[4]=a*P+o*R+l*O+c*H,r[8]=a*x+o*D+l*q+c*J,r[12]=a*T+o*U+l*Y+c*$,r[1]=h*S+f*A+u*N+d*te,r[5]=h*P+f*R+u*O+d*H,r[9]=h*x+f*D+u*q+d*J,r[13]=h*T+f*U+u*Y+d*$,r[2]=p*S+y*A+g*N+m*te,r[6]=p*P+y*R+g*O+m*H,r[10]=p*x+y*D+g*q+m*J,r[14]=p*T+y*U+g*Y+m*$,r[3]=M*S+w*A+_*N+E*te,r[7]=M*P+w*R+_*O+E*H,r[11]=M*x+w*D+_*q+E*J,r[15]=M*T+w*U+_*Y+E*$,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],d=e[14],p=e[3],y=e[7],g=e[11],m=e[15],M=l*d-c*u,w=o*d-c*f,_=o*u-l*f,E=a*d-c*h,S=a*u-l*h,P=a*f-o*h;return t*(y*M-g*w+m*_)-n*(p*M-g*E+m*S)+s*(p*w-y*E+m*P)-r*(p*_-y*S+g*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],d=e[11],p=e[12],y=e[13],g=e[14],m=e[15],M=t*o-n*a,w=t*l-s*a,_=t*c-r*a,E=n*l-s*o,S=n*c-r*o,P=s*c-r*l,x=h*y-f*p,T=h*g-u*p,A=h*m-d*p,R=f*g-u*y,D=f*m-d*y,U=u*m-d*g,N=M*U-w*D+_*R+E*A-S*T+P*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/N;return e[0]=(o*U-l*D+c*R)*O,e[1]=(s*D-n*U-r*R)*O,e[2]=(y*P-g*S+m*E)*O,e[3]=(u*S-f*P-d*E)*O,e[4]=(l*A-a*U-c*T)*O,e[5]=(t*U-s*A+r*T)*O,e[6]=(g*_-p*P-m*w)*O,e[7]=(h*P-u*_+d*w)*O,e[8]=(a*D-o*A+c*x)*O,e[9]=(n*A-t*D-r*x)*O,e[10]=(p*S-y*_+m*M)*O,e[11]=(f*_-h*S-d*M)*O,e[12]=(o*T-a*R-l*x)*O,e[13]=(t*R-n*T+s*x)*O,e[14]=(y*w-p*E-g*M)*O,e[15]=(h*E-f*w+u*M)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,p=r*f,y=a*h,g=a*f,m=o*f,M=l*c,w=l*h,_=l*f,E=n.x,S=n.y,P=n.z;return s[0]=(1-(y+m))*E,s[1]=(d+_)*E,s[2]=(p-w)*E,s[3]=0,s[4]=(d-_)*S,s[5]=(1-(u+m))*S,s[6]=(g+M)*S,s[7]=0,s[8]=(p+w)*P,s[9]=(g-M)*P,s[10]=(1-(u+y))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ns.set(s[0],s[1],s[2]).length(),o=ns.set(s[4],s[5],s[6]).length(),l=ns.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wn.copy(this);let c=1/a,h=1/o,f=1/l;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=f,wn.elements[9]*=f,wn.elements[10]*=f,t.setFromRotationMatrix(wn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,h=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),p,y;if(l)p=r/(a-r),y=a*r/(a-r);else if(o===Rn)p=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Ms)p=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,h=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),d=-(n+s)/(n-s),p,y;if(l)p=1/(a-r),y=a/(a-r);else if(o===Rn)p=-2/(a-r),y=-(a+r)/(a-r);else if(o===Ms)p=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ko.prototype.isMatrix4=!0;var Ze=ko,ns=new L,wn=new Ze,hp=new L(0,0,0),up=new L(1,1,1),di=new L,La=new L,an=new L,jh=new Ze,Qh=new Gn,Wn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qh.setFromEuler(this),this.setFromQuaternion(Qh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wn.DEFAULT_ORDER="XYZ";var Es=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fp=0,eu=new L,is=new Gn,Qn=new Ze,Da=new L,Ks=new L,dp=new L,pp=new Gn,tu=new L(1,0,0),nu=new L(0,1,0),iu=new L(0,0,1),su={type:"added"},mp={type:"removed"},ss={type:"childadded",child:null},sc={type:"childremoved",child:null},Lt=class i extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Wn,n=new Gn,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Ye}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Es,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(tu,e)}rotateY(e){return this.rotateOnAxis(nu,e)}rotateZ(e){return this.rotateOnAxis(iu,e)}translateOnAxis(e,t){return eu.copy(e).applyQuaternion(this.quaternion),this.position.add(eu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tu,e)}translateY(e){return this.translateOnAxis(nu,e)}translateZ(e){return this.translateOnAxis(iu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Da.copy(e):Da.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(Ks,Da,this.up):Qn.lookAt(Da,Ks,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(Qn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(su),ss.child=e,this.dispatchEvent(ss),ss.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mp),sc.child=e,this.dispatchEvent(sc),sc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(su),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,dp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,pp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Lt.DEFAULT_UP=new L(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var St=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},gp={type:"move"},Ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Na={h:0,s:0,l:0};function rc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Te=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=eh(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=rc(a,r,e+1/3),this.g=rc(a,r,e),this.b=rc(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=_t){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){let n=of[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return it.workingToColorSpace(Yt.copy(this),e),Math.round(et(Yt.r*255,0,255))*65536+Math.round(et(Yt.g*255,0,255))*256+Math.round(et(Yt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=_t){it.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,s=Yt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(Na);let n=lr(pi.h,Na.h,t),s=lr(pi.s,Na.s,t),r=lr(pi.l,Na.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Te;Te.NAMES=of;var _i=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new L,ei=new L,ac=new L,ti=new L,rs=new L,as=new L,ru=new L,oc=new L,lc=new L,cc=new L,hc=new vt,uc=new vt,fc=new vt,si=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),ei.subVectors(n,t),ac.subVectors(e,t);let a=En.dot(En),o=En.dot(ei),l=En.dot(ac),c=ei.dot(ei),h=ei.dot(ac),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(a,ti.y),l.addScaledVector(o,ti.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return hc.setScalar(0),uc.setScalar(0),fc.setScalar(0),hc.fromBufferAttribute(e,t),uc.fromBufferAttribute(e,n),fc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(hc,r.x),a.addScaledVector(uc,r.y),a.addScaledVector(fc,r.z),a}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),ei.subVectors(e,t),En.cross(ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),En.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;rs.subVectors(s,n),as.subVectors(r,n),oc.subVectors(e,n);let l=rs.dot(oc),c=as.dot(oc);if(l<=0&&c<=0)return t.copy(n);lc.subVectors(e,s);let h=rs.dot(lc),f=as.dot(lc);if(h>=0&&f<=h)return t.copy(s);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(rs,a);cc.subVectors(e,r);let d=rs.dot(cc),p=as.dot(cc);if(p>=0&&d<=p)return t.copy(r);let y=d*c-l*p;if(y<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(as,o);let g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return ru.subVectors(r,s),o=(f-h)/(f-h+(d-p)),t.copy(s).addScaledVector(ru,o);let m=1/(g+y+u);return a=y*m,o=u*m,t.copy(n).addScaledVector(rs,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(r,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ua.copy(n.boundingBox)),Ua.applyMatrix4(e.matrixWorld),this.union(Ua)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(js),Fa.subVectors(this.max,js),os.subVectors(e.a,js),ls.subVectors(e.b,js),cs.subVectors(e.c,js),mi.subVectors(ls,os),gi.subVectors(cs,ls),Ni.subVectors(os,cs);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ni.z,Ni.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ni.z,0,-Ni.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ni.y,Ni.x,0];return!dc(t,os,ls,cs,Fa)||(t=[1,0,0,0,1,0,0,0,1],!dc(t,os,ls,cs,Fa))?!1:(Oa.crossVectors(mi,gi),t=[Oa.x,Oa.y,Oa.z],dc(t,os,ls,cs,Fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ni=[new L,new L,new L,new L,new L,new L,new L,new L],Tn=new L,Ua=new Xn,os=new L,ls=new L,cs=new L,mi=new L,gi=new L,Ni=new L,js=new L,Fa=new L,Oa=new L,Ui=new L;function dc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ui.fromArray(i,r);let o=s.x*Math.abs(Ui.x)+s.y*Math.abs(Ui.y)+s.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),h=n.dot(Ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Pt=new L,Ba=new he,xp=0,Tt=class extends Hn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jc,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=An(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=An(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=An(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=An(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var xr=class extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var _r=class extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var tt=class extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}},_p=new Xn,Qs=new L,pc=new L,vi=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):_p.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);let t=Qs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add(pc)),this.expandByPoint(Qs.copy(e.center).sub(pc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},vp=0,dn=new Ze,mc=new Lt,hs=new L,on=new Xn,er=new Xn,Ot=new L,yt=class i extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gd(e)?_r:xr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return mc.lookAt(e),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];er.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(on.min,er.min),on.expandByPoint(Ot),Ot.addVectors(on.max,er.max),on.expandByPoint(Ot)):(on.expandByPoint(er.min),on.expandByPoint(er.max))}on.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),Ot.add(hs)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Tt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new L,l[x]=new L;let c=new L,h=new L,f=new L,u=new he,d=new he,p=new he,y=new L,g=new L;function m(x,T,A){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),f.fromBufferAttribute(n,A),u.fromBufferAttribute(r,x),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,A),h.sub(c),f.sub(c),d.sub(u),p.sub(u);let R=1/(d.x*p.y-p.x*d.y);isFinite(R)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(R),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(R),o[x].add(y),o[T].add(y),o[A].add(y),l[x].add(g),l[T].add(g),l[A].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,T=M.length;x<T;++x){let A=M[x],R=A.start,D=A.count;for(let U=R,N=R+D;U<N;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let w=new L,_=new L,E=new L,S=new L;function P(x){E.fromBufferAttribute(s,x),S.copy(E);let T=o[x];w.copy(T),w.sub(E.multiplyScalar(E.dot(T))).normalize(),_.crossVectors(S,T);let R=_.dot(l[x])<0?-1:1;a.setXYZW(x,w.x,w.y,w.z,R)}for(let x=0,T=M.length;x<T;++x){let A=M[x],R=A.start,D=A.count;for(let U=R,N=R+D;U<N;U+=3)P(e.getX(U+0)),P(e.getX(U+1)),P(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,f=new L;if(e)for(let u=0,d=e.count;u<d;u+=3){let p=e.getX(u+0),y=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,p=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*h;for(let m=0;m<h;m++)u[p++]=c[d++]}return new Tt(u,h,f)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=e(u,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},vr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jc,this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Qt=new L,As=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=An(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=An(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=An(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=An(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){mr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){mr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},gc=new L,yp=new L,Mp=new Ye,ln=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=gc.subVectors(n,t).cross(yp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(gc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Mp.getNormalMatrix(e),s=this.coplanarPoint(gc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Sp=0,Cn=class extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=zn(),this.name="",this.type="Material",this.blending=Us,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hc,this.blendDst=Gc,this.blendEquation=gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$u,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=so,this.stencilZFail=so,this.stencilZPass=so,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Te().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ln().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new he().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new he().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},yi=class extends Cn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},us,tr=new L,fs=new L,ds=new L,ps=new he,nr=new he,lf=new Ze,ka=new L,ir=new L,za=new L,au=new he,xc=new he,ou=new he,yr=class extends Lt{constructor(e=new yi){if(super(),this.isSprite=!0,this.type="Sprite",us===void 0){us=new yt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vr(t,5);us.setIndex([0,1,2,0,2,3]),us.setAttribute("position",new As(n,3,0,!1)),us.setAttribute("uv",new As(n,2,3,!1))}this.geometry=us,this.material=e,this.center=new he(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ve('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fs.setFromMatrixScale(this.matrixWorld),lf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ds.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fs.multiplyScalar(-ds.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Va(ka.set(-.5,-.5,0),ds,a,fs,s,r),Va(ir.set(.5,-.5,0),ds,a,fs,s,r),Va(za.set(.5,.5,0),ds,a,fs,s,r),au.set(0,0),xc.set(1,0),ou.set(1,1);let o=e.ray.intersectTriangle(ka,ir,za,!1,tr);if(o===null&&(Va(ir.set(-.5,.5,0),ds,a,fs,s,r),xc.set(0,1),o=e.ray.intersectTriangle(ka,za,ir,!1,tr),o===null))return;let l=e.ray.origin.distanceTo(tr);l<e.near||l>e.far||t.push({distance:l,point:tr.clone(),uv:si.getInterpolation(tr,ka,ir,za,au,xc,ou,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Va(i,e,t,n,s,r){ps.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(nr.x=r*ps.x-s*ps.y,nr.y=s*ps.x+r*ps.y):nr.copy(ps),i.copy(e),i.x+=nr.x,i.y+=nr.y,i.applyMatrix4(lf)}var ii=new L,_c=new L,Ha=new L,Ga=new L,Mr=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,t),ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_c.copy(e).add(t).multiplyScalar(.5),Ha.copy(t).sub(e).normalize(),Ga.copy(this.origin).sub(_c);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ha),o=Ga.dot(this.direction),l=-Ga.dot(Ha),c=Ga.lengthSq(),h=Math.abs(1-a*a),f,u,d,p;if(h>0)if(f=a*l-o,u=a*o-l,p=r*h,f>=0)if(u>=-p)if(u<=p){let y=1/h;f*=y,u*=y,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=p?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(_c).addScaledVector(Ha,u),d}intersectSphere(e,t){if(e.radius<0)return null;ii.subVectors(e.center,this.origin);let n=ii.dot(this.direction),s=ii.dot(ii)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,p=t.x-a.x,y=t.y-a.y,g=t.z-a.z,m=n.x-a.x,M=n.y-a.y,w=n.z-a.z,_=Math.abs(l),E=Math.abs(c),S=Math.abs(h),P,x,T,A,R,D,U,N,O,q,Y,te;if(_>=E&&_>=S?(T=l,D=f,O=p,te=m,l>=0?(P=c,x=h,A=u,R=d,U=y,N=g,q=M,Y=w):(P=h,x=c,A=d,R=u,U=g,N=y,q=w,Y=M)):E>=S?(T=c,D=u,O=y,te=M,c>=0?(P=h,x=l,A=d,R=f,U=g,N=p,q=w,Y=m):(P=l,x=h,A=f,R=d,U=p,N=g,q=m,Y=w)):(T=h,D=d,O=g,te=w,h>=0?(P=l,x=c,A=f,R=u,U=p,N=y,q=m,Y=M):(P=c,x=l,A=u,R=f,U=y,N=p,q=M,Y=m)),T===0)return null;let H=P/T,J=x/T,$=1/T,we=A-H*D,Se=R-J*D,Qe=U-H*O,qe=N-J*O,$e=q-H*te,I=Y-J*te,k=$e*qe-I*Qe,ee=we*I-Se*$e,oe=Qe*Se-qe*we;if(s){if(k<0||ee<0||oe<0)return null}else if((k<0||ee<0||oe<0)&&(k>0||ee>0||oe>0))return null;let re=k+ee+oe;if(re===0)return null;let de=$*(k*D+ee*O+oe*te);return(re>0?de<0:de>0)?null:this.at(de/re,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Zt=class extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},lu=new Ze,Fi=new Mr,Wa=new vi,cu=new L,Xa=new L,qa=new L,Ya=new L,vc=new L,Za=new L,hu=new L,$a=new L,nt=class extends Lt{constructor(e=new yt,t=new Zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Za.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(vc.fromBufferAttribute(f,e),a?Za.addScaledVector(vc,h):Za.addScaledVector(vc.sub(t),h))}t.add(Za)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Wa.copy(n.boundingSphere),Wa.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(Wa.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Wa,cu)===null||Fi.origin.distanceToSquared(cu)>(e.far-e.near)**2))&&(lu.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(lu),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=u.length;p<y;p++){let g=u[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),w=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,E=w;_<E;_+=3){let S=o.getX(_),P=o.getX(_+1),x=o.getX(_+2);s=Ja(this,m,e,n,c,h,f,S,P,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let g=p,m=y;g<m;g+=3){let M=o.getX(g),w=o.getX(g+1),_=o.getX(g+2);s=Ja(this,a,e,n,c,h,f,M,w,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,y=u.length;p<y;p++){let g=u[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),w=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,E=w;_<E;_+=3){let S=_,P=_+1,x=_+2;s=Ja(this,m,e,n,c,h,f,S,P,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let g=p,m=y;g<m;g+=3){let M=g,w=g+1,_=g+2;s=Ja(this,a,e,n,c,h,f,M,w,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function bp(i,e,t,n,s,r,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Zn,o),l===null)return null;$a.copy(o),$a.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo($a);return c<t.near||c>t.far?null:{distance:c,point:$a.clone(),object:i}}function Ja(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Xa),i.getVertexPosition(l,qa),i.getVertexPosition(c,Ya);let h=bp(i,e,t,n,Xa,qa,Ya,hu);if(h){let f=new L;si.getBarycoord(hu,Xa,qa,Ya,f),s&&(h.uv=si.getInterpolatedAttribute(s,o,l,c,f,new he)),r&&(h.uv1=si.getInterpolatedAttribute(r,o,l,c,f,new he)),a&&(h.normal=si.getInterpolatedAttribute(a,o,l,c,f,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new L,materialIndex:0};si.getNormal(Xa,qa,Ya,u.normal),h.face=u,h.barycoord=f}return h}var ai=class extends en{constructor(e=null,t=1,n=1,s,r,a,o,l,c=At,h=At,f,u){super(null,a,o,l,c,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends Tt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ms=new Ze,uu=new Ze,Ka=[],fu=new Xn,wp=new Ze,sr=new nt,rr=new vi,Sr=class extends nt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,wp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),fu.copy(e.boundingBox).applyMatrix4(ms),this.boundingBox.union(fu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),rr.copy(e.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(n),e.ray.intersectsSphere(rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ms),uu.multiplyMatrices(n,ms),sr.matrixWorld=uu,sr.raycast(e,Ka);for(let a=0,o=Ka.length;a<o;a++){let l=Ka[a];l.instanceId=r,l.object=this,t.push(l)}Ka.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ai(new Float32Array(s*this.count),s,this.count,Zo,xn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Oi=new vi,Ep=new he(.5,.5),ja=new L,Cs=class{constructor(e=new ln,t=new ln,n=new ln,s=new ln,r=new ln,a=new ln){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],y=r[9],g=r[10],m=r[11],M=r[12],w=r[13],_=r[14],E=r[15];if(s[0].setComponents(c-a,d-h,m-p,E-M).normalize(),s[1].setComponents(c+a,d+h,m+p,E+M).normalize(),s[2].setComponents(c+o,d+f,m+y,E+w).normalize(),s[3].setComponents(c-o,d-f,m-y,E-w).normalize(),n)s[4].setComponents(l,u,g,_).normalize(),s[5].setComponents(c-l,d-u,m-g,E-_).normalize();else if(s[4].setComponents(c-l,d-u,m-g,E-_).normalize(),t===Rn)s[5].setComponents(c+l,d+u,m+g,E+_).normalize();else if(t===Ms)s[5].setComponents(l,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){Oi.center.set(0,0,0);let t=Ep.distanceTo(e.center);return Oi.radius=.7071067811865476+t,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ja.x=s.normal.x>0?e.max.x:e.min.x,ja.y=s.normal.y>0?e.max.y:e.min.y,ja.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ja)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var br=class extends en{constructor(e=[],t=Ti,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Vt=class extends en{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var qn=class extends en{constructor(e,t,n=In,s,r,a,o=At,l=At,c,h=Vn,f=1){if(h!==Vn&&h!==$n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},_o=class extends qn{constructor(e,t=In,n=Ti,s,r,a=At,o=At,l,c=Vn){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},wr=class extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},sn=class i extends yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(f,2));function p(y,g,m,M,w,_,E,S,P,x,T){let A=_/P,R=E/x,D=_/2,U=E/2,N=S/2,O=P+1,q=x+1,Y=0,te=0,H=new L;for(let J=0;J<q;J++){let $=J*R-U;for(let we=0;we<O;we++){let Se=we*A-D;H[y]=Se*M,H[g]=$*w,H[m]=N,c.push(H.x,H.y,H.z),H[y]=0,H[g]=0,H[m]=S>0?1:-1,h.push(H.x,H.y,H.z),f.push(we/P),f.push(1-J/x),Y+=1}}for(let J=0;J<x;J++)for(let $=0;$<P;$++){let we=u+$+O*J,Se=u+$+O*(J+1),Qe=u+($+1)+O*(J+1),qe=u+($+1)+O*J;l.push(we,Se,qe),l.push(Se,Qe,qe),te+=6}o.addGroup(d,te,T),d+=te,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Er=class i extends yt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,y=[],g=n/2,m=0;M(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new tt(f,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(d,2));function M(){let _=new L,E=new L,S=0,P=(t-e)/n;for(let x=0;x<=r;x++){let T=[],A=x/r,R=A*(t-e)+e;for(let D=0;D<=s;D++){let U=D/s,N=U*l+o,O=Math.sin(N),q=Math.cos(N);E.x=R*O,E.y=-A*n+g,E.z=R*q,f.push(E.x,E.y,E.z),_.set(O,P,q).normalize(),u.push(_.x,_.y,_.z),d.push(U,1-A),T.push(p++)}y.push(T)}for(let x=0;x<s;x++)for(let T=0;T<r;T++){let A=y[T][x],R=y[T+1][x],D=y[T+1][x+1],U=y[T][x+1];(e>0||T!==0)&&(h.push(A,R,U),S+=3),(t>0||T!==r-1)&&(h.push(R,D,U),S+=3)}c.addGroup(m,S,0),m+=S}function w(_){let E=p,S=new he,P=new L,x=0,T=_===!0?e:t,A=_===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,g*A,0),u.push(0,A,0),d.push(.5,.5),p++;let R=p;for(let D=0;D<=s;D++){let N=D/s*l+o,O=Math.cos(N),q=Math.sin(N);P.x=T*q,P.y=g*A,P.z=T*O,f.push(P.x,P.y,P.z),u.push(0,A,0),S.x=O*.5+.5,S.y=q*.5*A+.5,d.push(S.x,S.y),p++}for(let D=0;D<s;D++){let U=E+D,N=R+D;_===!0?h.push(N,N+1,U):h.push(N+1,N,U),x+=3}c.addGroup(m,x,_===!0?1:2),m+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var vo=class i extends yt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new tt(r,3)),this.setAttribute("normal",new tt(r.slice(),3)),this.setAttribute("uv",new tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let w=new L,_=new L,E=new L;for(let S=0;S<t.length;S+=3)d(t[S+0],w),d(t[S+1],_),d(t[S+2],E),l(w,_,E,M)}function l(M,w,_,E){let S=E+1,P=[];for(let x=0;x<=S;x++){P[x]=[];let T=M.clone().lerp(_,x/S),A=w.clone().lerp(_,x/S),R=S-x;for(let D=0;D<=R;D++)D===0&&x===S?P[x][D]=T:P[x][D]=T.clone().lerp(A,D/R)}for(let x=0;x<S;x++)for(let T=0;T<2*(S-x)-1;T++){let A=Math.floor(T/2);T%2===0?(u(P[x][A+1]),u(P[x+1][A]),u(P[x][A])):(u(P[x][A+1]),u(P[x+1][A+1]),u(P[x+1][A]))}}function c(M){let w=new L;for(let _=0;_<r.length;_+=3)w.x=r[_+0],w.y=r[_+1],w.z=r[_+2],w.normalize().multiplyScalar(M),r[_+0]=w.x,r[_+1]=w.y,r[_+2]=w.z}function h(){let M=new L;for(let w=0;w<r.length;w+=3){M.x=r[w+0],M.y=r[w+1],M.z=r[w+2];let _=g(M)/2/Math.PI+.5,E=m(M)/Math.PI+.5;a.push(_,1-E)}p(),f()}function f(){for(let M=0;M<a.length;M+=6){let w=a[M+0],_=a[M+2],E=a[M+4],S=Math.max(w,_,E),P=Math.min(w,_,E);S>.9&&P<.1&&(w<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,w){let _=M*3;w.x=e[_+0],w.y=e[_+1],w.z=e[_+2]}function p(){let M=new L,w=new L,_=new L,E=new L,S=new he,P=new he,x=new he;for(let T=0,A=0;T<r.length;T+=9,A+=6){M.set(r[T+0],r[T+1],r[T+2]),w.set(r[T+3],r[T+4],r[T+5]),_.set(r[T+6],r[T+7],r[T+8]),S.set(a[A+0],a[A+1]),P.set(a[A+2],a[A+3]),x.set(a[A+4],a[A+5]),E.copy(M).add(w).add(_).divideScalar(3);let R=g(E);y(S,A+0,M,R),y(P,A+2,w,R),y(x,A+4,_,R)}}function y(M,w,_,E){E<0&&M.x===1&&(a[w]=M.x-1),_.x===0&&_.z===0&&(a[w]=E/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new he:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,s=[],r=[],a=[],o=new L,l=new Ze;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(et(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(et(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ps=class extends cn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},yo=class extends Ps{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function th(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var du=new L,pu=new L,yc=new th,Mc=new th,Sc=new th,Mo=class extends cn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(pu.subVectors(s[0],s[1]).add(s[0]),c=pu);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(du.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=du),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(f),d),y=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),yc.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,p,y,g),Mc.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,p,y,g),Sc.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,p,y,g)}else this.curveType==="catmullrom"&&(yc.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),Mc.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Sc.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(yc.calc(l),Mc.calc(l),Sc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function mu(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Tp(i,e){let t=1-i;return t*t*e}function Ap(i,e){return 2*(1-i)*i*e}function Rp(i,e){return i*i*e}function cr(i,e,t,n){return Tp(i,e)+Ap(i,t)+Rp(i,n)}function Cp(i,e){let t=1-i;return t*t*t*e}function Pp(i,e){let t=1-i;return 3*t*t*i*e}function Ip(i,e){return 3*(1-i)*i*i*e}function Lp(i,e){return i*i*i*e}function hr(i,e,t,n,s){return Cp(i,e)+Pp(i,t)+Ip(i,n)+Lp(i,s)}var Tr=class extends cn{constructor(e=new he,t=new he,n=new he,s=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new he){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(hr(e,s.x,r.x,a.x,o.x),hr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},So=class extends cn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(hr(e,s.x,r.x,a.x,o.x),hr(e,s.y,r.y,a.y,o.y),hr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ar=class extends cn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bo=class extends cn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rr=class extends cn{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(cr(e,s.x,r.x,a.x),cr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wo=class extends cn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(cr(e,s.x,r.x,a.x),cr(e,s.y,r.y,a.y),cr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cr=class extends cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(mu(o,l.x,c.x,h.x,f.x),mu(o,l.y,c.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new he().fromArray(s))}return this}},Cc=Object.freeze({__proto__:null,ArcCurve:yo,CatmullRomCurve3:Mo,CubicBezierCurve:Tr,CubicBezierCurve3:So,EllipseCurve:Ps,LineCurve:Ar,LineCurve3:bo,QuadraticBezierCurve:Rr,QuadraticBezierCurve3:wo,SplineCurve:Cr}),Eo=class extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Cc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Cc[s.type]().fromJSON(s))}return this}},Pr=class extends Eo{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ar(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Rr(this.currentPoint.clone(),new he(e,t),new he(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Tr(this.currentPoint.clone(),new he(e,t),new he(n,s),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Cr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new Ps(e,t,n,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},zi=class extends Pr{constructor(e){super(e),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Pr().fromJSON(s))}return this}};function Dp(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=cf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Bp(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,f=l;for(let u=t;u<s;u+=t){let d=i[u],p=i[u+1];d<o&&(o=d),p<l&&(l=p),d>h&&(h=d),p>f&&(f=p)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return Ir(r,a,t,o,l,c,0),a}function cf(i,e,t,n,s){let r;if(s===$p(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=gu(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=gu(a/n|0,i[a],i[a+1],r);return r&&Is(r,r.next)&&(Dr(r),r=r.next),r}function Vi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Is(t,t.next)||Mt(t.prev,t,t.next)===0)){if(Dr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ir(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Gp(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Up(i,n,s,r):Np(i)){e.push(l.i,i.i,c.i),Dr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Fp(Vi(i),e),Ir(i,e,t,n,s,r,2)):a===2&&Op(i,e,t,n,s,r):Ir(Vi(i),e,t,n,s,r,1);break}}}function Np(i){let e=i.prev,t=i,n=i.next;if(Mt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),f=Math.min(o,l,c),u=Math.max(s,r,a),d=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&ar(s,o,r,l,a,c,p.x,p.y)&&Mt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Up(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Mt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,l,c),p=Math.min(h,f,u),y=Math.max(o,l,c),g=Math.max(h,f,u),m=Pc(d,p,e,t,n),M=Pc(y,g,e,t,n),w=i.prevZ,_=i.nextZ;for(;w&&w.z>=m&&_&&_.z<=M;){if(w.x>=d&&w.x<=y&&w.y>=p&&w.y<=g&&w!==s&&w!==a&&ar(o,h,l,f,c,u,w.x,w.y)&&Mt(w.prev,w,w.next)>=0||(w=w.prevZ,_.x>=d&&_.x<=y&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&ar(o,h,l,f,c,u,_.x,_.y)&&Mt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;w&&w.z>=m;){if(w.x>=d&&w.x<=y&&w.y>=p&&w.y<=g&&w!==s&&w!==a&&ar(o,h,l,f,c,u,w.x,w.y)&&Mt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=y&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&ar(o,h,l,f,c,u,_.x,_.y)&&Mt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Fp(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Is(n,s)&&uf(n,t,t.next,s)&&Lr(n,s)&&Lr(s,n)&&(e.push(n.i,t.i,s.i),Dr(t),Dr(t.next),t=i=s),t=t.next}while(t!==i);return Vi(t)}function Op(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qp(a,o)){let l=ff(a,o);a=Vi(a,a.next),l=Vi(l,l.next),Ir(a,e,t,n,s,r,0),Ir(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Bp(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=cf(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Xp(c))}s.sort(kp);for(let r=0;r<s.length;r++)t=zp(s[r],t);return t}function kp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function zp(i,e){let t=Vp(i,e);if(!t)return e;let n=ff(t,i);return Vi(n,n.next),Vi(t,t.next)}function Vp(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Is(i,t))return t;do{if(Is(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&hf(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let f=Math.abs(s-t.y)/(n-t.x);Lr(t,i)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&Hp(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function Hp(i,e){return Mt(i.prev,i,e.prev)<0&&Mt(e.next,i,i.next)<0}function Gp(i,e,t,n){let s=i;do s.z===0&&(s.z=Pc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Wp(s)}function Wp(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Pc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Xp(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function hf(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function ar(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&hf(i,e,t,n,s,r,a,o)}function qp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Yp(i,e)&&(Lr(i,e)&&Lr(e,i)&&Zp(i,e)&&(Mt(i.prev,i,e.prev)||Mt(i,e.prev,e))||Is(i,e)&&Mt(i.prev,i,i.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Is(i,e){return i.x===e.x&&i.y===e.y}function uf(i,e,t,n){let s=eo(Mt(i,e,t)),r=eo(Mt(i,e,n)),a=eo(Mt(t,n,i)),o=eo(Mt(t,n,e));return!!(s!==r&&a!==o||s===0&&Qa(i,t,e)||r===0&&Qa(i,n,e)||a===0&&Qa(t,i,n)||o===0&&Qa(t,e,n))}function Qa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function eo(i){return i>0?1:i<0?-1:0}function Yp(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&uf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Lr(i,e){return Mt(i.prev,i,i.next)<0?Mt(i,e,i.next)>=0&&Mt(i,i.prev,e)>=0:Mt(i,e,i.prev)<0||Mt(i,i.next,e)<0}function Zp(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function ff(i,e){let t=Ic(i.i,i.x,i.y),n=Ic(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function gu(i,e,t,n){let s=Ic(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Dr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ic(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $p(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Lc=class{static triangulate(e,t,n=2){return Dp(e,t,n)}},Bi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];xu(e),_u(n,e);let a=e.length;t.forEach(xu);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,_u(n,t[l]);let o=Lc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function xu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _u(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Hi=class i extends yt{constructor(e=new zi([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Jp,w,_=!1,E,S,P,x;if(m){w=m.getSpacedPoints(h),_=!0,u=!1;let j=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(h,j),S=new L,P=new L,x=new L}u||(g=0,d=0,p=0,y=0);let T=o.extractPoints(c),A=T.shape,R=T.holes;if(!Bi.isClockWise(A)){A=A.reverse();for(let j=0,se=R.length;j<se;j++){let ae=R[j];Bi.isClockWise(ae)&&(R[j]=ae.reverse())}}function U(j){let ae=10000000000000001e-36,le=j[0];for(let fe=1;fe<=j.length;fe++){let Re=fe%j.length,Pe=j[Re],ke=Pe.x-le.x,We=Pe.y-le.y,F=ke*ke+We*We,at=Math.max(Math.abs(Pe.x),Math.abs(Pe.y),Math.abs(le.x),Math.abs(le.y)),Je=ae*at*at;if(F<=Je){j.splice(Re,1),fe--;continue}le=Pe}}U(A),R.forEach(U);let N=R.length,O=A;for(let j=0;j<N;j++){let se=R[j];A=A.concat(se)}function q(j,se,ae){return se||Ve("ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(se,ae)}let Y=A.length;function te(j,se,ae){let le,fe,Re,Pe=j.x-se.x,ke=j.y-se.y,We=ae.x-j.x,F=ae.y-j.y,at=Pe*Pe+ke*ke,Je=Pe*F-ke*We;if(Math.abs(Je)>Number.EPSILON){let C=Math.sqrt(at),v=Math.sqrt(We*We+F*F),V=se.x-ke/C,G=se.y+Pe/C,K=ae.x-F/v,ue=ae.y+We/v,pe=((K-V)*F-(ue-G)*We)/(Pe*F-ke*We);le=V+Pe*pe-j.x,fe=G+ke*pe-j.y;let Q=le*le+fe*fe;if(Q<=2)return new he(le,fe);Re=Math.sqrt(Q/2)}else{let C=!1;Pe>Number.EPSILON?We>Number.EPSILON&&(C=!0):Pe<-Number.EPSILON?We<-Number.EPSILON&&(C=!0):Math.sign(ke)===Math.sign(F)&&(C=!0),C?(le=-ke,fe=Pe,Re=Math.sqrt(at)):(le=Pe,fe=ke,Re=Math.sqrt(at/2))}return new he(le/Re,fe/Re)}let H=[];for(let j=0,se=O.length,ae=se-1,le=j+1;j<se;j++,ae++,le++)ae===se&&(ae=0),le===se&&(le=0),H[j]=te(O[j],O[ae],O[le]);let J=[],$,we=H.concat();for(let j=0,se=N;j<se;j++){let ae=R[j];$=[];for(let le=0,fe=ae.length,Re=fe-1,Pe=le+1;le<fe;le++,Re++,Pe++)Re===fe&&(Re=0),Pe===fe&&(Pe=0),$[le]=te(ae[le],ae[Re],ae[Pe]);J.push($),we=we.concat($)}let Se;if(g===0)Se=Bi.triangulateShape(O,R);else{let j=[],se=[];for(let ae=0;ae<g;ae++){let le=ae/g,fe=d*Math.cos(le*Math.PI/2),Re=p*Math.sin(le*Math.PI/2)+y;for(let Pe=0,ke=O.length;Pe<ke;Pe++){let We=q(O[Pe],H[Pe],Re);ee(We.x,We.y,-fe),le===0&&j.push(We)}for(let Pe=0,ke=N;Pe<ke;Pe++){let We=R[Pe];$=J[Pe];let F=[];for(let at=0,Je=We.length;at<Je;at++){let C=q(We[at],$[at],Re);ee(C.x,C.y,-fe),le===0&&F.push(C)}le===0&&se.push(F)}}Se=Bi.triangulateShape(j,se)}let Qe=Se.length,qe=p+y;for(let j=0;j<Y;j++){let se=u?q(A[j],we[j],qe):A[j];_?(P.copy(E.normals[0]).multiplyScalar(se.x),S.copy(E.binormals[0]).multiplyScalar(se.y),x.copy(w[0]).add(P).add(S),ee(x.x,x.y,x.z)):ee(se.x,se.y,0)}for(let j=1;j<=h;j++)for(let se=0;se<Y;se++){let ae=u?q(A[se],we[se],qe):A[se];_?(P.copy(E.normals[j]).multiplyScalar(ae.x),S.copy(E.binormals[j]).multiplyScalar(ae.y),x.copy(w[j]).add(P).add(S),ee(x.x,x.y,x.z)):ee(ae.x,ae.y,f/h*j)}for(let j=g-1;j>=0;j--){let se=j/g,ae=d*Math.cos(se*Math.PI/2),le=p*Math.sin(se*Math.PI/2)+y;for(let fe=0,Re=O.length;fe<Re;fe++){let Pe=q(O[fe],H[fe],le);ee(Pe.x,Pe.y,f+ae)}for(let fe=0,Re=R.length;fe<Re;fe++){let Pe=R[fe];$=J[fe];for(let ke=0,We=Pe.length;ke<We;ke++){let F=q(Pe[ke],$[ke],le);_?ee(F.x,F.y+w[h-1].y,w[h-1].x+ae):ee(F.x,F.y,f+ae)}}}$e(),I();function $e(){let j=s.length/3;if(u){let se=0,ae=Y*se;for(let le=0;le<Qe;le++){let fe=Se[le];oe(fe[2]+ae,fe[1]+ae,fe[0]+ae)}se=h+g*2,ae=Y*se;for(let le=0;le<Qe;le++){let fe=Se[le];oe(fe[0]+ae,fe[1]+ae,fe[2]+ae)}}else{for(let se=0;se<Qe;se++){let ae=Se[se];oe(ae[2],ae[1],ae[0])}for(let se=0;se<Qe;se++){let ae=Se[se];oe(ae[0]+Y*h,ae[1]+Y*h,ae[2]+Y*h)}}n.addGroup(j,s.length/3-j,0)}function I(){let j=s.length/3,se=0;k(O,se),se+=O.length;for(let ae=0,le=R.length;ae<le;ae++){let fe=R[ae];k(fe,se),se+=fe.length}n.addGroup(j,s.length/3-j,1)}function k(j,se){let ae=j.length;for(;--ae>=0;){let le=ae,fe=ae-1;fe<0&&(fe=j.length-1);for(let Re=0,Pe=h+g*2;Re<Pe;Re++){let ke=Y*Re,We=Y*(Re+1),F=se+le+ke,at=se+fe+ke,Je=se+fe+We,C=se+le+We;re(F,at,Je,C)}}}function ee(j,se,ae){l.push(j),l.push(se),l.push(ae)}function oe(j,se,ae){de(j),de(se),de(ae);let le=s.length/3,fe=M.generateTopUV(n,s,le-3,le-2,le-1);ze(fe[0]),ze(fe[1]),ze(fe[2])}function re(j,se,ae,le){de(j),de(se),de(le),de(se),de(ae),de(le);let fe=s.length/3,Re=M.generateSideWallUV(n,s,fe-6,fe-3,fe-2,fe-1);ze(Re[0]),ze(Re[1]),ze(Re[3]),ze(Re[1]),ze(Re[2]),ze(Re[3])}function de(j){s.push(l[j*3+0]),s.push(l[j*3+1]),s.push(l[j*3+2])}function ze(j){r.push(j.x),r.push(j.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Kp(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Cc[s.type]().fromJSON(s)),new i(n,e.options)}},Jp={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new he(r,a),new he(o,l),new he(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],d=e[s*3+1],p=e[s*3+2],y=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-f),new he(u,1-p),new he(y,1-m)]:[new he(o,1-l),new he(h,1-f),new he(d,1-p),new he(g,1-m)]}};function Kp(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Nr=class i extends vo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ur=class i extends yt{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=et(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/t,f=new L,u=new he,d=new L,p=new L,y=new L,g=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,d.x=m*1,d.y=-g,d.z=m*0,y.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=y.x,d.y+=y.y,d.z+=y.z,d.normalize(),l.push(d.x,d.y,d.z),y.copy(p)}for(let M=0;M<=t;M++){let w=n+M*h*s,_=Math.sin(w),E=Math.cos(w);for(let S=0;S<=e.length-1;S++){f.x=e[S].x*_,f.y=e[S].y,f.z=e[S].x*E,a.push(f.x,f.y,f.z),u.x=M/t,u.y=S/(e.length-1),o.push(u.x,u.y);let P=l[3*S+0]*_,x=l[3*S+1],T=l[3*S+0]*E;c.push(P,x,T)}}for(let M=0;M<t;M++)for(let w=0;w<e.length-1;w++){let _=w+M*e.length,E=_,S=_+e.length,P=_+e.length+1,x=_+1;r.push(E,S,x),r.push(P,x,S)}this.setIndex(r),this.setAttribute("position",new tt(a,3)),this.setAttribute("uv",new tt(o,2)),this.setAttribute("normal",new tt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}};var tn=class i extends yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,f=e/o,u=t/l,d=[],p=[],y=[],g=[];for(let m=0;m<h;m++){let M=m*u-a;for(let w=0;w<c;w++){let _=w*f-r;p.push(_,-M,0),y.push(0,0,1),g.push(w/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let w=M+c*m,_=M+c*(m+1),E=M+1+c*(m+1),S=M+1+c*m;d.push(w,_,S),d.push(_,E,S)}this.setIndex(d),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(y,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Fr=class i extends yt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new L,u=new L,d=[],p=[],y=[],g=[];for(let m=0;m<=n;m++){let M=[],w=m/n,_=a+w*o,E=e*Math.cos(_),S=Math.sqrt(e*e-E*E),P=0;m===0&&a===0?P=.5/t:m===n&&l===Math.PI&&(P=-.5/t);for(let x=0;x<=t;x++){let T=x/t,A=s+T*r;f.x=-S*Math.cos(A),f.y=E,f.z=S*Math.sin(A),p.push(f.x,f.y,f.z),u.copy(f).normalize(),y.push(u.x,u.y,u.z),g.push(T+P,1-w),M.push(c++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){let w=h[m][M+1],_=h[m][M],E=h[m+1][M],S=h[m+1][M+1];(m!==0||a>0)&&d.push(w,_,S),(m!==n-1||l<Math.PI)&&d.push(_,E,S)}this.setIndex(d),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(y,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Or=class i extends yt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],f=[],u=new L,d=new L,p=new L;for(let y=0;y<=n;y++){let g=a+y/n*o;for(let m=0;m<=s;m++){let M=m/s*r;d.x=(e+t*Math.cos(g))*Math.cos(M),d.y=(e+t*Math.cos(g))*Math.sin(M),d.z=t*Math.sin(g),c.push(d.x,d.y,d.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),f.push(m/s),f.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=s;g++){let m=(s+1)*y+g-1,M=(s+1)*(y-1)+g-1,w=(s+1)*(y-1)+g,_=(s+1)*y+g;l.push(m,M,_),l.push(M,w,_)}this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Yi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(vu(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(vu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Jt(i){let e={};for(let t=0;t<i.length;t++){let n=Yi(i[t]);for(let s in n)e[s]=n[s]}return e}function vu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function jp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var _n={clone:Yi,merge:Jt},Qp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wt=class extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qp,this.fragmentShader=e0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=jp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Te().setHex(s.value);break;case"v2":this.uniforms[n].value=new he().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new vt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ye().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ze().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ls=class extends wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},nn=class extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Os,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Br=class extends Cn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Os,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},kr=class extends Cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Os,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Vo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ds=class extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},To=class extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function gs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function bc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Mi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ao=class extends Mi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tc,endingEnd:Tc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ac:r=e,o=2*t-n;break;case Rc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ac:a=e,l=2*n-t;break;case Rc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),y=p*p,g=y*p,m=-u*g+2*u*y-u*p,M=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*p+1,w=(-1-d)*g+(1.5+d)*y+.5*p,_=d*g-d*y;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+M*a[c+E]+w*a[l+E]+_*a[f+E];return r}},Ro=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},Co=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Po=class extends Mi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(n-t)/(s-t),y=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*y+a[l+g]*p;return r}let u=o*2,d=e-1;for(let p=0;p!==o;++p){let y=a[c+p],g=a[l+p],m=d*u+p*2,M=f[m],w=f[m+1],_=e*u+p*2,E=h[_],S=h[_+1],P=n0(n,t,M,E,s);r[p]=df(P,y,w,S,g)}return r}};function df(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function t0(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function n0(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=df(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=t0(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var hn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gs(t,this.TimeBufferType),this.values=gs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:gs(e.times,Array),values:gs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),bc(e.settings)&&(n.settings={inTangents:gs(e.settings.inTangents,Array),outTangents:gs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Co(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ro(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Po(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ur:t=this.InterpolantFactoryMethodDiscrete;break;case po:t=this.InterpolantFactoryMethodLinear;break;case io:t=this.InterpolantFactoryMethodSmooth;break;case Ec:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ur;case this.InterpolantFactoryMethodLinear:return po;case this.InterpolantFactoryMethodSmooth:return io;case this.InterpolantFactoryMethodBezier:return Ec}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;bc(this.settings)&&(yu(this.settings.inTangents,e),yu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ve("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ve("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Wd(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ve("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===io,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let f=o*n,u=f-n,d=f+n;for(let p=0;p!==n;++p){let y=t[f+p];if(y!==t[u+p]||y!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[f+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,bc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function yu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=po;var Si=class extends hn{constructor(e,t,n){super(e,t,n)}};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=ur;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var Io=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Io.prototype.ValueTypeName="color";var Lo=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};Lo.prototype.ValueTypeName="number";var Do=class extends Mi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Gn.slerpFlat(r,0,a,c-o,a,c,l);return r}},zr=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Do(this.times,this.values,this.getValueSize(),e)}};zr.prototype.ValueTypeName="quaternion";zr.prototype.InterpolantFactoryMethodSmooth=void 0;var bi=class extends hn{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=ur;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var No=class extends hn{constructor(e,t,n,s){super(e,t,n,s)}};No.prototype.ValueTypeName="vector";var Uo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},pf=new Uo,Fo=class{constructor(e){this.manager=e!==void 0?e:pf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Fo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ns=class extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Vr=class extends Ns{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},wc=new Ze,Mu=new L,Su=new L,Hr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=$t,this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Mu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mu),Su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Su),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){wc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(wc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Ms||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(wc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},to=new L,no=new Gn,Bn=new L,Gr=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(to,no,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,Bn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(to,no,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(to,no,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},xi=new L,bu=new he,wu=new he,kt=class extends Gr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,bu,wu),t.subVectors(wu,bu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(or*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Dc=class extends Hr{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0}},wi=class extends Ns{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Dc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Yn=class extends Gr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Nc=class extends Hr{constructor(){super(new Yn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Gi=class extends Ns{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Nc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var xs=-90,_s=1,Oo=class extends Lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new kt(xs,_s,e,t);s.layers=this.layers,this.add(s);let r=new kt(xs,_s,e,t);r.layers=this.layers,this.add(r);let a=new kt(xs,_s,e,t);a.layers=this.layers,this.add(a);let o=new kt(xs,_s,e,t);o.layers=this.layers,this.add(o);let l=new kt(xs,_s,e,t);l.layers=this.layers,this.add(l);let c=new kt(xs,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Bo=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Wr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=i0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function i0(){this._document.hidden===!1&&this.reset()}var ih="\\[\\]\\.:\\/",s0=new RegExp("["+ih+"]","g"),sh="[^"+ih+"]",r0="[^"+ih.replace("\\.","")+"]",a0=/((?:WC+[\/:])*)/.source.replace("WC",sh),o0=/(WCOD+)?/.source.replace("WCOD",r0),l0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",sh),c0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",sh),h0=new RegExp("^"+a0+o0+l0+c0+"$"),u0=["material","materials","bones","map"],Uc=class{constructor(e,t,n){let s=n||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},xt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(s0,"")}static parseTrackName(e){let t=h0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);u0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=Uc;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zv=new Float32Array(1);var Eu=new Ze,Xr=class{constructor(e,t,n=0,s=1/0){this.ray=new Mr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Es,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ve("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Eu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Eu),this}intersectObject(e,t=!0,n=[]){return Fc(e,this,n,t),n.sort(Tu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Fc(e[s],this,n,t);return n.sort(Tu),n}};function Tu(i,e){return i.distance-e.distance}function Fc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Fc(r[a],e,t,!0)}}var hh=class hh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};hh.prototype.isMatrix2=!0;var Oc=hh;function rh(i,e,t,n){let s=f0(n);switch(t){case $c:return i*e;case Zo:return i*e/s.components*s.byteLength;case $o:return i*e/s.components*s.byteLength;case Ci:return i*e*2/s.components*s.byteLength;case Jo:return i*e*2/s.components*s.byteLength;case Jc:return i*e*3/s.components*s.byteLength;case rn:return i*e*4/s.components*s.byteLength;case Ko:return i*e*4/s.components*s.byteLength;case ia:case sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ra:case aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qo:case tl:return Math.max(i,16)*Math.max(e,8)/4;case jo:case el:return Math.max(i,8)*Math.max(e,8)/2;case nl:case il:case rl:case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sl:case oa:case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Sl:case bl:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case El:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case la:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function f0(i){switch(i){case $t:case Xc:return{byteLength:1,components:1};case Fs:case qc:case Bt:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case In:case Xo:case xn:return{byteLength:4,components:1};case Yc:case Zc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ff(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function x0(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){let h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],y=f[d];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++u,f[u]=y)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let y=f[d];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var _0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,y0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,M0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,b0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,w0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,E0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,T0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,A0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,R0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,C0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,P0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,I0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,L0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,O0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,V0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,H0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,G0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Z0="gl_FragColor = linearToOutputTexel( gl_FragColor );",$0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,J0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,K0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,am=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,hm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_m=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ym=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Om=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ym=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Zm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$m=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ng=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ig=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,og=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ug=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Eg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ag=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Og=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Gg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:_0,alphahash_pars_fragment:v0,alphamap_fragment:y0,alphamap_pars_fragment:M0,alphatest_fragment:S0,alphatest_pars_fragment:b0,aomap_fragment:w0,aomap_pars_fragment:E0,batching_pars_vertex:T0,batching_vertex:A0,begin_vertex:R0,beginnormal_vertex:C0,bsdfs:P0,iridescence_fragment:I0,bumpmap_pars_fragment:L0,clipping_planes_fragment:D0,clipping_planes_pars_fragment:N0,clipping_planes_pars_vertex:U0,clipping_planes_vertex:F0,color_fragment:O0,color_pars_fragment:B0,color_pars_vertex:k0,color_vertex:z0,common:V0,cube_uv_reflection_fragment:H0,defaultnormal_vertex:G0,displacementmap_pars_vertex:W0,displacementmap_vertex:X0,emissivemap_fragment:q0,emissivemap_pars_fragment:Y0,colorspace_fragment:Z0,colorspace_pars_fragment:$0,envmap_fragment:J0,envmap_common_pars_fragment:K0,envmap_pars_fragment:j0,envmap_pars_vertex:Q0,envmap_physical_pars_fragment:hm,envmap_vertex:em,fog_vertex:tm,fog_pars_vertex:nm,fog_fragment:im,fog_pars_fragment:sm,gradientmap_pars_fragment:rm,lightmap_pars_fragment:am,lights_lambert_fragment:om,lights_lambert_pars_fragment:lm,lights_pars_begin:cm,lights_toon_fragment:um,lights_toon_pars_fragment:fm,lights_phong_fragment:dm,lights_phong_pars_fragment:pm,lights_physical_fragment:mm,lights_physical_pars_fragment:gm,lights_fragment_begin:xm,lights_fragment_maps:_m,lights_fragment_end:vm,lightprobes_pars_fragment:ym,logdepthbuf_fragment:Mm,logdepthbuf_pars_fragment:Sm,logdepthbuf_pars_vertex:bm,logdepthbuf_vertex:wm,map_fragment:Em,map_pars_fragment:Tm,map_particle_fragment:Am,map_particle_pars_fragment:Rm,metalnessmap_fragment:Cm,metalnessmap_pars_fragment:Pm,morphinstance_vertex:Im,morphcolor_vertex:Lm,morphnormal_vertex:Dm,morphtarget_pars_vertex:Nm,morphtarget_vertex:Um,normal_fragment_begin:Fm,normal_fragment_maps:Om,normal_pars_fragment:Bm,normal_pars_vertex:km,normal_vertex:zm,normalmap_pars_fragment:Vm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:Gm,clearcoat_pars_fragment:Wm,iridescence_pars_fragment:Xm,opaque_fragment:qm,packing:Ym,premultiplied_alpha_fragment:Zm,project_vertex:$m,dithering_fragment:Jm,dithering_pars_fragment:Km,roughnessmap_fragment:jm,roughnessmap_pars_fragment:Qm,shadowmap_pars_fragment:eg,shadowmap_pars_vertex:tg,shadowmap_vertex:ng,shadowmask_pars_fragment:ig,skinbase_vertex:sg,skinning_pars_vertex:rg,skinning_vertex:ag,skinnormal_vertex:og,specularmap_fragment:lg,specularmap_pars_fragment:cg,tonemapping_fragment:hg,tonemapping_pars_fragment:ug,transmission_fragment:fg,transmission_pars_fragment:dg,uv_pars_fragment:pg,uv_pars_vertex:mg,uv_vertex:gg,worldpos_vertex:xg,background_vert:_g,background_frag:vg,backgroundCube_vert:yg,backgroundCube_frag:Mg,cube_vert:Sg,cube_frag:bg,depth_vert:wg,depth_frag:Eg,distance_vert:Tg,distance_frag:Ag,equirect_vert:Rg,equirect_frag:Cg,linedashed_vert:Pg,linedashed_frag:Ig,meshbasic_vert:Lg,meshbasic_frag:Dg,meshlambert_vert:Ng,meshlambert_frag:Ug,meshmatcap_vert:Fg,meshmatcap_frag:Og,meshnormal_vert:Bg,meshnormal_frag:kg,meshphong_vert:zg,meshphong_frag:Vg,meshphysical_vert:Hg,meshphysical_frag:Gg,meshtoon_vert:Wg,meshtoon_frag:Xg,points_vert:qg,points_frag:Yg,shadow_vert:Zg,shadow_frag:$g,sprite_vert:Jg,sprite_frag:Kg},ye={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Kn={basic:{uniforms:Jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Te(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Jt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Jt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Jt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Te(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Jt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Jt([ye.points,ye.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Jt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Jt([ye.common,ye.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Jt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Jt([ye.sprite,ye.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:Jt([ye.common,ye.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:Jt([ye.lights,ye.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Kn.physical={uniforms:Jt([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var Pl={r:0,b:0,g:0},jg=new Ze,Of=new Ye;Of.set(-1,0,0,0,1,0,0,0,1);function Qg(i,e,t,n,s,r){let a=new Te(0),o=s===!0?0:1,l,c,h=null,f=0,u=null;function d(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let _=M.backgroundBlurriness>0;w=e.get(w,_)}return w}function p(M){let w=!1,_=d(M);_===null?g(a,o):_&&_.isColor&&(g(_,1),w=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(M,w){let _=d(w);_&&(_.isCubeTexture||_.mapping===ta)?(c===void 0&&(c=new nt(new sn(1,1,1),new wt({name:"BackgroundCubeMaterial",uniforms:Yi(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,S,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(jg.makeRotationFromEuler(w.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Of),c.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,(h!==_||f!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new nt(new tn(2,2),new wt({name:"BackgroundMaterial",uniforms:Yi(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,w){M.getRGB(Pl,nh(i)),t.buffers.color.setClear(Pl.r,Pl.g,Pl.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:p,addToRenderList:y,dispose:m}}function ex(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(R,D,U,N,O){let q=!1,Y=f(R,N,U,D);r!==Y&&(r=Y,c(r.object)),q=d(R,N,U,O),q&&p(R,N,U,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(R,D,U,N),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function f(R,D,U,N){let O=N.wireframe===!0,q=n[D.id];q===void 0&&(q={},n[D.id]=q);let Y=R.isInstancedMesh===!0?R.id:0,te=q[Y];te===void 0&&(te={},q[Y]=te);let H=te[U.id];H===void 0&&(H={},te[U.id]=H);let J=H[O];return J===void 0&&(J=u(l()),H[O]=J),J}function u(R){let D=[],U=[],N=[];for(let O=0;O<t;O++)D[O]=0,U[O]=0,N[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:N,object:R,attributes:{},index:null}}function d(R,D,U,N){let O=r.attributes,q=D.attributes,Y=0,te=U.getAttributes();for(let H in te)if(te[H].location>=0){let $=O[H],we=q[H];if(we===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(we=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(we=R.instanceColor)),$===void 0||$.attribute!==we||we&&$.data!==we.data)return!0;Y++}return r.attributesNum!==Y||r.index!==N}function p(R,D,U,N){let O={},q=D.attributes,Y=0,te=U.getAttributes();for(let H in te)if(te[H].location>=0){let $=q[H];$===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&($=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&($=R.instanceColor));let we={};we.attribute=$,$&&$.data&&(we.data=$.data),O[H]=we,Y++}r.attributes=O,r.attributesNum=Y,r.index=N}function y(){let R=r.newAttributes;for(let D=0,U=R.length;D<U;D++)R[D]=0}function g(R){m(R,0)}function m(R,D){let U=r.newAttributes,N=r.enabledAttributes,O=r.attributeDivisors;U[R]=1,N[R]===0&&(i.enableVertexAttribArray(R),N[R]=1),O[R]!==D&&(i.vertexAttribDivisor(R,D),O[R]=D)}function M(){let R=r.newAttributes,D=r.enabledAttributes;for(let U=0,N=D.length;U<N;U++)D[U]!==R[U]&&(i.disableVertexAttribArray(U),D[U]=0)}function w(R,D,U,N,O,q,Y){Y===!0?i.vertexAttribIPointer(R,D,U,O,q):i.vertexAttribPointer(R,D,U,N,O,q)}function _(R,D,U,N){y();let O=N.attributes,q=U.getAttributes(),Y=D.defaultAttributeValues;for(let te in q){let H=q[te];if(H.location>=0){let J=O[te];if(J===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(J=R.instanceColor)),J!==void 0){let $=J.normalized,we=J.itemSize,Se=e.get(J);if(Se===void 0)continue;let Qe=Se.buffer,qe=Se.type,$e=Se.bytesPerElement,I=qe===i.INT||qe===i.UNSIGNED_INT||J.gpuType===Xo;if(J.isInterleavedBufferAttribute){let k=J.data,ee=k.stride,oe=J.offset;if(k.isInstancedInterleavedBuffer){for(let re=0;re<H.locationSize;re++)m(H.location+re,k.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let re=0;re<H.locationSize;re++)g(H.location+re);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let re=0;re<H.locationSize;re++)w(H.location+re,we/H.locationSize,qe,$,ee*$e,(oe+we/H.locationSize*re)*$e,I)}else{if(J.isInstancedBufferAttribute){for(let k=0;k<H.locationSize;k++)m(H.location+k,J.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let k=0;k<H.locationSize;k++)g(H.location+k);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let k=0;k<H.locationSize;k++)w(H.location+k,we/H.locationSize,qe,$,we*$e,we/H.locationSize*k*$e,I)}}else if(Y!==void 0){let $=Y[te];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(H.location,$);break;case 3:i.vertexAttrib3fv(H.location,$);break;case 4:i.vertexAttrib4fv(H.location,$);break;default:i.vertexAttrib1fv(H.location,$)}}}}M()}function E(){T();for(let R in n){let D=n[R];for(let U in D){let N=D[U];for(let O in N){let q=N[O];for(let Y in q)h(q[Y].object),delete q[Y];delete N[O]}}delete n[R]}}function S(R){if(n[R.id]===void 0)return;let D=n[R.id];for(let U in D){let N=D[U];for(let O in N){let q=N[O];for(let Y in q)h(q[Y].object),delete q[Y];delete N[O]}}delete n[R.id]}function P(R){for(let D in n){let U=n[D];for(let N in U){let O=U[N];if(O[R.id]===void 0)continue;let q=O[R.id];for(let Y in q)h(q[Y].object),delete q[Y];delete O[R.id]}}}function x(R){for(let D in n){let U=n[D],N=R.isInstancedMesh===!0?R.id:0,O=U[N];if(O!==void 0){for(let q in O){let Y=O[q];for(let te in Y)h(Y[te].object),delete Y[te];delete O[q]}delete U[N],Object.keys(U).length===0&&delete n[D]}}}function T(){A(),a=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:A,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:g,disableUnusedAttributes:M}}function tx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function nx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==rn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let x=P===Bt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==$t&&P!==xn&&!x&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:_,maxSamples:E,samples:S}}function ix(i){let e=this,t=null,n=0,s=!1,r=!1,a=new ln,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,y=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{let M=r?0:n,w=M*4,_=m.clippingState||null;l.value=_,_=h(p,u,w,d);for(let E=0;E!==w;++E)_[E]=t[E];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,p){let y=f!==null?f.length:0,g=null;if(y!==0){if(g=l.value,p!==!0||g===null){let m=d+y*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let w=0,_=d;w!==y;++w,_+=4)a.copy(f[w]).applyMatrix4(M,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var ks=4,sx=6,rx=20,ax=256,ca=new Yn,mf=new Te,uh=null,fh=0,dh=0,ph=!1,ox=new L,Zi=new L,Vs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=ox}=r;uh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_f(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(uh,fh,dh),this._renderer.xr.enabled=ph,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),uh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:Bt,format:rn,colorSpace:fr,depthBuffer:!1},s=gf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=lx(r)),this._blurMaterial=hx(r,e,t),this._ggxMaterial=cx(r,e,t)}return s}_compileMaterial(e){let t=new nt(new yt,e);this._renderer.compile(t,ca)}_sceneToCubeUV(e,t,n,s,r){let l=new kt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(mf),f.toneMapping=Pn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nt(new sn,new Zt({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,m=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(mf),m=!0);for(let w=0;w<6;w++){let _=w%3;_===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):_===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let E=this._cubeSize;Bs(s,_*E,w>2?E:0,E,E),f.setRenderTarget(s),m&&f.render(y,l),f.render(e,l)}f.toneMapping=d,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ti||e.mapping===qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_f()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Bs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ca)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:p}=this,y=this._sizeLods[n],g=3*y*(n>p-ks?n-p+ks:0),m=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,Bs(r,g,m,3*y,2*y),s.setRenderTarget(r),s.render(o,ca),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Bs(e,g,m,3*y,2*y),s.setRenderTarget(e),s.render(o,ca)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-ks?s-this._lodMax+ks:0),u=4*(this._cubeSize-h);Bs(t,f,u,3*h,2*h),a.setRenderTarget(t),a.render(l,ca)}};function lx(i){let e=[],t=[],n=i,s=i-ks+1+sx;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,p=new Float32Array(d*u*f),y=new Float32Array(d*u*f);for(let m=0;m<f;m++){let M=m%3*2/3-1,w=m>2?0:-1,_=[M,w,0,M+2/3,w,0,M+2/3,w+1,0,M,w,0,M+2/3,w+1,0,M,w+1,0];p.set(_,d*u*m);for(let E=0;E<u;E++){let S=h[E*2]*2-1,P=h[E*2+1]*2-1;m===0?Zi.set(1,P,S):m===1?Zi.set(-S,1,-P):m===2?Zi.set(-S,P,1):m===3?Zi.set(-1,P,-S):m===4?Zi.set(-S,-1,P):Zi.set(S,P,-1),Zi.toArray(y,(m*u+E)*d)}}let g=new yt;g.setAttribute("position",new Tt(p,d)),g.setAttribute("outputDirection",new Tt(y,d)),t.push(new nt(g,null)),n>ks&&n--}return{lodMeshes:t,sizeLods:e}}function gf(i,e,t){let n=new bt(i,e,t);return n.texture.mapping=ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function cx(i,e,t){return new wt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ax,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function hx(i,e,t){return new wt({name:"SphericalGaussianBlur",defines:{SAMPLES:rx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Nl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function xf(){return new wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function _f(){return new wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rt,depthTest:!1,depthWrite:!1})}function Nl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ll=class extends bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new br(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new sn(5,5,5),r=new wt({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:Rt});r.uniforms.tEquirect.value=t;let a=new nt(s,r),o=t.minFilter;return t.minFilter===Ai&&(t.minFilter=zt),new Oo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function ux(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Ho||d===Go)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let y=new Ll(p.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,p=d===Ho||d===Go,y=d===Ti||d===qi;if(p||y){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Vs(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let M=u.image;return p&&M&&M.height>0||y&&M&&l(M)?(n===null&&(n=new Vs(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===Ho?u.mapping=Ti:d===Go&&(u.mapping=qi),u}function l(u){let d=0,p=6;for(let y=0;y<p;y++)u[y]!==void 0&&d++;return d===p}function c(u){let d=u.target;d.removeEventListener("dispose",c);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function fx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ki("WebGLRenderer: "+n+" extension not supported."),s}}}function dx(i,e,t,n){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];let d=r.get(u);d&&(e.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)e.update(u[d],i.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,p=f.attributes.position,y=0;if(p===void 0)return;if(d!==null){let M=d.array;y=d.version;for(let w=0,_=M.length;w<_;w+=3){let E=M[w+0],S=M[w+1],P=M[w+2];u.push(E,S,S,P,P,E)}}else{let M=p.array;y=p.version;for(let w=0,_=M.length/3-1;w<_;w+=3){let E=w+0,S=w+1,P=w+2;u.push(E,S,S,P,P,E)}}let g=new(p.count>=65535?_r:xr)(u,1);g.version=y;let m=r.get(f);m&&e.remove(m),r.set(f,g)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function px(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function c(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let y=0;for(let g=0;g<d;g++)y+=u[g];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function mx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ve("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gx(i,e,t){let n=new WeakMap,s=new vt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let T=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],w=0;d===!0&&(w=1),p===!0&&(w=2),y===!0&&(w=3);let _=o.attributes.position.count*w,E=1;_>e.maxTextureSize&&(E=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let S=new Float32Array(_*E*4*f),P=new gr(S,_,E,f);P.type=xn,P.needsUpdate=!0;let x=w*4;for(let A=0;A<f;A++){let R=g[A],D=m[A],U=M[A],N=_*E*4*A;for(let O=0;O<R.count;O++){let q=O*x;d===!0&&(s.fromBufferAttribute(R,O),S[N+q+0]=s.x,S[N+q+1]=s.y,S[N+q+2]=s.z,S[N+q+3]=0),p===!0&&(s.fromBufferAttribute(D,O),S[N+q+4]=s.x,S[N+q+5]=s.y,S[N+q+6]=s.z,S[N+q+7]=0),y===!0&&(s.fromBufferAttribute(U,O),S[N+q+8]=s.x,S[N+q+9]=s.y,S[N+q+10]=s.z,S[N+q+11]=U.itemSize===4?s.w:1)}}u={count:f,texture:P,size:new he(_,E)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function xx(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,f=c.geometry,u=e.get(c,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var _x={[$r]:"LINEAR_TONE_MAPPING",[Jr]:"REINHARD_TONE_MAPPING",[Kr]:"CINEON_TONE_MAPPING",[jr]:"ACES_FILMIC_TONE_MAPPING",[ea]:"AGX_TONE_MAPPING",[Xi]:"NEUTRAL_TONE_MAPPING",[Qr]:"CUSTOM_TONE_MAPPING"};function vx(i,e,t,n,s,r){let a=new bt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new yt;c.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new tt([0,2,0,0,2,0],2));let h=new Ls({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new nt(c,h),u=new Yn(-1,1,1,-1,0,1),d=null,p=null,y=!1,g,m=null,M=[],w=!1;this.setSize=function(_,E){a.setSize(_,E),o!==null&&o.setSize(_,E),l!==null&&l.setSize(_,E);for(let S=0;S<M.length;S++){let P=M[S];P.setSize&&P.setSize(_,E)}},this.setEffects=function(_){M=_,w=M.length>0&&M[0].isRenderPass===!0;let E=a.width,S=a.height;M.length>0&&o===null&&(o=new bt(E,S,{type:Bt,depthBuffer:!1,stencilBuffer:!1}),l=new bt(E,S,{type:Bt,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<M.length;P++){let x=M[P];x.setSize&&x.setSize(E,S)}},this.begin=function(_,E){if(y||_.toneMapping===Pn&&M.length===0)return!1;if(m=E,E!==null){let S=E.width,P=E.height;(a.width!==S||a.height!==P)&&this.setSize(S,P)}return w===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=Pn,!0},this.hasRenderPass=function(){return w},this.end=function(_,E){_.toneMapping=g,y=!0;let S=a,P=o;for(let x=0;x<M.length;x++){let T=M[x];T.enabled!==!1&&(T.render(_,P,S,E),T.needsSwap!==!1&&(S=P,P=P===o?l:o))}if(d!==_.outputColorSpace||p!==_.toneMapping){d=_.outputColorSpace,p=_.toneMapping,h.defines={},it.getTransfer(d)===lt&&(h.defines.SRGB_TRANSFER="");let x=_x[p];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(m),_.render(f,u),m=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Bf=new en,xh=new qn(1,1),kf=new gr,zf=new xo,Vf=new br,vf=[],yf=[],Mf=new Float32Array(16),Sf=new Float32Array(9),bf=new Float32Array(4);function Hs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=vf[s];if(r===void 0&&(r=new Float32Array(s),vf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ul(i,e){let t=yf[e];t===void 0&&(t=new Int32Array(e),yf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function yx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function Sx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function wx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;bf.set(n),i.uniformMatrix2fv(this.addr,!1,bf),Nt(t,n)}}function Ex(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;Sf.set(n),i.uniformMatrix3fv(this.addr,!1,Sf),Nt(t,n)}}function Tx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;Mf.set(n),i.uniformMatrix4fv(this.addr,!1,Mf),Nt(t,n)}}function Ax(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function Cx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function Px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function Ix(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function Dx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function Nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function Ux(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(xh.compareFunction=t.isReversedDepthBuffer()?Cl:Rl,r=xh):r=Bf,t.setTexture2D(e||r,s)}function Fx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||zf,s)}function Ox(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Vf,s)}function Bx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||kf,s)}function kx(i){switch(i){case 5126:return yx;case 35664:return Mx;case 35665:return Sx;case 35666:return bx;case 35674:return wx;case 35675:return Ex;case 35676:return Tx;case 5124:case 35670:return Ax;case 35667:case 35671:return Rx;case 35668:case 35672:return Cx;case 35669:case 35673:return Px;case 5125:return Ix;case 36294:return Lx;case 36295:return Dx;case 36296:return Nx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ux;case 35679:case 36299:case 36307:return Fx;case 35680:case 36300:case 36308:case 36293:return Ox;case 36289:case 36303:case 36311:case 36292:return Bx}}function zx(i,e){i.uniform1fv(this.addr,e)}function Vx(i,e){let t=Hs(e,this.size,2);i.uniform2fv(this.addr,t)}function Hx(i,e){let t=Hs(e,this.size,3);i.uniform3fv(this.addr,t)}function Gx(i,e){let t=Hs(e,this.size,4);i.uniform4fv(this.addr,t)}function Wx(i,e){let t=Hs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Xx(i,e){let t=Hs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function qx(i,e){let t=Hs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Yx(i,e){i.uniform1iv(this.addr,e)}function Zx(i,e){i.uniform2iv(this.addr,e)}function $x(i,e){i.uniform3iv(this.addr,e)}function Jx(i,e){i.uniform4iv(this.addr,e)}function Kx(i,e){i.uniform1uiv(this.addr,e)}function jx(i,e){i.uniform2uiv(this.addr,e)}function Qx(i,e){i.uniform3uiv(this.addr,e)}function e_(i,e){i.uniform4uiv(this.addr,e)}function t_(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=xh:a=Bf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function n_(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||zf,r[a])}function i_(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Vf,r[a])}function s_(i,e,t){let n=this.cache,s=e.length,r=Ul(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||kf,r[a])}function r_(i){switch(i){case 5126:return zx;case 35664:return Vx;case 35665:return Hx;case 35666:return Gx;case 35674:return Wx;case 35675:return Xx;case 35676:return qx;case 5124:case 35670:return Yx;case 35667:case 35671:return Zx;case 35668:case 35672:return $x;case 35669:case 35673:return Jx;case 5125:return Kx;case 36294:return jx;case 36295:return Qx;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return t_;case 35679:case 36299:case 36307:return n_;case 35680:case 36300:case 36308:case 36293:return i_;case 36289:case 36303:case 36311:case 36292:return s_}}var _h=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kx(t.type)}},vh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=r_(t.type)}},yh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},mh=/(\w+)(\])?(\[|\.)?/g;function wf(i,e){i.seq.push(e),i.map[e.id]=e}function a_(i,e,t){let n=i.name,s=n.length;for(mh.lastIndex=0;;){let r=mh.exec(n),a=mh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){wf(t,c===void 0?new _h(o,i,e):new vh(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new yh(o),wf(t,f)),t=f}}}var zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);a_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Ef(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var o_=37297,l_=0;function c_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Tf=new Ye;function h_(i){it._getMatrix(Tf,it.workingColorSpace,i);let e=`mat3( ${Tf.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case dr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Af(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+c_(i.getShaderSource(e),o)}else return r}function u_(i,e){let t=h_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var f_={[$r]:"Linear",[Jr]:"Reinhard",[Kr]:"Cineon",[jr]:"ACESFilmic",[ea]:"AgX",[Xi]:"Neutral",[Qr]:"Custom"};function d_(i,e){let t=f_[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Il=new L;function p_(){it.getLuminanceCoefficients(Il);let i=Il.x.toFixed(4),e=Il.y.toFixed(4),t=Il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)}function g_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function x_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ua(i){return i!==""}function Rf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var __=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mh(i){return i.replace(__,y_)}var v_=new Map;function y_(i,e){let t=je[e];if(t===void 0){let n=v_.get(e);if(n!==void 0)t=je[n],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Mh(t)}var M_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pf(i){return i.replace(M_,S_)}function S_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function If(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var b_={[qr]:"SHADOWMAP_TYPE_PCF",[Ei]:"SHADOWMAP_TYPE_VSM"};function w_(i){return b_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var E_={[Ti]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[ta]:"ENVMAP_TYPE_CUBE_UV"};function T_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":E_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var A_={[qi]:"ENVMAP_MODE_REFRACTION"};function R_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":A_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var C_={[Vo]:"ENVMAP_BLENDING_MULTIPLY",[Wu]:"ENVMAP_BLENDING_MIX",[Xu]:"ENVMAP_BLENDING_ADD"};function P_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":C_[i.combine]||"ENVMAP_BLENDING_NONE"}function I_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function L_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=w_(t),c=T_(t),h=R_(t),f=P_(t),u=I_(t),d=m_(t),p=g_(r),y=s.createProgram(),g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ua).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(ua).join(`
`),m.length>0&&(m+=`
`)):(g=[If(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),m=[If(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?je.tonemapping_pars_fragment:"",t.toneMapping!==Pn?d_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,u_("linearToOutputTexel",t.outputColorSpace),p_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ua).join(`
`)),a=Mh(a),a=Rf(a,t),a=Cf(a,t),o=Mh(o),o=Rf(o,t),o=Cf(o,t),a=Pf(a),o=Pf(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=M+g+a,_=M+m+o,E=Ef(s,s.VERTEX_SHADER,w),S=Ef(s,s.FRAGMENT_SHADER,_);s.attachShader(y,E),s.attachShader(y,S),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function P(R){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(y)||"",U=s.getShaderInfoLog(E)||"",N=s.getShaderInfoLog(S)||"",O=D.trim(),q=U.trim(),Y=N.trim(),te=!0,H=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,E,S);else{let J=Af(s,E,"vertex"),$=Af(s,S,"fragment");Ve("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+J+`
`+$)}else O!==""?He("WebGLProgram: Program Info Log:",O):(q===""||Y==="")&&(H=!1);H&&(R.diagnostics={runnable:te,programLog:O,vertexShader:{log:q,prefix:g},fragmentShader:{log:Y,prefix:m}})}s.deleteShader(E),s.deleteShader(S),x=new zs(s,y),T=x_(s,y)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(y,o_)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=l_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=E,this.fragmentShader=S,this}var D_=0,Sh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bh(e),t.set(e,n)),n}},bh=class{constructor(e){this.id=D_++,this.code=e,this.usedTimes=0}};function N_(i){return i===Ci||i===oa||i===la}function U_(i,e,t,n,s,r){let a=new Es,o=new Sh,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function y(x,T,A,R,D,U){let N=R.fog,O=D.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,te=e.get(x.envMap||q,Y),H=te&&te.mapping===ta?te.image.height:null,J=d[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&He("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let $=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,we=$!==void 0?$.length:0,Se=0;O.morphAttributes.position!==void 0&&(Se=1),O.morphAttributes.normal!==void 0&&(Se=2),O.morphAttributes.color!==void 0&&(Se=3);let Qe,qe,$e,I;if(J){let pt=Kn[J];Qe=pt.vertexShader,qe=pt.fragmentShader}else{Qe=x.vertexShader,qe=x.fragmentShader;let pt=o.getVertexShaderStage(x),ct=o.getFragmentShaderStage(x);o.update(x,pt,ct),$e=pt.id,I=ct.id}let k=i.getRenderTarget(),ee=i.state.buffers.depth.getReversed(),oe=D.isInstancedMesh===!0,re=D.isBatchedMesh===!0,de=!!x.map,ze=!!x.matcap,j=!!te,se=!!x.aoMap,ae=!!x.lightMap,le=!!x.bumpMap&&x.wireframe===!1,fe=!!x.normalMap,Re=!!x.displacementMap,Pe=!!x.emissiveMap,ke=!!x.metalnessMap,We=!!x.roughnessMap,F=x.anisotropy>0,at=x.clearcoat>0,Je=x.dispersion>0,C=x.retroreflectivity>0,v=x.iridescence>0,V=x.sheen>0,G=x.transmission>0,K=F&&!!x.anisotropyMap,ue=at&&!!x.clearcoatMap,pe=at&&!!x.clearcoatNormalMap,Q=at&&!!x.clearcoatRoughnessMap,ie=v&&!!x.iridescenceMap,xe=v&&!!x.iridescenceThicknessMap,Ue=V&&!!x.sheenColorMap,ge=V&&!!x.sheenRoughnessMap,me=!!x.specularMap,Ie=!!x.specularColorMap,Oe=!!x.specularIntensityMap,Xe=G&&!!x.transmissionMap,z=G&&!!x.thicknessMap,_e=!!x.gradientMap,ne=!!x.alphaMap,ve=x.alphaTest>0,Ee=!!x.alphaHash,ce=!!x.extensions,Be=Pn;x.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Be=i.toneMapping);let Ne={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:Qe,fragmentShader:qe,defines:x.defines,customVertexShaderID:$e,customFragmentShaderID:I,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:re,batchingColor:re&&D._colorsTexture!==null,instancing:oe,instancingColor:oe&&D.instanceColor!==null,instancingMorph:oe&&D.morphTexture!==null,outputColorSpace:k===null?i.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:de,matcap:ze,envMap:j,envMapMode:j&&te.mapping,envMapCubeUVHeight:H,aoMap:se,lightMap:ae,bumpMap:le,normalMap:fe,displacementMap:Re,emissiveMap:Pe,normalMapObjectSpace:fe&&x.normalMapType===Zu,normalMapTangentSpace:fe&&x.normalMapType===Os,packedNormalMap:fe&&x.normalMapType===Os&&N_(x.normalMap.format),metalnessMap:ke,roughnessMap:We,anisotropy:F,anisotropyMap:K,clearcoat:at,clearcoatMap:ue,clearcoatNormalMap:pe,clearcoatRoughnessMap:Q,dispersion:Je,retroreflection:C,iridescence:v,iridescenceMap:ie,iridescenceThicknessMap:xe,sheen:V,sheenColorMap:Ue,sheenRoughnessMap:ge,specularMap:me,specularColorMap:Ie,specularIntensityMap:Oe,transmission:G,transmissionMap:Xe,thicknessMap:z,gradientMap:_e,opaque:x.transparent===!1&&x.blending===Us&&x.alphaToCoverage===!1,alphaMap:ne,alphaTest:ve,alphaHash:Ee,combine:x.combine,mapUv:de&&p(x.map.channel),aoMapUv:se&&p(x.aoMap.channel),lightMapUv:ae&&p(x.lightMap.channel),bumpMapUv:le&&p(x.bumpMap.channel),normalMapUv:fe&&p(x.normalMap.channel),displacementMapUv:Re&&p(x.displacementMap.channel),emissiveMapUv:Pe&&p(x.emissiveMap.channel),metalnessMapUv:ke&&p(x.metalnessMap.channel),roughnessMapUv:We&&p(x.roughnessMap.channel),anisotropyMapUv:K&&p(x.anisotropyMap.channel),clearcoatMapUv:ue&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:pe&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:ge&&p(x.sheenRoughnessMap.channel),specularMapUv:me&&p(x.specularMap.channel),specularColorMapUv:Ie&&p(x.specularColorMap.channel),specularIntensityMapUv:Oe&&p(x.specularIntensityMap.channel),transmissionMapUv:Xe&&p(x.transmissionMap.channel),thicknessMapUv:z&&p(x.thicknessMap.channel),alphaMapUv:ne&&p(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(fe||F),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!O.attributes.uv&&(de||ne),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&fe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ee,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Se,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:de&&x.map.isVideoTexture===!0&&it.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:Pe&&x.emissiveMap.isVideoTexture===!0&&it.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===mn,flipSided:x.side===Ht,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ce&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&x.extensions.multiDraw===!0||re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function g(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let A in x.defines)T.push(A),T.push(x.defines[A]);return x.isRawShaderMaterial===!1&&(m(T,x),M(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function m(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function M(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function w(x){let T=d[x.type],A;if(T){let R=Kn[T];A=_n.clone(R.uniforms)}else A=x.uniforms;return A}function _(x,T){let A=h.get(T);return A!==void 0?++A.usedTimes:(A=new L_(i,T,x,s),c.push(A),h.set(T,A)),A}function E(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){o.remove(x)}function P(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:w,acquireProgram:_,releaseProgram:E,releaseShaderCache:S,programs:c,dispose:P}}function F_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function O_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Lf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Df(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,y,g,m){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:m},i[e]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=p,M.materialVariant=a(u),M.groupOrder=y,M.renderOrder=u.renderOrder,M.z=g,M.group=m),e++,M}function l(u,d,p,y,g,m,M){M.reversedDepth===!0&&(g=-g);let w=o(u,d,p,y,g,m);p.transmission>0?n.push(w):p.transparent===!0?s.push(w):t.push(w)}function c(u,d,p,y,g,m){let M=o(u,d,p,y,g,m);p.transmission>0?n.unshift(M):p.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,d){t.length>1&&t.sort(u||O_),n.length>1&&n.sort(d||Lf),s.length>1&&s.sort(d||Lf)}function f(){for(let u=e,d=i.length;u<d;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function B_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Df,i.set(n,[a])):s>=r.length?(a=new Df,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function k_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new Te};break;case"SpotLight":t={position:new L,direction:new L,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function z_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var V_=0;function H_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function G_(i){let e=new k_,t=z_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new Ze,a=new Ze;function o(c){let h=0,f=0,u=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let d=0,p=0,y=0,g=0,m=0,M=0,w=0,_=0,E=0,S=0,P=0,x=0,T=0,A=0;c.sort(H_);for(let D=0,U=c.length;D<U;D++){let N=c[D],O=N.color,q=N.intensity,Y=N.distance,te=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Ci?te=N.shadow.map.texture:te=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=O.r*q,f+=O.g*q,u+=O.b*q;else if(N.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(N.sh.coefficients[H],q);A++}else if(N.isSunLight){let H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let J=N.shadow,$=t.get(N);$.shadowIntensity=J.intensity,$.shadowBias=J.bias,$.shadowNormalBias=J.normalBias,$.shadowRadius=J.radius,$.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[p]=$,n.sunShadowMap[p]=te;let we=J.getViewportCount();for(let Se=0;Se<we;Se++)n.sunShadowMatrix[y+Se]=J.getMatrix(Se),n.sunShadowCascade[y+Se]=J._cascadeData[Se];y+=we,p++}n.sun[d]=H,d++}else if(N.isDirectionalLight){let H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let J=N.shadow,$=t.get(N);$.shadowIntensity=J.intensity,$.shadowBias=J.bias,$.shadowNormalBias=J.normalBias,$.shadowRadius=J.radius,$.shadowMapSize=J.mapSize,n.directionalShadow[g]=$,n.directionalShadowMap[g]=te,n.directionalShadowMatrix[g]=N.shadow.matrix,E++}n.directional[g]=H,g++}else if(N.isSpotLight){let H=e.get(N);H.position.setFromMatrixPosition(N.matrixWorld),H.color.copy(O).multiplyScalar(q),H.distance=Y,H.coneCos=Math.cos(N.angle),H.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),H.decay=N.decay,n.spot[M]=H;let J=N.shadow;if(N.map&&(n.spotLightMap[x]=N.map,x++,J.updateMatrices(N),N.castShadow&&T++),n.spotLightMatrix[M]=J.matrix,N.castShadow){let $=t.get(N);$.shadowIntensity=J.intensity,$.shadowBias=J.bias,$.shadowNormalBias=J.normalBias,$.shadowRadius=J.radius,$.shadowMapSize=J.mapSize,n.spotShadow[M]=$,n.spotShadowMap[M]=te,P++}M++}else if(N.isRectAreaLight){let H=e.get(N);H.color.copy(O).multiplyScalar(q),H.halfWidth.set(N.width*.5,0,0),H.halfHeight.set(0,N.height*.5,0),n.rectArea[w]=H,w++}else if(N.isPointLight){let H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),H.distance=N.distance,H.decay=N.decay,N.castShadow){let J=N.shadow,$=t.get(N);$.shadowIntensity=J.intensity,$.shadowBias=J.bias,$.shadowNormalBias=J.normalBias,$.shadowRadius=J.radius,$.shadowMapSize=J.mapSize,$.shadowCameraNear=J.camera.near,$.shadowCameraFar=J.camera.far,n.pointShadow[m]=$,n.pointShadowMap[m]=te,n.pointShadowMatrix[m]=N.shadow.matrix,S++}n.point[m]=H,m++}else if(N.isHemisphereLight){let H=e.get(N);H.skyColor.copy(N.color).multiplyScalar(q),H.groundColor.copy(N.groundColor).multiplyScalar(q),n.hemi[_]=H,_++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let R=n.hash;(R.sunLength!==d||R.directionalLength!==g||R.pointLength!==m||R.spotLength!==M||R.rectAreaLength!==w||R.hemiLength!==_||R.numSunShadows!==p||R.numDirectionalShadows!==E||R.numPointShadows!==S||R.numSpotShadows!==P||R.numSpotMaps!==x||R.numLightProbes!==A)&&(n.sun.length=d,n.directional.length=g,n.spot.length=M,n.rectArea.length=w,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,R.sunLength=d,R.directionalLength=g,R.pointLength=m,R.spotLength=M,R.rectAreaLength=w,R.hemiLength=_,R.numSunShadows=p,R.numDirectionalShadows=E,R.numPointShadows=S,R.numSpotShadows=P,R.numSpotMaps=x,R.numLightProbes=A,n.version=V_++)}function l(c,h){let f=0,u=0,d=0,p=0,y=0,g=0,m=h.matrixWorldInverse;for(let M=0,w=c.length;M<w;M++){let _=c[M];if(_.isSunLight){let E=n.sun[f];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(m),f++}else if(_.isDirectionalLight){let E=n.directional[u];E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),u++}else if(_.isSpotLight){let E=n.spot[p];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let E=n.rectArea[y];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(_.isPointLight){let E=n.point[d];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){let E=n.hemi[g];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Nf(i){let e=new G_(i),t=[],n=[],s=[];function r(u){f.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function W_(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Nf(i),e.set(s,[o])):r>=a.length?(o=new Nf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var X_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Y_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Z_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Uf=new Ze,ha=new L,gh=new L;function $_(i,e,t){let n=new Cs,s=new he,r=new he,a=new vt,o=new Ds,l=new To,c={},h=t.maxTextureSize,f={[Zn]:Ht,[Ht]:Zn,[mn]:mn},u=new wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new yt;p.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new nt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qr;let m=this.type;this.render=function(S,P,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Cu&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qr);let T=i.getRenderTarget(),A=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Rt),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let U=m!==this.type;U&&P.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(O=>O.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,O=S.length;N<O;N++){let q=S[N],Y=q.shadow;if(Y===void 0){He("WebGLShadowMap:",q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let te=Y.getFrameExtents();s.multiply(te),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,Y.mapSize.y=r.y));let H=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=H,Y.map===null||U===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Ei){if(q.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new bt(s.x,s.y,{format:Ci,type:Bt,minFilter:zt,magFilter:zt,generateMipmaps:!1}),Y.map.texture.name=q.name+".shadowMap",Y.map.depthTexture=new qn(s.x,s.y,xn),Y.map.depthTexture.name=q.name+".shadowMapDepth",Y.map.depthTexture.format=Vn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=At,Y.map.depthTexture.magFilter=At}else q.isPointLight?(Y.map=new Ll(s.x),Y.map.depthTexture=new _o(s.x,In)):(Y.map=new bt(s.x,s.y),Y.map.depthTexture=new qn(s.x,s.y,In)),Y.map.depthTexture.name=q.name+".shadowMap",Y.map.depthTexture.format=Vn,this.type===qr?(Y.map.depthTexture.compareFunction=H?Cl:Rl,Y.map.depthTexture.minFilter=zt,Y.map.depthTexture.magFilter=zt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=At,Y.map.depthTexture.magFilter=At);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let J=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();q.isPointLight!==!0&&Y.updateMatrices(q,x);for(let $=0;$<J;$++){let we=Y.getCamera($);if(q.isPointLight){let Se=Y.camera,Qe=Y.matrix,qe=q.distance||Se.far;qe!==Se.far&&(Se.far=qe,Se.updateProjectionMatrix()),ha.setFromMatrixPosition(q.matrixWorld),Se.position.copy(ha),gh.copy(Se.position),gh.add(Y_[$]),Se.up.copy(Z_[$]),Se.lookAt(gh),Se.updateMatrixWorld(),Qe.makeTranslation(-ha.x,-ha.y,-ha.z),Uf.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Uf,Se.coordinateSystem,Se.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,$),i.clear();else{$===0&&(i.setRenderTarget(Y.map),i.clear());let Se=Y.getViewport($);a.set(r.x*Se.x,r.y*Se.y,r.x*Se.z,r.y*Se.w),D.viewport(a)}n=Y.getFrustum($),_(P,x,we,q,this.type)}Y.isPointLightShadow!==!0&&this.type===Ei&&M(Y,x),Y.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(T,A,R)};function M(S,P){let x=e.update(y);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new bt(s.x,s.y,{format:Ci,type:Bt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(P,null,x,u,y,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(P,null,x,d,y,null)}function w(S,P,x,T){let A=null,R=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)A=R;else if(A=x.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let D=A.uuid,U=P.uuid,N=c[D];N===void 0&&(N={},c[D]=N);let O=N[U];O===void 0&&(O=A.clone(),N[U]=O,P.addEventListener("dispose",E)),A=O}if(A.visible=P.visible,A.wireframe=P.wireframe,T===Ei?A.side=P.shadowSide!==null?P.shadowSide:P.side:A.side=P.shadowSide!==null?P.shadowSide:f[P.side],A.alphaMap=P.alphaMap,A.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,A.map=P.map,A.clipShadows=P.clipShadows,A.clippingPlanes=P.clippingPlanes,A.clipIntersection=P.clipIntersection,A.displacementMap=P.displacementMap,A.displacementScale=P.displacementScale,A.displacementBias=P.displacementBias,A.wireframeLinewidth=P.wireframeLinewidth,A.linewidth=P.linewidth,x.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let D=i.properties.get(A);D.light=x}return A}function _(S,P,x,T,A){if(S.visible===!1)return;if(S.layers.test(P.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===Ei)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let U=e.update(S),N=S.material;if(Array.isArray(N)){let O=U.groups;for(let q=0,Y=O.length;q<Y;q++){let te=O[q],H=N[te.materialIndex];if(H&&H.visible){let J=w(S,H,T,A);S.onBeforeShadow(i,S,P,x,U,J,te),i.renderBufferDirect(x,null,U,J,S,te),S.onAfterShadow(i,S,P,x,U,J,te)}}}else if(N.visible){let O=w(S,N,T,A);S.onBeforeShadow(i,S,P,x,U,O,null),i.renderBufferDirect(x,null,U,O,S,null),S.onAfterShadow(i,S,P,x,U,O,null)}}let D=S.children;for(let U=0,N=D.length;U<N;U++)_(D[U],P,x,T,A)}function E(S){S.target.removeEventListener("dispose",E);for(let x in c){let T=c[x],A=S.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function J_(i,e){function t(){let z=!1,_e=new vt,ne=null,ve=new vt(0,0,0,0);return{setMask:function(Ee){ne!==Ee&&!z&&(i.colorMask(Ee,Ee,Ee,Ee),ne=Ee)},setLocked:function(Ee){z=Ee},setClear:function(Ee,ce,Be,Ne,pt){pt===!0&&(Ee*=Ne,ce*=Ne,Be*=Ne),_e.set(Ee,ce,Be,Ne),ve.equals(_e)===!1&&(i.clearColor(Ee,ce,Be,Ne),ve.copy(_e))},reset:function(){z=!1,ne=null,ve.set(-1,0,0,0)}}}function n(){let z=!1,_e=!1,ne=null,ve=null,Ee=null;return{setReversed:function(ce){if(_e!==ce){let Be=e.get("EXT_clip_control");ce?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),_e=ce;let Ne=Ee;Ee=null,this.setClear(Ne)}},getReversed:function(){return _e},setTest:function(ce){ce?k(i.DEPTH_TEST):ee(i.DEPTH_TEST)},setMask:function(ce){ne!==ce&&!z&&(i.depthMask(ce),ne=ce)},setFunc:function(ce){if(_e&&(ce=af[ce]),ve!==ce){switch(ce){case ro:i.depthFunc(i.NEVER);break;case ao:i.depthFunc(i.ALWAYS);break;case oo:i.depthFunc(i.LESS);break;case ys:i.depthFunc(i.LEQUAL);break;case lo:i.depthFunc(i.EQUAL);break;case co:i.depthFunc(i.GEQUAL);break;case ho:i.depthFunc(i.GREATER);break;case uo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=ce}},setLocked:function(ce){z=ce},setClear:function(ce){Ee!==ce&&(Ee=ce,_e&&(ce=1-ce),i.clearDepth(ce))},reset:function(){z=!1,ne=null,ve=null,Ee=null,_e=!1}}}function s(){let z=!1,_e=null,ne=null,ve=null,Ee=null,ce=null,Be=null,Ne=null,pt=null;return{setTest:function(ct){z||(ct?k(i.STENCIL_TEST):ee(i.STENCIL_TEST))},setMask:function(ct){_e!==ct&&!z&&(i.stencilMask(ct),_e=ct)},setFunc:function(ct,bn,Fn){(ne!==ct||ve!==bn||Ee!==Fn)&&(i.stencilFunc(ct,bn,Fn),ne=ct,ve=bn,Ee=Fn)},setOp:function(ct,bn,Fn){(ce!==ct||Be!==bn||Ne!==Fn)&&(i.stencilOp(ct,bn,Fn),ce=ct,Be=bn,Ne=Fn)},setLocked:function(ct){z=ct},setClear:function(ct){pt!==ct&&(i.clearStencil(ct),pt=ct)},reset:function(){z=!1,_e=null,ne=null,ve=null,Ee=null,ce=null,Be=null,Ne=null,pt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],y=null,g=!1,m=null,M=null,w=null,_=null,E=null,S=null,P=null,x=new Te(0,0,0),T=0,A=!1,R=null,D=null,U=null,N=null,O=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,te=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(H)[1]),Y=te>=1):H.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),Y=te>=2);let J=null,$={},we=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),Qe=new vt().fromArray(we),qe=new vt().fromArray(Se);function $e(z,_e,ne,ve){let Ee=new Uint8Array(4),ce=i.createTexture();i.bindTexture(z,ce),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Be=0;Be<ne;Be++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(_e+Be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return ce}let I={};I[i.TEXTURE_2D]=$e(i.TEXTURE_2D,i.TEXTURE_2D,1),I[i.TEXTURE_CUBE_MAP]=$e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[i.TEXTURE_2D_ARRAY]=$e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),I[i.TEXTURE_3D]=$e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),k(i.DEPTH_TEST),a.setFunc(ys),le(!1),fe(Bc),k(i.CULL_FACE),se(Rt);function k(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function ee(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function oe(z,_e){return u[z]!==_e?(i.bindFramebuffer(z,_e),u[z]=_e,z===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_e),z===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function re(z,_e){let ne=p,ve=!1;if(z){ne=d.get(_e),ne===void 0&&(ne=[],d.set(_e,ne));let Ee=z.textures;if(ne.length!==Ee.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,Be=Ee.length;ce<Be;ce++)ne[ce]=i.COLOR_ATTACHMENT0+ce;ne.length=Ee.length,ve=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,ve=!0);ve&&i.drawBuffers(ne)}function de(z){return y!==z?(i.useProgram(z),y=z,!0):!1}let ze={[gn]:i.FUNC_ADD,[Pu]:i.FUNC_SUBTRACT,[Iu]:i.FUNC_REVERSE_SUBTRACT};ze[Lu]=i.MIN,ze[Du]=i.MAX;let j={[Wi]:i.ZERO,[Nu]:i.ONE,[Uu]:i.SRC_COLOR,[Hc]:i.SRC_ALPHA,[ku]:i.SRC_ALPHA_SATURATE,[Zr]:i.DST_COLOR,[Yr]:i.DST_ALPHA,[Fu]:i.ONE_MINUS_SRC_COLOR,[Gc]:i.ONE_MINUS_SRC_ALPHA,[Bu]:i.ONE_MINUS_DST_COLOR,[Ou]:i.ONE_MINUS_DST_ALPHA,[zu]:i.CONSTANT_COLOR,[Vu]:i.ONE_MINUS_CONSTANT_COLOR,[Hu]:i.CONSTANT_ALPHA,[Gu]:i.ONE_MINUS_CONSTANT_ALPHA};function se(z,_e,ne,ve,Ee,ce,Be,Ne,pt,ct){if(z===Rt){g===!0&&(ee(i.BLEND),g=!1);return}if(g===!1&&(k(i.BLEND),g=!0),z!==zo){if(z!==m||ct!==A){if((M!==gn||E!==gn)&&(i.blendEquation(i.FUNC_ADD),M=gn,E=gn),ct)switch(z){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kc:i.blendFunc(i.ONE,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ve("WebGLState: Invalid blending: ",z);break}else switch(z){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zc:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vc:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",z);break}w=null,_=null,S=null,P=null,x.set(0,0,0),T=0,m=z,A=ct}return}Ee=Ee||_e,ce=ce||ne,Be=Be||ve,(_e!==M||Ee!==E)&&(i.blendEquationSeparate(ze[_e],ze[Ee]),M=_e,E=Ee),(ne!==w||ve!==_||ce!==S||Be!==P)&&(i.blendFuncSeparate(j[ne],j[ve],j[ce],j[Be]),w=ne,_=ve,S=ce,P=Be),(Ne.equals(x)===!1||pt!==T)&&(i.blendColor(Ne.r,Ne.g,Ne.b,pt),x.copy(Ne),T=pt),m=z,A=!1}function ae(z,_e){z.side===mn?ee(i.CULL_FACE):k(i.CULL_FACE);let ne=z.side===Ht;_e&&(ne=!ne),le(ne),z.blending===Us&&z.transparent===!1?se(Rt):se(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let ve=z.stencilWrite;o.setTest(ve),ve&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Pe(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?k(i.SAMPLE_ALPHA_TO_COVERAGE):ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(z){R!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),R=z)}function fe(z){z!==Au?(k(i.CULL_FACE),z!==D&&(z===Bc?i.cullFace(i.BACK):z===Ru?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ee(i.CULL_FACE),D=z}function Re(z){z!==U&&(Y&&i.lineWidth(z),U=z)}function Pe(z,_e,ne){z?(k(i.POLYGON_OFFSET_FILL),(N!==_e||O!==ne)&&(N=_e,O=ne,a.getReversed()&&(_e=-_e),i.polygonOffset(_e,ne))):ee(i.POLYGON_OFFSET_FILL)}function ke(z){z?k(i.SCISSOR_TEST):ee(i.SCISSOR_TEST)}function We(z){z===void 0&&(z=i.TEXTURE0+q-1),J!==z&&(i.activeTexture(z),J=z)}function F(z,_e,ne){ne===void 0&&(J===null?ne=i.TEXTURE0+q-1:ne=J);let ve=$[ne];ve===void 0&&(ve={type:void 0,texture:void 0},$[ne]=ve),(ve.type!==z||ve.texture!==_e)&&(J!==ne&&(i.activeTexture(ne),J=ne),i.bindTexture(z,_e||I[z]),ve.type=z,ve.texture=_e)}function at(){let z=$[J];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Je(){try{i.compressedTexImage2D(...arguments)}catch(z){Ve("WebGLState:",z)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(z){Ve("WebGLState:",z)}}function v(){try{i.texSubImage2D(...arguments)}catch(z){Ve("WebGLState:",z)}}function V(){try{i.texSubImage3D(...arguments)}catch(z){Ve("WebGLState:",z)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(z){Ve("WebGLState:",z)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(z){Ve("WebGLState:",z)}}function ue(){try{i.texStorage2D(...arguments)}catch(z){Ve("WebGLState:",z)}}function pe(){try{i.texStorage3D(...arguments)}catch(z){Ve("WebGLState:",z)}}function Q(){try{i.texImage2D(...arguments)}catch(z){Ve("WebGLState:",z)}}function ie(){try{i.texImage3D(...arguments)}catch(z){Ve("WebGLState:",z)}}function xe(z){return f[z]!==void 0?f[z]:i.getParameter(z)}function Ue(z,_e){f[z]!==_e&&(i.pixelStorei(z,_e),f[z]=_e)}function ge(z){Qe.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),Qe.copy(z))}function me(z){qe.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),qe.copy(z))}function Ie(z,_e){let ne=c.get(_e);ne===void 0&&(ne=new WeakMap,c.set(_e,ne));let ve=ne.get(z);ve===void 0&&(ve=i.getUniformBlockIndex(_e,z.name),ne.set(z,ve))}function Oe(z,_e){let ve=c.get(_e).get(z);l.get(_e)!==ve&&(i.uniformBlockBinding(_e,ve,z.__bindingPointIndex),l.set(_e,ve))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},J=null,$={},u={},d=new WeakMap,p=[],y=null,g=!1,m=null,M=null,w=null,_=null,E=null,S=null,P=null,x=new Te(0,0,0),T=0,A=!1,R=null,D=null,U=null,N=null,O=null,Qe.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:k,disable:ee,bindFramebuffer:oe,drawBuffers:re,useProgram:de,setBlending:se,setMaterial:ae,setFlipSided:le,setCullFace:fe,setLineWidth:Re,setPolygonOffset:Pe,setScissorTest:ke,activeTexture:We,bindTexture:F,unbindTexture:at,compressedTexImage2D:Je,compressedTexImage3D:C,texImage2D:Q,texImage3D:ie,pixelStorei:Ue,getParameter:xe,updateUBOMapping:Ie,uniformBlockBinding:Oe,texStorage2D:ue,texStorage3D:pe,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:G,compressedTexSubImage3D:K,scissor:ge,viewport:me,reset:Xe}}function K_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap,f=new Set,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,v){return p?new OffscreenCanvas(C,v):pr("canvas")}function g(C,v,V){let G=1,K=Je(C);if((K.width>V||K.height>V)&&(G=V/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ue=Math.floor(G*K.width),pe=Math.floor(G*K.height);u===void 0&&(u=y(ue,pe));let Q=v?y(ue,pe):u;return Q.width=ue,Q.height=pe,Q.getContext("2d").drawImage(C,0,0,ue,pe),He("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ue+"x"+pe+")."),Q}else return"data"in C&&He("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function m(C){return C.generateMipmaps}function M(C){i.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(C,v,V,G,K,ue=!1){if(C!==null){if(i[C]!==void 0)return i[C];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let pe;G&&(pe=e.get("EXT_texture_norm16"),pe||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===i.RED&&(V===i.FLOAT&&(Q=i.R32F),V===i.HALF_FLOAT&&(Q=i.R16F),V===i.UNSIGNED_BYTE&&(Q=i.R8),V===i.UNSIGNED_SHORT&&pe&&(Q=pe.R16_EXT),V===i.SHORT&&pe&&(Q=pe.R16_SNORM_EXT)),v===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.R8UI),V===i.UNSIGNED_SHORT&&(Q=i.R16UI),V===i.UNSIGNED_INT&&(Q=i.R32UI),V===i.BYTE&&(Q=i.R8I),V===i.SHORT&&(Q=i.R16I),V===i.INT&&(Q=i.R32I)),v===i.RG&&(V===i.FLOAT&&(Q=i.RG32F),V===i.HALF_FLOAT&&(Q=i.RG16F),V===i.UNSIGNED_BYTE&&(Q=i.RG8),V===i.UNSIGNED_SHORT&&pe&&(Q=pe.RG16_EXT),V===i.SHORT&&pe&&(Q=pe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RG8UI),V===i.UNSIGNED_SHORT&&(Q=i.RG16UI),V===i.UNSIGNED_INT&&(Q=i.RG32UI),V===i.BYTE&&(Q=i.RG8I),V===i.SHORT&&(Q=i.RG16I),V===i.INT&&(Q=i.RG32I)),v===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),V===i.UNSIGNED_INT&&(Q=i.RGB32UI),V===i.BYTE&&(Q=i.RGB8I),V===i.SHORT&&(Q=i.RGB16I),V===i.INT&&(Q=i.RGB32I)),v===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),V===i.UNSIGNED_INT&&(Q=i.RGBA32UI),V===i.BYTE&&(Q=i.RGBA8I),V===i.SHORT&&(Q=i.RGBA16I),V===i.INT&&(Q=i.RGBA32I)),v===i.RGB&&(V===i.UNSIGNED_SHORT&&pe&&(Q=pe.RGB16_EXT),V===i.SHORT&&pe&&(Q=pe.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),v===i.RGBA){let ie=ue?dr:it.getTransfer(K);V===i.FLOAT&&(Q=i.RGBA32F),V===i.HALF_FLOAT&&(Q=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Q=ie===lt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&pe&&(Q=pe.RGBA16_EXT),V===i.SHORT&&pe&&(Q=pe.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function E(C,v){let V;return C?v===null||v===In||v===Ri?V=i.DEPTH24_STENCIL8:v===xn?V=i.DEPTH32F_STENCIL8:v===Fs&&(V=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===In||v===Ri?V=i.DEPTH_COMPONENT24:v===xn?V=i.DEPTH_COMPONENT32F:v===Fs&&(V=i.DEPTH_COMPONENT16),V}function S(C,v){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==At&&C.minFilter!==zt?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function P(C){let v=C.target;v.removeEventListener("dispose",P),T(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&f.delete(v)}function x(C){let v=C.target;v.removeEventListener("dispose",x),R(v)}function T(C){let v=n.get(C);if(v.__webglInit===void 0)return;let V=C.source,G=d.get(V);if(G){let K=G[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&A(C),Object.keys(G).length===0&&d.delete(V)}n.remove(C)}function A(C){let v=n.get(C);i.deleteTexture(v.__webglTexture);let V=C.source,G=d.get(V);delete G[v.__cacheKey],a.memory.textures--}function R(C){let v=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let K=0;K<v.__webglFramebuffer[G].length;K++)i.deleteFramebuffer(v.__webglFramebuffer[G][K]);else i.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)i.deleteFramebuffer(v.__webglFramebuffer[G]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let V=C.textures;for(let G=0,K=V.length;G<K;G++){let ue=n.get(V[G]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(V[G])}n.remove(C)}let D=0;function U(){D=0}function N(){return D}function O(C){D=C}function q(){let C=D;return C>=s.maxTextures&&He("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function Y(C){let v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function te(C,v){let V=n.get(C);if(C.isVideoTexture&&F(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){let G=C.image;if(G===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{ee(V,C,v);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+v)}function H(C,v){let V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ee(V,C,v);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+v)}function J(C,v){let V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ee(V,C,v);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+v)}function $(C,v){let V=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){oe(V,C,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+v)}let we={[pn]:i.REPEAT,[kn]:i.CLAMP_TO_EDGE,[fo]:i.MIRRORED_REPEAT},Se={[At]:i.NEAREST,[qu]:i.NEAREST_MIPMAP_NEAREST,[na]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[Wo]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},Qe={[Ju]:i.NEVER,[tf]:i.ALWAYS,[Ku]:i.LESS,[Rl]:i.LEQUAL,[ju]:i.EQUAL,[Cl]:i.GEQUAL,[Qu]:i.GREATER,[ef]:i.NOTEQUAL};function qe(C,v){if(v.type===xn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===zt||v.magFilter===Wo||v.magFilter===na||v.magFilter===Ai||v.minFilter===zt||v.minFilter===Wo||v.minFilter===na||v.minFilter===Ai)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,we[v.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,we[v.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,we[v.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Se[v.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Se[v.minFilter]),v.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Qe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===At||v.minFilter!==na&&v.minFilter!==Ai||v.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function $e(C,v){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",P));let G=v.source,K=d.get(G);K===void 0&&(K={},d.set(G,K));let ue=Y(v);if(ue!==C.__cacheKey){K[ue]===void 0&&(K[ue]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),K[ue].usedTimes++;let pe=K[C.__cacheKey];pe!==void 0&&(K[C.__cacheKey].usedTimes--,pe.usedTimes===0&&A(v)),C.__cacheKey=ue,C.__webglTexture=K[ue].texture}return V}function I(C,v,V){return Math.floor(Math.floor(C/V)/v)}function k(C,v,V,G){let ue=C.updateRanges;if(ue.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,V,G,v.data);else{ue.sort((Ue,ge)=>Ue.start-ge.start);let pe=0;for(let Ue=1;Ue<ue.length;Ue++){let ge=ue[pe],me=ue[Ue],Ie=ge.start+ge.count,Oe=I(me.start,v.width,4),Xe=I(ge.start,v.width,4);me.start<=Ie+1&&Oe===Xe&&I(me.start+me.count-1,v.width,4)===Oe?ge.count=Math.max(ge.count,me.start+me.count-ge.start):(++pe,ue[pe]=me)}ue.length=pe+1;let Q=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),xe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Ue=0,ge=ue.length;Ue<ge;Ue++){let me=ue[Ue],Ie=Math.floor(me.start/4),Oe=Math.ceil(me.count/4),Xe=Ie%v.width,z=Math.floor(Ie/v.width),_e=Oe,ne=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,z),t.texSubImage2D(i.TEXTURE_2D,0,Xe,z,_e,ne,V,G,v.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function ee(C,v,V){let G=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=i.TEXTURE_3D);let K=$e(C,v),ue=v.source;t.bindTexture(G,C.__webglTexture,i.TEXTURE0+V);let pe=n.get(ue);if(ue.version!==pe.__version||K===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ne=it.getPrimaries(it.workingColorSpace),ve=v.colorSpace===oi?null:it.getPrimaries(v.colorSpace),Ee=v.colorSpace===oi||ne===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ie=g(v.image,!1,s.maxTextureSize);ie=at(v,ie);let xe=r.convert(v.format,v.colorSpace),Ue=r.convert(v.type),ge=_(v.internalFormat,xe,Ue,v.normalized,v.colorSpace,v.isVideoTexture);qe(G,v);let me,Ie=v.mipmaps,Oe=v.isVideoTexture!==!0,Xe=pe.__version===void 0||K===!0,z=ue.dataReady,_e=S(v,ie);if(v.isDepthTexture)ge=E(v.format===$n,v.type),Xe&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,ge,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,ge,ie.width,ie.height,0,xe,Ue,null));else if(v.isDataTexture)if(Ie.length>0){Oe&&Xe&&t.texStorage2D(i.TEXTURE_2D,_e,ge,Ie[0].width,Ie[0].height);for(let ne=0,ve=Ie.length;ne<ve;ne++)me=Ie[ne],Oe?z&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,me.width,me.height,xe,Ue,me.data):t.texImage2D(i.TEXTURE_2D,ne,ge,me.width,me.height,0,xe,Ue,me.data);v.generateMipmaps=!1}else Oe?(Xe&&t.texStorage2D(i.TEXTURE_2D,_e,ge,ie.width,ie.height),z&&k(v,ie,xe,Ue)):t.texImage2D(i.TEXTURE_2D,0,ge,ie.width,ie.height,0,xe,Ue,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Oe&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,ge,Ie[0].width,Ie[0].height,ie.depth);for(let ne=0,ve=Ie.length;ne<ve;ne++)if(me=Ie[ne],v.format!==rn)if(xe!==null)if(Oe){if(z)if(v.layerUpdates.size>0){let Ee=rh(me.width,me.height,v.format,v.type);for(let ce of v.layerUpdates){let Be=me.data.subarray(ce*Ee/me.data.BYTES_PER_ELEMENT,(ce+1)*Ee/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,ce,me.width,me.height,1,xe,Be)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,me.width,me.height,ie.depth,xe,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,ge,me.width,me.height,ie.depth,0,me.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,me.width,me.height,ie.depth,xe,Ue,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,ge,me.width,me.height,ie.depth,0,xe,Ue,me.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Oe&&Xe&&t.texStorage2D(i.TEXTURE_2D,_e,ge,Ie[0].width,Ie[0].height);for(let ne=0,ve=Ie.length;ne<ve;ne++)me=Ie[ne],v.format!==rn?xe!==null?Oe?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,me.width,me.height,xe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,ge,me.width,me.height,0,me.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?z&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,me.width,me.height,xe,Ue,me.data):t.texImage2D(i.TEXTURE_2D,ne,ge,me.width,me.height,0,xe,Ue,me.data)}else if(v.isDataArrayTexture)if(Oe){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,ge,ie.width,ie.height,ie.depth),z)if(v.layerUpdates.size>0){let ne=rh(ie.width,ie.height,v.format,v.type);for(let ve of v.layerUpdates){let Ee=ie.data.subarray(ve*ne/ie.data.BYTES_PER_ELEMENT,(ve+1)*ne/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,ie.width,ie.height,1,xe,Ue,Ee)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,xe,Ue,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,ie.width,ie.height,ie.depth,0,xe,Ue,ie.data);else if(v.isData3DTexture)Oe?(Xe&&t.texStorage3D(i.TEXTURE_3D,_e,ge,ie.width,ie.height,ie.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,xe,Ue,ie.data)):t.texImage3D(i.TEXTURE_3D,0,ge,ie.width,ie.height,ie.depth,0,xe,Ue,ie.data);else if(v.isFramebufferTexture){if(Xe)if(Oe)t.texStorage2D(i.TEXTURE_2D,_e,ge,ie.width,ie.height);else{let ne=ie.width,ve=ie.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,ge,ne,ve,0,xe,Ue,null),ne>>=1,ve>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ne=i.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),ie.parentNode!==ne){ne.appendChild(ie),f.add(v),ne.onpaint=ve=>{let Ee=ve.changedElements;for(let ce of f)Ee.includes(ce.image)&&(ce.needsUpdate=!0)},ne.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{let Ee=i.RGBA,ce=i.RGBA,Be=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ee,ce,Be,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Oe&&Xe){let ne=Je(Ie[0]);t.texStorage2D(i.TEXTURE_2D,_e,ge,ne.width,ne.height)}for(let ne=0,ve=Ie.length;ne<ve;ne++)me=Ie[ne],Oe?z&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,xe,Ue,me):t.texImage2D(i.TEXTURE_2D,ne,ge,xe,Ue,me);v.generateMipmaps=!1}else if(Oe){if(Xe){let ne=Je(ie);t.texStorage2D(i.TEXTURE_2D,_e,ge,ne.width,ne.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Ue,ie)}else t.texImage2D(i.TEXTURE_2D,0,ge,xe,Ue,ie);m(v)&&M(G),pe.__version=ue.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function oe(C,v,V){if(v.image.length!==6)return;let G=$e(C,v),K=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);let ue=n.get(K);if(K.version!==ue.__version||G===!0){t.activeTexture(i.TEXTURE0+V);let pe=it.getPrimaries(it.workingColorSpace),Q=v.colorSpace===oi?null:it.getPrimaries(v.colorSpace),ie=v.colorSpace===oi||pe===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let xe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ue=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let ce=0;ce<6;ce++)!xe&&!Ue?ge[ce]=g(v.image[ce],!0,s.maxCubemapSize):ge[ce]=Ue?v.image[ce].image:v.image[ce],ge[ce]=at(v,ge[ce]);let me=ge[0],Ie=r.convert(v.format,v.colorSpace),Oe=r.convert(v.type),Xe=_(v.internalFormat,Ie,Oe,v.normalized,v.colorSpace),z=v.isVideoTexture!==!0,_e=ue.__version===void 0||G===!0,ne=K.dataReady,ve=S(v,me);qe(i.TEXTURE_CUBE_MAP,v);let Ee;if(xe){z&&_e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Xe,me.width,me.height);for(let ce=0;ce<6;ce++){Ee=ge[ce].mipmaps;for(let Be=0;Be<Ee.length;Be++){let Ne=Ee[Be];v.format!==rn?Ie!==null?z?ne&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be,0,0,Ne.width,Ne.height,Ie,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be,Xe,Ne.width,Ne.height,0,Ne.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be,0,0,Ne.width,Ne.height,Ie,Oe,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be,Xe,Ne.width,Ne.height,0,Ie,Oe,Ne.data)}}}else{if(Ee=v.mipmaps,z&&_e){Ee.length>0&&ve++;let ce=Je(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Xe,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(Ue){z?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ge[ce].width,ge[ce].height,Ie,Oe,ge[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Xe,ge[ce].width,ge[ce].height,0,Ie,Oe,ge[ce].data);for(let Be=0;Be<Ee.length;Be++){let pt=Ee[Be].image[ce].image;z?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be+1,0,0,pt.width,pt.height,Ie,Oe,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be+1,Xe,pt.width,pt.height,0,Ie,Oe,pt.data)}}else{z?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ie,Oe,ge[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Xe,Ie,Oe,ge[ce]);for(let Be=0;Be<Ee.length;Be++){let Ne=Ee[Be];z?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be+1,0,0,Ie,Oe,Ne.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Be+1,Xe,Ie,Oe,Ne.image[ce])}}}m(v)&&M(i.TEXTURE_CUBE_MAP),ue.__version=K.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function re(C,v,V,G,K,ue){let pe=r.convert(V.format,V.colorSpace),Q=r.convert(V.type),ie=_(V.internalFormat,pe,Q,V.normalized,V.colorSpace),xe=n.get(v),Ue=n.get(V);if(Ue.__renderTarget=v,!xe.__hasExternalTextures){let ge=Math.max(1,v.width>>ue),me=Math.max(1,v.height>>ue);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ue,ie,ge,me,v.depth,0,pe,Q,null):t.texImage2D(K,ue,ie,ge,me,0,pe,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),We(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,K,Ue.__webglTexture,0,ke(v)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,K,Ue.__webglTexture,ue),t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(C,v,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),v.depthBuffer){let G=v.depthTexture,K=G&&G.isDepthTexture?G.type:null,ue=E(v.stencilBuffer,K),pe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;We(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ke(v),ue,v.width,v.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ke(v),ue,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ue,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,C)}else{let G=v.textures;for(let K=0;K<G.length;K++){let ue=G[K],pe=r.convert(ue.format,ue.colorSpace),Q=r.convert(ue.type),ie=_(ue.internalFormat,pe,Q,ue.normalized,ue.colorSpace);We(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ke(v),ie,v.width,v.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ke(v),ie,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ie,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(C,v,V){let G=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(v.depthTexture);if(K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G){if(K.__webglInit===void 0&&(K.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v.depthTexture);let xe=r.convert(v.depthTexture.format),Ue=r.convert(v.depthTexture.type),ge;v.depthTexture.format===Vn?ge=i.DEPTH_COMPONENT24:v.depthTexture.format===$n&&(ge=i.DEPTH24_STENCIL8);for(let me=0;me<6;me++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ge,v.width,v.height,0,xe,Ue,null)}}else te(v.depthTexture,0);let ue=K.__webglTexture,pe=ke(v),Q=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,ie=v.depthTexture.format===$n?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Vn)We(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,Q,ue,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,ie,Q,ue,0);else if(v.depthTexture.format===$n)We(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,Q,ue,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,ie,Q,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function j(C){let v=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){let G=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){let K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=G}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let G=0;G<6;G++)ze(v.__webglFramebuffer[G],C,G);else{let G=C.texture.mipmaps;G&&G.length>0?ze(v.__webglFramebuffer[0],C,0):ze(v.__webglFramebuffer,C,0)}else if(V){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=i.createRenderbuffer(),de(v.__webglDepthbuffer[G],C,!1);else{let K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ue)}}else{let G=C.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),de(v.__webglDepthbuffer,C,!1);else{let K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ue)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function se(C,v,V){let G=n.get(C);v!==void 0&&re(G.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&j(C)}function ae(C){let v=C.texture,V=n.get(C),G=n.get(v);C.addEventListener("dispose",x);let K=C.textures,ue=C.isWebGLCubeRenderTarget===!0,pe=K.length>1;if(pe||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=v.version,a.memory.textures++),ue){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let ie=0;ie<v.mipmaps.length;ie++)V.__webglFramebuffer[Q][ie]=i.createFramebuffer()}else V.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)V.__webglFramebuffer[Q]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(pe)for(let Q=0,ie=K.length;Q<ie;Q++){let xe=n.get(K[Q]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&We(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){let ie=K[Q];V.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);let xe=r.convert(ie.format,ie.colorSpace),Ue=r.convert(ie.type),ge=_(ie.internalFormat,xe,Ue,ie.normalized,ie.colorSpace,C.isXRRenderTarget===!0),me=ke(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,me,ge,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),de(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),qe(i.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let ie=0;ie<v.mipmaps.length;ie++)re(V.__webglFramebuffer[Q][ie],C,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ie);else re(V.__webglFramebuffer[Q],C,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let Q=0,ie=K.length;Q<ie;Q++){let xe=K[Q],Ue=n.get(xe),ge=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ge=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Ue.__webglTexture),qe(ge,xe),re(V.__webglFramebuffer,C,xe,i.COLOR_ATTACHMENT0+Q,ge,0),m(xe)&&M(ge)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,G.__webglTexture),qe(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let ie=0;ie<v.mipmaps.length;ie++)re(V.__webglFramebuffer[ie],C,v,i.COLOR_ATTACHMENT0,Q,ie);else re(V.__webglFramebuffer,C,v,i.COLOR_ATTACHMENT0,Q,0);m(v)&&M(Q),t.unbindTexture()}C.depthBuffer&&j(C)}function le(C){let v=C.textures;for(let V=0,G=v.length;V<G;V++){let K=v[V];if(m(K)){let ue=w(C),pe=n.get(K).__webglTexture;t.bindTexture(ue,pe),M(ue),t.unbindTexture()}}}let fe=[],Re=[];function Pe(C){if(C.samples>0){if(We(C)===!1){let v=C.textures,V=C.width,G=C.height,K=i.COLOR_BUFFER_BIT,ue=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=n.get(C),Q=v.length>1;if(Q)for(let xe=0;xe<v.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let ie=C.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let xe=0;xe<v.length;xe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pe.__webglColorRenderbuffer[xe]);let Ue=n.get(v[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ue,0)}i.blitFramebuffer(0,0,V,G,0,0,V,G,K,i.NEAREST),l===!0&&(fe.length=0,Re.length=0,fe.push(i.COLOR_ATTACHMENT0+xe),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(fe.push(ue),Re.push(ue),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let xe=0;xe<v.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,pe.__webglColorRenderbuffer[xe]);let Ue=n.get(v[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,Ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let v=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ke(C){return Math.min(s.maxSamples,C.samples)}function We(C){let v=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function F(C){let v=a.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function at(C,v){let V=C.colorSpace,G=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==fr&&V!==oi&&(it.getTransfer(V)===lt?(G!==rn||K!==$t)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",V)),v}function Je(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=U,this.getTextureUnits=N,this.setTextureUnits=O,this.setTexture2D=te,this.setTexture2DArray=H,this.setTexture3D=J,this.setTextureCube=$,this.rebindTextures=se,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=j,this.setupFrameBufferTexture=re,this.useMultisampledRTT=We,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function j_(i,e){function t(n,s=oi){let r,a=it.getTransfer(s);if(n===$t)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Xc)return i.BYTE;if(n===qc)return i.SHORT;if(n===Fs)return i.UNSIGNED_SHORT;if(n===Xo)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===Bt)return i.HALF_FLOAT;if(n===$c)return i.ALPHA;if(n===Jc)return i.RGB;if(n===rn)return i.RGBA;if(n===Vn)return i.DEPTH_COMPONENT;if(n===$n)return i.DEPTH_STENCIL;if(n===Zo)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===Ci)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===Ko)return i.RGBA_INTEGER;if(n===ia||n===sa||n===ra||n===aa)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ia)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ia)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jo||n===Qo||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nl||n===il||n===sl||n===rl||n===al||n===oa||n===ol)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nl||n===il)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===rl)return r.COMPRESSED_R11_EAC;if(n===al)return r.COMPRESSED_SIGNED_R11_EAC;if(n===oa)return r.COMPRESSED_RG11_EAC;if(n===ol)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ll||n===cl||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===xl||n===_l||n===vl||n===yl||n===Ml)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ll)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ul)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ml)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_l)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ml)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sl||n===bl||n===wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Sl)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===El||n===Tl||n===la||n===Al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===El)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===la)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ri?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ev=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new wr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new wt({vertexShader:Q_,fragmentShader:ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eh=class extends Hn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,p=null,y=typeof XRWebGLBinding<"u",g=new wh,m={},M=t.getContextAttributes(),w=null,_=null,E=[],S=[],P=new he,x=null,T=null,A=new kt;A.viewport=new vt;let R=new kt;R.viewport=new vt;let D=[A,R],U=new Bo,N=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let k=E[I];return k===void 0&&(k=new Ts,E[I]=k),k.getTargetRaySpace()},this.getControllerGrip=function(I){let k=E[I];return k===void 0&&(k=new Ts,E[I]=k),k.getGripSpace()},this.getHand=function(I){let k=E[I];return k===void 0&&(k=new Ts,E[I]=k),k.getHandSpace()};function q(I){let k=S.indexOf(I.inputSource);if(k===-1)return;let ee=E[k];ee!==void 0&&(ee.update(I.inputSource,I.frame,c||a),ee.dispatchEvent({type:I.type,data:I.inputSource}))}function Y(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",te);for(let I=0;I<E.length;I++){let k=S[I];k!==null&&(S[I]=null,E[I].disconnect(k))}N=null,O=null,g.reset();for(let I in m)delete m[I];if(e.setRenderTarget(w),d=null,u=null,f=null,s=null,_=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(P.width,P.height,!1),T!==null){let I=T.camera;I.fov=T.fov,I.zoom=T.zoom,I.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(I){if(s=I,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",te),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,oe=null,re=null;M.depth&&(re=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=M.stencil?$n:Vn,oe=M.stencil?Ri:In);let de={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(de),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new bt(u.textureWidth,u.textureHeight,{format:rn,type:$t,depthTexture:new qn(u.textureWidth,u.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ee={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new bt(d.framebufferWidth,d.framebufferHeight,{format:rn,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function te(I){for(let k=0;k<I.removed.length;k++){let ee=I.removed[k],oe=S.indexOf(ee);oe>=0&&(S[oe]=null,E[oe].disconnect(ee))}for(let k=0;k<I.added.length;k++){let ee=I.added[k],oe=S.indexOf(ee);if(oe===-1){for(let de=0;de<E.length;de++)if(de>=S.length){S.push(ee),oe=de;break}else if(S[de]===null){S[de]=ee,oe=de;break}if(oe===-1)break}let re=E[oe];re&&re.connect(ee)}}let H=new L,J=new L;function $(I,k,ee){H.setFromMatrixPosition(k.matrixWorld),J.setFromMatrixPosition(ee.matrixWorld);let oe=H.distanceTo(J),re=k.projectionMatrix.elements,de=ee.projectionMatrix.elements,ze=re[14]/(re[10]-1),j=re[14]/(re[10]+1),se=(re[9]+1)/re[5],ae=(re[9]-1)/re[5],le=(re[8]-1)/re[0],fe=(de[8]+1)/de[0],Re=ze*le,Pe=ze*fe,ke=oe/(-le+fe),We=ke*-le;if(k.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(We),I.translateZ(ke),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),re[10]===-1)I.projectionMatrix.copy(k.projectionMatrix),I.projectionMatrixInverse.copy(k.projectionMatrixInverse);else{let F=ze+ke,at=j+ke,Je=Re-We,C=Pe+(oe-We),v=se*j/at*F,V=ae*j/at*F;I.projectionMatrix.makePerspective(Je,C,v,V,F,at),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function we(I,k){k===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(k.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(s===null)return;let k=I.near,ee=I.far;g.texture!==null&&(g.depthNear>0&&(k=g.depthNear),g.depthFar>0&&(ee=g.depthFar)),U.near=R.near=A.near=k,U.far=R.far=A.far=ee,(N!==U.near||O!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),N=U.near,O=U.far),U.layers.mask=I.layers.mask|6,A.layers.mask=U.layers.mask&-5,R.layers.mask=U.layers.mask&-3;let oe=I.parent,re=U.cameras;we(U,oe);for(let de=0;de<re.length;de++)we(re[de],oe);re.length===2?$(U,A,R):U.projectionMatrix.copy(A.projectionMatrix),T===null&&I.isPerspectiveCamera&&(T={camera:I,fov:I.fov,zoom:I.zoom}),Se(I,U,oe)};function Se(I,k,ee){ee===null?I.matrix.copy(k.matrixWorld):(I.matrix.copy(ee.matrixWorld),I.matrix.invert(),I.matrix.multiply(k.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(k.projectionMatrix),I.projectionMatrixInverse.copy(k.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=bs*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(I){l=I,u!==null&&(u.fixedFoveation=I),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=I)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(I){return m[I]};let Qe=null;function qe(I,k){if(h=k.getViewerPose(c||a),p=k,h!==null){let ee=h.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let oe=!1;ee.length!==U.cameras.length&&(U.cameras.length=0,oe=!0);for(let j=0;j<ee.length;j++){let se=ee[j],ae=null;if(d!==null)ae=d.getViewport(se);else{let fe=f.getViewSubImage(u,se);ae=fe.viewport,j===0&&(e.setRenderTargetTextures(_,fe.colorTexture,fe.depthStencilTexture),e.setRenderTarget(_))}let le=D[j];le===void 0&&(le=new kt,le.layers.enable(j),le.viewport=new vt,D[j]=le),le.matrix.fromArray(se.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(se.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(ae.x,ae.y,ae.width,ae.height),j===0&&(U.matrix.copy(le.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),oe===!0&&U.cameras.push(le)}let re=s.enabledFeatures;if(re&&re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=n.getBinding();let j=f.getDepthInformation(ee[0]);j&&j.isValid&&j.texture&&g.init(j,s.renderState)}if(re&&re.includes("camera-access")&&y){e.state.unbindTexture(),f=n.getBinding();for(let j=0;j<ee.length;j++){let se=ee[j].camera;if(se){let ae=m[se];ae||(ae=new wr,m[se]=ae);let le=f.getCameraImage(se);ae.sourceTexture=le}}}}for(let ee=0;ee<E.length;ee++){let oe=S[ee],re=E[ee];oe!==null&&re!==void 0&&re.update(oe,k,c||a)}Qe&&Qe(I,k),k.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:k}),p=null}let $e=new Ff;$e.setAnimationLoop(qe),this.setAnimationLoop=function(I){Qe=I},this.dispose=function(){}}},tv=new Ze,Hf=new Ye;Hf.set(-1,0,0,0,1,0,0,0,1);function nv(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,nh(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,w,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,M,w):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ht&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ht&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let M=e.get(m),w=M.envMap,_=M.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(tv.makeRotationFromEuler(_)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Hf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,w){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=w*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function iv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,E){let S=E.program;n.uniformBlockBinding(_,S)}function c(_,E){let S=s[_.id];S===void 0&&(g(_),S=h(_),s[_.id]=S,_.addEventListener("dispose",M));let P=E.program;n.updateUBOMapping(_,P);let x=e.render.frame;r[_.id]!==x&&(u(_),r[_.id]=x)}function h(_){let E=f();_.__bindingPointIndex=E;let S=i.createBuffer(),P=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,P,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let E=s[_.id],S=_.uniforms,P=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let x=0,T=S.length;x<T;x++){let A=S[x];if(Array.isArray(A))for(let R=0,D=A.length;R<D;R++)d(A[R],x,R,P);else d(A,x,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,E,S,P){if(y(_,E,S,P)===!0){let x=_.__offset,T=_.value;if(Array.isArray(T)){let A=0;for(let R=0;R<T.length;R++){let D=T[R],U=m(D);p(D,_.__data,A),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(A+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function p(_,E,S){typeof _=="number"||typeof _=="boolean"?E[0]=_:_.isMatrix3?(E[0]=_.elements[0],E[1]=_.elements[1],E[2]=_.elements[2],E[3]=0,E[4]=_.elements[3],E[5]=_.elements[4],E[6]=_.elements[5],E[7]=0,E[8]=_.elements[6],E[9]=_.elements[7],E[10]=_.elements[8],E[11]=0):ArrayBuffer.isView(_)?E.set(new _.constructor(_.buffer,_.byteOffset,E.length)):_.toArray(E,S)}function y(_,E,S,P){let x=_.value,T=E+"_"+S;if(P[T]===void 0)return typeof x=="number"||typeof x=="boolean"?P[T]=x:ArrayBuffer.isView(x)?P[T]=x.slice():P[T]=x.clone(),!0;{let A=P[T];if(typeof x=="number"||typeof x=="boolean"){if(A!==x)return P[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(A.equals(x)===!1)return A.copy(x),!0}}return!1}function g(_){let E=_.uniforms,S=0,P=16;for(let T=0,A=E.length;T<A;T++){let R=Array.isArray(E[T])?E[T]:[E[T]];for(let D=0,U=R.length;D<U;D++){let N=R[D],O=Array.isArray(N.value)?N.value:[N.value];for(let q=0,Y=O.length;q<Y;q++){let te=O[q],H=m(te),J=S%P,$=J%H.boundary,we=J+$;S+=$,we!==0&&P-we<H.storage&&(S+=P-we),N.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=H.storage}}}let x=S%P;return x>0&&(S+=P-x),_.__size=S,_.__cache={},this}function m(_){let E={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(E.boundary=4,E.storage=4):_.isVector2?(E.boundary=8,E.storage=8):_.isVector3||_.isColor?(E.boundary=16,E.storage=12):_.isVector4?(E.boundary=16,E.storage=16):_.isMatrix3?(E.boundary=48,E.storage=48):_.isMatrix4?(E.boundary=64,E.storage=64):_.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(E.boundary=16,E.storage=_.byteLength):He("WebGLRenderer: Unsupported uniform value type.",_),E}function M(_){let E=_.target;E.removeEventListener("dispose",M);let S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function w(){for(let _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}var sv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function rv(){return Jn===null&&(Jn=new ai(sv,16,16,Ci,Bt),Jn.name="DFG_LUT",Jn.minFilter=zt,Jn.magFilter=zt,Jn.wrapS=kn,Jn.wrapT=kn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var Dl=class{constructor(e={}){let{canvas:t=nf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=$t}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let y=d,g=new Set([Ko,Jo,$o]),m=new Set([$t,In,Fs,Ri,qo,Yo]),M=new Uint32Array(4),w=new Int32Array(4),_=new L,E=null,S=null,P=[],x=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,R=!1,D=null,U=null,N=null,O=null;this._outputColorSpace=_t;let q=0,Y=0,te=null,H=-1,J=null,$=new vt,we=new vt,Se=null,Qe=new Te(0),qe=0,$e=t.width,I=t.height,k=1,ee=null,oe=null,re=new vt(0,0,$e,I),de=new vt(0,0,$e,I),ze=!1,j=new Cs,se=!1,ae=!1,le=new Ze,fe=new L,Re=new vt,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function We(){return te===null?k:1}let F=n;function at(b,B){return t.getContext(b,B)}let Je,C,v,V,G,K,ue,pe,Q,ie,xe,Ue,ge,me,Ie,Oe,Xe,z,_e,ne,ve,Ee,ce;try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",bn,!1),F===null){let B="webgl2";if(F=at(B,b),F===null)throw at(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Be()}catch(b){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",bn,!1),Ve("WebGLRenderer: "+b.message),b}function Be(){Je=new fx(F),Je.init(),ve=new j_(F,Je),C=new nx(F,Je,e,ve),v=new J_(F,Je),C.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),U=F.createFramebuffer(),N=F.createFramebuffer(),O=F.createFramebuffer(),V=new mx(F),G=new F_,K=new K_(F,Je,v,G,C,ve,V),ue=new ux(A),pe=new x0(F),Ee=new ex(F,pe),Q=new dx(F,pe,V,Ee),ie=new xx(F,Q,pe,Ee,V),z=new gx(F,C,K),Ie=new ix(G),xe=new U_(A,ue,Je,C,Ee,Ie),Ue=new nv(A,G),ge=new B_,me=new W_(Je),Xe=new Qg(A,ue,v,ie,p,l),Oe=new $_(A,ie,C),ce=new iv(F,V,C,v),_e=new tx(F,Je,V),ne=new px(F,Je,V),V.programs=xe.programs,A.capabilities=C,A.extensions=Je,A.properties=G,A.renderLists=ge,A.shadowMap=Oe,A.state=v,A.info=V}y!==$t&&(T=new vx(y,t.width,t.height,o,s,r));let Ne=new Eh(A,F);this.xr=Ne,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let b=Je.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Je.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize($e,I,!1))},this.getSize=function(b){return b.set($e,I)},this.setSize=function(b,B,Z=!0){if(Ne.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}$e=b,I=B,t.width=Math.floor(b*k),t.height=Math.floor(B*k),Z===!0&&(t.style.width=b+"px",t.style.height=B+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set($e*k,I*k).floor()},this.setDrawingBufferSize=function(b,B,Z){$e=b,I=B,k=Z,t.width=Math.floor(b*Z),t.height=Math.floor(B*Z),this.setViewport(0,0,b,B)},this.setEffects=function(b){if(y===$t){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let B=0;B<b.length;B++)if(b[B].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy($)},this.getViewport=function(b){return b.copy(re)},this.setViewport=function(b,B,Z,W){b.isVector4?re.set(b.x,b.y,b.z,b.w):re.set(b,B,Z,W),v.viewport($.copy(re).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(de)},this.setScissor=function(b,B,Z,W){b.isVector4?de.set(b.x,b.y,b.z,b.w):de.set(b,B,Z,W),v.scissor(we.copy(de).multiplyScalar(k).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(b){v.setScissorTest(ze=b)},this.setOpaqueSort=function(b){ee=b},this.setTransparentSort=function(b){oe=b},this.getClearColor=function(b){return b.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(b=!0,B=!0,Z=!0){let W=0;if(b){let X=!1;if(te!==null){let be=te.texture.format;X=g.has(be)}if(X){let be=te.texture.type,Ce=m.has(be),Me=Xe.getClearColor(),Le=Xe.getClearAlpha(),Fe=Me.r,Ke=Me.g,st=Me.b;Ce?(M[0]=Fe,M[1]=Ke,M[2]=st,M[3]=Le,F.clearBufferuiv(F.COLOR,0,M)):(w[0]=Fe,w[1]=Ke,w[2]=st,w[3]=Le,F.clearBufferiv(F.COLOR,0,w))}else W|=F.COLOR_BUFFER_BIT}B&&(W|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),D=b},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",bn,!1),Xe.dispose(),ge.dispose(),me.dispose(),G.dispose(),ue.dispose(),ie.dispose(),Ee.dispose(),ce.dispose(),xe.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",Bh),Ne.removeEventListener("sessionend",kh),Di.stop()};function pt(b){b.preventDefault(),mr("WebGLRenderer: Context Lost."),R=!0}function ct(){mr("WebGLRenderer: Context Restored."),R=!1;let b=V.autoReset,B=Oe.enabled,Z=Oe.autoUpdate,W=Oe.needsUpdate,X=Oe.type;Be(),V.autoReset=b,Oe.enabled=B,Oe.autoUpdate=Z,Oe.needsUpdate=W,Oe.type=X}function bn(b){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Fn(b){let B=b.target;B.removeEventListener("dispose",Fn),Fd(B)}function Fd(b){Od(b),G.remove(b)}function Od(b){let B=G.get(b).programs;B!==void 0&&(B.forEach(function(Z){xe.releaseProgram(Z)}),b.isShaderMaterial&&xe.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,Z,W,X,be){B===null&&(B=Pe);let Ce=X.isMesh&&X.matrixWorld.determinantAffine()<0,Me=zd(b,B,Z,W,X);v.setMaterial(W,Ce);let Le=Z.index,Fe=1;if(W.wireframe===!0){if(Le=Q.getWireframeAttribute(Z),Le===void 0)return;Fe=2}let Ke=Z.drawRange,st=Z.attributes.position,De=Ke.start*Fe,ht=(Ke.start+Ke.count)*Fe;be!==null&&(De=Math.max(De,be.start*Fe),ht=Math.min(ht,(be.start+be.count)*Fe)),Le!==null?(De=Math.max(De,0),ht=Math.min(ht,Le.count)):st!=null&&(De=Math.max(De,0),ht=Math.min(ht,st.count));let Ct=ht-De;if(Ct<0||Ct===1/0)return;Ee.setup(X,W,Me,Z,Le);let gt,dt=_e;if(Le!==null&&(gt=pe.get(Le),dt=ne,dt.setIndex(gt)),X.isMesh)W.wireframe===!0?(v.setLineWidth(W.wireframeLinewidth*We()),dt.setMode(F.LINES)):dt.setMode(F.TRIANGLES);else if(X.isLine){let Xt=W.linewidth;Xt===void 0&&(Xt=1),v.setLineWidth(Xt*We()),X.isLineSegments?dt.setMode(F.LINES):X.isLineLoop?dt.setMode(F.LINE_LOOP):dt.setMode(F.LINE_STRIP)}else X.isPoints?dt.setMode(F.POINTS):X.isSprite&&dt.setMode(F.TRIANGLES);if(X.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))dt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let Xt=X._multiDrawStarts,Ae=X._multiDrawCounts,jt=X._multiDrawCount,ot=Le?pe.get(Le).bytesPerElement:1,fn=G.get(W).currentProgram.getUniforms();for(let On=0;On<jt;On++)fn.setValue(F,"_gl_DrawID",On),dt.render(Xt[On]/ot,Ae[On])}else if(X.isInstancedMesh)dt.renderInstances(De,Ct,X.count);else if(Z.isInstancedBufferGeometry){let Xt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ae=Math.min(Z.instanceCount,Xt);dt.renderInstances(De,Ct,Ae)}else dt.render(De,Ct)};function Oh(b,B,Z,W){D!==null&&b.isNodeMaterial&&D.setObject(W,b),se===!0&&Ie.setState(b,Z,!1),b.transparent===!0&&b.side===mn&&b.forceSinglePass===!1?(b.side=Ht,b.needsUpdate=!0,Ia(b,B,W),b.side=Zn,b.needsUpdate=!0,Ia(b,B,W),b.side=mn):Ia(b,B,W)}this.compile=function(b,B,Z=null){Z===null&&(Z=b),D!==null&&D.renderStart(b,B,Z),S=me.get(Z),S.init(B),x.push(S),Z.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(S.pushLight(X),X.castShadow&&S.pushShadow(X))}),b!==Z&&b.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(S.pushLight(X),X.castShadow&&S.pushShadow(X))}),S.setupLights(),D!==null&&D.updateLights(S.state.lightsArray),ae=this.localClippingEnabled,se=Ie.init(this.clippingPlanes,ae),se===!0&&Ie.setGlobalState(this.clippingPlanes,B),D!==null&&Oe.render(S.state.shadowsArray,Z,B);let W=new Set;return b.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let be=X.material;if(be)if(Array.isArray(be))for(let Ce=0;Ce<be.length;Ce++){let Me=be[Ce];Oh(Me,Z,B,X),W.add(Me)}else Oh(be,Z,B,X),W.add(be)}),S=x.pop(),D!==null&&D.renderEnd(),W},this.compileAsync=function(b,B,Z=null){let W=this.compile(b,B,Z);return new Promise(X=>{function be(){if(W.forEach(function(Ce){let Le=G.get(Ce).currentProgram;(Le===void 0||Le.isReady())&&W.delete(Ce)}),W.size===0){X(b);return}setTimeout(be,10)}Je.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let jl=null;function Bd(b){jl&&jl(b)}function Bh(){Di.stop()}function kh(){Di.start()}let Di=new Ff;Di.setAnimationLoop(Bd),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(b){jl=b,Ne.setAnimationLoop(b),b===null?Di.stop():Di.start()},Ne.addEventListener("sessionstart",Bh),Ne.addEventListener("sessionend",kh),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;D!==null&&D.renderStart(b,B);let Z=Ne.enabled===!0&&Ne.isPresenting===!0,W=T!==null&&(te===null||Z)&&T.begin(A,te);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(B),B=Ne.getCamera()),b.isScene===!0&&b.onBeforeRender(A,b,B,te),S=me.get(b,x.length),S.init(B),S.state.textureUnits=K.getTextureUnits(),x.push(S),le.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),j.setFromProjectionMatrix(le,Rn,B.reversedDepth),ae=this.localClippingEnabled,se=Ie.init(this.clippingPlanes,ae),E=ge.get(b,P.length),E.init(),P.push(E),Ne.enabled===!0&&Ne.isPresenting===!0){let Ce=A.xr.getDepthSensingMesh();Ce!==null&&Ql(Ce,B,-1/0,A.sortObjects)}Ql(b,B,0,A.sortObjects),E.finish(),D!==null&&D.updateLights(S.state.lightsArray),A.sortObjects===!0&&E.sort(ee,oe),ke=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,ke&&Xe.addToRenderList(E,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Ie.beginShadows();let X=S.state.shadowsArray;if(Oe.render(X,b,B),se===!0&&Ie.endShadows(),(W&&T.hasRenderPass())===!1){let Ce=E.opaque,Me=E.transmissive;if(S.setupLights(),B.isArrayCamera){let Le=B.cameras;if(Me.length>0)for(let Fe=0,Ke=Le.length;Fe<Ke;Fe++){let st=Le[Fe];Vh(Ce,Me,b,st)}ke&&Xe.render(b);for(let Fe=0,Ke=Le.length;Fe<Ke;Fe++){let st=Le[Fe];zh(E,b,st,st.viewport)}}else Me.length>0&&Vh(Ce,Me,b,B),ke&&Xe.render(b),zh(E,b,B)}te!==null&&Y===0&&(K.updateMultisampleRenderTarget(te),K.updateRenderTargetMipmap(te)),W&&T.end(A),b.isScene===!0&&b.onAfterRender(A,b,B),Ee.resetDefaultState(),H=-1,J=null,x.pop(),x.length>0?(S=x[x.length-1],K.setTextureUnits(S.state.textureUnits),se===!0&&Ie.setGlobalState(A.clippingPlanes,S.state.camera)):S=null,P.pop(),P.length>0?E=P[P.length-1]:E=null,D!==null&&D.renderEnd()};function Ql(b,B,Z,W){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(j)){W&&Re.setFromMatrixPosition(b.matrixWorld).applyMatrix4(le);let Ce=ie.update(b),Me=b.material;Me.visible&&E.push(b,Ce,Me,Z,Re.z,null,B)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(j))){let Ce=ie.update(b),Me=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Re.copy(b.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Re.copy(Ce.boundingSphere.center)),Re.applyMatrix4(b.matrixWorld).applyMatrix4(le)),Array.isArray(Me)){let Le=Ce.groups;for(let Fe=0,Ke=Le.length;Fe<Ke;Fe++){let st=Le[Fe],De=Me[st.materialIndex];De&&De.visible&&E.push(b,Ce,De,Z,Re.z,st,B)}}else Me.visible&&E.push(b,Ce,Me,Z,Re.z,null,B)}}let be=b.children;for(let Ce=0,Me=be.length;Ce<Me;Ce++)Ql(be[Ce],B,Z,W)}function zh(b,B,Z,W){let{opaque:X,transmissive:be,transparent:Ce}=b;S.setupLightsView(Z),se===!0&&Ie.setGlobalState(A.clippingPlanes,Z),W&&v.viewport($.copy(W)),X.length>0&&Pa(X,B,Z),be.length>0&&Pa(be,B,Z),Ce.length>0&&Pa(Ce,B,Z),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Vh(b,B,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[W.id]===void 0){let De=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[W.id]=new bt(1,1,{generateMipmaps:!0,type:De?Bt:$t,minFilter:Ai,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let be=S.state.transmissionRenderTarget[W.id],Ce=W.viewport||$;be.setSize(Ce.z*A.transmissionResolutionScale,Ce.w*A.transmissionResolutionScale);let Me=A.getRenderTarget(),Le=A.getActiveCubeFace(),Fe=A.getActiveMipmapLevel();A.setRenderTarget(be),A.getClearColor(Qe),qe=A.getClearAlpha(),qe<1&&A.setClearColor(16777215,.5),A.clear(),ke&&Xe.render(Z);let Ke=A.toneMapping;A.toneMapping=Pn;let st=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),S.setupLightsView(W),se===!0&&Ie.setGlobalState(A.clippingPlanes,W),Pa(b,Z,W),K.updateMultisampleRenderTarget(be),K.updateRenderTargetMipmap(be),Je.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let ht=0,Ct=B.length;ht<Ct;ht++){let gt=B[ht],{object:dt,geometry:Xt,material:Ae,group:jt}=gt;if(Ae.side===mn&&dt.layers.test(W.layers)){let ot=Ae.side;Ae.side=Ht,Ae.needsUpdate=!0,Hh(dt,Z,W,Xt,Ae,jt),Ae.side=ot,Ae.needsUpdate=!0,De=!0}}De===!0&&(K.updateMultisampleRenderTarget(be),K.updateRenderTargetMipmap(be))}A.setRenderTarget(Me,Le,Fe),A.setClearColor(Qe,qe),st!==void 0&&(W.viewport=st),A.toneMapping=Ke}function Pa(b,B,Z){let W=B.isScene===!0?B.overrideMaterial:null;for(let X=0,be=b.length;X<be;X++){let Ce=b[X],{object:Me,geometry:Le,group:Fe}=Ce,Ke=Ce.material;Ke.allowOverride===!0&&W!==null&&(Ke=W),Me.layers.test(Z.layers)&&Hh(Me,B,Z,Le,Ke,Fe)}}function Hh(b,B,Z,W,X,be){D!==null&&X.isNodeMaterial&&D.setObject(b,X),b.onBeforeRender(A,B,Z,W,X,be),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),X.onBeforeRender(A,B,Z,W,b,be),X.transparent===!0&&X.side===mn&&X.forceSinglePass===!1?(X.side=Ht,X.needsUpdate=!0,A.renderBufferDirect(Z,B,W,X,b,be),X.side=Zn,X.needsUpdate=!0,A.renderBufferDirect(Z,B,W,X,b,be),X.side=mn):A.renderBufferDirect(Z,B,W,X,b,be),b.onAfterRender(A,B,Z,W,X,be)}function Ia(b,B,Z){B.isScene!==!0&&(B=Pe);let W=G.get(b),X=S.state.lights,be=S.state.shadowsArray,Ce=X.state.version,Me=xe.getParameters(b,X.state,be,B,Z,S.state.lightProbeGridArray),Le=xe.getProgramCacheKey(Me),Fe=W.programs;W.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?B.environment:null,W.fog=B.fog;let Ke=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;W.envMap=ue.get(b.envMap||W.environment,Ke),W.envMapRotation=W.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Fe===void 0&&(b.addEventListener("dispose",Fn),Fe=new Map,W.programs=Fe);let st=Fe.get(Le);if(st!==void 0){if(W.currentProgram===st&&W.lightsStateVersion===Ce)return Wh(b,Me),st}else Me.uniforms=xe.getUniforms(b),D!==null&&b.isNodeMaterial&&D.build(b,Z,Me),b.onBeforeCompile(Me,A),st=xe.acquireProgram(Me,Le),Fe.set(Le,st),W.uniforms=Me.uniforms;let De=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(De.clippingPlanes=Ie.uniform),Wh(b,Me),W.needsLights=Hd(b),W.lightsStateVersion=Ce,W.needsLights&&(De.ambientLightColor.value=X.state.ambient,De.lightProbe.value=X.state.probe,De.sunLights.value=X.state.sun,De.sunLightShadows.value=X.state.sunShadow,De.directionalLights.value=X.state.directional,De.directionalLightShadows.value=X.state.directionalShadow,De.spotLights.value=X.state.spot,De.spotLightShadows.value=X.state.spotShadow,De.rectAreaLights.value=X.state.rectArea,De.ltc_1.value=X.state.rectAreaLTC1,De.ltc_2.value=X.state.rectAreaLTC2,De.pointLights.value=X.state.point,De.pointLightShadows.value=X.state.pointShadow,De.hemisphereLights.value=X.state.hemi,De.sunShadowMatrix.value=X.state.sunShadowMatrix,De.sunShadowCascade.value=X.state.sunShadowCascade,De.directionalShadowMatrix.value=X.state.directionalShadowMatrix,De.spotLightMatrix.value=X.state.spotLightMatrix,De.spotLightMap.value=X.state.spotLightMap,De.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=S.state.lightProbeGridArray.length>0,W.currentProgram=st,W.uniformsList=null,st}function Gh(b){if(b.uniformsList===null){let B=b.currentProgram.getUniforms();b.uniformsList=zs.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function Wh(b,B){let Z=G.get(b);Z.outputColorSpace=B.outputColorSpace,Z.batching=B.batching,Z.batchingColor=B.batchingColor,Z.instancing=B.instancing,Z.instancingColor=B.instancingColor,Z.instancingMorph=B.instancingMorph,Z.skinning=B.skinning,Z.morphTargets=B.morphTargets,Z.morphNormals=B.morphNormals,Z.morphColors=B.morphColors,Z.morphTargetsCount=B.morphTargetsCount,Z.numClippingPlanes=B.numClippingPlanes,Z.numIntersection=B.numClipIntersection,Z.vertexAlphas=B.vertexAlphas,Z.vertexTangents=B.vertexTangents,Z.toneMapping=B.toneMapping}function kd(b,B){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;_.setFromMatrixPosition(B.matrixWorld);for(let Z=0,W=b.length;Z<W;Z++){let X=b[Z];if(X.texture!==null&&X.boundingBox.containsPoint(_))return X}return null}function zd(b,B,Z,W,X){B.isScene!==!0&&(B=Pe),K.resetTextureUnits();let be=B.fog,Ce=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?B.environment:null,Me=te===null?A.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:it.workingColorSpace,Le=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Fe=ue.get(W.envMap||Ce,Le),Ke=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,st=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!Z.morphAttributes.position,ht=!!Z.morphAttributes.normal,Ct=!!Z.morphAttributes.color,gt=Pn;W.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(gt=A.toneMapping);let dt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Xt=dt!==void 0?dt.length:0,Ae=G.get(W),jt=S.state.lights;if(se===!0&&(ae===!0||b!==J)){let mt=b===J&&W.id===H;Ie.setState(W,b,mt)}let ot=!1;W.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==jt.state.version||Ae.outputColorSpace!==Me||X.isBatchedMesh&&Ae.batching===!1||!X.isBatchedMesh&&Ae.batching===!0||X.isBatchedMesh&&Ae.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ae.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ae.instancing===!1||!X.isInstancedMesh&&Ae.instancing===!0||X.isSkinnedMesh&&Ae.skinning===!1||!X.isSkinnedMesh&&Ae.skinning===!0||X.isInstancedMesh&&Ae.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ae.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ae.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ae.instancingMorph===!1&&X.morphTexture!==null||Ae.envMap!==Fe||W.fog===!0&&Ae.fog!==be||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Ie.numPlanes||Ae.numIntersection!==Ie.numIntersection)||Ae.vertexAlphas!==Ke||Ae.vertexTangents!==st||Ae.morphTargets!==De||Ae.morphNormals!==ht||Ae.morphColors!==Ct||Ae.toneMapping!==gt||Ae.morphTargetsCount!==Xt||!!Ae.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,Ae.__version=W.version);let fn=Ae.currentProgram;ot===!0&&(fn=Ia(W,B,X),D&&W.isNodeMaterial&&D.onUpdateProgram(W,fn,Ae));let On=!1,hi=!1,Qi=!1,ft=fn.getUniforms(),Et=Ae.uniforms;if(v.useProgram(fn.program)&&(On=!0,hi=!0,Qi=!0),W.id!==H&&(H=W.id,hi=!0),Ae.needsLights){let mt=kd(S.state.lightProbeGridArray,X);Ae.lightProbeGrid!==mt&&(Ae.lightProbeGrid=mt,hi=!0)}if(On||J!==b){v.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ft.setValue(F,"projectionMatrix",b.projectionMatrix),ft.setValue(F,"viewMatrix",b.matrixWorldInverse);let fi=ft.map.cameraPosition;fi!==void 0&&fi.setValue(F,fe.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&ft.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ft.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),J!==b&&(J=b,hi=!0,Qi=!0)}if(Ae.needsLights&&(jt.state.sunShadowMap.length>0&&ft.setValue(F,"sunShadowMap",jt.state.sunShadowMap,K),jt.state.directionalShadowMap.length>0&&ft.setValue(F,"directionalShadowMap",jt.state.directionalShadowMap,K),jt.state.spotShadowMap.length>0&&ft.setValue(F,"spotShadowMap",jt.state.spotShadowMap,K),jt.state.pointShadowMap.length>0&&ft.setValue(F,"pointShadowMap",jt.state.pointShadowMap,K)),X.isSkinnedMesh){ft.setOptional(F,X,"bindMatrix"),ft.setOptional(F,X,"bindMatrixInverse");let mt=X.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ft.setValue(F,"boneTexture",mt.boneTexture,K))}X.isBatchedMesh&&(ft.setOptional(F,X,"batchingTexture"),ft.setValue(F,"batchingTexture",X._matricesTexture,K),ft.setOptional(F,X,"batchingIdTexture"),ft.setValue(F,"batchingIdTexture",X._indirectTexture,K),ft.setOptional(F,X,"batchingColorTexture"),X._colorsTexture!==null&&ft.setValue(F,"batchingColorTexture",X._colorsTexture,K));let ui=Z.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&z.update(X,Z,fn),(hi||Ae.receiveShadow!==X.receiveShadow)&&(Ae.receiveShadow=X.receiveShadow,ft.setValue(F,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&B.environment!==null&&(Et.envMapIntensity.value=B.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=rv()),hi){if(ft.setValue(F,"toneMappingExposure",A.toneMappingExposure),Ae.needsLights&&Vd(Et,Qi),be&&W.fog===!0&&Ue.refreshFogUniforms(Et,be),Ue.refreshMaterialUniforms(Et,W,k,I,S.state.transmissionRenderTarget[b.id]),Ae.needsLights&&Ae.lightProbeGrid){let mt=Ae.lightProbeGrid;Et.probesSH.value=mt.texture,Et.probesMin.value.copy(mt.boundingBox.min),Et.probesMax.value.copy(mt.boundingBox.max),Et.probesResolution.value.copy(mt.resolution)}zs.upload(F,Gh(Ae),Et,K)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(zs.upload(F,Gh(Ae),Et,K),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ft.setValue(F,"center",X.center),ft.setValue(F,"modelViewMatrix",X.modelViewMatrix),ft.setValue(F,"normalMatrix",X.normalMatrix),ft.setValue(F,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){let mt=W.uniformsGroups;for(let fi=0,es=mt.length;fi<es;fi++){let qh=mt[fi];ce.update(qh,fn),ce.bind(qh,fn)}}return fn}function Vd(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.sunLights.needsUpdate=B,b.sunLightShadows.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function Hd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(b,B,Z){let W=G.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),G.get(b.texture).__webglTexture=B,G.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,B){let Z=G.get(b);Z.__webglFramebuffer=B,Z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,Z=0){te=b,q=B,Y=Z;let W=null,X=!1,be=!1;if(b){let Me=G.get(b);if(Me.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(F.FRAMEBUFFER,Me.__webglFramebuffer),$.copy(b.viewport),we.copy(b.scissor),Se=b.scissorTest,v.viewport($),v.scissor(we),v.setScissorTest(Se),H=-1;return}else if(Me.__webglFramebuffer===void 0)K.setupRenderTarget(b);else if(Me.__hasExternalTextures)K.rebindTextures(b,G.get(b.texture).__webglTexture,G.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ke=b.depthTexture;if(Me.__boundDepthTexture!==Ke){if(Ke!==null&&G.has(Ke)&&(b.width!==Ke.image.width||b.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(b)}}let Le=b.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(be=!0);let Fe=G.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Fe[B])?W=Fe[B][Z]:W=Fe[B],X=!0):b.samples>0&&K.useMultisampledRTT(b)===!1?W=G.get(b).__webglMultisampledFramebuffer:Array.isArray(Fe)?W=Fe[Z]:W=Fe,$.copy(b.viewport),we.copy(b.scissor),Se=b.scissorTest}else $.copy(re).multiplyScalar(k).floor(),we.copy(de).multiplyScalar(k).floor(),Se=ze;if(Z!==0&&(W=U),v.bindFramebuffer(F.FRAMEBUFFER,W)&&v.drawBuffers(b,W),v.viewport($),v.scissor(we),v.setScissorTest(Se),X){let Me=G.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,Me.__webglTexture,Z)}else if(be){let Me=B;for(let Le=0;Le<b.textures.length;Le++){let Fe=G.get(b.textures[Le]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Le,Fe.__webglTexture,Z,Me)}}else if(b!==null&&Z!==0){let Me=G.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Me.__webglTexture,Z)}H=-1};function Xh(b){let B=G.get(b);return(B.__readFormat!==b.format||B.__readType!==b.type)&&(B.__readFormat=b.format,B.__readType=b.type,B.__formatReadable=C.textureFormatReadable(b.format),B.__typeReadable=C.textureTypeReadable(b.type)),B}this.readRenderTargetPixels=function(b,B,Z,W,X,be,Ce,Me=0){if(!(b&&b.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce]),Le){v.bindFramebuffer(F.FRAMEBUFFER,Le);try{let Fe=b.textures[Me],Ke=Fe.format,st=Fe.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Me);let De=Xh(Fe);if(De.__formatReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-W&&Z>=0&&Z<=b.height-X&&F.readPixels(B,Z,W,X,ve.convert(Ke),ve.convert(st),be)}finally{let Fe=te!==null?G.get(te).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(b,B,Z,W,X,be,Ce,Me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(Le=Le[Ce]),Le)if(B>=0&&B<=b.width-W&&Z>=0&&Z<=b.height-X){v.bindFramebuffer(F.FRAMEBUFFER,Le);let Fe=b.textures[Me],Ke=Fe.format,st=Fe.type;b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Me);let De=Xh(Fe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ht=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ht),F.bufferData(F.PIXEL_PACK_BUFFER,be.byteLength,F.STREAM_READ),F.readPixels(B,Z,W,X,ve.convert(Ke),ve.convert(st),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ct=te!==null?G.get(te).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Ct);let gt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await rf(F,gt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ht),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,be),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(ht),F.deleteSync(gt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,B=null,Z=0){let W=Math.pow(2,-Z),X=Math.floor(b.image.width*W),be=Math.floor(b.image.height*W),Ce=B!==null?B.x:0,Me=B!==null?B.y:0;K.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,Z,0,0,Ce,Me,X,be),v.unbindTexture()},this.copyTextureToTexture=function(b,B,Z=null,W=null,X=0,be=0){let Ce,Me,Le,Fe,Ke,st,De,ht,Ct,gt=b.isCompressedTexture?b.mipmaps[be]:b.image;if(Z!==null)Ce=Z.max.x-Z.min.x,Me=Z.max.y-Z.min.y,Le=Z.isBox3?Z.max.z-Z.min.z:1,Fe=Z.min.x,Ke=Z.min.y,st=Z.isBox3?Z.min.z:0;else{let Et=Math.pow(2,-X);Ce=Math.floor(gt.width*Et),Me=Math.floor(gt.height*Et),b.isDataArrayTexture?Le=gt.depth:b.isData3DTexture?Le=Math.floor(gt.depth*Et):Le=1,Fe=0,Ke=0,st=0}W!==null?(De=W.x,ht=W.y,Ct=W.z):(De=0,ht=0,Ct=0);let dt=ve.convert(B.format),Xt=ve.convert(B.type),Ae;B.isData3DTexture?(K.setTexture3D(B,0),Ae=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(K.setTexture2DArray(B,0),Ae=F.TEXTURE_2D_ARRAY):(K.setTexture2D(B,0),Ae=F.TEXTURE_2D),v.activeTexture(F.TEXTURE0),v.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);let jt=v.getParameter(F.UNPACK_ROW_LENGTH),ot=v.getParameter(F.UNPACK_IMAGE_HEIGHT),fn=v.getParameter(F.UNPACK_SKIP_PIXELS),On=v.getParameter(F.UNPACK_SKIP_ROWS),hi=v.getParameter(F.UNPACK_SKIP_IMAGES);v.pixelStorei(F.UNPACK_ROW_LENGTH,gt.width),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,gt.height),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Fe),v.pixelStorei(F.UNPACK_SKIP_ROWS,Ke),v.pixelStorei(F.UNPACK_SKIP_IMAGES,st);let Qi=b.isDataArrayTexture||b.isData3DTexture,ft=B.isDataArrayTexture||B.isData3DTexture;if(b.isDepthTexture){let Et=G.get(b),ui=G.get(B),mt=G.get(Et.__renderTarget),fi=G.get(ui.__renderTarget);v.bindFramebuffer(F.READ_FRAMEBUFFER,mt.__webglFramebuffer),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let es=0;es<Le;es++)Qi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,G.get(b).__webglTexture,X,st+es),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,G.get(B).__webglTexture,be,Ct+es)),F.blitFramebuffer(Fe,Ke,Ce,Me,De,ht,Ce,Me,F.DEPTH_BUFFER_BIT,F.NEAREST);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(X!==0||b.isRenderTargetTexture||G.has(b)){let Et=G.get(b),ui=G.get(B);v.bindFramebuffer(F.READ_FRAMEBUFFER,N),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,O);for(let mt=0;mt<Le;mt++)Qi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Et.__webglTexture,X,st+mt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Et.__webglTexture,X),ft?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ui.__webglTexture,be,Ct+mt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ui.__webglTexture,be),X!==0?F.blitFramebuffer(Fe,Ke,Ce,Me,De,ht,Ce,Me,F.COLOR_BUFFER_BIT,F.NEAREST):ft?F.copyTexSubImage3D(Ae,be,De,ht,Ct+mt,Fe,Ke,Ce,Me):F.copyTexSubImage2D(Ae,be,De,ht,Fe,Ke,Ce,Me);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ft?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Ae,be,De,ht,Ct,Ce,Me,Le,dt,Xt,gt.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(Ae,be,De,ht,Ct,Ce,Me,Le,dt,gt.data):F.texSubImage3D(Ae,be,De,ht,Ct,Ce,Me,Le,dt,Xt,gt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,be,De,ht,Ce,Me,dt,Xt,gt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,be,De,ht,gt.width,gt.height,dt,gt.data):F.texSubImage2D(F.TEXTURE_2D,be,De,ht,Ce,Me,dt,Xt,gt);v.pixelStorei(F.UNPACK_ROW_LENGTH,jt),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ot),v.pixelStorei(F.UNPACK_SKIP_PIXELS,fn),v.pixelStorei(F.UNPACK_SKIP_ROWS,On),v.pixelStorei(F.UNPACK_SKIP_IMAGES,hi),be===0&&B.generateMipmaps&&F.generateMipmap(Ae),v.unbindTexture()},this.initRenderTarget=function(b){G.get(b).__webglFramebuffer===void 0&&K.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?K.setTextureCube(b,0):b.isData3DTexture?K.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?K.setTexture2DArray(b,0):K.setTexture2D(b,0),v.unbindTexture()},this.resetState=function(){q=0,Y=0,te=null,v.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Gf={uniforms:{tDiffuse:{value:null},resolution:{value:new he(1,1)},pixel:{value:1},posterize:{value:0},halftone:{value:0},dotSize:{value:3},misreg:{value:1},grain:{value:.04},saturation:{value:1.08},lens:{value:0},chroma:{value:0},mist:{value:0},tilt:{value:0},vignette:{value:0},warmth:{value:0},fade:{value:0},ink:{value:0},wash:{value:0},hatch:{value:0},shadowTint:{value:0},paper:{value:new Te("#f6eedb")},alphaOut:{value:0},tText:{value:null},textKeep:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 resolution; uniform vec3 paper;
    uniform float alphaOut;
    uniform sampler2D tText; uniform float textKeep;
    uniform float pixel, posterize, halftone, dotSize, misreg, grain, saturation, lens, chroma, mist, tilt, vignette, warmth, fade, ink, wash, hatch, shadowTint;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
    vec2 distort(vec2 uv){
      float a = resolution.x / resolution.y;
      vec2 p = uv - 0.5; p.x *= a;
      float r2 = dot(p, p);
      float rc = (a * a + 1.0) * 0.25;
      p *= (1.0 + lens * r2) / (1.0 + lens * rc * 0.55);
      p.x /= a;
      return p + 0.5;
    }
    vec3 src(vec2 uv){
      if (pixel > 1.0) { vec2 c = resolution / pixel; uv = (floor(uv * c) + 0.5) / c; }
      if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return paper;
      return texture2D(tDiffuse, uv).rgb;
    }
    float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
    vec3 grade(vec3 c){
      float l = luma(c);
      c = mix(vec3(l), c, saturation);
      // gouache light: cool violet shadows, warm cream highlights
      float sh = 1.0 - smoothstep(0.08, 0.5, l);
      c = mix(c, c * vec3(0.74, 0.82, 1.12) + vec3(0.015, 0.02, 0.05), shadowTint * sh);
      c = mix(c, c * vec3(1.06, 1.02, 0.9), shadowTint * smoothstep(0.6, 0.95, l) * 0.6);
      c *= vec3(1.0 + warmth * 0.07, 1.0 + warmth * 0.015, 1.0 - warmth * 0.09);
      c = mix(c, vec3(0.16, 0.11, 0.12) + c * 0.86, fade);
      if (posterize > 1.0) c = floor(c * posterize + 0.5) / posterize;
      return clamp(c, 0.0, 1.0);
    }
    // Lit area of one halftone plate at this fragment (0..1)
    float screen(vec2 frag, float ang, float ink){
      mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
      vec2 p = R * frag / dotSize;
      vec2 cell = fract(p) - 0.5;
      float r = sqrt(clamp(ink, 0.0, 1.0)) * 0.66;
      float w = 0.18 + 0.1 * vnoise(frag * 0.35);
      return 1.0 - smoothstep(r - w, r + w, length(cell) + (vnoise(frag * 0.9) - 0.5) * 0.08);
    }
    vec4 cmyk(vec3 c){
      float k = 1.0 - max(c.r, max(c.g, c.b));
      vec3 cmy = (1.0 - c - k) / max(1.0 - k, 1e-3);
      return vec4(cmy, k);
    }
    // Text mask, widened by a pixel or two so the letters keep a clean edge
    float textMask(vec2 uv){
      if (textKeep <= 0.0) return 0.0;
      vec2 px = 1.6 / resolution;
      float m = texture2D(tText, uv).a;
      for (int i = 0; i < 8; i++) {
        float a = float(i) * 0.785398;
        m = max(m, texture2D(tText, uv + vec2(cos(a), sin(a)) * px).a);
      }
      return m * textKeep;
    }
    void main(){
      vec2 uv = distort(vUv);
      vec2 dir = uv - 0.5;
      vec2 px = 1.0 / resolution;
      vec3 col = src(uv);
      if (chroma > 0.0) {
        col.r = src(uv + dir * chroma * 0.006).r;
        col.b = src(uv - dir * chroma * 0.006).b;
      }

      // soft diffusion + tilt-shift from one blur
      float tAmt = tilt * smoothstep(0.1, 0.55, abs(vUv.y - 0.5) * 1.1 + length(vUv - 0.5) * 0.35);
      float rad = 2.0 + tAmt * 7.0 + mist * 3.0;
      vec3 blur = col;
      if (tAmt > 0.002 || mist > 0.0) {
        blur = vec3(0.0);
        for (int i = 0; i < 12; i++) {
          float a = float(i) * 2.399963;
          float rr = sqrt(float(i) + 0.5) / sqrt(12.0);
          blur += src(uv + vec2(cos(a), sin(a)) * rr * rad * px);
        }
        blur /= 12.0;
      }
      col = mix(col, blur, clamp(tAmt, 0.0, 1.0));
      col = 1.0 - (1.0 - col) * (1.0 - blur * mist * 0.45);
      col = mix(col, blur, mist * 0.18);
      col = grade(col);

      // hand-inked contours: colour/value edges traced with a wobbly pen
      vec2 fq = vUv * resolution;
      float edge = 0.0;
      if (ink > 0.0 || wash > 0.0) {
        vec2 wob = (vec2(vnoise(fq * 0.045), vnoise(fq * 0.045 + 17.0)) - 0.5) * 2.2 * px;
        float rr = 1.15 * max(1.0, resolution.y / 1100.0);
        vec2 e = px * rr;
        vec3 c0 = src(uv + wob + vec2(-e.x, 0.0)), c1 = src(uv + wob + vec2(e.x, 0.0));
        vec3 c2 = src(uv + wob + vec2(0.0, -e.y)), c3 = src(uv + wob + vec2(0.0, e.y));
        vec3 gx = c1 - c0, gy = c3 - c2;
        float g = sqrt(dot(gx, gx) + dot(gy, gy));
        float lg = abs(luma(c1) - luma(c0)) + abs(luma(c3) - luma(c2));
        edge = smoothstep(0.16, 0.42, g * 0.6 + lg * 0.75);
        // the pen skips here and there
        edge *= 0.55 + 0.45 * smoothstep(0.25, 0.6, vnoise(fq * 0.07 + 3.0));
      }
      if (wash > 0.0) {
        // watercolour: pigment pools at the edges, uneven washes inside
        float bloom = vnoise(fq * 0.006) * 0.6 + vnoise(fq * 0.018 + 9.0) * 0.4;
        col *= 1.0 - wash * 0.16 * (bloom - 0.5);
        col = mix(col, col * col * 1.1, wash * edge * 0.35);
        col = mix(col, mix(col, paper, 0.4), wash * 0.06 * smoothstep(0.6, 0.85, bloom));
      }
      if (hatch > 0.0) {
        // cross-hatching in the shade, drawn on the paper
        float l = luma(col);
        float s1 = abs(fract((fq.x + fq.y) / 5.0 + vnoise(fq * 0.02) * 0.6) - 0.5);
        float s2 = abs(fract((fq.x - fq.y) / 5.0 + vnoise(fq * 0.02 + 5.0) * 0.6) - 0.5);
        float h1 = (1.0 - smoothstep(0.08, 0.2, s1)) * (1.0 - smoothstep(0.18, 0.42, l));
        float h2 = (1.0 - smoothstep(0.08, 0.2, s2)) * (1.0 - smoothstep(0.08, 0.26, l));
        col *= 1.0 - hatch * 0.35 * max(h1, h2);
      }
      if (ink > 0.0) col = mix(col, vec3(0.17, 0.11, 0.1) + col * 0.25, clamp(edge * ink, 0.0, 0.85));

      if (halftone > 0.0) {
        vec2 frag = vUv * resolution;
        // each plate is printed slightly out of register
        vec2 mo = vec2(1.0, -0.6) * misreg * px * dotSize * 0.45;
        vec4 kc = cmyk(col);
        vec4 kM = cmyk(grade(src(uv + mo)));
        vec4 kY = cmyk(grade(src(uv - mo * vec2(0.4, -1.3))));
        float cP = screen(frag, 0.2618, kc.x);
        float mP = screen(frag + mo * resolution, 1.309, kM.y);
        float yP = screen(frag - mo * resolution * vec2(0.4, -1.3), 0.0, kY.z);
        float kP = screen(frag, 0.7854, kc.w * 0.95);
        vec3 p = paper;
        p *= mix(vec3(1.0), vec3(0.05, 0.62, 0.86), cP);
        p *= mix(vec3(1.0), vec3(0.93, 0.2, 0.55), mP);
        p *= mix(vec3(1.0), vec3(1.0, 0.9, 0.12), yP);
        p *= mix(vec3(1.0), vec3(0.16, 0.13, 0.15), kP);
        // ink sits a bit soft in the paper: blend with the continuous tone
        vec3 cont = col * paper;
        col = mix(col, mix(p, cont, 0.28), halftone);
      }
      // texts: a clean solid print (no dots, offset plates, blur or ink lines)
      float keep = textMask(uv);
      if (keep > 0.0) col = mix(col, grade(src(uv)), keep);
      // paper fibres and grain
      vec2 fp = vUv * resolution;
      float fib = vnoise(fp * vec2(0.02, 0.05)) * 0.6 + vnoise(fp * 0.25) * 0.4;
      col *= 1.0 - grain * 0.8 * (fib - 0.5);
      col += (hash(fp) - 0.5) * grain * 0.7;
      float v = length((vUv - 0.5) * vec2(1.0, 0.85));
      col *= mix(1.0, vec3(0.78, 0.66, 0.6).r, vignette * smoothstep(0.35, 0.85, v));
      col = mix(col, col * vec3(0.95, 0.86, 0.8), vignette * smoothstep(0.4, 0.9, v));
      // transparent export: keep the scene's coverage as alpha
      float a = 1.0;
      if (alphaOut > 0.5) { vec2 au = uv; if (pixel > 1.0) { vec2 c = resolution / pixel; au = (floor(au * c) + 0.5) / c; } a = texture2D(tDiffuse, au).a; }
      gl_FragColor = vec4(col * a, a);
    }`};function Wf(i,e,t){let n={x:(i.x-.5)*t,y:i.y-.5},s=n.x*n.x+n.y*n.y,r=(t*t+1)*.25,a=(1+e*s)/(1+e*r*.55);return{x:n.x*a/t+.5,y:n.y*a+.5}}var Fl=class extends kt{constructor(...e){super(...e),this.oblique=0,this.lean=0,this.focus=60}updateProjectionMatrix(){if(super.updateProjectionMatrix(),this.oblique||this.lean){let e=this.focus,t=new Ze().set(1,this.lean,this.oblique,this.oblique*e,0,1,-this.oblique*.35,-this.oblique*.35*e,0,0,1,0,0,0,0,1);this.projectionMatrix.multiply(t)}Xf(this)}};function Xf(i){i.standUp&&i.projectionMatrix.multiply(i.standUp),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}var Ol=class extends Yn{updateProjectionMatrix(){super.updateProjectionMatrix(),Xf(this)}},qf=i=>Gt.clamp((i-30)*.6,0,32),fa={print:{label:"Impression art-book",halftone:.7,dot:2.2,misreg:.9,pixel:1,posterize:0,lens:.05,chroma:.25,mist:.22,tilt:.12,vignette:.2,warmth:.2,fade:.06,grain:.05,saturation:1.2,wobble:1,ink:.45,wash:.45,hatch:0,shadowTint:.55},gouache:{label:"Encre et gouache",halftone:0,dot:3,misreg:0,pixel:1,posterize:0,lens:.05,chroma:.15,mist:.2,tilt:.1,vignette:.2,warmth:.32,fade:.05,grain:.06,saturation:1.22,wobble:1.15,ink:.85,wash:.85,hatch:.3,shadowTint:.8},film:{label:"Film rétro",halftone:0,dot:3,misreg:0,pixel:1,posterize:0,lens:.1,chroma:.6,mist:.45,tilt:.22,vignette:.42,warmth:.55,fade:.2,grain:.09,saturation:1.05,wobble:1,ink:0,wash:.15,hatch:0,shadowTint:.4},pixel:{label:"Pixel art",halftone:0,dot:3,misreg:0,pixel:3,posterize:10,lens:0,chroma:0,mist:.08,tilt:0,vignette:.12,warmth:.22,fade:.04,grain:.012,saturation:1.2,wobble:.6,ink:.3,wash:0,hatch:0,shadowTint:.5},clean:{label:"Net",halftone:0,dot:3,misreg:0,pixel:1,posterize:0,lens:0,chroma:0,mist:0,tilt:0,vignette:0,warmth:0,fade:0,grain:0,saturation:1.05,wobble:.5,ink:.15,wash:0,hatch:0,shadowTint:.2}},da={day:{sky:"#d9e6fa",ground:"#b49a78",hemi:1.25,sun:"#ffeccc",sunI:3.2,bounce:"#ffd09a",bounceI:.5,rim:"#cfe0ff",rimI:.55,env:.35,exposure:1.03,lampScale:.35,sunAz:145,sunEl:52,backdrop:"#f3e9d4"},golden:{sky:"#e4d0c4",ground:"#8a5e3c",hemi:.95,sun:"#ffb560",sunI:3.4,bounce:"#ffa868",bounceI:.6,rim:"#b8c8ff",rimI:.6,env:.3,exposure:1,lampScale:.9,sunAz:115,sunEl:26,backdrop:"#f1dfc4"},dusk:{sky:"#8a8fc4",ground:"#4a3550",hemi:.8,sun:"#ff8a5a",sunI:1.5,bounce:"#ff9a80",bounceI:.4,rim:"#9aa8ff",rimI:.7,env:.22,exposure:1.1,lampScale:1.6,sunAz:235,sunEl:20,backdrop:"#ddd3d6"},night:{sky:"#3b4a82",ground:"#1a1a26",hemi:.55,sun:"#a8bcff",sunI:.5,bounce:"#6d7fc4",bounceI:.18,rim:"#7f95ff",rimI:.6,env:.14,exposure:1.2,lampScale:2.6,sunAz:200,sunEl:55,backdrop:"#2a3046"}};var Gs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var un=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},av=new Yn(-1,1,1,-1,0,1),Th=class extends yt{constructor(){super(),this.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new tt([0,2,0,0,2,0],2))}},ov=new Th,Pi=class{constructor(e){this._mesh=new nt(ov,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,av)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Ws=class extends un{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof wt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=_n.clone(e.uniforms),this.material=new wt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var pa=class extends un{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Bl=class extends un{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var kl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new he);this._width=n.width,this._height=n.height,t=new bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Bt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ws(Gs),this.copyPass.material.blending=Rt,this.timer=new Wr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}pa!==void 0&&(a instanceof pa?n=!0:a instanceof Bl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new he);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ma=class extends un{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Te}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var ga={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var zl=class extends un{constructor(){super(),this.isOutputPass=!0,this.uniforms=_n.clone(ga.uniforms),this.material=new Ls({name:ga.name,uniforms:this.uniforms,vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader}),this._fsQuad=new Pi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},it.getTransfer(this._outputColorSpace)===lt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$r?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Kr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===jr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Xi?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Qr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var xa={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new he},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ze},cameraProjectionMatrixInverse:{value:new Ze},cameraWorldMatrix:{value:new Ze},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new L(-1,-1,-1)},sceneBoxMax:{value:new L(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},_a={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Vl={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Yf(i=5){let e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=lv(e),n=t.length,s=new Uint8Array(n*4);for(let a=0;a<n;++a){let o=t[a],l=2*Math.PI*o/n,c=new L(Math.cos(l),Math.sin(l),0).normalize();s[a*4]=(c.x*.5+.5)*255,s[a*4+1]=(c.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}let r=new ai(s,e,e);return r.wrapS=pn,r.wrapT=pn,r.needsUpdate=!0,r}function lv(i){let e=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),t=e*e,n=Array(t).fill(0),s=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),n[s*e+r]!==0){r-=2,s++;continue}else n[s*e+r]=a++;r++,s--}return n}var va={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Ah(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new he},cameraProjectionMatrixInverse:{value:new Ze},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Ah(i,e,t){let n=cv(i,e,t),s="vec3[SAMPLES](";for(let r=0;r<i;r++){let a=n[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<i-1?",":")"}`}return s}function cv(i,e,t){let n=[];for(let s=0;s<i;s++){let r=2*Math.PI*e*s/i,a=Math.pow(s/(i-1),t);n.push(new L(Math.cos(r),Math.sin(r),a))}return n}var Hl=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,f=(l+c)*h,u=l-f,d=c-f,p=e-u,y=t-d,g,m;p>y?(g=1,m=0):(g=0,m=1);let M=p-g+h,w=y-m+h,_=p-1+2*h,E=y-1+2*h,S=l&255,P=c&255,x=this.perm[S+this.perm[P]]%12,T=this.perm[S+g+this.perm[P+m]]%12,A=this.perm[S+1+this.perm[P+1]]%12,R=.5-p*p-y*y;R<0?n=0:(R*=R,n=R*R*this._dot(this.grad3[x],p,y));let D=.5-M*M-w*w;D<0?s=0:(D*=D,s=D*D*this._dot(this.grad3[T],M,w));let U=.5-_*_-E*E;return U<0?r=0:(U*=U,r=U*U*this._dot(this.grad3[A],_,E)),70*(n+s+r)}noise3d(e,t,n){let s,r,a,o,c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),f=Math.floor(t+c),u=Math.floor(n+c),d=1/6,p=(h+f+u)*d,y=h-p,g=f-p,m=u-p,M=e-y,w=t-g,_=n-m,E,S,P,x,T,A;M>=w?w>=_?(E=1,S=0,P=0,x=1,T=1,A=0):M>=_?(E=1,S=0,P=0,x=1,T=0,A=1):(E=0,S=0,P=1,x=1,T=0,A=1):w<_?(E=0,S=0,P=1,x=0,T=1,A=1):M<_?(E=0,S=1,P=0,x=0,T=1,A=1):(E=0,S=1,P=0,x=1,T=1,A=0);let R=M-E+d,D=w-S+d,U=_-P+d,N=M-x+2*d,O=w-T+2*d,q=_-A+2*d,Y=M-1+3*d,te=w-1+3*d,H=_-1+3*d,J=h&255,$=f&255,we=u&255,Se=this.perm[J+this.perm[$+this.perm[we]]]%12,Qe=this.perm[J+E+this.perm[$+S+this.perm[we+P]]]%12,qe=this.perm[J+x+this.perm[$+T+this.perm[we+A]]]%12,$e=this.perm[J+1+this.perm[$+1+this.perm[we+1]]]%12,I=.6-M*M-w*w-_*_;I<0?s=0:(I*=I,s=I*I*this._dot3(this.grad3[Se],M,w,_));let k=.6-R*R-D*D-U*U;k<0?r=0:(k*=k,r=k*k*this._dot3(this.grad3[Qe],R,D,U));let ee=.6-N*N-O*O-q*q;ee<0?a=0:(ee*=ee,a=ee*ee*this._dot3(this.grad3[qe],N,O,q));let oe=.6-Y*Y-te*te-H*H;return oe<0?o=0:(oe*=oe,o=oe*oe*this._dot3(this.grad3[$e],Y,te,H)),32*(s+r+a+o)}noise4d(e,t,n,s){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,f,u,d,p,y=(e+t+n+s)*l,g=Math.floor(e+y),m=Math.floor(t+y),M=Math.floor(n+y),w=Math.floor(s+y),_=(g+m+M+w)*c,E=g-_,S=m-_,P=M-_,x=w-_,T=e-E,A=t-S,R=n-P,D=s-x,U=T>A?32:0,N=T>R?16:0,O=A>R?8:0,q=T>D?4:0,Y=A>D?2:0,te=R>D?1:0,H=U+N+O+q+Y+te,J=a[H][0]>=3?1:0,$=a[H][1]>=3?1:0,we=a[H][2]>=3?1:0,Se=a[H][3]>=3?1:0,Qe=a[H][0]>=2?1:0,qe=a[H][1]>=2?1:0,$e=a[H][2]>=2?1:0,I=a[H][3]>=2?1:0,k=a[H][0]>=1?1:0,ee=a[H][1]>=1?1:0,oe=a[H][2]>=1?1:0,re=a[H][3]>=1?1:0,de=T-J+c,ze=A-$+c,j=R-we+c,se=D-Se+c,ae=T-Qe+2*c,le=A-qe+2*c,fe=R-$e+2*c,Re=D-I+2*c,Pe=T-k+3*c,ke=A-ee+3*c,We=R-oe+3*c,F=D-re+3*c,at=T-1+4*c,Je=A-1+4*c,C=R-1+4*c,v=D-1+4*c,V=g&255,G=m&255,K=M&255,ue=w&255,pe=o[V+o[G+o[K+o[ue]]]]%32,Q=o[V+J+o[G+$+o[K+we+o[ue+Se]]]]%32,ie=o[V+Qe+o[G+qe+o[K+$e+o[ue+I]]]]%32,xe=o[V+k+o[G+ee+o[K+oe+o[ue+re]]]]%32,Ue=o[V+1+o[G+1+o[K+1+o[ue+1]]]]%32,ge=.6-T*T-A*A-R*R-D*D;ge<0?h=0:(ge*=ge,h=ge*ge*this._dot4(r[pe],T,A,R,D));let me=.6-de*de-ze*ze-j*j-se*se;me<0?f=0:(me*=me,f=me*me*this._dot4(r[Q],de,ze,j,se));let Ie=.6-ae*ae-le*le-fe*fe-Re*Re;Ie<0?u=0:(Ie*=Ie,u=Ie*Ie*this._dot4(r[ie],ae,le,fe,Re));let Oe=.6-Pe*Pe-ke*ke-We*We-F*F;Oe<0?d=0:(Oe*=Oe,d=Oe*Oe*this._dot4(r[xe],Pe,ke,We,F));let Xe=.6-at*at-Je*Je-C*C-v*v;return Xe<0?p=0:(Xe*=Xe,p=Xe*Xe*this._dot4(r[Ue],at,Je,C,v)),27*(h+f+u+d+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}};var ya=class i extends un{constructor(e,t,n=512,s=512,r,a,o){super(),this.width=n,this.height=s,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Yf(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new bt(this.width,this.height,{type:Bt,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new wt({defines:Object.assign({},xa.defines),uniforms:_n.clone(xa.uniforms),vertexShader:xa.vertexShader,fragmentShader:xa.fragmentShader,blending:Rt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Br,this.normalMaterial.blending=Rt,this.pdMaterial=new wt({defines:Object.assign({},va.defines),uniforms:_n.clone(va.uniforms),vertexShader:va.vertexShader,fragmentShader:va.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new wt({defines:Object.assign({},_a.defines),uniforms:_n.clone(_a.uniforms),vertexShader:_a.vertexShader,fragmentShader:_a.fragmentShader,blending:Rt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new wt({uniforms:_n.clone(Gs.uniforms),vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Zr,blendDst:Wi,blendEquation:gn,blendSrcAlpha:Yr,blendDstAlpha:Wi,blendEquationAlpha:gn}),this.blendMaterial=new wt({uniforms:_n.clone(Vl.uniforms),vertexShader:Vl.vertexShader,fragmentShader:Vl.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:zo,blendSrc:Zr,blendDst:Wi,blendEquation:gn,blendSrcAlpha:Yr,blendDstAlpha:Wi,blendEquationAlpha:gn}),this._fsQuad=new Pi(null),this._originalClearColor=new Te,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new qn,this.depthTexture.format=$n,this.depthTexture.type=Ri,this.normalRenderTarget=new bt(this.width,this.height,{minFilter:At,magFilter:At,type:Bt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ah(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case i.OUTPUT.Off:break;case i.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case i.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Rt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new Hl,n=e*e*4,s=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a,c=o;s[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,s[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,s[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,s[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let r=new ai(s,e,e,rn,$t);return r.wrapS=pn,r.wrapT=pn,r.needsUpdate=!0,r}};ya.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Gl=class extends _i{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new sn;e.deleteAttribute("uv");let t=new nn({side:Ht}),n=new nn,s=new wi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new nt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Sr(e,n,6),o=new Lt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new nt(e,Xs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new nt(e,Xs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new nt(e,Xs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new nt(e,Xs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new nt(e,Xs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new nt(e,Xs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Xs(i){return new kr({color:0,emissive:16777215,emissiveIntensity:i})}function Wl(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new yt,c=0;for(let h=0;h<i.length;++h){let f=i[h],u=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(e){let d;if(t)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(t){let h=0,f=[];for(let u=0;u<i.length;++u){let d=i[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=i[u].attributes.position.count}l.setIndex(f)}for(let h in r){let f=Zf(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let y=0;y<a[h].length;++y)d.push(a[h][y][u]);let p=Zf(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Zf(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Tt(a,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let f=l/t;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<t;p++){let y=h.getComponent(u,p);o.setComponent(u+f,p,y)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}var Ma=new L;function vn(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Ma.copy(e),Ma[n]=0,Ma.normalize();let c=.5*a/(a+o),h=1-Ma.angleTo(i)/l;return Math.sign(Ma[t])===1?h*c:o/(a+o)+c+c*(1-h)}var Xl=class i extends sn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new L,c=new L,h=new L(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=f.length/6,y=new L,g=.5/a;for(let m=0,M=0;m<f.length;m+=3,M+=2)switch(l.fromArray(f,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),f[m+0]=h.x*Math.sign(l.x)+c.x*r,f[m+1]=h.y*Math.sign(l.y)+c.y*r,f[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:y.set(1,0,0),d[M+0]=vn(y,c,"z","y",r,n),d[M+1]=1-vn(y,c,"y","z",r,t);break;case 1:y.set(-1,0,0),d[M+0]=1-vn(y,c,"z","y",r,n),d[M+1]=1-vn(y,c,"y","z",r,t);break;case 2:y.set(0,1,0),d[M+0]=1-vn(y,c,"x","z",r,e),d[M+1]=vn(y,c,"z","x",r,n);break;case 3:y.set(0,-1,0),d[M+0]=1-vn(y,c,"x","z",r,e),d[M+1]=1-vn(y,c,"z","x",r,n);break;case 4:y.set(0,0,1),d[M+0]=1-vn(y,c,"x","y",r,e),d[M+1]=1-vn(y,c,"y","x",r,t);break;case 5:y.set(0,0,-1),d[M+0]=vn(y,c,"x","y",r,e),d[M+1]=1-vn(y,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function Rh(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Kt(i){let e=typeof i=="string"?Rh(i):i>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Ch={value:1},hv=`
uniform float uWobble;
float hb3(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hb3(i), hb3(i + vec3(1,0,0)), f.x), mix(hb3(i + vec3(0,1,0)), hb3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hb3(i + vec3(0,0,1)), hb3(i + vec3(1,0,1)), f.x), mix(hb3(i + vec3(0,1,1)), hb3(i + vec3(1,1,1)), f.x), f.y), f.z) * 2.0 - 1.0;
}
`,uv=`#include <begin_vertex>
{
  vec3 wp = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vec3 q = wp * 0.45;
  transformed += uWobble * vec3(0.045 * vnoise(q), 0.03 * vnoise(q + 11.3), 0.045 * vnoise(q + 27.1))
               + uWobble * 0.012 * vec3(vnoise(wp * 2.1 + 5.0), vnoise(wp * 2.1 + 9.0), vnoise(wp * 2.1 + 13.0));
}`;function ji(i){return i.onBeforeCompile=e=>{e.uniforms.uWobble=Ch,e.vertexShader=hv+e.vertexShader.replace("#include <begin_vertex>",uv)},i.customProgramCacheKey=()=>"handmade",i}var $f=new Map;function fv(i,e={}){let t=`${i}|${e.roughness??""}|${e.metalness??""}|${e.emissive??""}|${e.ei??""}|${e.opacity??""}|${e.flat?1:0}|${e.vc?1:0}|${e.side??""}`,n=$f.get(t);return n||(n=new nn({color:new Te(i),roughness:e.roughness??.92,metalness:e.metalness??0,emissive:new Te(e.emissive??0),emissiveIntensity:e.ei??1,transparent:(e.opacity??1)<1,opacity:e.opacity??1,flatShading:!!e.flat,vertexColors:!!e.vc,side:e.side??Zn,depthWrite:(e.opacity??1)>=1}),ji(n),n.userData.shared=!0,$f.set(t,n)),n}function dv(i,e){let t=pv.set(e),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=t.r,s[r*3+1]=t.g,s[r*3+2]=t.b;i.setAttribute("color",new Tt(s,3))}var pv=new Te;var nd=["position","normal","uv","color"];function mv(i,e=.45){var T;let t=i.attributes.position.array,n=1/0,s=1/0,r=1/0,a=-1/0,o=-1/0,l=-1/0;for(let A=0;A<t.length;A+=3){let R=t[A],D=t[A+1],U=t[A+2];R<n&&(n=R),R>a&&(a=R),D<s&&(s=D),D>o&&(o=D),U<r&&(r=U),U>l&&(l=U)}if(Math.max(a-n,o-s,l-r)<=e)return i;let c=nd.filter(A=>i.attributes[A]),h=c.map(A=>i.attributes[A].itemSize),f=h.reduce((A,R)=>A+R,0),u=i.attributes.position.count,d=new Float32Array(Math.max(u*f*4,256)),p=0;for(let A=0;A<c.length;A++){let R=i.attributes[c[A]].array,D=h[A];for(let U=0;U<u;U++)for(let N=0;N<D;N++)d[U*f+p+N]=R[U*D+N];p+=D}let y=u,g=e*e,m=new Uint32Array(Math.max(64,(i.index?i.index.count:u)*4)),M=0,w=new Int32Array(256),_=(A,R)=>{let D=A*f,U=R*f,N=d[D]-d[U],O=d[D+1]-d[U+1],q=d[D+2]-d[U+2];return N*N+O*O+q*q},E=(A,R)=>{if((y+1)*f>d.length){let O=new Float32Array(d.length*2);O.set(d),d=O}let D=A*f,U=R*f,N=y*f;for(let O=0;O<f;O++)d[N+O]=(d[D+O]+d[U+O])*.5;return y++},S=(T=i.index)==null?void 0:T.array,P=S?S.length/3:u/3;for(let A=0;A<P;A++){let R=0;for(w[R++]=S?S[A*3]:A*3,w[R++]=S?S[A*3+1]:A*3+1,w[R++]=S?S[A*3+2]:A*3+2,w[R++]=0;R;){let D=w[--R],U=w[--R],N=w[--R],O=w[--R],q=_(O,N),Y=_(N,U),te=_(U,O),H=Math.max(q,Y,te);if(H<=g||D>9){if(M+3>m.length){let $=new Uint32Array(m.length*2);$.set(m),m=$}m[M++]=O,m[M++]=N,m[M++]=U;continue}if(R+8>w.length){let $=new Int32Array(w.length*2);$.set(w),w=$}let J=D+1;if(H===q){let $=E(O,N);w[R++]=$,w[R++]=N,w[R++]=U,w[R++]=J,w[R++]=O,w[R++]=$,w[R++]=U,w[R++]=J}else if(H===Y){let $=E(N,U);w[R++]=O,w[R++]=$,w[R++]=U,w[R++]=J,w[R++]=O,w[R++]=N,w[R++]=$,w[R++]=J}else{let $=E(U,O);w[R++]=$,w[R++]=N,w[R++]=U,w[R++]=J,w[R++]=O,w[R++]=N,w[R++]=$,w[R++]=J}}}let x=new yt;p=0;for(let A=0;A<c.length;A++){let R=h[A],D=new Float32Array(y*R);for(let U=0;U<y;U++)for(let N=0;N<R;N++)D[U*R+N]=d[U*f+p+N];x.setAttribute(c[A],new Tt(D,R)),p+=R}return x.setIndex(new Tt(y>65535?m.slice(0,M):Uint16Array.from(m.subarray(0,M)),1)),i.dispose(),x}function gv(i,e,t){for(let s of Object.keys(i.attributes))nd.includes(s)||i.deleteAttribute(s);i.attributes.normal||i.computeVertexNormals(),t?i.attributes.uv||i.setAttribute("uv",new tt(new Float32Array(i.attributes.position.count*2),2)):i.deleteAttribute("uv"),i.clearGroups();let n=e?mv(i):i;if(!n.index){let s=n.attributes.position.count,r=s>65535?new Uint32Array(s):new Uint16Array(s);for(let a=0;a<s;a++)r[a]=a;n.setIndex(new Tt(r,1))}return n}var id=1,sd=0,xv=new L,_v=new Ze,Ji=new Ze;function Dn(i){id=i,sd=0}var Wt=class{constructor(){this.group=new St,this.buckets=new Map,this.r=Kt(id*131+ ++sd)}geo(e,t,n={}){let s=n.material;s||(n.vc||dv(e,t),s=fv("#ffffff",{...n,vc:!0}));let r=!n.vc&&n.tess!==!1,a=n.shadow??!0,o=`${s.uuid}|${r}|${a}`,l=this.buckets.get(o);return l||this.buckets.set(o,l={m:s,gs:[],shadow:a,tess:r}),l.gs.push(e),e}merge(e,t=0,n=0,s=0,r=0){let a=new Ze().makeRotationY(t).setPosition(n,s,r);for(let[o,l]of e.buckets){let c=this.buckets.get(o);c||this.buckets.set(o,c={m:l.m,gs:[],shadow:l.shadow,tess:l.tess});for(let h of l.gs)c.gs.push(h.applyMatrix4(a))}return e.buckets.clear(),e.group.children.length&&(e.group.rotation.y=t,e.group.position.set(n,s,r),this.group.add(e.group)),this}_place(e,t,n,s,r,a){let o=this.r;if(!a){e.computeBoundingBox();let h=e.boundingBox.getSize(xv);a=[h.x,h.y,h.z]}let l=(r.jitter??1)*Math.min(1,1.2/Math.max(a[0],a[1],a[2],.01)),c=_v.identity();return l&&(c.premultiply(Ji.makeRotationX((o()-.5)*.014*l)),c.premultiply(Ji.makeRotationZ((o()-.5)*.014*l)),c.premultiply(Ji.makeRotationY((o()-.5)*.02*l))),r.rx&&c.premultiply(Ji.makeRotationX(r.rx)),r.rz&&c.premultiply(Ji.makeRotationZ(r.rz)),r.ry&&c.premultiply(Ji.makeRotationY(r.ry)),c.premultiply(Ji.makeTranslation(t+(o()-.5)*.01*l,n,s+(o()-.5)*.01*l)),e.boundingBox=null,e.boundingSphere=null,e.applyMatrix4(c),e}_boxGeo(e,t,n,s){if(e=Math.max(e,.001),t=Math.max(t,.001),n=Math.max(n,.001),s.round){let r=Math.min(s.round,e/2.05,t/2.05,n/2.05);return new Xl(e,t,n,3,r)}return new sn(e,t,n)}box(e,t,n,s,r,a,o,l={}){return this.geo(this._place(this._boxGeo(e,t,n,l),s,r+t/2,a,l,[e,t,n]),o,l)}cbox(e,t,n,s,r,a,o,l={}){return this.geo(this._place(this._boxGeo(e,t,n,l),s,r,a,l,[e,t,n]),o,l)}cyl(e,t,n,s,r,a,o,l={}){let c=new Er(e,t,n,l.seg??16,Math.max(1,Math.ceil(n/.4)),!1,l.t0??0,l.tl??Math.PI*2);return this.geo(this._place(c,s,l.center?r:r+n/2,a,l),o,l)}sphere(e,t,n,s,r,a={}){let o=new Fr(e,a.seg??16,Math.max(6,Math.round((a.seg??16)*.7)));return a.sy&&o.scale(1,a.sy,1),this.geo(this._place(o,t,n,s,a),r,a)}frame(e,t,n,s,r,a,o,l=.03,c={}){this.box(e,n,l,s,r,a,o,c),this.box(e,n,l,s,r+t-n,a,o,c),this.box(n,t-2*n,l,s-e/2+n/2,r+n,a,o,c),this.box(n,t-2*n,l,s+e/2-n/2,r+n,a,o,c)}add(e){return this.group.add(e),e}build(){for(let{m:e,gs:t,shadow:n,tess:s}of this.buckets.values()){let r=Wl(t.map(o=>gv(o,s,!!e.map)),!1);if(t.forEach(o=>o.dispose()),!r)continue;r.computeBoundingSphere();let a=new nt(r,e);a.castShadow=n&&!e.transparent,e.alphaTest>0&&(a.customDepthMaterial=Av(e)),a.receiveShadow=!0,this.group.add(a)}return this.buckets.clear(),this.group}},qs={green:["#2f5e2c","#3f7a35","#5a9440","#7cae4f","#a9c96c"],lime:["#557f2e","#76a03c","#98bd50","#bcd673","#dfe9a4"],dark:["#1d3a26","#27502f","#346638","#4a7d45","#67965a"],olive:["#4b5a2a","#647534","#7f9042","#9eab5c","#c1c886"],autumn:["#7a3b1a","#a2531f","#c9762a","#e0a33a","#f0c75a"],blossom:["#b85c84","#d77aa1","#e99bbb","#f4bfd3","#fbe0ea"],tropical:["#1f5a2e","#2f7a3a","#3f9a45","#6cbf4f","#a5d867"],pine:["#163a2e","#1f4d3a","#2a6046","#3a7553","#5a8f68"],kelp:["#2a4a2a","#3f6a32","#5a8a3a","#7aa84a","#a8c46a"],coral:["#a8445a","#d0607a","#ec8a9a","#f6b0b8","#fbd6d8"],dry:["#6a6a3a","#8a8448","#a8a05a","#c4ba74","#ddd49a"]},Ki=new Nr(1,0).attributes.position.array.slice(),ql=new Te,vv=new L,Jf=new L,Ut=new L,Ln=new L,Li=new L,OS=new L(0,1,0);function Ph(i,e,t,n,s,r,a,o,l=1){return i.pos.push(e,t,n),i.nor.push(s,r,a),i.col.push(o.r*l,o.g*l,o.b*l),i.pos.length/3-1}function Ih(i,e,t,n,s){return Jf.set(i-s.x,(e-s.y)*.75,t-s.z).normalize(),vv.copy(n).lerp(Jf,s.blend).normalize()}function yv(i,e,t,n,s,r,a,o){Li.set(o()-.5,o()-.5,o()-.5),Ut.copy(Li).addScaledVector(t,-Li.dot(t)),Ut.lengthSq()<1e-6&&Ut.set(1,0,0),Ut.normalize(),Ln.crossVectors(t,Ut);let l=n*.12,c=[e.x-Ut.x*n*.4,e.y-Ut.y*n*.4,e.z-Ut.z*n*.4],h=[e.x+Ut.x*n*.6+t.x*l,e.y+Ut.y*n*.6+t.y*l,e.z+Ut.z*n*.6+t.z*l],f=[e.x+Ln.x*s*.5+t.x*l,e.y+Ln.y*s*.5+t.y*l,e.z+Ln.z*s*.5+t.z*l],u=[e.x-Ln.x*s*.5+t.x*l,e.y-Ln.y*s*.5+t.y*l,e.z-Ln.z*s*.5+t.z*l];ql.set(r);let d=t.clone(),p=[];for(let[y,g]of[[c,.85],[h,1.08],[f,1],[u,.97]]){let m=Ih(y[0],y[1],y[2],d,a);p.push(Ph(i,y[0],y[1],y[2],m.x,m.y,m.z,ql,g))}i.idx.push(p[0],p[1],p[2],p[0],p[3],p[1])}function Mv(i,e,t,n,s,r,a,o,l){ql.set(o);for(let c=0;c<Ki.length;c+=3){let h=e+Ki[c]*s,f=t+Ki[c+1]*r,u=n+Ki[c+2]*a;Li.set(Ki[c],Ki[c+1],Ki[c+2]);let d=Ih(h,f,u,Li,l);i.idx.push(Ph(i,h,f,u,d.x,d.y,d.z,ql,.55))}}function Sv(i){let e=new yt;for(e.setAttribute("position",new tt(i.pos,3)),e.setAttribute("normal",new tt(i.nor,3)),e.setAttribute("color",new tt(i.col,3));i.uv.length<i.pos.length/3*2;)i.uv.push(.5,.5);return e.setAttribute("uv",new tt(i.uv,2)),e.setIndex(i.idx),e}var bv=new Te("#ffffff");function Kf(i,e,t,n,s,r,a){for(Li.set(Math.cos(s),Math.sin(s),.3),Ut.copy(Li).addScaledVector(t,-Li.dot(t)),Ut.lengthSq()<1e-6&&Ut.set(1,0,0),Ut.normalize().multiplyScalar(n/2),Ln.crossVectors(t,Ut);i.uv.length<i.pos.length/3*2;)i.uv.push(.5,.5);let o=[];for(let[l,c,h,f]of[[-1,-1,0,0],[1,-1,1,0],[1,1,1,1],[-1,1,0,1]]){let u=e.x+Ut.x*l+Ln.x*c,d=e.y+Ut.y*l+Ln.y*c,p=e.z+Ut.z*l+Ln.z*c,y=Ih(u,d,p,t,{...a,blend:.75});o.push(Ph(i,u,d,p,y.x,y.y,y.z,bv,r*(.92+(d-a.y)*.25))),i.uv.push(h,f)}i.idx.push(o[0],o[1],o[2],o[0],o[2],o[3])}function wv(i,e=0,t=0,n=0){let s=Kt(i.seed??1),r=Math.max(.045,(i.voxel??.16)*1.15),a=i.rx,o=i.ry,l=i.rz??i.rx,c=i.cy??o,h=qs[i.palette]??qs.green,f={pos:[],nor:[],col:[],idx:[],uv:[]},u={x:e,y:t+c,z:n,blend:.6},d=(i.density??1)*(1-(i.sparse??.1)*.6),p=Math.min(a,o,l),y=o>Math.max(a,l)*1.8,g=Gt.clamp(Math.round(a*o*l/(p*p*p)*1.6+2),3,16),m=[];for(let _=0;_<g;_++){let E,S,P,x;if(_===0)E=0,S=y?-o*.2:-o*.05,P=0,x=p*.75;else if(y){S=(_/(g-1)*1.6-.75)*o;let A=Math.sqrt(Math.max(.05,1-(S/o)**2));E=(s()-.5)*a*.5*A,P=(s()-.5)*l*.5*A,x=Math.max(r*1.5,p*(.55+s()*.35)*A)}else{let T=s()*1.6-.6,A=s()*Math.PI*2,R=Math.sqrt(1-Math.min(1,T*T)),D=.35+s()*.4;E=R*Math.cos(A)*a*D,S=T*o*D,P=R*Math.sin(A)*l*D,x=p*(.42+s()*.42);let U=Math.max(Math.abs(E)+x*.8-a,Math.abs(S)+x*.8-o,Math.abs(P)+x*.8-l,0);x=Math.max(r*1.2,x-U)}m.push({x:e+E*(1+(i.lean??0)),y:t+c+S,z:n+P,r:x})}for(let _ of m)Mv(f,_.x,_.y,_.z,_.r*.7,_.r*.64,_.r*.7,h[0],u);let M=new L,w=new L;for(let _ of m){let E=Math.max(5,Math.round(_.r*_.r/(r*r)*.55*d+5));for(let S=0;S<E;S++){let P=s()*1.7-.7,x=s()*Math.PI*2,T=Math.sqrt(Math.max(0,1-P*P));w.set(T*Math.cos(x),P,T*Math.sin(x)),M.set(_.x+w.x*_.r*.55,_.y+w.y*_.r*.5,_.z+w.z*_.r*.55),Kf(f,M,w,_.r*(1.05+s()*.45),s()*Math.PI*2,.86+s()*.3,u)}for(let S=0;S<2;S++)w.set(Math.cos(S*Math.PI/2+.4),.15,Math.sin(S*Math.PI/2+.4)).normalize(),Kf(f,M.set(_.x,_.y,_.z),w,_.r*1.7,s()*Math.PI,.9,u)}if(i.droop){let _=Math.max(2,Math.round(a*l*7*(i.droopDensity??1)));for(let E=0;E<_;E++){let S=m[Math.floor(s()*m.length)],P=s()*Math.PI*2,x=S.x+Math.cos(P)*S.r*.8,T=S.z+Math.sin(P)*S.r*.8;i.droopFront&&(T=n+l*(.7+s()*.3));let A=S.y-S.r*.3,R=i.droop*(.25+s()*.75),D=!!i.droopColor&&s()<.8,U=r*(D?.22:.45),N=Math.max(2,Math.round((D?Math.min(R,.6):R)/U));for(let O=0;O<N;O++){A-=U,x+=(s()-.5)*r*.25,i.droopFront&&(T+=(s()-.35)*r*.12);let q=1-O/N*(D?.8:.45);M.set(x,A,T);let Y=D?3:2;for(let te=0;te<Y;te++){let H=te%2?1:-1;w.set(H*(.6+s()*.4),.3+s()*.4,i.droopFront?1:s()-.5).normalize();let J=D?s()<.25?"#c7b4ef":i.droopColor:h[1+Math.floor(s()*3)],$=(D?r*.38:r*.85)*q*(.8+s()*.4);yv(f,M.clone().addScaledVector(w,$*.3),w,$,$*.7,J,{...u,blend:.35},s)}}}}return f.pos.length?Sv(f):null}var Ii=new Map;function Ft(i,e,t=0,n=0,s=0){var l;let r=JSON.stringify(e),a=Ii.get(r);if(a===void 0){if(a=wv(e,0,0,0),Ii.set(r,a),Ii.size>600){let c=Ii.keys().next().value;(l=Ii.get(c))==null||l.dispose(),Ii.delete(c)}}else Ii.delete(r),Ii.set(r,a);let o=a&&a.clone();o&&i.geo(t||n||s?o.translate(t,n,s):o,"#ffffff",{material:Tv(e.palette,e.flowers),tess:!1})}var jf=new Map;function Ev(i,e){let t=qs[i]??qs.green,n=256,s=document.createElement("canvas");s.width=s.height=n;let r=s.getContext("2d"),a=Kt(`${i}|${e}`),o=(c,h,f,u,d,p)=>{r.save(),r.translate(c,h),r.rotate(f),r.fillStyle=p,r.beginPath(),r.moveTo(0,0),r.quadraticCurveTo(d,u*.45,0,u),r.quadraticCurveTo(-d,u*.45,0,0),r.fill(),r.strokeStyle="rgba(0,0,0,0.18)",r.lineWidth=1.2,r.beginPath(),r.moveTo(0,u*.1),r.lineTo(0,u*.85),r.stroke(),r.restore()};for(let c=0;c<3;c++){let h=[70,90,70][c];for(let f=0;f<h;f++){let u=a()*Math.PI*2,d=Math.sqrt(a())*n*(.22+c*.08),p=n/2+Math.cos(u)*d,y=n/2+Math.sin(u)*d*.9,g=Math.atan2(y-n/2,p-n/2)-Math.PI/2+(a()-.5)*1.4,m=t[Math.min(t.length-1,c+Math.floor(a()*3))];o(p,y,g,26+a()*22,9+a()*6,m)}}if(e)for(let c=0;c<26;c++){let h=a()*Math.PI*2,f=Math.sqrt(a())*n*.36,u=n/2+Math.cos(h)*f,d=n/2+Math.sin(h)*f;r.fillStyle=e;for(let p=0;p<5;p++)r.beginPath(),r.arc(u+Math.cos(p*1.256)*4,d+Math.sin(p*1.256)*4,3.6,0,Math.PI*2),r.fill();r.fillStyle="#f2c94c",r.beginPath(),r.arc(u,d,2.2,0,Math.PI*2),r.fill()}let l=new Vt(s);return l.colorSpace=_t,l.anisotropy=4,l}function Tv(i="green",e=null){let t=`${i}|${e??""}`,n=jf.get(t);return n||(n=ji(new nn({map:Ev(i,e),alphaTest:.45,side:mn,vertexColors:!0,roughness:.85})),n.userData.shared=!0,jf.set(t,n)),n}var Qf=new Map;function Av(i){let e=Qf.get(i.uuid);return e||(e=new Ds({depthPacking:Kc,map:i.map,alphaTest:i.alphaTest}),Qf.set(i.uuid,e)),e}var ed=new Map;function It(i,e){let t=new Te(i),n={};return t.getHSL(n),t.setHSL(n.h,n.s,Gt.clamp(n.l+e,0,1)),"#"+t.getHexString()}function Rv(i,e,t){let n=`${i}|${e}|${t}`,s=ed.get(n);if(s)return s;let r=256,a=document.createElement("canvas");a.width=a.height=r;let o=a.getContext("2d"),l=Kt(n);o.fillStyle=e,o.fillRect(0,0,r,r);let c=(h,f,u=2)=>{for(let d=0;d<h;d++)o.fillStyle=It(e,(l()-.5)*f),o.globalAlpha=.35,o.fillRect(l()*r,l()*r,u+l()*u,u+l()*u);o.globalAlpha=1};switch(i){case"wood":{for(let f=0;f<8;f++){let u=f*r/8,d=-l()*r;for(;d<r;){let p=r*(.45+l()*.6);o.fillStyle=It(e,(l()-.5)*.09),o.fillRect(d,u,p,r/8);for(let y=0;y<4;y++){o.strokeStyle=It(e,-.05-l()*.05),o.globalAlpha=.35,o.beginPath();let g=u+l()*(r/8);o.moveTo(d,g),o.lineTo(d+p,g+(l()-.5)*3),o.stroke(),o.globalAlpha=1}o.fillStyle=t,o.fillRect(d,u,1.5,r/8),d+=p}o.fillStyle=t,o.fillRect(0,u,r,1.5)}break}case"tile":{let f=r/4;for(let u=0;u<4;u++)for(let d=0;d<4;d++)o.fillStyle=It(e,(l()-.5)*.04),o.fillRect(u*f+1,d*f+1,f-2,f-2);o.fillStyle=t;for(let u=0;u<=4;u++)o.fillRect(u*f-1,0,2,r),o.fillRect(0,u*f-1,r,2);for(let u=0;u<=4;u++)for(let d=0;d<=4;d++)o.save(),o.translate(u*f,d*f),o.rotate(Math.PI/4),o.fillRect(-7,-7,14,14),o.restore();break}case"checker":{let f=r/4;for(let u=0;u<4;u++)for(let d=0;d<4;d++)o.fillStyle=(u+d)%2?t:e,o.fillRect(u*f,d*f,f,f);c(500,.06);break}case"stone":{o.fillStyle=t,o.fillRect(0,0,r,r);let h=3,f=r/h;for(let u=0;u<h;u++)for(let d=0;d<h;d++){let p=f*(.75+l()*.2),y=f*(.75+l()*.2);o.fillStyle=It(e,(l()-.5)*.12);let g=u*f+(f-p)/2,m=d*f+(f-y)/2;o.beginPath(),o.moveTo(g+l()*6,m+l()*6),o.lineTo(g+p-l()*6,m+l()*6),o.lineTo(g+p-l()*6,m+y-l()*6),o.lineTo(g+l()*6,m+y-l()*6),o.closePath(),o.fill()}for(let u=0;u<60;u++)o.fillStyle=qs.green[2+Math.floor(l()*3)],o.globalAlpha=.6,o.fillRect(l()*r,l()*r,3+l()*5,3+l()*5);o.globalAlpha=1;break}case"carpet":{c(3e3,.08,1.5);break}case"grass":{for(let h=0;h<4e3;h++)o.fillStyle=qs.green[Math.floor(l()*5)],o.globalAlpha=.5,o.fillRect(l()*r,l()*r,2+l()*3,2+l()*3);o.globalAlpha=1;break}case"brick":{let f=r/8;o.fillStyle=t,o.fillRect(0,0,r,r);for(let u=0;u<8;u++){let d=u%2?f:0;for(let p=-d;p<r;p+=f*2)o.fillStyle=It(e,(l()-.5)*.1),o.fillRect(p+1.5,u*f+1.5,f*2-3,f-3)}break}case"sand":{c(2600,.1,1.4),o.strokeStyle=It(t,-.02),o.lineWidth=2;for(let h=0;h<9;h++){o.globalAlpha=.35,o.beginPath();let f=l()*r;for(let u=0;u<=r;u+=8)o.lineTo(u,f+Math.sin(u/22+h)*6);o.stroke()}o.globalAlpha=1;break}case"water":{let h=o.createLinearGradient(0,0,r,r);h.addColorStop(0,e),h.addColorStop(1,It(e,-.06)),o.fillStyle=h,o.fillRect(0,0,r,r),o.strokeStyle=t,o.lineCap="round";for(let f=0;f<26;f++){o.globalAlpha=.5+l()*.4,o.lineWidth=2+l()*2;let u=l()*r,d=l()*r,p=14+l()*26;o.beginPath(),o.arc(u,d,p,Math.PI*1.15,Math.PI*1.85),o.stroke()}o.fillStyle="#ffffff";for(let f=0;f<40;f++)o.globalAlpha=.5,o.fillRect(l()*r,l()*r,2,2);o.globalAlpha=1;break}case"snow":{c(1500,.05,2),o.fillStyle="#ffffff";for(let h=0;h<90;h++)o.globalAlpha=.6,o.beginPath(),o.arc(l()*r,l()*r,2+l()*5,0,Math.PI*2),o.fill();o.globalAlpha=1;break}case"marble":{c(300,.03,4),o.strokeStyle=t;for(let h=0;h<7;h++){o.globalAlpha=.25+l()*.3,o.lineWidth=.8+l()*1.6,o.beginPath();let f=l()*r,u=0;for(o.moveTo(f,u);u<r;)f+=(l()-.5)*40,u+=12+l()*18,o.lineTo(f,u);o.stroke()}o.globalAlpha=.5,o.fillStyle=It(t,.1),o.fillRect(0,r/2-1,r,2),o.fillRect(r/2-1,0,2,r),o.globalAlpha=1;break}case"tatami":{let h=r/2;for(let[f,u,d,p]of[[0,0,h,r],[h,0,h,h],[h,h,h,h]]){o.fillStyle=It(e,(l()-.5)*.05),o.fillRect(f,u,d,p),o.strokeStyle=It(e,-.08),o.globalAlpha=.35;let y=p>d;for(let g=3;g<(y?d:p);g+=4)o.beginPath(),y?(o.moveTo(f+g,u),o.lineTo(f+g,u+p)):(o.moveTo(f,u+g),o.lineTo(f+d,u+g)),o.stroke();o.globalAlpha=1,o.strokeStyle=t,o.lineWidth=6,o.strokeRect(f+3,u+3,d-6,p-6),o.lineWidth=1}break}case"planks":{for(let f=0;f<4;f++){let u=f*r/4;o.fillStyle=It(e,(l()-.5)*.1),o.fillRect(u,0,r/4,r);for(let d=0;d<5;d++){o.strokeStyle=It(e,-.07),o.globalAlpha=.4,o.beginPath();let p=u+l()*(r/4);o.moveTo(p,0),o.bezierCurveTo(p+6,r/3,p-6,2*r/3,p+2,r),o.stroke()}o.globalAlpha=1,o.fillStyle=t,o.fillRect(u,0,3,r);for(let d of[8,r/2,r-8])o.fillRect(u+10,d,3,3),o.fillRect(u+r/4-12,d,3,3)}break}case"parquet":{let h=r/8;for(let f=-1;f<9;f++)for(let u=-1;u<9;u++)o.fillStyle=It(e,(l()-.5)*.12),(f+u)%2?o.fillRect(f*h,u*h,h*2,h):o.fillRect(f*h,u*h,h,h*2),o.strokeStyle=t,o.lineWidth=1.2,(f+u)%2?o.strokeRect(f*h,u*h,h*2,h):o.strokeRect(f*h,u*h,h,h*2);break}case"metal":{let h=r/2;for(let f=0;f<2;f++)for(let u=0;u<2;u++){o.fillStyle=It(e,(l()-.5)*.05),o.fillRect(f*h+2,u*h+2,h-4,h-4),o.fillStyle=t;for(let[d,p]of[[8,8],[h-12,8],[8,h-12],[h-12,h-12]])o.beginPath(),o.arc(f*h+d+2,u*h+p+2,3,0,Math.PI*2),o.fill()}o.strokeStyle=It(e,.08),o.globalAlpha=.5;for(let f=10;f<r;f+=18)for(let u=10;u<r;u+=18)o.beginPath(),o.moveTo(f-4,u+((f+u)%36?3:-3)),o.lineTo(f+4,u-((f+u)%36?3:-3)),o.stroke();o.globalAlpha=1;break}case"mosaic":{let f=r/16;for(let u=0;u<16;u++)for(let d=0;d<16;d++){let p=Math.abs(u-8+.5)+Math.abs(d-8+.5);o.fillStyle=Math.floor(p)%4===0?t:It(e,(l()-.5)*.1),o.fillRect(u*f+.8,d*f+.8,f-1.6,f-1.6)}break}case"cobble":{o.fillStyle=t,o.fillRect(0,0,r,r);for(let h=0;h<70;h++)o.fillStyle=It(e,(l()-.5)*.16),o.beginPath(),o.ellipse(l()*r,l()*r,12+l()*10,10+l()*8,l()*3,0,Math.PI*2),o.fill();break}case"hex":{let f=18*Math.sqrt(3);for(let u=-1;u<r/(18*1.5)+1;u++)for(let d=-1;d<r/f+1;d++){let p=d*f+(u%2?f/2:0),y=u*18*1.5;o.fillStyle=It(e,(l()-.5)*.08),o.strokeStyle=t,o.lineWidth=2,o.beginPath();for(let g=0;g<6;g++)o.lineTo(p+Math.cos(Math.PI/6+g*Math.PI/3)*18,y+Math.sin(Math.PI/6+g*Math.PI/3)*18);o.closePath(),o.fill(),o.stroke()}break}case"straw":{c(800,.06,2);for(let h=0;h<900;h++){o.strokeStyle=l()<.5?t:It(e,.08),o.globalAlpha=.6,o.lineWidth=1.2;let f=l()*r,u=l()*r,d=l()*Math.PI,p=6+l()*10;o.beginPath(),o.moveTo(f,u),o.lineTo(f+Math.cos(d)*p,u+Math.sin(d)*p),o.stroke()}o.globalAlpha=1;break}default:c(800,.04)}return s=new Vt(a),s.colorSpace=_t,s.wrapS=s.wrapT=pn,s.anisotropy=4,ed.set(n,s),s}var td=new Map;function Ys(i,e,t,n,s){let r=`${i}|${e}|${t}|${n}|${s}`,a=td.get(r);if(!a){let o=Rv(i,e,t).clone();o.needsUpdate=!0,o.repeat.set(n,s);let l={tile:.55,marble:.35,water:.18,metal:.45,ice:.2}[i]??.92;a=ji(new nn({map:o,roughness:l,metalness:i==="metal"?.35:0})),a.userData.shared=!0,td.set(r,a)}return a}var yn={metalness:.8,roughness:.3},rd=["#c0392b","#2f6f7e","#7a3fa0","#d9a441","#3f7a4a","#d8432e","#33405a","#c46aa8"],jn=["#8a5a36","#a8703f","#6b4a34","#b98552"];function Cv(i,e,t,n,s,r,a,o){let l=["#a33b2b","#2f5d8a","#d9b44a","#3f7a4a","#7a3f7a","#e4dccb","#c56b2c","#1f2c3c"],c=t-e/2+.02;for(;c<t+e/2-.06;){let h=.03+a()*.05,f=o*(.6+a()*.38);if(a()<.08){c+=h*2;continue}i.box(h,f,r*(.7+a()*.2),c+h/2,n,s,l[Math.floor(a()*l.length)]),c+=h+.004}}function Lh(i,e,t,n="leafy",s="#b8673f",r="green",a=null,o=0,l=0,c=0){let h=Kt(t);if(i.cyl(e/2,e*.38,e*.8,o,l,c,s,{seg:14}),i.cyl(e/2+.02,e/2+.02,e*.1,o,l+e*.72,c,s,{seg:14}),i.cyl(e/2-.02,e/2-.02,.01,o,l+e*.8,c,"#3a2a1e",{seg:14}),n==="palm"){let f=["#2f5e2c","#3f7a35","#5a9440","#7cae4f","#a9c96c"];for(let u=0;u<11;u++){let d=u/11*Math.PI*2+h(),p=e*(1.4+h()*1),y=.5+h()*.6;i.cbox(.16*e,p,.02,o+Math.cos(d)*p*.3,l+e*.8+p*.38,c+Math.sin(d)*p*.3,f[1+u%4],{rz:-Math.cos(d)*y,rx:Math.sin(d)*y,flat:!0})}}else{let f=e*.72;Ft(i,{seed:t,rx:f,ry:e*.75,palette:r,voxel:Math.max(.06,e*.17),flowers:a,flowerRate:.2},o,l+e*.7,c)}}var ad={bed(i,e){let s=jn[e.k%jn.length],r=rd[e.k%rd.length];i.box(1.3,.3,1.95,0,.05,0,s),i.box(1.3-.06,.2,1.95-.06,0,.35,0,"#f2f0ea",{round:.07}),i.box(1.3+.04,.09,1.95*.62,0,.5,1.95*.19,r,{round:.04}),i.box(1.3+.03,.3,.04,0,.29,1.95/2-.01,r),i.box(1.3+.05,.1,.16,0,.5,1.95*.19-1.95*.31+.08,"#f6f2ea",{round:.04});for(let a of[-1,1])i.box(1.3*.38,.14,.36,a*1.3*.22,.53,-1.95/2+.3,"#e8eef6",{round:.06});return i.box(1.3+.1,1,.1,0,0,-1.95/2-.02,s),{w:1.3+.1,d:1.95+.1,h:1,seat:.58,wall:!0}},sofa(i,e){let s=["#f1ede2","#86a6bf","#9fb08a","#d9a3a0"][e.k%4],r=Kt(e.seed);i.box(1.9,.25,.9,0,.1,0,s,{round:.06}),i.box(1.9,.5,.24,0,.3,-.9/2+.12,s,{round:.09}),i.box(.22,.34,.9,-1.9/2+.11,.3,0,s,{round:.09}),i.box(.22,.34,.9,1.9/2-.11,.3,0,s,{round:.09});let a=2,o=(1.9-.4)/a;for(let c=0;c<a;c++)i.box(o-.03,.12,.9-.26,-1.9/2+.2+o*(c+.5),.35,.1,s,{roughness:.95,round:.06});for(let c of[-1,1])for(let h of[-1,1])i.box(.06,.1,.06,c*(1.9/2-.08),0,h*(.9/2-.08),"#4a3a2a");let l=["#d9c641","#d8432e","#1f4d3d"];for(let c=0;c<3;c++){let h=-.6+(c+.5)*1.2/3;i.cbox(.38,.38,.12,h,.66,-.9/2+.3,l[c],{rx:-.25,rz:(r()-.5)*.35,round:.06})}return{w:1.9,d:.9,h:.8,seat:.47,wall:!0}},armchair(i,e){let t=["#c0392b","#2f6f7e","#d9a441","#7a3fa0"][e.k%4];i.box(.85,.4,.85,0,.05,0,t,{round:.08}),i.box(.85,.55,.22,0,.4,-.32,t,{round:.09}),i.box(.17,.27,.85,-.34,.42,0,t,{round:.08}),i.box(.17,.27,.85,.34,.42,0,t,{round:.08}),i.box(.55,.12,.6,0,.42,.08,"#f1ede2",{round:.05});for(let n of[-1,1])for(let s of[-1,1])i.box(.05,.06,.05,n*.36,0,s*.36,"#4a3a2a");return{w:.85,d:.85,h:.95,seat:.54,up:1.55}},chair(i,e){let t=["#c0392b","#3f7a4a","#2f5d8a","#d9a441"][e.k%4],n="#5a3b26";for(let s of[-1,1])for(let r of[-1,1])i.box(.04,.45,.04,s*.2,0,r*.2,n);return i.box(.48,.07,.48,0,.45,0,n),i.box(.42,.04,.42,0,.52,.01,t,{round:.015}),i.box(.46,.5,.06,0,.5,-.22,n),i.box(.36,.3,.065,0,.62,-.22,t),{w:.5,d:.5,h:1,seat:.56,up:1.75}},rug(i,e){let s=[["#8a2f3a","#e9d9b8","#2c3a6a"],["#2c4a6a","#efe6c8","#c9762a"],["#3f6b4a","#f1ead2","#a33b2b"],["#6a3f7a","#efe6c8","#d9a441"]],[r,a,o]=s[e.k%s.length];i.box(1.75,.012,1.75,0,0,0,a,{jitter:0}),i.box(1.75-.12,.018,1.75-.12,0,0,0,o,{jitter:0,roughness:1}),i.box(1.75-.26,.022,1.75-.26,0,0,0,r,{jitter:0,roughness:1}),i.cbox(.62,.026,.62,0,.013,0,a,{ry:Math.PI/4,jitter:0}),i.cbox(.36,.03,.36,0,.015,0,o,{ry:Math.PI/4,jitter:0});for(let l of[-1,1])for(let c of[-1,1])i.cbox(.18,.026,.18,l*(1.75/2-.3),.013,c*(1.75/2-.3),a,{ry:Math.PI/4,jitter:0});for(let l of[-1,1])for(let c=0;c<14;c++)i.box(.025,.008,.08,-1.75/2+.08+c*(1.75-.16)/13,0,l*(1.75/2+.03),a,{jitter:0,shadow:!1});return{w:1.75,d:1.75+.1,h:.03,seat:.03,up:1}},bench(i,e){let n=e.room==="garden",s=n?"#4f6f5a":"#a8703f",r=n?"#2a2523":"#6b4a34";for(let a of[-1,1])i.box(.06,.42,.5,a*(1.6/2-.15),0,0,r),i.box(.06,.25,.06,a*(1.6/2-.15),.42,-.2,r);for(let a=0;a<3;a++)i.box(1.6,.04,.12,0,.42,-.14+a*.14,s);for(let a=0;a<2;a++)i.cbox(1.6,.11,.035,0,.62+a*.15,-.25-a*.03,s,{rx:-.2});return n||i.box(1.6-.3,.06,.34,0,.46,0,"#c46aa8",{round:.03}),{w:1.6,d:.6,h:.85,seat:.48,up:1.05}},table(i,e){let t=jn[e.k%jn.length];if(e.room==="dining"){i.cyl(.62,.62,.05,0,.7,0,t,{seg:28}),i.cyl(.66,.7,.3,0,.45,0,"#f4efe4",{seg:28}),i.cyl(.05,.06,.7,0,0,0,"#5a3b26"),i.cyl(.28,.32,.04,0,0,0,"#5a3b26");for(let n=0;n<4;n++){let s=n/4*Math.PI*2+Math.PI/4;i.cyl(.13,.11,.02,Math.cos(s)*.42,.75,Math.sin(s)*.42,"#ffffff",{seg:18,roughness:.3}),i.cyl(.07,.07,.022,Math.cos(s)*.42,.751,Math.sin(s)*.42,"#2f6f7e",{seg:14,roughness:.3})}return i.cyl(.07,.09,.08,0,.75,0,"#c9a24a",yn),i.cyl(.025,.025,.22,0,.83,0,"#f6f2ea"),i.sphere(.03,0,1.08,0,"#ffcf7a",{emissive:"#ffb340",ei:1.5,shadow:!1}),{w:1.4,d:1.4,h:1.1,spots:[[.4,.77,0],[-.4,.77,0]]}}if(e.room==="living"){let n=Kt(e.seed);i.box(1.2,.05,.7,0,.4,0,t,{round:.02});for(let s of[-1,1])for(let r of[-1,1])i.box(.05,.4,.05,s*.54,0,r*.29,"#3a2a22");i.box(1.1,.03,.6,0,.12,0,t);for(let s=0;s<3;s++)i.cbox(.3,.04,.22,-.3,.47+s*.04,.02,["#a33b2b","#2f5d8a","#e4dccb"][s],{ry:(n()-.5)*.5});i.sphere(.16,.28,.45,0,"#2f6f7e",{sy:.45,seg:18});for(let s=0;s<3;s++)i.sphere(.06,.24+s*.05,.52,(s-1)*.06,["#e8492c","#e0a94a","#7cae4f"][s],{seg:8});return{w:1.2,d:.7,h:.6,up:1.25,spots:[[0,.45,.2]]}}i.box(1.4,.05,.85,0,.72,0,t);for(let n of[-1,1])for(let s of[-1,1])i.box(.06,.72,.06,n*.62,0,s*.35,"#5a3b26");i.box(.5,.008,.87,0,.77,0,"#d8263f",{material:Ys("checker","#f4efe4","#c0392b",2,3)}),i.sphere(.2,0,.82,0,"#efe6c8",{sy:.45,seg:18});for(let n=0;n<4;n++)i.sphere(.07,Math.cos(n*1.6)*.08,.88,Math.sin(n*1.6)*.08,["#e8492c","#e0a94a","#7cae4f","#e8492c"][n],{seg:8});return i.cyl(.05,.045,.1,.48,.77,.2,"#2f6f7e",{seg:10}),i.cyl(.05,.045,.1,-.5,.77,-.22,"#f4efe4",{seg:10}),{w:1.4,d:.85,h:.95,spots:[[.36,.77,-.2],[-.38,.77,.2]]}},desk(i,e){let t=Kt(e.seed),n=jn[(e.k+1)%jn.length],s=1.45,r=.75,a=.75;i.box(s,.05,r,0,a-.05,0,n);for(let o of[-1,1])for(let l of[-1,1])i.box(.06,a-.05,.06,o*(s/2-.06),0,l*(r/2-.06),"#5a3b26");i.box(.45,a-.1,r-.06,s/2-.25,0,0,n);for(let o=0;o<3;o++)i.box(.4,.015,.02,s/2-.25,.12+o*.2,r/2-.02,"#e9e2d2");i.box(.7,.012,.42,-.1,a,.08,"#2f5a46");for(let o=0;o<3;o++)i.cbox(.21,.006,.3,-.2+o*.12,a+.016+o*.006,.08,"#f6f2ea",{ry:(t()-.5)*.6});i.cyl(.08,.1,.02,.5,a,-.2,"#c9a24a",yn),i.cyl(.012,.012,.32,.5,a,-.2,"#c9a24a",yn),i.cyl(.05,.12,.1,.5,a+.3,-.12,"#2f6f4a",{seg:14}),i.cyl(.04,.035,.1,-.58,a,-.22,"#a33b2b",{seg:10});for(let o=0;o<2;o++)i.cbox(.26,.05,.2,.3,a+o*.05,.18,["#2f5d8a","#d9b44a"][o],{ry:.2+o*.3});return{w:s,d:r,h:a+.45,wall:!0,up:1.15,spots:[[-.55,a,.16]]}},plant(i,e){let t=e.k%2===0;return Lh(i,.6,e.seed,t?"leafy":"palm",["#b8673f","#efe6c8","#5d7d6a","#2f6f7e"][e.k%4],"green",e.k%3===1?"#f2c94c":null),{w:.95,d:.95,h:1.3,up:1.25}},bookshelf(i,e){let t=Kt(e.seed),n=1.5,s=1.6,r=.42,a=["#7a3fa0","#6b4a34","#2f5a46","#8a5a36"][e.k%4];i.box(n,s,.03,0,0,-r/2+.015,a),i.box(.04,s,r,-n/2+.02,0,0,a),i.box(.04,s,r,n/2-.02,0,0,a);let o=4,l=s/o;for(let c=0;c<=o;c++)i.box(n,.03,r,0,Math.min(c*l,s-.03),0,a);for(let c=0;c<o;c++)Cv(i,n-.08,0,c*l+.03,0,r,t,l-.08);for(let c=0;c<3;c++)i.cbox(.3,.05,.22,-.4+c*.05,s+.025+c*.05,0,["#a33b2b","#d9b44a","#2f5d8a"][c],{ry:(t()-.5)*.4});return Lh(i,.2,e.seed+3,"leafy","#efe6c8","lime",null,.45,s,0),{w:n,d:r,h:s+.3,wall:!0,up:1.1}},piano(i){let e=new zi;e.moveTo(-.7,.75),e.lineTo(.7,.75),e.lineTo(.7,.1),e.bezierCurveTo(.7,-.5,.25,-.35,.15,-.95),e.bezierCurveTo(.05,-1.05,-.7,-1.05,-.7,-.8),e.closePath();let t=new Hi(e,{depth:.3,bevelEnabled:!0,bevelSize:.02,bevelThickness:.02,bevelSegments:2,curveSegments:24});t.rotateX(Math.PI/2),t.translate(0,.95,.1),i.geo(t,"#1d1716",{roughness:.3,tess:!1});let n=new Hi(e,{depth:.025,bevelEnabled:!1,curveSegments:24});n.rotateX(Math.PI/2),n.translate(.7,0,0),n.rotateZ(.55),n.translate(-.7,.98,.1),i.geo(n,"#2a201d",{roughness:.25,tess:!1}),i.cbox(.02,.6,.02,.3,1.25,-.2,"#c9a24a",{rz:.2,...yn});for(let s=0;s<9;s++)i.box(.012,.01,1.2-s*.07,-.55+s*.12,.97,.1-s*.05,"#c9a24a",{...yn,shadow:!1});i.box(1.42,.06,.24,0,.72,.95,"#1d1716",{roughness:.3}),i.box(1.32,.03,.16,0,.78,.96,"#f6f2ea");for(let s=0;s<34;s++)[1,3,6,8,10].includes(s%12)&&i.box(.022,.02,.09,-.63+s*.038,.81,.93,"#111");for(let[s,r]of[[-.62,.8],[.62,.8],[-.4,-.75]])i.cyl(.05,.04,.68,s,0,r,"#1d1716",{seg:8});i.box(.7,.07,.32,0,.45,1.35,"#1d1716",{round:.02}),i.box(.64,.03,.28,0,.52,1.35,"#8a2f3a",{round:.01});for(let s of[-1,1])for(let r of[-1,1])i.box(.04,.45,.04,s*.3,0,1.35+r*.12,"#1d1716");return{w:1.45,d:2.6,h:1.55,cz:.2}},bath(i){let e="#f6f2ea",t="#c9a24a";i.box(1.6,.5,.75,0,.14,0,e,{round:.2}),i.box(1.4,.05,.55,0,.6,0,"#a9cfd8",{roughness:.1});for(let n=0;n<5;n++)i.sphere(.06+n%2*.02,-.3+n*.12,.64,(n%3-1)*.1,"#ffffff",{seg:8});for(let n of[-.65,.65])for(let s of[-.27,.27])i.sphere(.06,n,.08,s,t,yn);return i.cyl(.02,.02,.35,-.72,.6,0,t,{metalness:.8}),i.box(.08,.03,.2,-.66,.92,0,t,yn),i.box(.25,.05,.12,.45,.66,-.3,"#e0a94a",{round:.02}),{w:1.7,d:.8,h:.95,wall:!0,up:1}},sink(i,e){let t=e.room==="kitchen",n=t?"#f3eee4":"#86a6bf";i.box(1,.8,.5,0,.05,-.02,n),i.box(1,.05,.5,0,0,-.04,"#2a2626");for(let s of[-1,1])i.frame(.44,.66,.025,s*.24,.12,.235,"#cfc8ba",.02);i.box(1.08,.05,.56,0,.85,0,t?"#d8d8d4":"#f6f2ea",{roughness:.35}),i.sphere(.24,0,.88,.02,"#ffffff",{sy:.32,seg:22,roughness:.2}),i.cyl(.18,.18,.012,0,.9,.02,"#a9cfd8",{seg:20,roughness:.05}),i.cyl(.02,.02,.26,0,.88,-.2,"#cfd3d6",{metalness:.85,roughness:.2}),i.cbox(.02,.02,.14,0,1.13,-.14,"#cfd3d6",{metalness:.85,roughness:.2});for(let s of[-.12,.12])i.sphere(.03,s,.93,-.2,"#cfd3d6",{metalness:.85});return t?(i.cyl(.07,.06,.18,.4,.88,-.12,"#2f6f7e",{seg:10}),Ft(i,{seed:e.seed,rx:.12,ry:.14,palette:"lime",voxel:.05},.4,1.1,-.12)):(i.box(.7,.75,.04,0,1,-.25,"#c9a24a",yn),i.box(.62,.67,.045,0,1.04,-.25,"#c9dde3",{metalness:.9,roughness:.05}),i.cyl(.04,.035,.12,-.38,.88,-.1,"#f2c94c",{seg:10})),{w:1.08,d:.56,h:t?1.2:1.8,wall:!0,up:1.25}},tv(i,e){let t=jn[e.k%jn.length];i.box(1.5,.45,.45,0,.05,0,t);for(let n of[-1,1])for(let s of[-1,1])i.box(.04,.06,.04,n*.68,0,s*.18,"#3a2a22");for(let n of[-1,1])i.frame(.68,.36,.025,n*.36,.09,.226,"#3a2a22",.02);return i.box(.3,.03,.2,0,.5,0,"#1b1b1e"),i.box(.06,.12,.06,0,.5,-.02,"#1b1b1e"),i.box(1.2,.7,.06,0,.62,-.02,"#1b1b1e"),i.box(1.14,.64,.01,0,.65,.015,"#2b4f7a",{roughness:.15,emissive:"#3c6ea8",ei:.35}),Lh(i,.18,e.seed,"leafy","#efe6c8","green",null,.6,.5,.05),{w:1.5,d:.5,h:1.35,wall:!0,up:1.1}},fireplace(i,e){let r="#9a4a3a",l=.31499999999999995,c={material:Ys("brick",r,"#d9c9b4",2,2)};i.box(l,1.1,.5,-1.4/2+l/2,0,0,r,c),i.box(l,1.1,.5,1.4/2-l/2,0,0,r,c),i.box(.77,1.1-.66,.5,0,.66,0,r,c),i.box(.77,.66,.05,0,0,-.5/2+.025,"#1a1412"),i.box(1.4+.2,.08,.5+.12,0,1.1,.03,"#c4a27a"),i.box(.77+.4,.04,.4,0,0,.5/2+.14,"#2a2220"),Ft(i,{seed:7,rx:.77*.3,ry:.66*.3,rz:.12,voxel:.06,palette:"autumn",sparse:.2},0,.02,0),i.sphere(.12,0,.12,0,"#ff9a3a",{sy:.8,emissive:"#ff7a1a",ei:1.6,shadow:!1}),i.box(.77*.6,.06,.15,0,0,0,"#3a2418");for(let f of[-1,1])i.cyl(.04,.05,.12,f*.55,1.1+.08,.02,"#c9a24a",yn),i.cyl(.018,.018,.14,f*.55,1.1+.2,.02,"#f6f2ea");i.box(.26,.22,.1,0,1.1+.08,0,"#c9a24a",yn),i.cyl(.08,.08,.012,0,1.1+.19,.05,"#f6f2ea",{rx:Math.PI/2,center:!0,seg:14});let h=new wi("#ff9a3c",2.2,3.5,1.6);return h.position.set(0,.66*.4,.45),i.add(h),{w:1.4+.2,d:.5+.3,h:1.1+.3,wall:!0,up:1.1}},counter(i,e){let r=["#f3eee4","#9fb08a","#86a6bf"][e.k%3];i.box(1.7,.9-.04,.65-.05,0,0,-.025,r),i.box(1.7,.04,.65,0,.9-.04,0,"#d8d8d4",{roughness:.4}),i.box(1.7,.08,.65-.1,0,0,-.07,"#2a2626");let a=3;for(let l=1;l<a;l++)i.box(.012,.9-.2,.01,-1.7/2+l*1.7/a,.1,.65/2-.045,"#bdb6a8");for(let l=0;l<a;l++)i.box(.1,.02,.03,-1.7/2+(l+.5)*1.7/a,.9-.2,.65/2-.03,"#9c9c9c",{metalness:.7});let o=1.7/2-.42;i.box(.6,.012,.5,o,.9,0,"#1d1d1f",{roughness:.25});for(let l of[-.14,.14])for(let c of[-.12,.12])i.cyl(.08,.08,.008,o+l,.9+.012,c,"#3a3a3e",{seg:16});return i.cyl(.12,.11,.16,o-.14,.9+.02,.12,"#c27a4a",{seg:16,metalness:.6,roughness:.35}),i.cbox(.24,.02,.04,o-.36,.9+.15,.12,"#3a2a22"),i.box(.45,.03,.3,-.35,.9,.02,"#c4a27a"),i.sphere(.12,-.38,.9+.06,.02,"#d9a066",{sy:.6,seg:12}),i.box(.08,.3,.08,-.72,.9,-.2,"#efe6c8"),{w:1.7,d:.65,h:.9+.35,wall:!0,up:1.05,spots:[[0,.9,.05]]}},cabinet(i,e){let r=["#f3eee4","#86a6bf","#8a5a36","#9fb08a"][e.k%4],a=new Te(r).offsetHSL(0,0,-.08).getStyle();i.box(1.2,1,.5,0,0,0,r),i.box(1.2+.03,.03,.5+.03,0,1,0,r);for(let o=0;o<2;o++){let l=-.6+(o+.5)*1.2/2;i.frame(1.2/2-.08,1-.12,.025,l,.06,.5/2+.005,a,.02),i.sphere(.025,l+(o%2?-1:1)*(1.2/4-.1),1*.55,.5/2+.03,"#c9a24a",{...yn,seg:8})}return i.cyl(.08,.1,.25,-.3,1+.03,0,"#2f6f7e",{seg:12,roughness:.3}),Ft(i,{seed:e.seed,rx:.18,ry:.16,palette:"green",voxel:.05,flowers:["#e8492c","#f4f1ff","#f2c94c"][e.k%3],flowerRate:.5},-.3,1+.35,0),i.cbox(.26,.2,.03,.25,1+.13,-.05,"#c9a24a",{rx:-.2,...yn}),i.cbox(.2,.15,.035,.25,1+.13,-.045,"#8fc3d6",{rx:-.2}),{w:1.2+.05,d:.5+.05,h:1+.5,wall:!0,up:1.2,spots:[[-.02,1+.03,.05]]}},lamp(i,e){let t="#ffc777",n={emissive:t,ei:1.2};i.cyl(.18,.2,.03,-.12,0,0,"#2a2523"),i.cyl(.015,.015,1.4,-.12,0,0,"#2a2523"),i.cyl(.17,.26,.3,-.12,1.3,0,"#f3e2b8",n),i.cyl(.22,.22,.03,.3,.5,.15,jn[e.k%jn.length],{seg:18}),i.cyl(.025,.025,.5,.3,0,.15,"#3a2a22"),i.cyl(.12,.12,.02,.3,0,.15,"#3a2a22"),i.cyl(.05,.045,.09,.36,.53,.1,"#f4efe4",{seg:10});let s=new wi(t,2.2,4.5,1.5);return s.position.set(-.12,1.35,0),i.add(s),{w:.8,d:.6,h:1.6,up:1.3}},tree(i,e){let t=Kt(e.seed),n=2.5,s=1.75,r=n*.5;i.cyl(.07,.13,r,0,0,0,"#6b4a34");for(let o=0;o<3;o++){let l=t()*Math.PI*2;i.cbox(.06,r*.5,.06,Math.cos(l)*.22,r*.85,Math.sin(l)*.22,"#6b4a34",{rz:Math.cos(l)*.6,rx:-Math.sin(l)*.6})}let a=["green","lime","olive","blossom"][e.k%4];return Ft(i,{seed:e.seed,rx:s/2,ry:(n-r)*.6,palette:a,voxel:.15,flowers:a==="blossom"?null:"#f4f1ff",flowerRate:.04},0,r*.85,0),i.cyl(.42,.45,.05,0,0,0,"#8a6a4a",{seg:16}),{w:s,d:s,h:n,up:1}},fountain(i){let t="#d8ccb2",n="#5fa5b5";i.cyl(.85,.85+.05,.4,0,0,0,t,{seg:28}),i.cyl(.85-.12,.85-.12,.02,0,.34,0,n,{seg:28,roughness:.1,metalness:.2}),i.cyl(.14,.2,.9,0,.3,0,t,{seg:14}),i.cyl(.45,.25,.15,0,1.1,0,t,{seg:18}),i.cyl(.37,.37,.02,0,1.2,0,n,{seg:18,roughness:.1}),i.sphere(.1,0,1.33,0,t);for(let s=0;s<3;s++)i.cyl(.09,.09,.012,Math.cos(s*2.2)*.5,.36,Math.sin(s*2.2)*.5,"#5a9440",{seg:10,t0:.3,tl:Math.PI*1.8});return{w:2*.85+.1,d:2*.85+.1,h:1.45,up:1}}},zS=Object.keys(ad);function od(i,{room:e="living",k:t=0,seed:n=1,fit:s=1.7}={}){let r=ad[i],a=new St;if(!r)return{group:a,h:0,seat:0,wall:!1,size:[0,0]};Dn(n*7919);let o=new Wt,l=r(o,{room:e,k:t,seed:n})??{},c=o.build(),h=Math.min(l.up??1.4,s/Math.max(l.w,l.d));c.scale.setScalar(h),l.cz&&(c.position.z=-l.cz*h),a.add(c);let f=(l.spots??[]).map(([u,d,p])=>[u*h,d*h,(p-(l.cz??0))*h]);return{group:a,h:l.h*h,seat:l.seat!=null?l.seat*h:null,wall:!!l.wall,size:[l.w*h,l.d*h],spots:f}}var Nn=(i,e)=>e[Math.floor(i()*e.length)],Yl="#6b4a34",Sa={palm(i,e){let t=1.1+e()*.4,n=(e()-.5)*.3;for(let r=0;r<6;r++)i.cyl(.07-r*.006,.08-r*.006,t/6+.02,n*r*.06,r*t/6,0,r%2?"#8a6a4a":"#7a5a3a",{seg:8});let s=[n*.36,t,0];for(let r=0;r<8;r++){let a=r/8*Math.PI*2+e()*.3;i.cbox(.14,.02,.7,s[0]+Math.cos(a)*.3,s[1]-.06,Math.sin(a)*.3,["#2f7a3a","#3f9a45","#5aa84a"][r%3],{ry:-a+Math.PI/2,rx:.45,flat:!0})}for(let r=0;r<3;r++)i.sphere(.06,s[0]+Math.cos(r*2.1)*.08,t-.08,Math.sin(r*2.1)*.08,"#6b4a2a",{seg:8})},pine(i,e){let t=1+e()*.5;i.cyl(.06,.08,t*.25,0,0,0,Yl,{seg:8});for(let n=0;n<3;n++)Ft(i,{seed:Math.floor(e()*9999),rx:.42-n*.11,ry:.22,palette:"pine",voxel:.12},0,t*.18+n*t*.24,0);e()<.6&&i.cyl(.05,.3,.12,0,t*.8,0,"#f4f8fc",{seg:8})},bush(i,e){Ft(i,{seed:Math.floor(e()*9999),rx:.35+e()*.15,ry:.28,palette:Nn(e,["green","lime","olive"]),voxel:.1,flowers:e()<.4?Nn(e,["#f4f1ff","#e8492c","#f2c94c"]):null},0,0,0)},tree(i,e){let t=.9+e()*.4;i.cyl(.06,.09,t*.55,0,0,0,Yl,{seg:8}),Ft(i,{seed:Math.floor(e()*9999),rx:.5,ry:.42,palette:Nn(e,["green","lime","autumn"]),voxel:.14},0,t*.5,0)},sakura(i,e){i.cyl(.06,.09,.6,0,0,0,"#4a3428",{seg:8}),i.cbox(.05,.4,.05,.12,.6,0,"#4a3428",{rz:-.6}),Ft(i,{seed:Math.floor(e()*9999),rx:.55,ry:.36,palette:"blossom",voxel:.12},.1,.62,0)},bonsai(i,e){i.box(.4,.12,.26,0,0,0,"#2f5a6e"),i.cbox(.05,.3,.05,0,.26,0,"#4a3428",{rz:.5}),Ft(i,{seed:Math.floor(e()*9999),rx:.24,ry:.12,palette:"dark",voxel:.06},.1,.32,0)},cypress(i,e){i.cyl(.05,.06,.2,0,0,0,Yl,{seg:6}),Ft(i,{seed:Math.floor(e()*9999),rx:.2,ry:.65,palette:"dark",voxel:.1},0,.1,0)},topiary(i,e){i.cyl(.18,.14,.24,0,0,0,"#c9b8a0",{seg:12}),i.cyl(.03,.03,.35,0,.22,0,Yl,{seg:6}),Ft(i,{seed:Math.floor(e()*9999),rx:.26,ry:.24,palette:"green",voxel:.08},0,.5,0)},rosebush(i,e){Ft(i,{seed:Math.floor(e()*9999),rx:.36,ry:.26,palette:"dark",voxel:.09,flowers:Nn(e,["#e8492c","#f4bfd3","#f4f1ff"])},0,0,0)},fern(i,e){for(let t=0;t<9;t++){let n=t/9*Math.PI*2+e()*.4;i.cbox(.09,.015,.5,Math.cos(n)*.2,.14,Math.sin(n)*.2,["#2f6a2e","#3f8a3a","#5aa04a"][t%3],{ry:-n+Math.PI/2,rx:.6,flat:!0})}},kelp(i,e){for(let t=0;t<4;t++){let n=(e()-.5)*.3,s=(e()-.5)*.3,r=5+Math.floor(e()*4);for(let a=0;a<r;a++)i.cbox(.08,.2,.015,n+Math.sin(a*.9+t)*.05,.1+a*.16,s,["#3f6a32","#5a8a3a","#7aa84a"][a%3],{rz:Math.sin(a+t)*.4,ry:t})}},coralTree(i,e){let t=Nn(e,["#f08a7e","#f0a8c4","#b56ad8","#e8743a"]);i.cyl(.06,.09,.3,0,0,0,t,{seg:8});for(let n=0;n<7;n++){let s=e()*6.28,r=.3+e()*.5;i.cbox(.06,.35+e()*.2,.06,Math.cos(s)*.12,.35+r*.2,Math.sin(s)*.12,t,{rz:Math.cos(s)*r,rx:-Math.sin(s)*r,round:.025}),i.sphere(.05,Math.cos(s)*.25,.6+r*.2,Math.sin(s)*.25,t,{seg:8})}},bamboo(i,e){for(let t=0;t<5;t++){let n=(e()-.5)*.35,s=(e()-.5)*.35,r=.8+e()*.6;for(let a=0;a<4;a++)i.cyl(.035,.035,r/4-.015,n,a*r/4,s,a%2?"#7aa84a":"#6a9a3e",{seg:8});i.cbox(.06,.012,.22,n+.08,r*.85,s,"#5a9440",{ry:e()*3,rx:.4,flat:!0})}},cactus(i,e){let t=.6+e()*.4,n="#5a8a4a";i.cyl(.11,.12,t,0,0,0,n,{seg:10}),i.sphere(.11,0,t,0,n,{seg:10});for(let s of[-1,1]){if(e()<.3)continue;let r=t*(.35+e()*.25);i.cbox(.2,.08,.08,s*.16,r,0,n,{round:.04}),i.cyl(.07,.07,.25,s*.25,r,0,n,{seg:8}),i.sphere(.07,s*.25,r+.25,0,n,{seg:8})}e()<.5&&i.sphere(.04,0,t+.1,0,"#e8492c",{seg:6})},dryBush(i,e){Ft(i,{seed:Math.floor(e()*9999),rx:.3,ry:.18,palette:"dry",voxel:.08},0,0,0)},deadTree(i,e){i.cyl(.05,.09,.9,0,0,0,"#3a3036",{seg:7});for(let t=0;t<5;t++){let n=e()*6.28,s=.4+e()*.45;i.cbox(.035,.4,.035,Math.cos(n)*.12,s+.12,Math.sin(n)*.12,"#3a3036",{rz:Math.cos(n)*.9,rx:-Math.sin(n)*.9})}},flowers(i,e){for(let t=0;t<7;t++){let n=(e()-.5)*.45,s=(e()-.5)*.45,r=.12+e()*.12;i.cyl(.01,.01,r,n,0,s,"#3f7a35",{seg:4}),i.sphere(.04,n,r,s,Nn(e,["#e8492c","#f2c94c","#f4f1ff","#c46aa8","#5a8adf"]),{seg:6})}},tuft(i,e){for(let t=0;t<7;t++){let n=e()*6.28;i.cbox(.03,.2+e()*.12,.012,Math.cos(n)*.04,.1,Math.sin(n)*.04,Nn(e,["#5a9440","#7cae4f","#a9c96c"]),{rz:Math.cos(n)*.5,rx:Math.sin(n)*.5,ry:n,flat:!0})}}},Dh={lamp(i){i.cyl(.1,.12,.08,0,0,0,"#2a2523",{seg:10}),i.cyl(.03,.035,1.2,0,.08,0,"#2a2523",{seg:8}),i.box(.16,.2,.16,0,1.25,0,"#ffd27a",{emissive:"#ffb340",ei:1.2}),i.cyl(0,.14,.1,0,1.45,0,"#2a2523",{seg:4})},lanternStone(i){i.cyl(.14,.18,.1,0,0,0,"#9a968c",{seg:8}),i.cyl(.05,.06,.35,0,.1,0,"#9a968c",{seg:8}),i.box(.24,.18,.24,0,.45,0,"#9a968c"),i.box(.12,.1,.26,0,.49,0,"#ffd27a",{emissive:"#ffb340",ei:.8}),i.cyl(0,.24,.14,0,.63,0,"#8a867c",{seg:4})},obelisk(i){i.box(.3,.1,.3,0,0,0,"#c9a456"),i.cyl(.07,.12,1.1,0,.1,0,"#e0c088",{seg:4}),i.cyl(0,.07,.12,0,1.2,0,"#e0b23a",{seg:4,metalness:.7})},tomb(i,e){i.box(.34,.5,.1,0,0,0,"#8a8690",{round:.08,rz:(e()-.5)*.3}),i.box(.2,.04,.12,0,.32,.01,"#6e6a74"),i.box(.04,.2,.12,0,.22,.01,"#6e6a74")},column(i){i.box(.32,.08,.32,0,0,0,"#e6dfd0"),i.cyl(.11,.12,.9,0,.08,0,"#f2ede2",{seg:12}),i.box(.3,.07,.3,0,.98,0,"#e6dfd0")},banner(i,e){i.cyl(.025,.025,1.3,0,0,0,"#5a3b26",{seg:6});let t=Nn(e,["#c0283a","#2f5d8a","#d9a441"]);i.box(.32,.45,.02,.17,.8,0,t),i.box(.12,.12,.025,.17,1,0,"#f2c94c")},antenna(i){i.box(.26,.08,.26,0,0,0,"#5a6474"),i.cyl(.02,.03,1.2,0,.08,0,"#9aa6b4",{seg:6,metalness:.6}),i.sphere(.04,0,1.3,0,"#ff4a4a",{emissive:"#ff2020",ei:1.5,seg:8});for(let e of[.5,.8])i.box(.3,.015,.015,0,e,0,"#9aa6b4")},dish(i){i.box(.22,.2,.22,0,0,0,"#5a6474"),i.sphere(.32,0,.5,0,"#c9d1db",{sy:.35,seg:14,rx:.8,metalness:.4}),i.cyl(.015,.015,.3,0,.45,.1,"#9aa6b4",{rx:.8,seg:6})},snowman(i){i.sphere(.2,0,.18,0,"#f6f9fc",{seg:12}),i.sphere(.15,0,.47,0,"#f6f9fc",{seg:12}),i.sphere(.11,0,.7,0,"#f6f9fc",{seg:12}),i.cbox(.03,.03,.12,0,.7,.14,"#e8743a",{round:.01}),i.cyl(.13,.13,.02,0,.78,0,"#2a2523",{seg:12}),i.cyl(.08,.08,.14,0,.79,0,"#2a2523",{seg:12}),i.box(.32,.05,.08,0,.58,0,"#c0283a")},toadstool(i,e){let t=.45+e()*.2,n=.28+e()*.08;i.cyl(.07,.09,t,0,0,0,"#f2ead8",{seg:10}),i.sphere(n,0,t,0,Nn(e,["#c0392b","#d9601a","#b3202c"]),{sy:.55,seg:16});for(let s=0;s<6;s++){let r=s*1.05+e()*.3,a=n*(s%2?.45:.75);i.sphere(.035,Math.cos(r)*a,t+n*.55*Math.sqrt(1-(a/n)**2)-.005,Math.sin(r)*a,"#fbf6ea",{sy:.45,seg:8})}},heart(i,e){let t=Nn(e,["#e5384f","#ff7f99","#c0283a"]);i.cyl(.025,.03,.75,0,0,0,"#f6f2ea",{seg:6});for(let n of[-1,1])i.sphere(.1,n*.071,.891,0,t,{seg:14});i.cbox(.2,.2,.1,0,.82,0,t,{rz:Math.PI/4})},fountainSmall(i){i.cyl(.38,.4,.18,0,0,0,"#d8ccb2",{seg:18}),i.cyl(.32,.32,.01,0,.15,0,"#5fa5b5",{seg:18,roughness:.1}),i.cyl(.05,.07,.4,0,.15,0,"#d8ccb2",{seg:10}),i.sphere(.08,0,.58,0,"#d8ccb2",{seg:10})},balloons(i,e){for(let t=0;t<4;t++){let n=(e()-.5)*.3,s=(e()-.5)*.3,r=.8+e()*.4;i.cyl(.004,.004,r,n*.3,0,s*.3,"#f6f2ea",{seg:3}),i.sphere(.12,n,r+.1,s,Nn(e,["#e8492c","#2f6f7e","#f2c94c","#c46aa8","#3f7a4a"]),{sy:1.2,seg:12,roughness:.3})}},bench(i){for(let e of[-1,1])i.box(.05,.3,.3,e*.4,0,0,"#2a2523");for(let e=0;e<3;e++)i.box(.95,.03,.08,0,.3,-.1+e*.1,"#5a8a5a");i.cbox(.95,.12,.03,0,.45,-.17,"#5a8a5a",{rx:-.2})}};var Ge=(i,e)=>e[Math.floor(i()*e.length)],ld=["#e8492c","#e0a94a","#7cae4f","#f2c94c","#8e3b7a","#f08a3c"],Mn=["#c0392b","#2f6f7e","#7a3fa0","#d9a441","#3f7a4a","#c46aa8","#33405a","#e07a5f"],Pv=["#3f7a4a","#7a2a2a","#2f5d8a","#c9a24a","#5a3b26"],ba=["#8a5a36","#a8703f","#6b4a34","#b98552"],Zs={plate(i,e){i.cyl(.17,.13,.025,0,0,0,"#f6f2ea",{seg:18,roughness:.3});let t=Ge(e,["#c0602a","#e0a94a","#7cae4f","#a33b2b"]);i.sphere(.08,0,.04,0,t,{sy:.5,seg:10}),i.sphere(.04,.07,.04,.03,Ge(e,ld),{seg:8})},fruitBowl(i,e){i.sphere(.16,0,.05,0,Ge(e,["#efe6c8","#2f6f7e","#c9a24a"]),{sy:.45,seg:16});for(let t=0;t<5;t++)i.sphere(.055,Math.cos(t*1.3)*.07,.1+t%2*.03,Math.sin(t*1.3)*.07,Ge(e,ld),{seg:8})},cake(i,e){let t=Ge(e,["#f6d3e0","#f6f2ea","#c97a4a","#f2e2a0"]);i.cyl(.18,.18,.015,0,0,0,"#f6f2ea",{seg:20}),i.cyl(.13,.13,.1,0,.015,0,"#e0b47e",{seg:20}),i.cyl(.135,.135,.03,0,.1,0,t,{seg:20});for(let n=0;n<5;n++)i.sphere(.02,Math.cos(n*1.256)*.09,.14,Math.sin(n*1.256)*.09,"#c0283a",{seg:6})},teaset(i,e){let t=Ge(e,["#f6f2ea","#2f6f7e","#c46aa8","#d9a441"]);i.sphere(.08,0,.08,0,t,{sy:.9,seg:14}),i.cyl(.02,.02,.03,0,.15,0,t),i.cbox(.1,.025,.025,.1,.1,0,t,{rz:.6});for(let[n,s]of[[-.16,.08],[.14,.12]])i.cyl(.06,.06,.012,n,0,s,"#f6f2ea",{seg:12}),i.cyl(.04,.032,.05,n,.012,s,t,{seg:12})},bottles(i,e){let t=2+Math.floor(e()*2);for(let n=0;n<t;n++){let s=(n-(t-1)/2)*.09,r=(e()-.5)*.08,a=.18+e()*.08,o=Ge(e,Pv);i.cyl(.035,.038,a,s,0,r,o,{seg:10,roughness:.2}),i.cyl(.014,.022,.07,s,a,r,o,{seg:8,roughness:.2}),i.cyl(.016,.016,.02,s,a+.07,r,"#8a5a36",{seg:6})}},candles(i,e){i.cyl(.11,.12,.02,0,0,0,"#c9a24a",{seg:14,metalness:.7,roughness:.3});for(let t=0;t<3;t++){let n=Math.cos(t*2.1)*.05,s=Math.sin(t*2.1)*.05,r=.1+e()*.12;i.cyl(.022,.022,r,n,.02,s,"#f6f2ea",{seg:8}),i.sphere(.014,n,.04+r,s,"#ffcf7a",{emissive:"#ffb340",ei:1.5,shadow:!1,seg:6})}},books(i,e){let t=2+Math.floor(e()*3);for(let n=0;n<t;n++)i.cbox(.26-e()*.05,.045,.19,(e()-.5)*.03,.022+n*.045,0,Ge(e,Mn),{ry:(e()-.5)*.7})},papers(i,e){for(let t=0;t<4;t++)i.cbox(.18,.004,.24,(e()-.5)*.18,.003+t*.003,(e()-.5)*.16,t===3?"#efe2b8":"#f6f2ea",{ry:e()*3,shadow:!1})},scroll(i,e){i.cbox(.06,.06,.3,0,.03,0,"#efe2b8",{round:.028,ry:e()*3}),i.cbox(.02,.065,.02,0,.03,0,"#a33b2b",{ry:e()*3})},crate(i,e){let t=.34+e()*.08,n=Ge(e,ba);i.box(t,t,t,0,0,0,n);for(let s of[.04,t-.04])i.box(t+.01,.04,t+.01,0,s-.02,0,"#5a3b26");e()<.5&&i.box(t*.6,t*.5,t*.6,.02,t,.01,Ge(e,ba))},barrel(i,e){i.cyl(.15,.15,.42,0,0,0,Ge(e,ba),{seg:14}),i.cyl(.18,.18,.42*.5,0,.42*.25,0,Ge(e,ba),{seg:14});for(let n of[.06,.42/2-.02,.42-.08])i.cyl(.182,.182,.03,0,n,0,"#3a3433",{seg:14,metalness:.5})},sack(i,e){let t=Ge(e,["#c9b27a","#b89a6a","#d8c79a"]);i.sphere(.17,0,.14,0,t,{sy:.85,seg:12}),i.cyl(.05,.08,.1,0,.26,0,t,{seg:10}),i.cyl(.055,.055,.02,0,.3,0,"#7a5a3a",{seg:10})},bread(i,e){i.cyl(.16,.13,.08,0,0,0,"#a8703f",{seg:14}),i.cbox(.3,.07,.08,0,.1,0,"#d9a066",{round:.035,ry:.4}),i.sphere(.06,-.06,.12,.05,"#c98a4a",{seg:10}),e()<.5&&i.cbox(.26,.06,.06,.02,.15,-.04,"#e0b47e",{round:.03,ry:-.5})},cheese(i,e){i.cyl(.14,.14,.09,0,0,0,"#f2d46a",{seg:16,t0:0,tl:Math.PI*1.6}),i.cbox(.08,.06,.06,.16,.03,.08,"#f5dd84",{ry:e()*3})},pumpkin(i,e){let t=.14+e()*.05;for(let n=0;n<6;n++)i.sphere(t*.6,Math.cos(n*1.05)*t*.45,t*.75,Math.sin(n*1.05)*t*.45,"#e07a2a",{sy:1.2,seg:10});i.cyl(.02,.03,.08,0,t*1.4,0,"#4a6a2a",{seg:6})},mushrooms(i,e){for(let t=0;t<3;t++){let n=(e()-.5)*.25,s=(e()-.5)*.25,r=.06+e()*.08;i.cyl(.02,.025,r,n,0,s,"#f6f2ea",{seg:8}),i.sphere(.05+e()*.03,n,r,s,Ge(e,["#c0283a","#a8703f","#e0b47e"]),{sy:.55,seg:10})}},rocks(i,e){for(let t=0;t<3;t++)i.sphere(.06+e()*.08,(e()-.5)*.3,.03,(e()-.5)*.3,Ge(e,["#8e8a82","#a9a296","#6e6a62"]),{sy:.6,seg:7})},shells(i,e){for(let s=0;s<3;s++)i.sphere(.05+e()*.03,(e()-.5)*.3,.015,(e()-.5)*.3,Ge(e,["#f6d3c9","#f2e6d8","#e9b8a8"]),{sy:.4,seg:8,t0:0});let t=(e()-.5)*.2,n=(e()-.5)*.2;for(let s=0;s<5;s++)i.cbox(.16,.025,.045,t+Math.cos(s*1.256)*.07,.013,n+Math.sin(s*1.256)*.07,"#e8743a",{ry:-s*1.256})},pearls(i,e){i.sphere(.13,0,.03,0,"#e9b8a8",{sy:.35,seg:12});for(let t=0;t<5;t++)i.sphere(.03,Math.cos(t*1.3)*.06,.06,Math.sin(t*1.3)*.06,"#f8f4ff",{seg:8,roughness:.15})},coral(i,e){let t=Ge(e,["#f08a7e","#f0a8c4","#e8743a","#b56ad8"]);for(let n=0;n<5;n++)i.cbox(.035,.2+e()*.15,.035,(e()-.5)*.12,.12,(e()-.5)*.12,t,{rz:(e()-.5)*.9,rx:(e()-.5)*.9,round:.015})},coins(i,e){for(let t=0;t<9;t++)i.cyl(.04,.04,.012,(e()-.5)*.18,t<5?0:.012*(t-4),(e()-.5)*.18,"#e0b23a",{seg:10,metalness:.8,roughness:.3})},bones(i,e){for(let t=0;t<2;t++){let n=e()*3,s=(e()-.5)*.15,r=(e()-.5)*.15;i.cbox(.26,.03,.03,s,.02,r,"#efe6d0",{ry:n});for(let a of[-1,1])i.sphere(.03,s+Math.cos(n)*.13*a,.025,r-Math.sin(n)*.13*a,"#efe6d0",{seg:6})}e()<.5&&(i.sphere(.08,.1,.07,.08,"#efe6d0",{seg:10}),i.box(.06,.05,.06,.1,0,.13,"#efe6d0"))},hay(i,e){i.cbox(.4,.22,.26,0,.11,0,"#e0c46a",{round:.04,ry:e()*3});for(let t=0;t<6;t++)i.cbox(.012,.012,.18,(e()-.5)*.4,.005,(e()-.5)*.4,"#e9d48a",{ry:e()*3,shadow:!1})},logs(i,e){for(let t=0;t<3;t++)i.cbox(.09,.09,.36,(t-1)*.1,.045+(t===1?.08:0),0,"#7a5a3a",{round:.04,ry:1.57+(e()-.5)*.2})},vase(i,e){let t=Ge(e,["#2f6f7e","#efe6c8","#c46aa8","#d9a441"]);i.cyl(.05,.07,.18,0,0,0,t,{seg:12});for(let n=0;n<5;n++)i.sphere(.04,Math.cos(n*1.3)*.05,.24+n%2*.04,Math.sin(n*1.3)*.05,Ge(e,["#f2c94c","#e8492c","#f4f1ff","#c46aa8"]),{seg:6})},lantern(i,e){i.box(.12,.02,.12,0,0,0,"#2a2523"),i.box(.09,.14,.09,0,.02,0,"#ffd27a",{emissive:"#ffb340",ei:.9}),i.cyl(0,.08,.06,0,.16,0,"#2a2523",{seg:4})},cushion(i,e){i.cbox(.32,.08,.32,0,.04,0,Ge(e,Mn),{round:.035,ry:e()*3})},mat(i,e){let[t,n]=[Ge(e,Mn),Ge(e,["#efe6c8","#f4efe4","#e9d9b8"])],s=.55+e()*.15,r=.36;i.box(s,.008,r,0,0,0,n,{jitter:0,shadow:!1}),i.box(s-.08,.012,r-.08,0,0,0,t,{jitter:0,shadow:!1}),i.box(s-.22,.016,.06,0,0,0,n,{jitter:0,shadow:!1})},hat(i,e){let t=Ge(e,["#2a2523","#7a3f2a","#33405a","#c9a24a"]);i.cyl(.15,.15,.015,0,0,0,t,{seg:16}),i.cyl(.08,.09,.12,0,.015,0,t,{seg:14}),i.cyl(.092,.092,.025,0,.03,0,Ge(e,Mn),{seg:14})},suitcase(i,e){let t=Ge(e,["#7a3f2a","#33405a","#a8703f","#3f6a4a"]);i.box(.4,.12,.28,0,0,0,t,{round:.02}),i.box(.41,.02,.29,0,.06,0,"#c9a24a",{metalness:.6}),i.box(.1,.03,.02,0,.12,.08,"#2a2523")},bucket(i,e){i.cyl(.12,.09,.18,0,0,0,Ge(e,["#8e9aa6","#a8703f"]),{seg:14,metalness:.4}),i.cyl(.105,.105,.01,0,.15,0,"#5fa5b5",{seg:14,roughness:.1})},ball(i,e){i.sphere(.11,0,.11,0,Ge(e,Mn),{seg:14}),i.cbox(.225,.03,.03,0,.11,0,"#f6f2ea",{ry:e()*3,round:.012})},jar(i,e){let t=Ge(e,["#c9763a","#b5523b","#d9b47a"]);i.sphere(.12,0,.13,0,t,{sy:1.15,seg:12}),i.cyl(.05,.07,.08,0,.24,0,t,{seg:10}),e()<.6&&i.cbox(.1,.03,.04,.1,.22,0,t,{rz:.8})},rope(i){for(let e=0;e<3;e++)i.cyl(.16-e*.04,.16-e*.04,.04,0,e*.04,0,"#c9a46a",{seg:16,roughness:1})},cannonballs(i){let e=[[-.07,0,-.04],[.07,0,-.04],[0,0,.08],[0,.11,0]];for(let[t,n,s]of e)i.sphere(.07,t,n+.07,s,"#2a2523",{seg:10,metalness:.5})},mugs(i,e){for(let[t,n]of[[-.07,0],[.08,.05]]){let s=Ge(e,Mn);i.cyl(.045,.045,.1,t,0,n,s,{seg:12}),i.cbox(.03,.06,.012,t+.055,.05,n,s),i.cyl(.04,.04,.01,t,.09,n,"#6b3a1a",{seg:12})}},popcorn(i,e){i.cyl(.08,.06,.18,0,0,0,"#d8263f",{seg:12});for(let t=0;t<7;t++)i.sphere(.03,(e()-.5)*.1,.2+e()*.04,(e()-.5)*.1,"#f8efc8",{seg:6})},canisters(i,e){for(let t=0;t<2;t++){let n=(t-.5)*.14;i.cyl(.06,.06,.26,n,0,0,Ge(e,["#c9d1db","#e0a040","#5fb3a8"]),{seg:12,metalness:.6,roughness:.35}),i.cyl(.035,.035,.03,n,.26,0,"#2a2523",{seg:8})}},footprints(i,e){let t=e()*6.28;for(let n=0;n<3;n++)i.cbox(.06,.004,.11,Math.cos(t)*n*.11+n%2*.05,.002,Math.sin(t)*n*.11,"#4a3628",{ry:-t+Math.PI/2,shadow:!1,jitter:0})},puddle(i,e){i.cyl(.14,.14,.004,0,0,0,Ge(e,["#7a2a2a","#5fa5b5","#c9a24a"]),{seg:14,roughness:.05,shadow:!1}),i.cbox(.05,.12,.05,.06,.03,.02,"#e8f0f2",{rz:1.57,roughness:.1})},roundMat(i,e){let t=[Ge(e,Mn),Ge(e,["#efe6c8","#f4efe4"]),Ge(e,Mn)];for(let n=0;n<3;n++)i.cyl(.32-n*.09,.32-n*.09,.008+n*.004,0,0,0,t[n],{seg:22,jitter:0,shadow:!1})},runner(i,e){let t=Ge(e,Mn);i.box(.3,.008,.85,0,0,0,"#efe6c8",{jitter:0,shadow:!1}),i.box(.22,.012,.77,0,0,0,t,{jitter:0,shadow:!1});for(let n=0;n<3;n++)i.cbox(.08,.016,.08,0,.006,-.25+n*.25,"#efe6c8",{ry:.785,jitter:0,shadow:!1})},stool(i,e){let t=Ge(e,ba);for(let[n,s]of[[-.09,-.09],[.09,-.09],[0,.11]])i.cyl(.018,.022,.26,n,0,s,t,{seg:6});i.cyl(.15,.15,.04,0,.26,0,t,{seg:14})},skis(i,e){let t=Ge(e,["#c0283a","#2f5d8a","#f2c94c"]);for(let n of[-.05,.05])i.box(.07,.015,.75,n,0,0,t),i.cbox(.07,.015,.1,n,.03,.4,t,{rx:-.5});i.cyl(.012,.012,.6,.15,.01,0,"#2a2523",{rx:1.57,seg:5})},horseshoe(i){for(let e=0;e<7;e++){let t=Math.PI*(e/6);i.cbox(.05,.02,.035,Math.cos(t)*.08,.01,Math.sin(t)*.08,"#8e8a82",{ry:-t,metalness:.6})}},pins(i,e){for(let t=0;t<3;t++){let n=(t-1)*.08,s=Ge(e,Mn);i.cyl(.03,.02,.18,n,0,0,"#f6f2ea",{seg:8}),i.sphere(.035,n,.2,0,s,{seg:8}),i.cyl(.032,.032,.02,n,.1,0,s,{seg:8})}},robot(i,e){let t=Ge(e,["#c9d1db","#e0a040","#5fb3a8"]);i.box(.2,.18,.16,0,.06,0,t,{round:.03,metalness:.5}),i.box(.14,.1,.12,0,.25,0,t,{round:.03,metalness:.5});for(let n of[-.035,.035])i.sphere(.018,n,.3,.062,"#5ad8ff",{emissive:"#2ab8ff",ei:1.4,seg:6});for(let n of[-.07,.07])i.cyl(.035,.035,.04,n,0,0,"#2a2f38",{rz:1.57,seg:10});i.cyl(.006,.006,.08,0,.35,0,"#2a2f38",{seg:4}),i.sphere(.018,0,.44,0,"#ff4a4a",{emissive:"#ff2020",ei:1.4,seg:6})},cables(i,e){for(let t=0;t<2;t++){let n=Ge(e,["#c0283a","#2f5d8a","#2a2523","#f2c94c"]);for(let s=0;s<9;s++)i.cbox(.06,.02,.02,Math.cos(s*.7+t)*.12,.01,Math.sin(s*.9+t)*.12,n,{ry:s*.7+t,jitter:0})}},sandals(i,e){let t=Ge(e,["#c9a46a","#7a5a3a","#c0283a"]);for(let n of[-.06,.06])i.box(.08,.025,.2,n,0,0,t,{round:.01}),i.box(.06,.012,.012,n,.025,.05,"#2a2523")},grapes(i,e){let t=Ge(e,["#6a2a6a","#8ab04a"]);i.cyl(.13,.11,.02,0,0,0,"#c9a24a",{seg:14,metalness:.6});for(let n=0;n<12;n++)i.sphere(.025,(e()-.5)*.12,.04+n%3*.025,(e()-.5)*.1,t,{seg:6})},letters(i,e){for(let t=0;t<3;t++)i.cbox(.16,.006,.11,(e()-.5)*.12,.004+t*.006,(e()-.5)*.12,"#f6efdc",{ry:e()*3,shadow:!1});i.cyl(.018,.018,.008,.02,.022,.01,"#a33b2b",{seg:8})},paperLantern(i,e){let t=Ge(e,["#e8492c","#f2c94c","#f6efdc"]);i.sphere(.11,0,.13,0,t,{sy:1.25,seg:12,emissive:t,ei:.35}),i.cyl(.05,.05,.02,0,0,0,"#2a2523",{seg:8}),i.cyl(.05,.05,.02,0,.26,0,"#2a2523",{seg:8})},eggs(i,e){i.cyl(.13,.1,.05,0,0,0,"#c9a46a",{seg:12});for(let t=0;t<4;t++)i.sphere(.045,Math.cos(t*1.6+e())*.06,.08,Math.sin(t*1.6+e())*.06,Ge(e,["#f2a6c0","#9ad0e0","#f6e08a","#b7d98a","#c8a0e0"]),{sy:1.3,seg:10,roughness:.4})},confetti(i,e){for(let t=0;t<14;t++)i.cbox(.035,.006,.022,(e()-.5)*.36,.003,(e()-.5)*.36,Ge(e,Mn),{ry:e()*3.14,jitter:0,shadow:!1})},firecrackers(i,e){for(let t=0;t<5;t++){let n=(t-2)*.042,s=.14+e()*.04;i.cyl(.02,.02,s,n,0,0,"#c0283a",{seg:8}),i.cyl(.021,.021,.02,n,s-.02,0,"#e0b23a",{seg:8,metalness:.6})}},presents(i,e){for(let[t,n,s,r,a]of[[.2,.14,0,0,0],[.13,.1,.02,.14,.01],[.12,.09,-.17,0,.09]]){let o=Ge(e,["#c0283a","#2f6f7e","#f2c94c","#3f7a4a","#c46aa8","#f6f2ea"]),l=o==="#f2c94c"?"#c0283a":"#f2c94c",c=e()*.8;i.box(t,n,t,s,r,a,o,{ry:c}),i.box(t+.006,n+.006,.025,s,r,a,l,{ry:c}),i.box(.025,n+.006,t+.006,s,r,a,l,{ry:c})}},hearts(i,e){for(let t=0;t<4;t++){let n=(e()-.5)*.3,s=(e()-.5)*.3,r=e()*6.28,a=.03+e()*.015,o=Ge(e,["#e5384f","#ff7f99","#f2a6c0","#c0283a"]),l=Math.cos(r)*a*.7,c=-Math.sin(r)*a*.7;i.sphere(a,n+l,.006,s+c,o,{sy:.2,seg:8}),i.sphere(a,n-l,.006,s-c,o,{sy:.2,seg:8}),i.cbox(a*1.45,.012,a*1.45,n-Math.sin(r)*a*.75,.006,s-Math.cos(r)*a*.75,o,{ry:r+Math.PI/4,jitter:0})}},scarab(i){i.sphere(.07,0,.03,0,"#2f8a6a",{sy:.5,seg:10,metalness:.6,roughness:.3}),i.sphere(.035,0,.025,.08,"#1f5a4a",{seg:8,metalness:.6})},fishbones(i){i.box(.26,.012,.015,0,.005,0,"#efe6d0");for(let e=0;e<6;e++)i.cbox(.012,.012,.09,-.08+e*.03,.005,0,"#efe6d0");i.cbox(.06,.015,.06,.15,.008,0,"#efe6d0",{ry:.785})},birdcage(i){i.cyl(.1,.1,.02,0,0,0,"#c9a24a",{seg:12,metalness:.7});for(let e=0;e<10;e++)i.cyl(.005,.005,.26,Math.cos(e*.628)*.09,.02,Math.sin(e*.628)*.09,"#c9a24a",{seg:4,metalness:.7});i.sphere(.1,0,.27,0,"#c9a24a",{sy:.5,seg:10,metalness:.7}),i.sphere(.035,0,.1,0,"#f2c94c",{seg:8})},umbrella(i,e){let t=Ge(e,Mn);i.cyl(.008,.008,.6,0,.02,0,"#2a2523",{rz:1.3,seg:4}),i.cyl(0,.08,.36,-.12,.08,0,t,{rz:1.3,seg:8})}};for(let[i,e]of Object.entries(Sa))["fern","flowers","tuft","bush","bonsai","kelp","cactus","dryBush"].includes(i)&&(Zs[`plant_${i}`]=e);var cd={living:["books","cushion","mat","roundMat","vase","ball","papers","mugs","stool","birdcage"],kitchen:["sack","bread","crate","bucket","jar","fruitBowl","cheese","stool","runner"],bedroom:["cushion","books","hat","suitcase","mat","roundMat","papers","letters"],bathroom:["bucket","mat","bottles","cushion","roundMat"],office:["papers","books","scroll","crate","mugs","letters","stool"],library:["books","books","scroll","papers","candles","cushion","runner","letters"],dining:["bottles","crate","jar","mat","fruitBowl","runner","stool"],garden:["rocks","mushrooms","ball","hay","logs","plant_flowers","plant_tuft","plant_fern","plant_bush"],hall:["suitcase","hat","mat","footprints","crate","runner","umbrella"],music:["papers","candles","cushion","mat","roundMat","vase"],guest:["suitcase","cushion","books","hat","roundMat"],game:["ball","bottles","cushion","papers","mugs","pins","stool"],veranda:["vase","cushion","rocks","hat","mugs","plant_flowers","birdcage"],laundry:["bucket","sack","crate","mat","runner"]},hd=["rocks","plant_tuft","plant_flowers","plant_fern","mushrooms","plant_tuft","footprints","plant_bush"],Nh=["plate","plate","fruitBowl","cake","teaset","bottles","candles","books","cheese","bread","vase","mugs","papers","grapes","letters"],ud={mermaids:["shells","pearls","coral","shells","coral","plant_kelp","fishbones","coins"],japan:["teaset","lantern","paperLantern","cushion","scroll","sandals","plant_bonsai","roundMat"],paris:["bread","cheese","bottles","papers","books","umbrella","letters","plant_flowers"],regency:["teaset","cake","vase","hat","letters","birdcage","plant_flowers","runner"],egypt:["jar","scroll","coins","jar","scarab","sandals","plant_dryBush","grapes"],pirates:["barrel","crate","coins","rope","cannonballs","bottles","fishbones","birdcage"],western:["hay","barrel","bottles","hat","sack","horseshoe","plant_cactus","stool"],space:["canisters","crate","papers","canisters","robot","cables","robot"],haunted:["pumpkin","candles","bones","books","footprints","birdcage","mushrooms","puddle"],medieval:["barrel","sack","bread","candles","hay","stool","logs"],prehistory:["bones","rocks","mushrooms","logs","hay","plant_fern","fishbones"],circus:["ball","popcorn","hat","cushion","ball","pins","roundMat"],train:["suitcase","papers","bottles","hat","suitcase","letters","umbrella"],chalet:["logs","mugs","books","cushion","skis","roundMat"],world:["suitcase","hat","fruitBowl","coins","letters","umbrella","paperLantern"],rome:["jar","fruitBowl","scroll","coins","grapes","sandals","roundMat"],halloween:["pumpkin","pumpkin","candles","mushrooms","cake","footprints","hay"],easter:["eggs","eggs","cake","plant_flowers","teaset","hay","roundMat"],carnival:["confetti","confetti","hat","cake","bottles","cushion","runner"],lunar:["paperLantern","lantern","teaset","firecrackers","coins","scroll","plant_bonsai"],manor:["books","teaset","candles","vase","puddle","letters","birdcage"],xmas:["presents","presents","cake","candles","mugs","logs","skis","roundMat"],birthday:["presents","confetti","cake","presents","ball","popcorn","hat","confetti"],love:["hearts","letters","vase","plant_flowers","candles","teaset","hearts","runner"],forest:["mushrooms","mushrooms","logs","plant_fern","rocks","footprints","jar","hay"]},Iv=new Set([...Nh,"coins","pearls","shells","scroll","jar","lantern","popcorn","canisters","pumpkin","hat","grapes","letters","scarab","paperLantern","birdcage","eggs","firecrackers","presents"]),fd={none:0,some:.4,lots:.85},Lv=1.35;function dd(i,e){var c,h;let t=fd[e.clutter]??fd.some;if(!t)return null;let n=Kt(((i.seed??1)>>>0)*977+13);Dn(((i.seed??1)>>>0)+4242);let s=new Wt,r=ud[i.theme]??ud.manor,a=(f,u,d,p,y,g=1)=>{Dn(Math.floor(n()*1e9));let m=new Wt;if(Zs[f](m,n),f.startsWith("plant_")&&(g*=.55),g!==1)for(let M of m.buckets.values())for(let w of M.gs)w.scale(g,g,g);s.merge(m,y,u,d,p)},o=[[-1,-1],[1,-1],[-1,1],[1,1]];for(let f=0;f<e.n;f++)for(let u=0;u<e.n;u++){let d=e.cells[f][u],p=e.cellCenter(e.n,f,u),y=e.roomType(f,u),g=e.spots.get(`${f},${u}`);if(g){for(let[S,P,x]of g)n()<Math.min(.95,t*1.7)&&a(Ge(n,n()<.3?r.filter(T=>Iv.has(T)).concat(Nh):Nh),S,P,x,n()*6.28,.75);continue}if(d.object)continue;let m=n()<t?n()<t*.55?n()<t*.3?3:2:1:0,M=(c=e.plates)==null?void 0:c.has(`${f},${u}`),w=o.filter(([,S])=>!M||S>0).sort(()=>n()-.5),E=((h=e.isOpen)==null?void 0:h.call(e,f,u))?[...hd,...hd,...r]:[...cd[y]??cd.living,...r,...r];for(let S=0;S<Math.min(m,w.length);S++){let[P,x]=w[S],T=.56+n()*.06;a(Ge(n,E),p.x+P*T,.005,p.z+x*T,n()*6.28,Lv)}}let l=s.build();return l.name="clutter",l}var pd={manor:{border:["parquet","#d9b88a","#a8845a"],side:"#8a6446",rim:"#4a3426",ink:"#3a2c26",wall:"plaster",fence:"picket",open:"hedge",deco:["bush","flowers","lamp","bush","rock"]},mermaids:{border:["water","#4fb3c6","#e6fbff"],side:"#2f6f8a",rim:"#1d4a5e",ink:"#ffffff",wall:"coral",fence:"coral",open:"shells",deco:["coralTree","kelp","shells","pearls","kelp","rock"]},japan:{border:["sand","#ece6d6","#cfc6b0"],side:"#5a3b26",rim:"#2a2523",ink:"#3a2c26",wall:"shoji",fence:"bamboo",open:"pebbles",deco:["sakura","lanternStone","bamboo","rock","bonsai"]},paris:{border:["cobble","#b8b0a2","#7e7668"],side:"#5a5048",rim:"#2e2a26",ink:"#ffffff",wall:"plaster",fence:"iron",open:"pebbles",deco:["lamp","flowers","bush","bench","lamp"]},regency:{border:["grass","#9ccc7a","#6fa456"],side:"#7a8a5a",rim:"#3e4a2e",ink:"#ffffff",wall:"plaster",fence:"hedge",open:"hedge",deco:["topiary","rosebush","topiary","fountainSmall","rosebush"]},egypt:{border:["sand","#ecd08a","#c9a456"],side:"#c4a060",rim:"#7a5a2a",ink:"#5a3a1a",wall:"sandstone",fence:"rocks",open:"rocks",deco:["palm","jar","rock","palm","dryBush","obelisk"]},pirates:{border:["water","#3f9fb8","#dff6fb"],side:"#6b4a2b",rim:"#3a2618",ink:"#ffffff",wall:"planks",fence:"rope",open:"rope",deco:["palm","barrel","crate","rock","palm","cannonballs"]},western:{border:["sand","#d9b27a","#a8804c"],side:"#8a5a32",rim:"#4a2e18",ink:"#4a2e18",wall:"planks",fence:"rail",open:"rail",deco:["cactus","barrel","hay","cactus","rock","dryBush"]},space:{border:["metal","#4a5466","#232833"],side:"#2e343e",rim:"#15181e",ink:"#bfe9ff",wall:"metal",fence:"rail",open:"line",deco:["antenna","canisters","crate","canisters","dish"]},haunted:{border:["cobble","#5a5660","#34303a"],side:"#3a3440",rim:"#1a171e",ink:"#e8dcff",wall:"stone",fence:"iron",open:"pebbles",deco:["deadTree","pumpkin","tomb","candles","deadTree","bones"]},medieval:{border:["grass","#9ac06a","#6f9a48"],side:"#6e6258",rim:"#3a332c",ink:"#ffffff",wall:"stone",fence:"palisade",open:"hedge",deco:["bush","hay","barrel","banner","tree","rock"]},prehistory:{border:["grass","#a8c070","#7f9a50"],side:"#7a6248",rim:"#3e3022",ink:"#3a2a1a",wall:"rock",fence:"rocks",open:"rocks",deco:["fern","rock","bones","fern","logs","tree"]},circus:{border:["straw","#e6cc80","#c09a4a"],side:"#c0283a",rim:"#6e1420",ink:"#6e1420",wall:"canvas",fence:"rail",open:"line",deco:["balloons","popcorn","barrel","ball","balloons"]},train:{border:["cobble","#8a8478","#5e5a52"],side:"#4a3a2e",rim:"#221a14",ink:"#ffffff",wall:"planks",fence:"rail",open:"line",deco:["lamp","suitcase","crate","bush","lamp"]},chalet:{border:["snow","#f4f8fc","#cfdbe8"],side:"#7a5a3a",rim:"#3e2c1c",ink:"#3a2c26",wall:"logs",fence:"snow",open:"snow",deco:["pine","snowman","pine","logs","rock","pine"]},world:{border:["water","#4fb0d8","#e8fbff"],side:"#2f7aa0",rim:"#1a4a66",ink:"#ffffff",wall:"plaster",fence:"rail",open:"line",deco:["palm","suitcase","rock","flowers","palm"]},halloween:{border:["grass","#5f7a52","#3f5a38"],side:"#4a2e5a",rim:"#1b0f26",ink:"#ffd9a8",wall:"planks",fence:"picket",open:"pebbles",deco:["pumpkin","deadTree","candles","pumpkin","tomb","bush"]},easter:{border:["grass","#a8d888","#7ab860"],side:"#c8a0c0",rim:"#7a5a78",ink:"#ffffff",wall:"plaster",fence:"picket",open:"hedge",deco:["flowers","eggs","bush","sakura","flowers","eggs"]},carnival:{border:["marble","#efe4d0","#c9b490"],side:"#6a1f6e",rim:"#3a0f3e",ink:"#ffffff",wall:"plaster",fence:"iron",open:"line",deco:["balloons","lamp","confetti","balloons","column","confetti"]},lunar:{border:["cobble","#c9b8a0","#9a8a72"],side:"#b3202c",rim:"#5a1018",ink:"#f2c14e",wall:"plaster",fence:"bamboo",open:"pebbles",deco:["sakura","lanternStone","paperLantern","bamboo","firecrackers","bonsai"]},xmas:{border:["snow","#f4f8fc","#cfdbe8"],side:"#b3202c",rim:"#5a1018",ink:"#1f4a2e",wall:"logs",fence:"snow",open:"snow",deco:["pine","snowman","pine","presents","lamp","pine"]},birthday:{border:["grass","#a8d888","#7ab860"],side:"#ff7a00",rim:"#a84a00",ink:"#ffffff",wall:"plaster",fence:"picket",open:"line",deco:["balloons","presents","bush","balloons","flowers","presents"]},love:{border:["cobble","#e8d0d6","#c8a8b2"],side:"#e5384f",rim:"#7a1f3a",ink:"#ffffff",wall:"plaster",fence:"iron",open:"hedge",deco:["rosebush","heart","topiary","rosebush","lamp","heart"]},forest:{border:["grass","#7fae5a","#5a8a3a"],side:"#6b4a34",rim:"#3a2a1c",ink:"#ffffff",wall:"logs",fence:"hedge",open:"rocks",deco:["tree","toadstool","fern","tree","bush","toadstool","rock"]},rome:{border:["marble","#efe9dc","#bdb39c"],side:"#c8bea8",rim:"#6e6450",ink:"#5a3a2a",wall:"marble",fence:"rocks",open:"pebbles",deco:["cypress","jar","column","cypress","bush"]}},md=i=>pd[i]??pd.manor,gd={stone:["#8e8a82","#a9a296","#76726a"],sandstone:["#d4ac6a","#c49a58","#b8884a"],marble:["#f2ede2","#e6dfd0","#d8d0bc"],rock:["#8a8070","#a09682","#6e665a"],planks:["#a8703f","#8a5a36","#b98552"],logs:["#9a6a3e","#7a5232","#b07a48"],metal:["#9aa6b4","#7a8696","#b8c2ce"],coral:["#f08a7e","#f0a8c4","#b56ad8","#e8743a"],canvas:["#c0283a","#f6f2ea"]};var xd=1;function Dv(i){if(i.userData.silhouette)return i.userData.silhouette;let e=i.image,t=document.createElement("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0),n.globalCompositeOperation="source-in",n.fillStyle="#ffffff",n.fillRect(0,0,t.width,t.height);let s=new Vt(t);return s.anisotropy=i.anisotropy,i.userData.silhouette=s,s}function wa(i){var n;let e=(n=i.material)==null?void 0:n.map;if(!(e!=null&&e.image))return i;let t=Dv(e);return i.userData.textMask=i.isSprite?new yi({map:t,depthTest:!1,depthWrite:!1,transparent:!0}):new Zt({map:t,transparent:!0,depthWrite:!1,toneMapped:!1,alphaTest:.02,side:i.material.side}),i.layers.enable(xd),i}function _d(i){let e=i.userData.textMask;e&&(e.map.dispose(),e.dispose(),i.userData.textMask=null)}var Zl=class{constructor(){this.target=new bt(1,1,{depthBuffer:!0}),this.depthOnly=new Zt({colorWrite:!1}),this._clear=new Te}setSize(e,t){this.target.setSize(Math.max(1,Math.round(e)),Math.max(1,Math.round(t)))}render(e,t,n,s){let r=[],a=l=>l.traverse(c=>{!c.userData.textMask||!c.visible||(r.push([c,c.material]),c.material=c.userData.textMask)}),o={target:e.getRenderTarget(),alpha:e.getClearAlpha(),bg:n.background,mask:t.layers.mask,autoClear:e.autoClear};e.getClearColor(this._clear),e.setRenderTarget(this.target),e.setClearColor(0,0),e.clear(),e.autoClear=!1,n.background=null,n.overrideMaterial=this.depthOnly,e.render(n,t),n.overrideMaterial=null,a(n),a(s),t.layers.set(xd),e.render(n,t),e.render(s,t),t.layers.mask=o.mask,e.autoClear=o.autoClear;for(let[l,c]of r)l.material=c;return n.background=o.bg,e.setRenderTarget(o.target),e.setClearColor(this._clear,o.alpha),r.length>0}dispose(){this.target.dispose(),this.depthOnly.dispose()}};var rt=2,Jl=.42,$s=.14,Sn=.95,Ea=.7,$l=5,Uh="#1d1b1c",vd="#efe6c8",yd={living:{floor:["parquet","#d9a066","#8a5a36",1.5],wall:"#86a6bf"},kitchen:{floor:["checker","#f1ede4","#b8463a",2],wall:"#e8dcc2"},bedroom:{floor:["carpet","#d9917a","#c4601e",1],wall:"#8a6cc4"},bathroom:{floor:["hex","#d8ecee","#8fb3b9",1.5],wall:"#a9c4d8"},office:{floor:["wood","#b98552","#83552f",1],wall:"#9fb08a"},library:{floor:["carpet","#7f9a6c","#4a6a48",1],wall:"#5d7d6a"},dining:{floor:["wood","#c98f5a","#8c6239",1],wall:"#d9a3a0"},garden:{floor:["grass","#8fbc5a","#5a9440",1],wall:"#cfc2a8"},hall:{floor:["marble","#efe9dc","#b5a88e",1],wall:"#e9e2d2"},music:{floor:["parquet","#e0b47e","#a5703e",1.5],wall:"#c4a27a"},guest:{floor:["carpet","#c9a0c8","#8a5a8a",1],wall:"#e8c8d8"},game:{floor:["carpet","#3f6b5a","#2a4c3f",1],wall:"#c7a96b"},veranda:{floor:["tile","#f1e3c8","#c9a87a",2],wall:"#bfe0c6"},laundry:{floor:["tile","#e6eef0","#a8bcc4",2],wall:"#c8dce4"}},Nv=i=>yd[i]??yd.living,Uv=["wood","tile","carpet","grass","stone","sand","water","snow","marble","tatami","planks","parquet","metal","mosaic","cobble","hex","straw","checker"],Fv={tile:2,checker:2,hex:1.5,mosaic:1,cobble:1.5,parquet:1.5};function Ov(i){let e=Nv(i==null?void 0:i.type),t=Array.isArray(i==null?void 0:i.floor)?i.floor:null;return{floor:t&&Uv.includes(t[0])?[t[0],t[1]||e.floor[1],t[2]||e.floor[2],Fv[t[0]]??1]:e.floor,wall:typeof(i==null?void 0:i.wall)=="string"?i.wall:e.wall}}function Md(i,e){let t=new Te(i);return t.offsetHSL(0,0,e),"#"+t.getHexString()}function li(i,e,t){return new L((t-(i-1)/2)*rt,0,(e-(i-1)/2)*rt)}function Bv(i,{size:e=128,font:t='700 96px Georgia, "Times New Roman", serif',color:n="#ffffff",w:s=e,h:r=e}={}){let a=document.createElement("canvas");a.width=s,a.height=r;let o=a.getContext("2d");o.fillStyle=n,o.font=t,o.textAlign="center",o.textBaseline="middle",o.fillText(i,s/2,r/2+r*.04);let l=new Vt(a);return l.colorSpace=_t,l.anisotropy=8,l}function Sd(i){return String.fromCharCode(65+i)}function wd(i,{clutter:e="some"}={}){var $e;let t=md(i.theme),n=i.size,s=n*rt/2,r=(i.seed??1)>>>0,a=Kt(r*31+7),o=(I,k)=>{var ee;return I<0||k<0||I>=n||k>=n?-1:((ee=i.cells[I])==null?void 0:ee[k])??-1},l=new Map((i.rooms??[]).map(I=>[I.id,I])),c=I=>{var k;return((k=l.get(I))==null?void 0:k.type)??"living"},h=I=>Ov(l.get(I)),f=I=>{var k;return I>=0&&(((k=l.get(I))==null?void 0:k.open)??c(I)==="garden")},u=new St;u.name="board",Dn(r);let d=new Wt,p=n*rt+2*Sn,y={jitter:0,shadow:!1};d.box(p,Ea-.1,p,0,-Ea,0,t.side,y),d.box(p+.05,.07,p+.05,0,-Ea-.01,0,t.rim,y);let[g,m,M]=t.border;d.box(p+.06,.07,p+.06,0,-.1,0,"#ffffff",{...y,material:Ys(g,m,M,p/2.4,p/2.4)}),d.box(p+.07,.02,p+.07,0,-.105,0,t.rim,y),d.box(n*rt+.12,.05,n*rt+.12,0,-.06,0,Uh,y),u.add(d.build());let w=new Map;for(let I=0;I<n;I++)for(let k=0;k<n;k++){let ee=o(I,k),[oe,re,de,ze]=h(ee).floor,j=(ee*37%5-2)*.018,se=Ys(oe,Md(re,j),Md(de,j),ze,ze),ae=new tn(rt,rt,$l,$l).rotateX(-Math.PI/2),le=li(n,I,k);ae.translate(le.x,0,le.z),w.has(se)||w.set(se,[]),w.get(se).push(ae)}for(let[I,k]of w){let ee=k.length>1?Wl(k,!1):k[0];k.length>1&&k.forEach(re=>re.dispose());let oe=new nt(ee,I);oe.receiveShadow=!0,oe.userData.floor=!0,u.add(oe)}let _=Hv(n),E=ji(new nn({map:_,transparent:!0,depthWrite:!1,roughness:1})),S=new nt(new tn(n*rt,n*rt,n*$l,n*$l).rotateX(-Math.PI/2),E);S.position.y=.012,S.receiveShadow=!0,S.renderOrder=1,u.add(S),Dn(r+1);let P=new Wt,x=(I,k)=>{let ee=f(I),oe=f(k);if(ee&&oe)return{kind:"open",style:t.open};if(ee&&k<0||oe&&I<0)return{kind:"fence",style:t.fence};let re=I<0?vd:ee?h(k).wall:h(I).wall,de=k<0?vd:oe?h(I).wall:h(k).wall;return{kind:"wall",style:t.wall,colA:re,colB:de}},T=new Map,A=(I,k,ee,oe)=>`${I},${k}|${ee},${oe}`;for(let I=0;I<n;I++)for(let k=0;k<n;k++){let ee=o(I,k);for(let[oe,re]of[[0,1],[1,0]]){let de=o(I+oe,k+re);if(de<0||de===ee)continue;let ze=ee<de?`${ee}-${de}`:`${de}-${ee}`;T.has(ze)||T.set(ze,[]),T.get(ze).push(A(I,k,I+oe,k+re))}}let R=new Set;for(let[,I]of T)R.add(I[Math.floor(a()*I.length)]);let D=[];for(let I=0;I<n;I++)D.push(Array.from({length:n},()=>({})));for(let I=0;I<=n;I++)for(let k=0;k<n;k++){let ee=o(I-1,k),oe=o(I,k);if(ee===oe)continue;let re=R.has(A(I-1,k,I,k)),de=(k-(n-1)/2)*rt,ze=(I-n/2)*rt;bd(P,{x:de,z:ze,alongX:!0,...x(ee,oe),door:re&&!(f(ee)&&f(oe)),r:a}),I-1>=0&&(D[I-1][k].s=re?"door":"wall"),I<n&&(D[I][k].n=re?"door":"wall")}for(let I=0;I<=n;I++)for(let k=0;k<n;k++){let ee=o(k,I-1),oe=o(k,I);if(ee===oe)continue;let re=R.has(A(k,I-1,k,I)),de=(I-n/2)*rt,ze=(k-(n-1)/2)*rt;bd(P,{x:de,z:ze,alongX:!1,...x(ee,oe),door:re&&!(f(ee)&&f(oe)),r:a}),I-1>=0&&(D[k][I-1].e=re?"door":"wall"),I<n&&(D[k][I].w=re?"door":"wall")}u.add(P.build());let U=new St;U.name="labels";let N=I=>new Zt({map:I,transparent:!0,depthWrite:!1,toneMapped:!1,color:"#3a2c26"}),O=Sn*.78;for(let I=0;I<n;I++)for(let[k,ee,oe,re]of[[String(I+1),-s-Sn/2,(I-(n-1)/2)*rt,"left"],[Sd(I),(I-(n-1)/2)*rt,-s-Sn/2,"back"],[Sd(I),(I-(n-1)/2)*rt,s+Sn/2,"front"]]){let de=new nt(new tn(O,O).rotateX(-Math.PI/2),N(Bv(k)));de.userData.edge=re,de.position.set(ee,.02,oe),de.renderOrder=2,U.add(wa(de))}u.add(U);for(let I of U.children)I.material.color.set(t.ink);let q=new St;q.name="roomLabels";let Y=new Set((i.objects??[]).map(I=>`${I.r},${I.c}`)),te=new Set;for(let[I,k]of l){let ee=String((($e=i.roomLabels)==null?void 0:$e[I])??k.name??"").trim();if(!ee)continue;let oe=null;for(let Re=0;Re<n;Re++)for(let Pe=0;Pe<n;Pe++){if(o(Re,Pe)!==I)continue;let ke=-Re*10-Pe-(Y.has(`${Re},${Pe}`)?100:0);(!oe||ke>oe.score)&&(oe={rr:Re,cc:Pe,score:ke})}if(!oe)continue;let re=1;for(;oe.cc+re<n&&o(oe.rr,oe.cc+re)===I&&!Y.has(`${oe.rr},${oe.cc+re}`);)re++;for(let Re=0;Re<re;Re++)te.add(`${oe.rr},${oe.cc+Re}`);let de=kv(ee.toUpperCase()),ze=re*rt-.3,j=.46,se=Math.min(ze,j*de.image.width/de.image.height),ae=Math.min(j,se*de.image.height/de.image.width),le=new nt(new tn(se,ae).rotateX(-Math.PI/2),new Zt({map:de,transparent:!0,depthWrite:!1,toneMapped:!1})),fe=li(n,oe.rr,oe.cc);le.position.set(fe.x-rt/2+.16+se/2,.03,fe.z-rt/2+.16+ae/2),le.renderOrder=3,q.add(wa(le))}u.add(q),Dn(r+9);let H=new Wt,J=Kt(r*7+3),$=[];for(let I of[-1,1])for(let k of[-1,1])$.push([I*(s+Sn*.5),k*(s+Sn*.5)]);for(let I=0;I<n;I++)J()<.55&&$.push([s+Sn*.5,(I-(n-1)/2)*rt+(J()-.5)*.6]);for(let[I,k]of $){let ee=t.deco[Math.floor(J()*t.deco.length)],oe=new Wt;if(Sa[ee])Sa[ee](oe,J);else if(Dh[ee])Dh[ee](oe,J);else if(Zs[ee]){Zs[ee](oe,J);for(let re of oe.buckets.values())for(let de of re.gs)de.scale(1.6,1.6,1.6)}else ee==="rock"&&Zs.rocks(oe,J);H.merge(oe,J()*6.28,I,-.03,k)}u.add(H.build());let we=[];for(let I=0;I<n;I++)we.push(Array.from({length:n},()=>({top:0,seat:0,object:null})));let Se=new Map,Qe=new Map;for(let I of i.objects??[]){if(!(I.r>=0&&I.r<n&&I.c>=0&&I.c<n))continue;let k=o(I.r,I.c),ee=c(k),oe=(Se.get(I.type)??0)+k;Se.set(I.type,(Se.get(I.type)??0)+1);let re=od(I.type,{room:ee,k:oe,seed:r+I.r*17+I.c*131+1,fit:rt*.82}),de=li(n,I.r,I.c),ze=0;if(re.wall){let j=D[I.r][I.c],se=["n","w","e","s"].find(ae=>j[ae]==="wall")??["n","w","e","s"].find(ae=>j[ae]);if(se){ze={n:0,w:Math.PI/2,e:-Math.PI/2,s:Math.PI}[se];let ae=Math.max(0,(rt-re.size[1])/2-$s/2-.05),le={n:[0,-1],s:[0,1],w:[-1,0],e:[1,0]}[se];de.x+=le[0]*ae,de.z+=le[1]*ae}}if(re.group.position.copy(de),re.group.rotation.y=ze,re.group.traverse(j=>j.userData.cell=[I.r,I.c]),u.add(re.group),we[I.r][I.c]={top:re.h,seat:re.seat??re.h,object:I.type,occupiable:re.seat!=null},re.spots.length){let j=Math.cos(ze),se=Math.sin(ze);Qe.set(`${I.r},${I.c}`,re.spots.map(([ae,le,fe])=>[de.x+ae*j+fe*se,le,de.z-ae*se+fe*j]))}}let qe=dd(i,{n,cells:we,cellCenter:li,roomType:(I,k)=>c(o(I,k)),isOpen:(I,k)=>f(o(I,k)),plates:i.roomLabels?te:new Set,spots:Qe,clutter:e});return qe&&u.add(qe),u.traverse(I=>{I.matrixAutoUpdate=!1,I.updateMatrix()}),{group:u,labels:U,roomLabels:q,ink:t.ink,labelMats:U.children.map(I=>I.material),cells:we,n,half:s,grid:E}}function kv(i){let t='700 54px Georgia, "Times New Roman", serif',n=document.createElement("canvas"),s=n.getContext("2d");s.font=t;let r=Math.ceil(s.measureText(i).width+96*.9);n.width=r,n.height=96;let a=n.getContext("2d"),o=96/2-6;a.beginPath(),a.moveTo(6+o,6),a.arcTo(r-6,6,r-6,90,o),a.arcTo(r-6,90,6,90,o),a.arcTo(6,90,6,6,o),a.arcTo(6,6,r-6,6,o),a.closePath(),a.fillStyle="rgba(255, 252, 244, 0.94)",a.fill(),a.lineWidth=5,a.strokeStyle="#2a2220",a.stroke(),a.fillStyle="#2a2220",a.font=t,a.textAlign="center",a.textBaseline="middle",a.fillText(i,r/2,96/2+3);let l=new Vt(n);return l.colorSpace=_t,l.anisotropy=8,l}function Ed(i,e,t,n,s,r,a){let o=n-t,l=(t+n)/2,c=$s,h=Jl,f=gd[e],u=(d=Uh)=>i.box(o+.004,.035,c+.012,l,h,0,d);switch(e){case"stone":case"sandstone":case"marble":{let d=e==="marble"?2:3,p=h/d;for(let y=0;y<d;y++){let g=t-(y%2?.18:0);for(;g<n;){let m=Math.min(.3+a()*.2,n-Math.max(g,t)),M=Math.max(g,t);m>.02&&i.box(m-.015,p-.015,c,M+m/2,y*p,0,f[Math.floor(a()*f.length)]),g=M+m}}e==="sandstone"&&i.box(o,.05,c+.02,l,h*.62,0,"#2f6f8a"),u(e==="marble"?"#c8bea8":Uh);break}case"rock":for(let d=t+.1;d<n;d+=.2+a()*.06)i.sphere(.14+a()*.05,d,.12,(a()-.5)*.04,f[Math.floor(a()*f.length)],{sy:1.3,seg:7});break;case"planks":{for(let d=t;d<n-.01;d+=.17)i.box(Math.min(.16,n-d),h-.02*(Math.floor(d*7)%2),c*.8,d+Math.min(.16,n-d)/2,0,0,f[Math.floor(a()*f.length)]);i.box(o,.05,c+.03,l,h*.25,0,"#5a3b26"),u("#4a3426");break}case"logs":for(let d=0;d<3;d++)i.cbox(o,.13,.13,l,.07+d*.13,0,f[d%f.length],{round:.06});break;case"metal":i.box(o,h,c,l,0,0,f[0],{metalness:.5,roughness:.4}),i.box(o+.01,.04,c+.02,l,h*.55,0,"#5ad8ff",{emissive:"#2ab8ff",ei:1.2}),i.box(o,.06,c+.03,l,0,0,"#3a404a"),u("#2a2f38");break;case"shoji":{let d=Math.max(1,Math.round(o/.5));for(let p=0;p<=d;p++)i.box(.05,h,c,t+p*o/d,0,0,"#3a2a22");i.box(o,h-.08,c*.4,l,.04,0,"#f6efdc",{roughness:1});for(let p of[.04,h*.5,h-.04])i.box(o,.025,c*.6,l,p,0,"#3a2a22");u("#2a2220");break}case"coral":for(let d=t+.08;d<n;d+=.13){let p=f[Math.floor(a()*f.length)];i.sphere(.1+a()*.04,d,.1,(a()-.5)*.05,p,{sy:1.2,seg:8}),a()<.6&&i.sphere(.07,d+.03,.27+a()*.08,0,p,{seg:8})}break;case"canvas":{let d=0;for(let p=t;p<n-.01;p+=.2,d++)i.box(Math.min(.2,n-p),h,c*.5,p+Math.min(.2,n-p)/2,0,0,f[d%2]);i.box(o,.06,c*.7,l,h,0,"#d9a441");break}default:i.box(o,h,c/2,l,0,-c/4,s),i.box(o,h,c/2,l,0,c/4,r),i.box(o,.06,c+.03,l,0,0,"#f4efe4"),u()}}function zv(i,e,t,n,s){let r=n-t,a=(t+n)/2,o=Jl*.85,l=(c,h)=>{let f=Math.max(2,Math.round(r/c));for(let u=0;u<=f;u++)h(t+u*r/f,u)};switch(e){case"hedge":i.box(r-.04,Jl*.8,$s*1.4,a,0,0,"#2f5e2c"),Ft(i,{seed:Math.floor(s()*1e6),rx:r/2,ry:Jl*.5,rz:$s*1.3,palette:"dark",voxel:.08},a,0,0);break;case"coral":Ed(i,"coral",t,n,"","",s);break;case"bamboo":l(.07,(c,h)=>i.cyl(.03,.03,o+h%3*.05,c,0,0,h%2?"#a8b45a":"#8a9a42",{seg:6}));for(let c of[.12,o-.08])i.box(r,.025,.08,a,c,0,"#5a3b26");break;case"iron":l(.1,(c,h)=>{i.box(.02,o,.02,c,0,0,"#2a2523"),h%2&&i.cyl(0,.025,.06,c,o,0,"#c9a24a",{seg:4})});for(let c of[.06,o-.06])i.box(r,.025,.025,a,c,0,"#2a2523");break;case"rocks":for(let c=t+.1;c<n;c+=.22)i.sphere(.1+s()*.05,c,.06,(s()-.5)*.06,["#9a968c","#b0aa9c","#7f7a70"][Math.floor(s()*3)],{sy:.8,seg:7});break;case"rope":l(.6,c=>i.cyl(.05,.06,o,c,0,0,"#7a5a3a",{seg:8}));for(let c=0;c<12;c++){let h=(c+.5)/12,f=t+h*r,u=Math.sin(h*r/.6*Math.PI)**2;i.cbox(r/12+.01,.03,.03,f,o-.1-u*.08,0,"#c9a46a")}break;case"rail":l(.5,c=>i.box(.06,o,.06,c,0,0,"#6b4a34"));for(let c of[o*.4,o-.04])i.box(r,.05,.05,a,c,0,"#8a5a36");break;case"snow":for(let c=t+.12;c<n;c+=.2)i.sphere(.16+s()*.04,c,.04,0,"#f6f9fc",{sy:.6,seg:8});break;case"palisade":l(.12,(c,h)=>{i.cyl(.055,.055,o+.06*(h%2),c,0,0,"#8a6a4a",{seg:7}),i.cyl(0,.055,.1,c,o+.06*(h%2),0,"#8a6a4a",{seg:7})});break;default:l(.16,(c,h)=>i.box(.07,o-.04+h%2*.04,.03,c,0,0,"#f6f2ea"));for(let c of[.1,o-.12])i.box(r,.04,.03,a,c,-.03,"#f1ede4")}}function Vv(i,e,t,n,s){let r=n-t,a=(t+n)/2;switch(e){case"hedge":Ft(i,{seed:Math.floor(s()*1e6),rx:r/2,ry:.13,rz:.12,palette:"green",voxel:.06},a,-.02,0);break;case"shells":for(let o=t+.07;o<n;o+=.14)i.sphere(.05,o,.015,0,["#f6d3c9","#f2e6d8","#e9b8a8"][Math.floor(s()*3)],{sy:.45,seg:7});break;case"rocks":case"pebbles":for(let o=t+.06;o<n;o+=.12)i.sphere(e==="rocks"?.065:.045,o,.012,(s()-.5)*.03,["#9a968c","#b8b2a4","#7f7a70","#d8d2c4"][Math.floor(s()*4)],{sy:.55,seg:6});break;case"rope":for(let o=t;o<n;o+=.5)i.cyl(.035,.04,.2,o+.25,0,0,"#7a5a3a",{seg:6});i.box(r,.025,.025,a,.16,0,"#c9a46a");break;case"snow":for(let o=t+.1;o<n;o+=.18)i.sphere(.09,o,.01,0,"#f6f9fc",{sy:.5,seg:7});break;default:for(let o=t+.05;o<n-.05;o+=.2)i.box(.12,.012,.05,o+.06,0,0,"#f6f2ea",{jitter:0})}}function bd(i,{x:e,z:t,alongX:n,kind:s,style:r,colA:a,colB:o,door:l,r:c}){let h=rt+(n?$s:0),f=new Wt,u=l?rt*.36:0,d=u?[[-h/2,-u/2],[u/2,h/2]]:[[-h/2,h/2]];for(let[p,y]of d)s==="open"?Vv(f,r,p,y,c):s==="fence"?zv(f,r,p,y,c):Ed(f,r,p,y,a,o,c);u&&f.box(u+.02,.014,$s+.06,0,0,0,"#d8ccb2",{jitter:0}),i.merge(f,n?0:Math.PI/2,e,0,t)}function Hv(i){let t=i*128,n=document.createElement("canvas");n.width=n.height=t;let s=n.getContext("2d");s.clearRect(0,0,t,t),s.strokeStyle="rgba(40, 28, 24, 0.55)",s.lineWidth=4,s.setLineDash([16,8]);for(let a=1;a<i;a++)s.beginPath(),s.moveTo(a*128,0),s.lineTo(a*128,t),s.moveTo(0,a*128),s.lineTo(t,a*128),s.stroke();s.setLineDash([]),s.strokeStyle="rgba(40, 28, 24, 0.7)",s.lineWidth=5;for(let a=1;a<i;a++)for(let o=1;o<i;o++)s.beginPath(),s.moveTo(a*128-10,o*128),s.lineTo(a*128+10,o*128),s.moveTo(a*128,o*128-10),s.lineTo(a*128,o*128+10),s.stroke();let r=new Vt(n);return r.colorSpace=_t,r.anisotropy=8,r}var Td=["#f2d2b6","#e8be9a","#c68e6a","#8d5a3f","#f5dcc6","#b07850"],Ad=["#2a1d18","#5a3b26","#8a5a2a","#d9b45a","#9c9c9c","#a33b2b","#1d1b1c"],Id=1.25;function Gv(i){let e=new Te(i);return .2126*e.r+.7152*e.g+.0722*e.b}function Ld(i){let e=new Te(i),t={};return e.getHSL(t),e.setHSL(t.h,t.s*.3,.42+t.l*.2),"#"+e.getHexString()}var Wv=[[0,0],[.3,0],[.31,.04],[.27,.1],[.21,.28],[.175,.44],[.215,.54],[.21,.6],[.12,.665],[0,.675]].map(([i,e])=>new he(i,e));function Rd(i,e,t,n,s){let r=new Te(e).offsetHSL(0,0,-.14).getStyle();i.geo(new Ur(Wv,22),e,{roughness:.6}),i.cyl(.18,.18,.03,0,.43,0,r,{seg:20}),i.cyl(.13,.15,.04,0,.64,0,"#f6f2ea",{seg:18});for(let a of[-1,1])i.cbox(.09,.34,.11,a*.22,.43,.01,e,{rz:a*.18,round:.04,roughness:.6}),i.sphere(.055,a*.26,.26,.03,t,{seg:10});if(i.sphere(.19,0,.84,0,t,{seg:20,roughness:.7}),i.sphere(.2,0,.9,-.03,n,{seg:18,sy:.72,roughness:.8}),i.sphere(.12,0,.82,-.12,n,{seg:12}),s==="dead")for(let a of[-1,1])i.cbox(.06,.015,.012,a*.07,.86,.182,"#1d1b1c",{rz:.785,jitter:0,shadow:!1}),i.cbox(.06,.015,.012,a*.07,.86,.182,"#1d1b1c",{rz:-.785,jitter:0,shadow:!1});else{for(let a of[-1,1])i.sphere(.025,a*.07,.86,.175,"#1d1b1c",{seg:8,shadow:!1});i.sphere(.03,0,.8,.188,new Te(t).offsetHSL(0,.1,-.08).getStyle(),{seg:8,shadow:!1})}}var Cd={pirates:["tricorne","bandana","tricorne"],western:["cowboy","cowboy","bandana"],japan:["kasa","topknot","headband"],regency:["tophat","bonnet","tophat"],egypt:["nemes","nemes","headband"],circus:["partyHat","tophat","partyHat"],chalet:["beanie","beanie","earmuffs"],space:["helmet","helmet","antennae"],haunted:["witch","witch","tophat"],medieval:["crown","helm","hood"],prehistory:["bone","feather","bone"],mermaids:["shellCrown","starfish","shellCrown"],paris:["beret","beret","boater"],train:["bowler","cloche","bowler"],rome:["laurel","laurel","hood"],world:["boater","cap","beanie"],halloween:["witch","devilHorns","witch"],easter:["bunnyEars","bonnet","bunnyEars"],carnival:["mask","partyHat","mask"],lunar:["mandarinCap","topknot","mandarinCap"],xmas:["santa","elf","santa"],birthday:["partyHat","partyHat","crown"],love:["flowerCrown","tophat","bonnet"],forest:["flowerCrown","hood","feather"]};function Pd(i,e,t,n){switch(e){case"tricorne":i.cyl(.27,.27,.03,0,.98,-.02,"#2a2220",{seg:3}),i.cyl(.13,.16,.1,0,.98+.02,-.02,"#2a2220",{seg:12}),i.cyl(.272,.272,.012,0,.98+.025,-.02,"#d9b44a",{seg:3});break;case"bandana":i.sphere(.205,0,.9,-.02,t,{sy:.72,seg:16}),i.sphere(.045,.12,.88,-.18,t,{seg:8});for(let r=0;r<5;r++)i.sphere(.02,Math.cos(r*1.2)*.17,.95,Math.sin(r*1.2)*.17-.02,"#f6f2ea",{seg:6});break;case"cowboy":i.cyl(.3,.3,.025,0,.98-.02,0,"#8a5a32",{seg:22,rx:-.12}),i.cyl(.14,.16,.15,0,.98-.01,0,"#8a5a32",{seg:16}),i.cyl(.162,.162,.03,0,.98+.01,0,"#3a2618",{seg:16});break;case"kasa":i.cyl(0,.34,.16,0,.98-.04,0,"#d8c08a",{seg:20});break;case"topknot":i.sphere(.07,0,.98+.04,-.06,"#1d1b1c",{seg:10,sy:1.1});break;case"headband":i.cyl(.196,.196,.05,0,.88,0,t,{seg:18}),i.sphere(.04,0,.9,.19,"#d9b44a",{seg:8});break;case"tophat":i.cyl(.24,.24,.02,0,.98,0,"#1d1b1c",{seg:20}),i.cyl(.13,.14,.28,0,.98,0,"#1d1b1c",{seg:18}),i.cyl(.141,.141,.04,0,.98+.03,0,t,{seg:18});break;case"bonnet":i.sphere(.23,0,.9,-.05,"#f4e2c8",{sy:.8,seg:16}),i.cyl(.24,.24,.03,0,.92,.03,t,{seg:18,rx:1.2});break;case"nemes":i.sphere(.215,0,.88,-.02,"#e0b23a",{sy:.8,seg:16});for(let r=0;r<4;r++)i.cyl(.217,.217,.02,0,.8+r*.05,-.02,"#2f5e8c",{seg:16,t0:Math.PI*.75,tl:Math.PI*1.5});for(let r of[-1,1])i.box(.08,.22,.05,r*.18,.62,.03,"#e0b23a");break;case"partyHat":i.cyl(0,.12,.3,0,.98-.02,0,t,{seg:14,rz:(n()-.5)*.4}),i.sphere(.04,0,.98+.3,0,"#f2c94c",{seg:8});break;case"beanie":i.sphere(.205,0,.92,-.01,t,{sy:.78,seg:16}),i.cyl(.205,.205,.05,0,.86,-.01,"#f6f2ea",{seg:16}),i.sphere(.06,0,.98+.1,0,"#f6f2ea",{seg:10});break;case"earmuffs":i.cyl(.21,.21,.02,0,.84,0,"#c9c9c9",{rz:1.57,seg:16,t0:0,tl:Math.PI});for(let r of[-1,1])i.sphere(.065,r*.2,.84,0,t,{seg:10});break;case"helmet":i.sphere(.27,0,.84,0,"#dff4ff",{seg:20,roughness:.05,opacity:.35}),i.cyl(.27,.27,.05,0,.6,0,"#c9d1db",{seg:20,metalness:.5});break;case"antennae":for(let r of[-1,1])i.cbox(.015,.2,.015,r*.08,.98+.06,0,"#2a2523",{rz:-r*.3}),i.sphere(.035,r*.12,.98+.17,0,t,{seg:8,emissive:t,ei:.6});break;case"witch":i.cyl(.28,.28,.02,0,.98-.02,0,"#2a2236",{seg:20}),i.cyl(0,.15,.38,0,.98-.02,0,"#2a2236",{seg:14,rx:-.2}),i.cyl(.152,.152,.035,0,.98,0,t,{seg:14});break;case"devilHorns":for(let r of[-1,1])i.cyl(0,.035,.12,r*.09,.98-.02,.02,"#c0283a",{seg:8,rz:-r*.35});break;case"bunnyEars":for(let r of[-1,1])i.sphere(.05,r*.08,.98+.14,-.02,"#f6f2ea",{sy:3,seg:10,rz:-r*.15}),i.sphere(.028,r*.08,.98+.14,.022,"#f2a6c0",{sy:2.8,seg:8,rz:-r*.15});break;case"mask":i.cbox(.3,.075,.04,0,.87,.175,t,{round:.02}),i.sphere(.035,.13,.98+.04,.08,"#f2c94c",{sy:3,seg:8,rz:-.5});break;case"mandarinCap":i.sphere(.205,0,.92,-.01,"#1d1b1c",{sy:.62,seg:16}),i.sphere(.035,0,.98+.05,0,"#c0283a",{seg:8});break;case"crown":i.cyl(.15,.15,.08,0,.98-.02,0,"#e0b23a",{seg:18,metalness:.7,roughness:.3});for(let r=0;r<6;r++)i.cyl(0,.03,.07,Math.cos(r*1.047)*.14,.98+.06,Math.sin(r*1.047)*.14,"#e0b23a",{seg:4,metalness:.7});i.sphere(.025,0,.98+.02,.15,"#c0283a",{seg:8});break;case"helm":i.sphere(.22,0,.88,0,"#9aa6b4",{sy:.9,seg:16,metalness:.6,roughness:.35}),i.box(.04,.2,.04,0,.74,.2,"#9aa6b4",{metalness:.6});break;case"hood":i.sphere(.23,0,.87,-.04,t,{sy:.95,seg:16});break;case"bone":i.cbox(.26,.035,.035,0,.98+.01,0,"#efe6d0",{rz:.3});for(let r of[-1,1])i.sphere(.035,r*.125,.98+.01+r*.04,0,"#efe6d0",{seg:6});break;case"feather":i.cyl(.196,.196,.04,0,.9,0,"#8a5a32",{seg:16}),i.cbox(.05,.28,.015,.06,.98+.08,-.12,t,{rz:-.3,round:.012});break;case"shellCrown":for(let r=0;r<5;r++)i.sphere(.05,Math.cos(r*.6-1.2)*.17,.98-.01,Math.sin(r*.6-1.2)*.17+.04,["#f6d3c9","#f8f4ff","#f0a8c4"][r%3],{sy:1.3,seg:8});break;case"starfish":for(let r=0;r<5;r++)i.cbox(.1,.02,.035,.1+Math.cos(r*1.256)*.04,.95,.08+Math.sin(r*1.256)*.04,"#e8743a",{ry:-r*1.256,rz:.6});break;case"beret":i.cyl(.2,.2,.05,.03,.98-.03,0,t,{seg:18,rz:.25}),i.cyl(.01,.01,.04,.05,.98+.01,0,t,{seg:4});break;case"boater":i.cyl(.27,.27,.02,0,.98-.01,0,"#e8d49a",{seg:20}),i.cyl(.15,.15,.09,0,.98-.01,0,"#e8d49a",{seg:18}),i.cyl(.152,.152,.03,0,.98+.01,0,t,{seg:18});break;case"bowler":i.cyl(.22,.22,.02,0,.98-.01,0,"#2a2220",{seg:20}),i.sphere(.15,0,.98,0,"#2a2220",{sy:.8,seg:16});break;case"cloche":i.sphere(.215,0,.9,0,t,{sy:.8,seg:16}),i.cyl(.24,.24,.02,0,.84,0,t,{seg:18});break;case"cap":i.sphere(.2,0,.92,0,t,{sy:.7,seg:16}),i.box(.24,.02,.16,0,.9,.2,t);break;case"santa":i.cyl(.215,.215,.06,0,.86,0,"#f6f2ea",{seg:18}),i.cyl(.02,.19,.32,0,.9,-.02,"#c0283a",{seg:14,rx:-.45}),i.sphere(.055,0,1.12,-.16,"#f6f2ea",{seg:10});break;case"elf":i.cyl(0,.17,.34,0,.98-.06,0,"#3f7a4a",{seg:14,rz:.35}),i.cyl(.175,.175,.04,0,.98-.07,0,"#c0283a",{seg:14}),i.sphere(.03,-.12,.98+.24,0,"#f2c94c",{seg:8});break;case"flowerCrown":for(let r=0;r<9;r++){let a=r/9*Math.PI*2;i.sphere(.04,Math.cos(a)*.18,.96,Math.sin(a)*.18,r%3?t:"#f6f2ea",{seg:8,sy:.8}),r%3===1&&i.sphere(.028,Math.cos(a+.35)*.19,.94,Math.sin(a+.35)*.19,"#5a9a4a",{seg:6,sy:.6})}break;case"laurel":for(let r=0;r<12;r++){let a=Math.PI*.15+r/11*Math.PI*.7+Math.PI;i.cbox(.07,.015,.035,Math.cos(a)*.19,.95,-Math.sin(a)*.19,"#7aa84a",{ry:a,rz:.4})}break}}function Dd(i,{victim:e=!1,selected:t=!1,theme:n=""}={}){let s=Rh(i.id??i.name??"p"),r=Td[s%Td.length],a=Ad[(s>>>4)%Ad.length],o=e?Ld(i.color??"#888888"):i.color??"#888888";Dn(s%9973);let l=new St,c=new Wt;if(e){let h=new Wt;Rd(h,o,r,a,"dead");let f=Cd[n];f&&Pd(h,f[(s>>>8)%f.length],o,()=>(s>>>12)%100/100),c.merge(h);let u=c.build();u.rotation.set(-Math.PI/2,0,0),u.scale.setScalar(1.15),u.position.set(0,.3,.6);let d=new St;d.add(u),d.rotation.y=Math.PI/2+.35,l.add(d)}else{let h=new Te(o).offsetHSL(0,0,-.18).getStyle();c.cyl(.4,.42,.06,0,0,0,h,{seg:28,roughness:.5}),c.cyl(.41,.41,.012,0,.06,0,"#f6f2ea",{seg:28,roughness:.5}),c.cyl(.36,.36,.014,0,.062,0,h,{seg:28,roughness:.5});let f=new Wt;Rd(f,o,r,a,"stand");let u=Cd[n];u&&Pd(f,u[(s>>>8)%u.length],new Te(o).offsetHSL(0,0,-.08).getStyle(),()=>(s>>>12)%100/100),c.merge(f,0,0,.07,0);let d=c.build();d.scale.setScalar(1.12),l.add(d)}if(t){let h=new nt(new Or(.56,.05,10,40).rotateX(Math.PI/2),new nn({color:"#ffd36a",emissive:"#ffb020",emissiveIntensity:1.6}));h.position.y=.06,l.add(h),l.traverse(f=>{f.isMesh&&f.material&&!f.material.userData.glowClone&&f!==h&&(f.material=ji(f.material.clone()),f.material.userData={glowClone:!0},f.material.emissive=new Te("#ffcf7a"),f.material.emissiveIntensity=.22)})}return l.traverse(h=>{h.castShadow=h.isMesh,h.receiveShadow=h.isMesh}),l}function Nd(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d");t.strokeStyle="rgba(255,255,255,0.92)",t.lineWidth=7,t.lineCap=t.lineJoin="round";let n=[[62,102],[40,108],[36,128],[40,148],[62,154],[78,150],[96,168],[120,176],[118,158],[104,150],[150,154],[196,176],[222,172],[204,150],[166,136],[204,120],[222,92],[198,86],[150,106],[104,108],[118,98],[122,78],[98,86],[78,106],[62,102]];t.beginPath(),n.forEach(([a,o],l)=>{let c=a+Math.sin(l*7.1)*1.5,h=o+Math.cos(l*5.3)*1.5;l===0?t.moveTo(c,h):t.lineTo(c,h)}),t.closePath(),t.stroke();let s=new Vt(e);s.colorSpace=_t,s.anisotropy=8;let r=new nt(new tn(1.9,1.9).rotateX(-Math.PI/2),new nn({map:s,transparent:!0,depthWrite:!1,roughness:1}));return r.renderOrder=2,r}function Ud(i,{victim:e=!1,selected:t=!1,name:n=!1}={}){let s=e?Ld(i.color??"#888"):i.color??"#888",r=256,a=18,o=n?120:0,l=n?512:r+2*a,c=r+2*a+o,h=document.createElement("canvas");h.width=l,h.height=c;let f=h.getContext("2d"),u=l/2,d=a+r/2,p=r/2-6;if(t){let _=f.createRadialGradient(u,d,p*.8,u,d,p+a);_.addColorStop(0,"rgba(255,208,106,0.95)"),_.addColorStop(1,"rgba(255,208,106,0)"),f.fillStyle=_,f.beginPath(),f.arc(u,d,p+a,0,Math.PI*2),f.fill()}f.fillStyle="#2a1f1c",f.beginPath(),f.moveTo(u-26,d+p-14),f.lineTo(u+26,d+p-14),f.lineTo(u,d+p+16),f.closePath(),f.fill(),f.beginPath(),f.arc(u,d,p,0,Math.PI*2),f.fillStyle="#2a1f1c",f.fill(),f.beginPath(),f.arc(u,d,p-12,0,Math.PI*2),f.fillStyle=e?"#efe6dc":"#fbf6ea",f.fill(),f.beginPath(),f.arc(u,d,p-26,0,Math.PI*2),f.fillStyle=s,f.fill(),e&&(f.strokeStyle="#a3242b",f.lineWidth=10,f.beginPath(),f.arc(u,d,p-6,0,Math.PI*2),f.stroke());let y=(i.name??i.id??"?").trim().charAt(0).toUpperCase();if(f.fillStyle=Gv(s)>.55?"#2a1f1c":"#ffffff",f.font='700 150px Georgia, "Times New Roman", serif',f.textAlign="center",f.textBaseline="middle",f.fillText(y,u,d+10),n){let _=i.name??"";f.font='600 78px Georgia, "Times New Roman", serif';let E=Math.min(l-20,f.measureText(_).width+44),S=c-o+6;f.fillStyle="rgba(42,31,28,0.9)",Xv(f,u-E/2,S,E,o-12,26),f.fill(),f.fillStyle="#fbf6ea",f.fillText(_,u,S+(o-12)/2+3,l-40)}let g=new Vt(h);g.colorSpace=_t,g.anisotropy=4;let m=new yi({map:g,depthTest:!1,depthWrite:!1,transparent:!0}),M=new yr(m),w=.7/r;return M.scale.set(l*w,c*w,1),M.center.set(.5,1-(d+p+16)/c),M.renderOrder=10,wa(M)}function Xv(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}var ci={iso:{az:16,el:66,fov:20,skew:.07,lean:-.02},top:{az:0,el:76,ortho:!0}},qv=.92,Yv={look:"print",mood:"day",camera:"iso",labels:!0,roomLabels:!0,names:!1,clutter:"some",interactive:!0,ao:!0,padding:.04,maxPixelRatio:2,background:null},Ta=new L,Un=Gt.degToRad,Kl=[.6,4],Js=[12,89],Fh=()=>({az:0,el:0,zoom:1,pan:new L}),Ra=class{constructor(e,t={}){this.container=e,this.opts={...Yv,...t},this.onCell=null,this.onCamera=null,this.user=Fh(),this.state={show:"blank"},this.cache=new Map,this.owned=new Set;let n=this.renderer=new Dl({antialias:!1,alpha:!0,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,this.opts.maxPixelRatio)),n.shadowMap.enabled=!0,n.shadowMap.type=Ei,n.shadowMap.autoUpdate=!1,n.toneMapping=Xi,n.debug.checkShaderErrors=!1;let s=n.domElement;s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction=this.opts.interactive?"pan-y":"manipulation",s.setAttribute("aria-hidden","true"),e.appendChild(s),this.scene=new _i,this.overlay=new _i,this.hemi=new Vr("#e7eefc","#8a7a64",1.1),this.sun=new Gi("#fff3e0",2.6),this.sun.castShadow=!0,this.sun.shadow.mapSize.setScalar(2048),this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=5,this.sun.shadow.blurSamples=12,this.bounce=new Gi("#ffd9a8",.4),this.rim=new Gi("#c9dcff",.5),this.bounce.target=this.rim.target=this.sun.target,this.scene.add(this.hemi,this.sun,this.sun.target,this.bounce,this.rim);let r=new Vs(n);this.envRT=r.fromScene(new Gl,.04),this.scene.environment=this.envRT.texture,r.dispose(),this.world=new St,this.dyn=new St,this.scene.add(this.world,this.dyn),this.marks=new St,this.overlay.add(this.marks),this.persp=new Fl(20,1,.1,1e3),this.ortho=new Ol(-1,1,1,-1,.1,1e3),this.makeHelpers(),this.size={w:1,h:1},this.textMask=new Zl,this.setupComposer(),this.applyLook(),this.applyMood(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.opts.interactive&&this.bindEvents(),this.resize()}get camera(){var e;return(e=ci[this.opts.camera])!=null&&e.ortho?this.ortho:this.persp}setupComposer(){let e=this.camera;if(this.composer&&this.composerCam===e)return;this.disposeComposer(),this.composerCam=e;let t=new bt(1,1,{samples:4,type:Bt});this.composer=new kl(this.renderer,t),this.renderPass=new ma(this.scene,e),this.composer.addPass(this.renderPass),this.aoPass=new ya(this.scene,e,1,1),this.aoPass.blendIntensity=.8,this.aoPass.updateGtaoMaterial({radius:.55,distanceExponent:1.5,thickness:1,scale:1.1}),this.aoPass.enabled=!!this.opts.ao,this.composer.addPass(this.aoPass),this.overlayPass=new ma(this.overlay,e),this.overlayPass.clear=!1,this.composer.addPass(this.overlayPass),this.composer.addPass(new zl),this.stylePass=new Ws(Gf),this.stylePass.uniforms.tText.value=this.textMask.target.texture,this.composer.addPass(this.stylePass),this.look&&this.resize()}disposeComposer(){var e;if(this.composer){for(let t of this.composer.passes)(e=t.dispose)==null||e.call(t);this.composer.renderTarget1.dispose(),this.composer.renderTarget2.dispose(),this.composer=null}}makeHelpers(){let e=new tn(rt*.96,rt*.96).rotateX(-Math.PI/2);this.hover=new nt(e,new Zt({color:"#fffaf0",transparent:!0,opacity:.32,depthWrite:!1,toneMapped:!1})),this.hover.visible=!1,this.hover.renderOrder=3,this.scene.add(this.hover);let t=this.highlight=new St,n=new Zt({color:"#ffb52e",toneMapped:!1}),s=new nt(e,new Zt({color:"#ffd36a",transparent:!0,opacity:.3,depthWrite:!1,toneMapped:!1}));s.renderOrder=3,t.add(s);let r=.09,a=rt-.16;for(let[f,u,d,p]of[[a,r,0,-a/2],[a,r,0,a/2],[r,a,-a/2,0],[r,a,a/2,0]]){let y=new nt(new sn(f+(f>u?r:0),.03,u),n);y.position.set(d,.02,p),t.add(y)}t.visible=!1,this.scene.add(t);let o=256,l=document.createElement("canvas");l.width=l.height=o;let c=l.getContext("2d");c.lineCap="round";for(let[f,u]of[[44,"rgba(255,250,240,0.85)"],[26,"rgba(160,30,36,0.92)"]])c.strokeStyle=u,c.lineWidth=f,c.beginPath(),c.moveTo(58,62),c.quadraticCurveTo(130,126,196,198),c.moveTo(198,58),c.quadraticCurveTo(122,132,60,196),c.stroke();let h=new Vt(l);h.colorSpace=_t,h.anisotropy=8,this.xMat=new Zt({map:h,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.xGeo=new tn(rt*.62,rt*.62).rotateX(-Math.PI/2),this.owned.add(h)}setOptions(e={}){let t={...this.opts};Object.assign(this.opts,e),this.opts.camera!==t.camera&&(this.setupComposer(),this.resetCamera(!1)),e.ao!==void 0&&this.aoPass&&(this.aoPass.enabled=!!e.ao),this.opts.look!==t.look&&this.applyLook(),(this.opts.mood!==t.mood||e.background!==void 0)&&this.applyMood(),this.syncLabels(),this.opts.names!==t.names&&this.refresh(),this.opts.clutter!==t.clutter&&this.puzzle&&this.setPuzzle(this.puzzle,this.state),this.fit(),this.invalidate(!0)}syncLabels(){this.board&&(this.board.labels.visible=!!this.opts.labels,this.board.roomLabels&&(this.board.roomLabels.visible=this.opts.roomLabels!==!1),this.orientLabels())}orientLabels({az:e,el:t}=this.angles()){var o;if(!this.board)return;let n=Math.cos(Un(e))>=0?"front":"back",s=t>=70?n==="front"?"back":"front":n,r=Math.round(e/90)*(Math.PI/2);for(let l of this.board.labels.children)l.visible=l.userData.edge==="left"||l.userData.edge===s,l.rotation.y=r;let a=Math.cos(Un(e))<0?Math.PI:0;for(let l of((o=this.board.roomLabels)==null?void 0:o.children)??[])l.rotation.y=a}faceCamera(e=this.angles().az){for(let t of this.dyn.children)!t.userData.faces||Math.abs(t.rotation.y-Un(e))<1e-4||(t.rotation.y=Un(e),this.shadowDirty=!0)}angles(){let e=ci[this.opts.camera]??ci.iso;return{az:e.az+this.user.az,el:Gt.clamp(e.el+this.user.el,Js[0],Js[1])}}get cameraMoved(){let e=this.user;return Math.abs(e.az)>.5||Math.abs(e.el)>.5||Math.abs(e.zoom-1)>.01||e.pan.lengthSq()>1e-4}moveCamera({az:e=0,el:t=0,zoom:n=1,pan:s=null}={}){var l,c;let r=this.user,a=ci[this.opts.camera]??ci.iso;r.az+=e,r.el=Gt.clamp(a.el+r.el+t,Js[0],Js[1])-a.el,r.zoom=Gt.clamp(r.zoom*n,Kl[0],Kl[1]),s&&r.pan.add(s);let o=(((l=this.board)==null?void 0:l.n)??6)*rt/2+Sn;r.pan.x=Gt.clamp(r.pan.x,-o,o),r.pan.z=Gt.clamp(r.pan.z,-o,o),this.fit(),(c=this.onCamera)==null||c.call(this,this.cameraMoved)}animateCamera(e,t=260){cancelAnimationFrame(this.camRaf);let n={az:this.user.az,el:this.user.el,zoom:this.user.zoom,pan:this.user.pan.clone()},s=performance.now(),r=()=>{var l;let a=Math.min(1,(performance.now()-s)/t),o=a<.5?2*a*a:1-(-2*a+2)**2/2;this.user.az=n.az+(e.az-n.az)*o,this.user.el=n.el+(e.el-n.el)*o,this.user.zoom=n.zoom*(e.zoom/n.zoom)**o,this.user.pan.lerpVectors(n.pan,e.pan,o),this.fit(),a<1&&!this.disposed?this.camRaf=requestAnimationFrame(r):(l=this.onCamera)==null||l.call(this,this.cameraMoved)};r()}nudgeCamera({az:e=0,el:t=0,zoom:n=1}={}){let s=this.user,r=ci[this.opts.camera]??ci.iso;this.animateCamera({az:s.az+e,el:Gt.clamp(r.el+s.el+t,Js[0],Js[1])-r.el,zoom:Gt.clamp(s.zoom*n,Kl[0],Kl[1]),pan:s.pan.clone()})}resetCamera(e=!0){var n;let t=this.user.az-Math.round(this.user.az/360)*360;this.user.az=t,e?this.animateCamera(Fh()):(cancelAnimationFrame(this.camRaf),this.user=Fh(),(n=this.onCamera)==null||n.call(this,!1))}applyLook(){let e=fa[this.opts.look]??fa.print;this.look=e,this.syncStyleUniforms()}syncStyleUniforms(e=1){let t=this.look;if(!t||!this.stylePass)return;let n=this.stylePass.uniforms;for(let s of["posterize","halftone","misreg","grain","saturation","lens","chroma","mist","tilt","vignette","warmth","fade","ink","wash","hatch","shadowTint"])n[s].value=t[s]??0;n.pixel.value=Math.max(1,Math.round((t.pixel??1)*e)),n.dotSize.value=(t.dot??3)*e,n.paper.value.set(t.paper??"#f6eedb")}applyMood(){var n;let e=this.mood=da[this.opts.mood]??da.day;this.hemi.color.set(e.sky),this.hemi.groundColor.set(e.ground),this.hemi.intensity=e.hemi,this.sun.color.set(e.sun),this.sun.intensity=e.sunI,this.bounce.color.set(e.bounce),this.bounce.intensity=e.bounceI,this.rim.color.set(e.rim),this.rim.intensity=e.rimI,this.scene.environmentIntensity=e.env,this.renderer.toneMappingExposure=e.exposure,this.scene.background=new Te(this.opts.background??e.backdrop);let t=this.opts.mood==="night";for(let s of((n=this.board)==null?void 0:n.labelMats)??[])s.color.set(t?"#f3e7cf":this.board.ink??"#3a2c26");this.scaleLamps(),this.placeSun()}scaleLamps(){var t;let e=((t=this.mood)==null?void 0:t.lampScale)??1;this.world.traverse(n=>{n.isPointLight&&(n.userData.base===void 0&&(n.userData.base=n.intensity),n.intensity=n.userData.base*e)})}placeSun(){var o;let e=this.mood,n=(((o=this.board)==null?void 0:o.n)??6)*rt/2+Sn+1.5,s=Gt.degToRad(e.sunAz),r=Gt.degToRad(e.sunEl);this.sun.target.position.set(0,0,0),this.sun.position.set(Math.sin(s)*Math.cos(r)*n*2,Math.sin(r)*n*2,Math.cos(s)*Math.cos(r)*n*2),this.bounce.position.set(-Math.sin(s)*n,n*.25,-Math.cos(s)*n),this.rim.position.set(-Math.sin(s+1.2)*n,n*.6,-Math.cos(s+1.2)*n);let a=this.sun.shadow.camera;a.left=a.bottom=-n,a.right=a.top=n,a.near=.1,a.far=n*4,a.updateProjectionMatrix(),this.sun.target.updateMatrixWorld()}setPuzzle(e,t={}){if(!e||!e.size||!e.cells)throw new Error("murdoku3d: invalid puzzle");let n=JSON.stringify([e.size,e.seed,e.rooms,e.cells,e.objects,e.theme,e.roomLabels,this.opts.clutter]);n!==this.sig&&(this.sig=n,this.clearBoard(),this.board=wd(e,{clutter:this.opts.clutter}),this.world.add(this.board.group),this.syncLabels(),this.pickables=[],this.board.group.traverse(s=>s.isMesh&&s.userData.cell&&this.pickables.push(s)),this.applyMood(),this.fit()),this.puzzle=e,this.state={show:"blank",placements:null,crosses:[],selected:null,highlight:null,...t},this.refresh()}clearBoard(){this.board&&(this.board.group.removeFromParent(),Aa(this.board.group),this.board=null)}refresh(){var o;if(!this.board||!this.puzzle)return;let{n:e,cells:t}=this.board,n=this.state;this.dyn.clear(),this.marks.clear();let s=new Set,r=this.puzzle.people??[];for(let l of r){let c=null;if(n.show==="solution"?c={r:l.r,c:l.c}:n.show==="play"&&(c=((o=n.placements)==null?void 0:o[l.id])??null),!c||!(c.r>=0&&c.r<e&&c.c>=0&&c.c<e))continue;let h=l.role==="victim",f=n.selected!=null&&n.selected===l.id,u=t[c.r][c.c],d=u.object?u.occupiable?u.seat:u.top:0,p=li(e,c.r,c.c),y=this.puzzle.theme??"",g=`f|${l.id}|${l.color}|${h}|${f}|${y}`,m=this.cached(g,()=>Dd(l,{victim:h,selected:f,theme:y}));if(m.position.set(p.x,d,p.z),m.userData.faces=!h,m.traverse(_=>_.userData.cell=[c.r,c.c]),this.dyn.add(m),s.add(g),h&&(!u.object||u.object==="rug")){let _=`chalk|${l.id}`,E=this.cached(_,()=>Nd());E.position.set(p.x,d+.02,p.z),E.rotation.y=.35,this.dyn.add(E),s.add(_)}let M=`b|${l.id}|${l.name}|${l.color}|${h}|${f}|${!!this.opts.names}`,w=this.cached(M,()=>Ud(l,{victim:h,selected:f,name:!!this.opts.names}));w.position.set(p.x,d+(h?.72:Id*1.12+.16),p.z),this.marks.add(w),s.add(M)}for(let l of n.crosses??[]){let[c,h]=String(l).split(",").map(Number);if(!(c>=0&&c<e&&h>=0&&h<e))continue;let f=new nt(this.xGeo,this.xMat),u=li(e,c,h);f.position.set(u.x,.05,u.z),f.renderOrder=5,this.marks.add(f)}let a=n.highlight;this.highlight.visible=!!(a&&a.r>=0&&a.r<e&&a.c>=0&&a.c<e),this.highlight.visible&&this.highlight.position.copy(li(e,a.r,a.c));for(let[l,c]of this.cache)s.has(l)?c.age=0:++c.age>40&&(Aa(c.obj),this.cache.delete(l));this.faceCamera(),this.invalidate(!0)}cached(e,t){let n=this.cache.get(e);return n||this.cache.set(e,n={obj:t(),age:0}),n.obj}fit(e,t=!0){var T;let n=this.size.w,s=this.size.h;e=e??n/Math.max(1,s);let r=ci[this.opts.camera]??ci.iso,a=this.camera,l=(((T=this.board)==null?void 0:T.n)??6)*rt/2,c=l+Sn,h=[];for(let A of[-c,c])for(let R of[-c,c])h.push(new L(A,-Ea,R),new L(A,0,R));for(let A of[-l,l])for(let R of[-l,l])h.push(new L(A*.85,1.7,R*.85));let f=t?this.angles():r,u=Un(f.az),d=Un(f.el),p=new L(Math.sin(u)*Math.cos(d),Math.sin(d),Math.cos(u)*Math.cos(d)),y=new L(0,0,0),g=1-2*(this.opts.padding??.04),m=60,M=c*1.2;r.ortho||(a.fov=r.fov,a.oblique=r.skew??0,a.lean=r.lean??0,a.aspect=e,m=c/Math.tan(Un(r.fov)/2)*1.3);let w=Math.tan(Un(qf(f.el))),_=new Ze().set(1,-Math.sin(u)*w,0,0,0,1,0,0,0,-Math.cos(u)*w,1,0,0,0,0,1),E=null,S=()=>{r.ortho?(a.left=-M*e,a.right=M*e,a.top=M,a.bottom=-M,a.near=.1,a.far=200,a.position.copy(y).addScaledVector(p,60)):(a.position.copy(y).addScaledVector(p,m),a.focus=m,a.near=Math.max(.1,m*.2),a.far=m*3+50),a.up.set(0,1,0),a.lookAt(y),a.updateMatrixWorld(),E=w?new Ze().multiplyMatrices(a.matrixWorldInverse,_).multiply(a.matrixWorld):null,a.standUp=E,a.updateProjectionMatrix()},P=new L,x=new L;for(let A=0;A<6;A++){S();let R=1/0,D=-1/0,U=1/0,N=-1/0;for(let H of h)Ta.copy(H).project(a),R=Math.min(R,Ta.x),D=Math.max(D,Ta.x),U=Math.min(U,Ta.y),N=Math.max(N,Ta.y);let O=(R+D)/2,q=(U+N)/2,Y=Math.max((D-R)/2,(N-U)/2)/g;P.setFromMatrixColumn(a.matrixWorld,0),x.setFromMatrixColumn(a.matrixWorld,1);let te=r.ortho?M:m*Math.tan(Un(a.fov)/2);y.addScaledVector(P,O*te*e).addScaledVector(x,q*te),r.ortho?M*=Y:m*=Y}t&&(r.ortho?M/=this.user.zoom:m/=this.user.zoom,y.add(this.user.pan)),this.orientLabels(f),this.faceCamera(f.az),S(),this.unitsPerPx=2*(r.ortho?M:m*Math.tan(Un(a.fov)/2))/Math.max(1,this.size.h),this.invalidate()}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.size={w:e,h:t};let n=Math.min(window.devicePixelRatio||1,this.opts.maxPixelRatio);n!==this.renderer.getPixelRatio()&&(this.renderer.setPixelRatio(n),this.composer.setPixelRatio(n)),this.renderer.setSize(e,t,!1),this.composer.setSize(e,t),this.textMask.setSize(e*n,t*n),this.stylePass.uniforms.resolution.value.set(e*n,t*n),this.syncStyleUniforms(1),this.fit(),this.render()}invalidate(e=!1){e&&(this.shadowDirty=!0),!(this.raf||this.disposed)&&(this.raf=requestAnimationFrame(()=>{this.raf=0,this.render()}))}render(){var t;if(this.disposed)return;Ch.value=((t=this.look)==null?void 0:t.wobble)??1;let e=this.textMask.render(this.renderer,this.camera,this.scene,this.overlay);this.stylePass.uniforms.textKeep.value=e?qv:0,this.shadowDirty!==!1&&(this.renderer.shadowMap.needsUpdate=!0,this.shadowDirty=!1),this.renderPass.camera=this.overlayPass.camera=this.camera,this.composer.render()}bindEvents(){let e=this.renderer.domElement,t=new Map,n=null,s=null,r=null,a=new L,o=new L,l=(h,f)=>{a.setFromMatrixColumn(this.camera.matrixWorld,0).setY(0).normalize(),o.set(a.z,0,-a.x);let u=this.unitsPerPx??.01,d=Math.max(.35,Math.sin(Un(this.angles().el)));this.moveCamera({pan:a.multiplyScalar(-h*u).addScaledVector(o,f*u/d)})},c=()=>{let[h,f]=[...t.values()];return{d:Math.hypot(f.x-h.x,f.y-h.y),a:Math.atan2(f.y-h.y,f.x-h.x),x:(h.x+f.x)/2,y:(h.y+f.y)/2}};this.handlers={pointerdown:h=>{var f;t.set(h.pointerId,{x:h.clientX,y:h.clientY}),(f=e.setPointerCapture)==null||f.call(e,h.pointerId),cancelAnimationFrame(this.camRaf),t.size===1?(n={x:h.clientX,y:h.clientY,id:h.pointerId,pan:h.button===1||h.button===2||h.shiftKey||h.ctrlKey||h.metaKey||h.altKey},s=null):(n=null,s="pinch",r=c())},pointermove:h=>{let f=t.get(h.pointerId);if(!f){if(h.pointerType!=="mouse"||(this.lastMove=h,this.moveRaf))return;this.moveRaf=requestAnimationFrame(()=>{this.moveRaf=0,this.setHover(this.pickCell(this.lastMove))});return}let u=h.clientX-f.x,d=h.clientY-f.y;if(f.x=h.clientX,f.y=h.clientY,s==="pinch"&&t.size>=2){let p=c(),y=(p.a-r.a)*180/Math.PI;y-=Math.round(y/360)*360,this.moveCamera({zoom:r.d>0?p.d/r.d:1,az:-y}),l(p.x-r.x,p.y-r.y),r=p;return}!s&&n&&Math.hypot(h.clientX-n.x,h.clientY-n.y)>6&&(s=n.pan?"pan":"orbit",this.setHover(null),e.style.cursor=s==="pan"?"move":"grabbing"),s==="orbit"?this.moveCamera({az:-u*.35,el:d*.25}):s==="pan"&&l(u,d)},pointerup:h=>this.handlers.pointercancel(h,!0),pointercancel:(h,f=!1)=>{if(!t.delete(h.pointerId))return;let u=f&&(n==null?void 0:n.id)===h.pointerId&&!s&&!n.pan&&Math.hypot(h.clientX-n.x,h.clientY-n.y)<=12;if(t.size?s="done":(s=null,n=null,e.style.cursor=""),!u)return;let d=this.pickCell(h);d&&this.onCell&&this.onCell(d.r,d.c,h)},pointerleave:()=>this.setHover(null),wheel:h=>{h.preventDefault(),cancelAnimationFrame(this.camRaf),this.moveCamera({zoom:Math.exp(-h.deltaY*(h.deltaMode?.05:.0015))})},contextmenu:h=>h.preventDefault()};for(let[h,f]of Object.entries(this.handlers))e.addEventListener(h,f,h==="wheel"?{passive:!1}:void 0)}setHover(e){let t=e?`${e.r},${e.c}`:"";t!==this.hoverKey&&(this.hoverKey=t,this.renderer.domElement.style.cursor=e?"pointer":"",this.hover.visible=!!e&&!!this.board,this.hover.visible&&this.hover.position.copy(li(this.board.n,e.r,e.c)).setY(.02),this.invalidate())}pickCell(e){var d;if(!this.board)return null;let t=this.renderer.domElement.getBoundingClientRect(),n=Wf({x:(e.clientX-t.left)/t.width,y:1-(e.clientY-t.top)/t.height},((d=this.look)==null?void 0:d.lens)??0,t.width/t.height),s=new Xr,r=this.camera;r.updateMatrixWorld();let a=new L(n.x*2-1,n.y*2-1,-1).unproject(r),o=new L(n.x*2-1,n.y*2-1,1).unproject(r);s.set(a,o.sub(a).normalize()),s.camera=r;let l=s.intersectObjects([...this.pickables,...this.dyn.children],!0);for(let p of l)if(p.object.userData.cell)return{r:p.object.userData.cell[0],c:p.object.userData.cell[1]};let c=new L;if(!s.ray.intersectPlane(new ln(new L(0,1,0),0),c))return null;let h=this.board.n,f=Math.floor(c.x/rt+h/2),u=Math.floor(c.z/rt+h/2);return u>=0&&u<h&&f>=0&&f<h?{r:u,c:f}:null}async toCanvas({width:e=1600,height:t,transparent:n=!1}={}){let{w:s,h:r}=this.size;e=Math.round(e),t=Math.round(t??e*r/Math.max(1,s));let a=this.renderer.getContext(),o=Math.min(a.getParameter(a.MAX_RENDERBUFFER_SIZE),a.getParameter(a.MAX_TEXTURE_SIZE),...a.getParameter(a.MAX_VIEWPORT_DIMS)),l=Math.min(1,o/Math.max(e,t)),c=Math.floor(e*l),h=Math.floor(t*l),f=this.renderer.getPixelRatio(),u=this.hover.visible;this.hover.visible=!1,this.renderer.setPixelRatio(1),this.composer.setPixelRatio(1),this.renderer.setSize(c,h,!1),this.composer.setSize(c,h),this.textMask.setSize(c,h),this.stylePass.uniforms.resolution.value.set(c,h),this.syncStyleUniforms(Math.max(1,Math.min(c,h)/900)),this.fit(c/h,!1);let d=this.scene.background;n&&(this.scene.background=null,this.renderer.setClearColor(0,0),this.stylePass.uniforms.alphaOut.value=1),this.shadowDirty=!0,this.render();let p=document.createElement("canvas");return p.width=c,p.height=h,p.getContext("2d").drawImage(this.renderer.domElement,0,0),this.scene.background=d,this.stylePass.uniforms.alphaOut.value=0,this.hover.visible=u,this.renderer.setPixelRatio(f),this.composer.setPixelRatio(f),this.resize(),p}dispose(){if(this.disposed)return;this.disposed=!0,this.raf&&cancelAnimationFrame(this.raf),this.moveRaf&&cancelAnimationFrame(this.moveRaf),cancelAnimationFrame(this.camRaf),this.ro.disconnect();let e=this.renderer.domElement;for(let[t,n]of Object.entries(this.handlers??{}))e.removeEventListener(t,n);this.clearBoard();for(let{obj:t}of this.cache.values())Aa(t);this.cache.clear(),Aa(this.scene),Aa(this.overlay),this.xGeo.dispose(),this.xMat.dispose();for(let t of this.owned)t.dispose();this.envRT.dispose(),this.textMask.dispose(),this.disposeComposer(),this.renderer.dispose(),this.renderer.forceContextLoss(),e.remove()}};function Aa(i){i.traverse(e=>{var n,s;_d(e),e.geometry&&!e.isSprite&&e.geometry.dispose();let t=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(let r of t)(n=r.userData)!=null&&n.shared||(r.map&&!((s=r.map.userData)!=null&&s.shared)&&!r.map.isRenderTargetTexture&&r.map.dispose(),r.dispose())})}var Ca=null;function yb(){var i;if(Ca!==null)return Ca;try{let e=document.createElement("canvas"),t=e.getContext("webgl2")||e.getContext("webgl");Ca=!!t,(i=t==null?void 0:t.getExtension("WEBGL_lose_context"))==null||i.loseContext()}catch{Ca=!1}return Ca}var Mb=Object.entries(fa).map(([i,e])=>({id:i,label:e.label})),Sb=Object.keys(da);async function bb(i,e={}){if(!i)throw new Error("murdoku3d: container required");return new Ra(i,e)}async function wb(i,{show:e="blank",placements:t,crosses:n,selected:s,highlight:r,look:a,mood:o,camera:l,labels:c,roomLabels:h,names:f,clutter:u,width:d=1600,height:p,transparent:y=!1}={}){p=p??d;let g=document.createElement("div");g.style.cssText=`position:fixed;left:-20000px;top:0;width:${Math.min(d,1200)}px;height:${Math.round(Math.min(d,1200)*p/d)}px;pointer-events:none;`,document.body.appendChild(g);let m={interactive:!1};for(let[w,_]of Object.entries({look:a,mood:o,camera:l,labels:c,roomLabels:h,names:f,clutter:u}))_!==void 0&&(m[w]=_);let M=new Ra(g,m);try{return M.setPuzzle(i,{show:e,placements:t,crosses:n,selected:s,highlight:r}),await M.toCanvas({width:d,height:p,transparent:y})}finally{M.dispose(),g.remove()}}export{Mb as LOOKS,Sb as MOODS,bb as createView,wb as renderImage,yb as supported};

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
var Jh=0,rl=1,jh=2;var ha=1,Kh=2,Gi=3,fi=0,Qt=1,An=2,zt=0,Qs=1,al=2,ol=3,cl=4,o0=5;var Rn=100,Qh=101,ef=102,tf=103,nf=104,os=200,sf=201,rf=202,af=203,ll=204,hl=205,fa=206,of=207,ua=208,cf=209,lf=210,hf=211,ff=212,uf=213,df=214,Ao=0,Ro=1,Co=2,Os=3,Po=4,Io=5,Lo=6,Do=7,c0=0,pf=1,mf=2,Wn=0,da=1,pa=2,ma=3,ga=4,xa=5,ya=6,cs=7;var fl=300,Wi=301,ls=302,l0=303,h0=304,_a=306,En=1e3,ti=1001,No=1002,Bt=1003,gf=1004;var va=1005;var jt=1006,f0=1007;var Xi=1008;var on=1009,ul=1010,dl=1011,er=1012,u0=1013,Xn=1014,Cn=1015,$t=1016,d0=1017,p0=1018,qi=1020,pl=35902,ml=35899,gl=1021,xl=1022,xn=1023,ii=1026,ui=1027,m0=1028,g0=1029,Yi=1030,x0=1031;var y0=1033,Ma=33776,ba=33777,Sa=33778,wa=33779,_0=35840,v0=35841,M0=35842,b0=35843,S0=36196,w0=37492,T0=37496,E0=37488,A0=37489,Ta=37490,R0=37491,C0=37808,P0=37809,I0=37810,L0=37811,D0=37812,N0=37813,U0=37814,F0=37815,k0=37816,O0=37817,B0=37818,z0=37819,V0=37820,H0=37821,G0=36492,W0=36494,X0=36495,q0=36283,Y0=36284,Ea=36285,Z0=36286;var Pr=2300,Uo=2301,To=2302,qc=2303,Yc=2400,Zc=2401,$c=2402;var xf=3200,yl=3201;var tr=0,yf=1,Ti="",Ct="srgb",Ir="srgb-linear",Lr="linear",xt="srgb";var Eo=7680;var _f=519,vf=512,Mf=513,bf=514,$0=515,Sf=516,wf=517,J0=518,Tf=519,_l=35044;var vl="300 es",zn=2e3,Bs=2001;function yd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function _d(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ef(){let n=Dr("canvas");return n.style.display="block",n}var gh={},zs=null;function Nr(...n){let e="THREE."+n.shift();zs?zs("log",e,...n):console.log(e,...n)}function Af(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function $e(...n){n=Af(n);let e="THREE."+n.shift();if(zs)zs("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ze(...n){n=Af(n);let e="THREE."+n.shift();if(zs)zs("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ss(...n){let e=n.join(" ");e in gh||(gh[e]=!0,$e(...n))}function Rf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Cf={[Ao]:Ro,[Co]:Lo,[Po]:Do,[Os]:Io,[Ro]:Ao,[Lo]:Co,[Do]:Po,[Io]:Os},si=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xh=1234567,Er=Math.PI/180,Vs=180/Math.PI;function ni(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function Ml(n,e){return(n%e+e)%e}function vd(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Md(n,e,t){return n!==e?(t-n)/(e-n):0}function Ar(n,e,t){return(1-t)*n+t*e}function bd(n,e,t,i){return Ar(n,e,1-Math.exp(-t*i))}function Sd(n,e=1){return e-Math.abs(Ml(n,e*2)-e)}function wd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Td(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ed(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ad(n,e){return n+Math.random()*(e-n)}function Rd(n){return n*(.5-Math.random())}function Cd(n){n!==void 0&&(xh=n);let e=xh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pd(n){return n*Er}function Id(n){return n*Vs}function Ld(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Dd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Nd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ud(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),f=r((e-i)/2),u=a((e-i)/2),d=r((i-e)/2),p=a((i-e)/2);switch(s){case"XYX":n.set(o*h,c*f,c*u,o*l);break;case"YZY":n.set(c*u,o*h,c*f,o*l);break;case"ZXZ":n.set(c*f,c*u,o*h,o*l);break;case"XZX":n.set(o*h,c*p,c*d,o*l);break;case"YXY":n.set(c*d,o*h,c*p,o*l);break;case"ZYZ":n.set(c*p,c*d,o*h,o*l);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Mt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var en={DEG2RAD:Er,RAD2DEG:Vs,generateUUID:ni,clamp:lt,euclideanModulo:Ml,mapLinear:vd,inverseLerp:Md,lerp:Ar,damp:bd,pingpong:Sd,smoothstep:wd,smootherstep:Td,randInt:Ed,randFloat:Ad,randFloatSpread:Rd,seededRandom:Cd,degToRad:Pd,radToDeg:Id,isPowerOfTwo:Ld,ceilPowerOfTwo:Dd,floorPowerOfTwo:Nd,setQuaternionFromProperEuler:Ud,normalize:Mt,denormalize:Bn},Al=class Al{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Al.prototype.isVector2=!0;var oe=Al,ri=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],f=i[s+3],u=r[a+0],d=r[a+1],p=r[a+2],_=r[a+3];if(f!==_||c!==u||l!==d||h!==p){let g=c*u+l*d+h*p+f*_;g<0&&(u=-u,d=-d,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){let M=Math.acos(g),S=Math.sin(M);m=Math.sin(m*M)/S,o=Math.sin(o*M)/S,c=c*m+u*o,l=l*m+d*o,h=h*m+p*o,f=f*m+_*o}else{c=c*m+u*o,l=l*m+d*o,h=h*m+p*o,f=f*m+_*o;let M=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=M,l*=M,h*=M,f*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],f=r[a],u=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+h*f+c*d-l*u,e[t+1]=c*p+h*u+l*f-o*d,e[t+2]=l*p+h*d+o*u-c*f,e[t+3]=h*p-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),f=o(r/2),u=c(i/2),d=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"YZX":this._x=u*h*f+l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f-u*d*p;break;case"XZY":this._x=u*h*f-l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f+u*d*p;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=i+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(i>o&&i>f){let d=2*Math.sqrt(1+i-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>f){let d=2*Math.sqrt(1+o-i-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+f-i-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Rl=class Rl{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+c*l+a*f-o*h,this.y=i+c*h+o*l-r*f,this.z=s+c*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Mc.copy(this).projectOnVector(e),this.sub(Mc)}reflect(e){return this.sub(Mc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Rl.prototype.isVector3=!0;var L=Rl,Mc=new L,yh=new ri,Cl=class Cl{constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],u=i[2],d=i[5],p=i[8],_=s[0],g=s[3],m=s[6],M=s[1],S=s[4],x=s[7],T=s[2],b=s[5],P=s[8];return r[0]=a*_+o*M+c*T,r[3]=a*g+o*S+c*b,r[6]=a*m+o*x+c*P,r[1]=l*_+h*M+f*T,r[4]=l*g+h*S+f*b,r[7]=l*m+h*x+f*P,r[2]=u*_+d*M+p*T,r[5]=u*g+d*S+p*b,r[8]=u*m+d*x+p*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,p=t*f+i*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=f*_,e[1]=(s*l-h*i)*_,e[2]=(o*i-s*a)*_,e[3]=u*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=d*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ss("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(bc.makeScale(e,t)),this}rotate(e){return ss("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(bc.makeRotation(-e)),this}translate(e,t){return ss("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(bc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Cl.prototype.isMatrix3=!0;var et=Cl,bc=new et,_h=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vh=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fd(){let n={enabled:!0,workingColorSpace:Ir,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xt&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(s.r=ks(s.r),s.g=ks(s.g),s.b=ks(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?Lr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ir]:{primaries:e,whitePoint:i,transfer:Lr,toXYZ:_h,fromXYZ:vh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:i,transfer:xt,toXYZ:_h,fromXYZ:vh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),n}var ut=Fd();function bi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ks(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var _s,Fo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{_s===void 0&&(_s=Dr("canvas")),_s.width=e.width,_s.height=e.height;let s=_s.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=_s}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Dr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bi(t[i]/255)*255):t[i]=bi(t[i]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},kd=0,Hs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=ni(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sc(s[a].image)):r.push(Sc(s[a]))}else r=Sc(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Sc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}var Od=0,wc=new L,fn=class n extends si{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=ti,s=ti,r=jt,a=Xi,o=xn,c=on,l=n.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=ni(),this.name="",this.source=new Hs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wc).x}get height(){return this.source.getSize(wc).y}get depth(){return this.source.getSize(wc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case En:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case No:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case En:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case No:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=fl;fn.DEFAULT_ANISOTROPY=1;var Pl=class Pl{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(l+1)/2,x=(d+1)/2,T=(m+1)/2,b=(h+u)/4,P=(f+_)/4,y=(p+g)/4;return S>x&&S>T?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=b/i,r=P/i):x>T?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=b/s,r=y/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=P/r,s=y/r),this.set(i,s,r,t),this}let M=Math.sqrt((g-p)*(g-p)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Pl.prototype.isVector4=!0;var It=Pl,ko=class extends si{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new fn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Hs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nt=class extends ko{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ur=class extends fn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oo=class extends fn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var a0=class a0{constructor(e,t,i,s,r,a,o,c,l,h,f,u,d,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,f,u,d,p,_,g)}set(e,t,i,s,r,a,o,c,l,h,f,u,d,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new a0().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),a=1/vs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*h,d=a*f,p=o*h,_=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+p*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=p+d*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,d=c*f,p=l*h,_=l*f;t[0]=u+_*o,t[4]=p*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-p,t[6]=_+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,d=c*f,p=l*h,_=l*f;t[0]=u-_*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,d=a*f,p=o*h,_=o*f;t[0]=c*h,t[4]=p*l-d,t[8]=u*l+_,t[1]=c*f,t[5]=_*l+u,t[9]=d*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,d=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=_-u*f,t[8]=p*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+p,t[10]=u-_*f}else if(e.order==="XZY"){let u=a*c,d=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+_,t[5]=a*h,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bd,e,zd)}lookAt(e,t,i){let s=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Li.crossVectors(i,yn),Li.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Li.crossVectors(i,yn)),Li.normalize(),Qa.crossVectors(yn,Li),s[0]=Li.x,s[4]=Qa.x,s[8]=yn.x,s[1]=Li.y,s[5]=Qa.y,s[9]=yn.y,s[2]=Li.z,s[6]=Qa.z,s[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],u=i[9],d=i[13],p=i[2],_=i[6],g=i[10],m=i[14],M=i[3],S=i[7],x=i[11],T=i[15],b=s[0],P=s[4],y=s[8],E=s[12],A=s[1],R=s[5],D=s[9],F=s[13],N=s[2],k=s[6],q=s[10],Y=s[14],ne=s[3],H=s[7],J=s[11],Z=s[15];return r[0]=a*b+o*A+c*N+l*ne,r[4]=a*P+o*R+c*k+l*H,r[8]=a*y+o*D+c*q+l*J,r[12]=a*E+o*F+c*Y+l*Z,r[1]=h*b+f*A+u*N+d*ne,r[5]=h*P+f*R+u*k+d*H,r[9]=h*y+f*D+u*q+d*J,r[13]=h*E+f*F+u*Y+d*Z,r[2]=p*b+_*A+g*N+m*ne,r[6]=p*P+_*R+g*k+m*H,r[10]=p*y+_*D+g*q+m*J,r[14]=p*E+_*F+g*Y+m*Z,r[3]=M*b+S*A+x*N+T*ne,r[7]=M*P+S*R+x*k+T*H,r[11]=M*y+S*D+x*q+T*J,r[15]=M*E+S*F+x*Y+T*Z,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15],M=c*d-l*u,S=o*d-l*f,x=o*u-c*f,T=a*d-l*h,b=a*u-c*h,P=a*f-o*h;return t*(_*M-g*S+m*x)-i*(p*M-g*T+m*b)+s*(p*S-_*T+m*P)-r*(p*x-_*b+g*P)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],M=t*o-i*a,S=t*c-s*a,x=t*l-r*a,T=i*c-s*o,b=i*l-r*o,P=s*l-r*c,y=h*_-f*p,E=h*g-u*p,A=h*m-d*p,R=f*g-u*_,D=f*m-d*_,F=u*m-d*g,N=M*F-S*D+x*R+T*A-b*E+P*y;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/N;return e[0]=(o*F-c*D+l*R)*k,e[1]=(s*D-i*F-r*R)*k,e[2]=(_*P-g*b+m*T)*k,e[3]=(u*b-f*P-d*T)*k,e[4]=(c*A-a*F-l*E)*k,e[5]=(t*F-s*A+r*E)*k,e[6]=(g*x-p*P-m*S)*k,e[7]=(h*P-u*x+d*S)*k,e[8]=(a*D-o*A+l*y)*k,e[9]=(i*A-t*D-r*y)*k,e[10]=(p*b-_*x+m*M)*k,e[11]=(f*x-h*b-d*M)*k,e[12]=(o*E-a*R-c*y)*k,e[13]=(t*R-i*E+s*y)*k,e[14]=(_*S-p*T-g*M)*k,e[15]=(h*T-f*S+u*M)*k,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,p=r*f,_=a*h,g=a*f,m=o*f,M=c*l,S=c*h,x=c*f,T=i.x,b=i.y,P=i.z;return s[0]=(1-(_+m))*T,s[1]=(d+x)*T,s[2]=(p-S)*T,s[3]=0,s[4]=(d-x)*b,s[5]=(1-(u+m))*b,s[6]=(g+M)*b,s[7]=0,s[8]=(p+S)*P,s[9]=(g-M)*P,s[10]=(1-(u+_))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=vs.set(s[0],s[1],s[2]).length(),o=vs.set(s[4],s[5],s[6]).length(),c=vs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Fn.copy(this);let l=1/a,h=1/o,f=1/c;return Fn.elements[0]*=l,Fn.elements[1]*=l,Fn.elements[2]*=l,Fn.elements[4]*=h,Fn.elements[5]*=h,Fn.elements[6]*=h,Fn.elements[8]*=f,Fn.elements[9]*=f,Fn.elements[10]*=f,t.setFromRotationMatrix(Fn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=zn,c=!1){let l=this.elements,h=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),d=(i+s)/(i-s),p,_;if(c)p=r/(a-r),_=a*r/(a-r);else if(o===zn)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Bs)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=zn,c=!1){let l=this.elements,h=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),d=-(i+s)/(i-s),p,_;if(c)p=1/(a-r),_=a/(a-r);else if(o===zn)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===Bs)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};a0.prototype.isMatrix4=!0;var tt=a0,vs=new L,Fn=new tt,Bd=new L(0,0,0),zd=new L(1,1,1),Li=new L,Qa=new L,yn=new L,Mh=new tt,bh=new ri,ai=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-lt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Mh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bh.setFromEuler(this),this.setFromQuaternion(bh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ai.DEFAULT_ORDER="XYZ";var Gs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Vd=0,Sh=new L,Ms=new ri,gi=new tt,eo=new L,gr=new L,Hd=new L,Gd=new ri,wh=new L(1,0,0),Th=new L(0,1,0),Eh=new L(0,0,1),Ah={type:"added"},Wd={type:"removed"},bs={type:"childadded",child:null},Tc={type:"childremoved",child:null},Wt=class n extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new L,t=new ai,i=new ri,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new tt},normalMatrix:{value:new et}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(wh,e)}rotateY(e){return this.rotateOnAxis(Th,e)}rotateZ(e){return this.rotateOnAxis(Eh,e)}translateOnAxis(e,t){return Sh.copy(e).applyQuaternion(this.quaternion),this.position.add(Sh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wh,e)}translateY(e){return this.translateOnAxis(Th,e)}translateZ(e){return this.translateOnAxis(Eh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?eo.copy(e):eo.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(gr,eo,this.up):gi.lookAt(eo,gr,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(gi),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ah),bs.child=e,this.dispatchEvent(bs),bs.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wd),Tc.child=e,this.dispatchEvent(Tc),Tc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ah),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,Hd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,Gd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Wt.DEFAULT_UP=new L(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dt=class extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xd={type:"move"},Ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,i),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&u>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Dt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},to={h:0,s:0,l:0};function Ec(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Re=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ut.workingColorSpace){if(e=Ml(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ec(a,r,e+1/3),this.g=Ec(a,r,e),this.b=Ec(a,r,e-1/3)}return ut.colorSpaceToWorking(this,s),this}setStyle(e,t=Ct){function i(r){r!==void 0&&parseFloat(r)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){let i=Pf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return ut.workingToColorSpace(rn.copy(this),e),Math.round(lt(rn.r*255,0,255))*65536+Math.round(lt(rn.g*255,0,255))*256+Math.round(lt(rn.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(rn.copy(this),t);let i=rn.r,s=rn.g,r=rn.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=Ct){ut.workingToColorSpace(rn.copy(this),e);let t=rn.r,i=rn.g,s=rn.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(to);let i=Ar(Di.h,to.h,t),s=Ar(Di.s,to.s,t),r=Ar(Di.l,to.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new Re;Re.NAMES=Pf;var ki=class extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ai,this.environmentIntensity=1,this.environmentRotation=new ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},kn=new L,xi=new L,Ac=new L,yi=new L,Ss=new L,ws=new L,Rh=new L,Rc=new L,Cc=new L,Pc=new L,Ic=new It,Lc=new It,Dc=new It,Mi=class n{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),kn.subVectors(e,t),s.cross(kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){kn.subVectors(s,t),xi.subVectors(i,t),Ac.subVectors(e,t);let a=kn.dot(kn),o=kn.dot(xi),c=kn.dot(Ac),l=xi.dot(xi),h=xi.dot(Ac),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(l*c-o*h)*u,p=(a*h-o*c)*u;return r.set(1-d-p,p,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,yi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yi.x),c.addScaledVector(a,yi.y),c.addScaledVector(o,yi.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ic.setScalar(0),Lc.setScalar(0),Dc.setScalar(0),Ic.fromBufferAttribute(e,t),Lc.fromBufferAttribute(e,i),Dc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ic,r.x),a.addScaledVector(Lc,r.y),a.addScaledVector(Dc,r.z),a}static isFrontFacing(e,t,i,s){return kn.subVectors(i,t),xi.subVectors(e,t),kn.cross(xi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),kn.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Ss.subVectors(s,i),ws.subVectors(r,i),Rc.subVectors(e,i);let c=Ss.dot(Rc),l=ws.dot(Rc);if(c<=0&&l<=0)return t.copy(i);Cc.subVectors(e,s);let h=Ss.dot(Cc),f=ws.dot(Cc);if(h>=0&&f<=h)return t.copy(s);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Ss,a);Pc.subVectors(e,r);let d=Ss.dot(Pc),p=ws.dot(Pc);if(p>=0&&d<=p)return t.copy(r);let _=d*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(i).addScaledVector(ws,o);let g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return Rh.subVectors(r,s),o=(f-h)/(f-h+(d-p)),t.copy(s).addScaledVector(Rh,o);let m=1/(g+_+u);return a=_*m,o=u*m,t.copy(i).addScaledVector(Ss,a).addScaledVector(ws,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},oi=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),no.copy(i.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),io.subVectors(this.max,xr),Ts.subVectors(e.a,xr),Es.subVectors(e.b,xr),As.subVectors(e.c,xr),Ni.subVectors(Es,Ts),Ui.subVectors(As,Es),Qi.subVectors(Ts,As);let t=[0,-Ni.z,Ni.y,0,-Ui.z,Ui.y,0,-Qi.z,Qi.y,Ni.z,0,-Ni.x,Ui.z,0,-Ui.x,Qi.z,0,-Qi.x,-Ni.y,Ni.x,0,-Ui.y,Ui.x,0,-Qi.y,Qi.x,0];return!Nc(t,Ts,Es,As,io)||(t=[1,0,0,0,1,0,0,0,1],!Nc(t,Ts,Es,As,io))?!1:(so.crossVectors(Ni,Ui),t=[so.x,so.y,so.z],Nc(t,Ts,Es,As,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},_i=[new L,new L,new L,new L,new L,new L,new L,new L],On=new L,no=new oi,Ts=new L,Es=new L,As=new L,Ni=new L,Ui=new L,Qi=new L,xr=new L,io=new L,so=new L,es=new L;function Nc(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){es.fromArray(n,r);let o=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),c=e.dot(es),l=t.dot(es),h=i.dot(es);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Ht=new L,ro=new oe,qd=0,Ot=class extends si{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=_l,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ro.fromBufferAttribute(this,t),ro.applyMatrix3(e),this.setXY(t,ro.x,ro.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Mt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),i=Mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),i=Mt(i,this.array),s=Mt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),i=Mt(i,this.array),s=Mt(s,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Fr=class extends Ot{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var kr=class extends Ot{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var nt=class extends Ot{constructor(e,t,i){super(new Float32Array(e),t,i)}},Yd=new oi,yr=new L,Uc=new L,Oi=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Yd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yr.subVectors(e,this.center);let t=yr.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(yr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yr.copy(e.center).add(Uc)),this.expandByPoint(yr.copy(e.center).sub(Uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Zd=0,Tn=new tt,Fc=new Wt,Rs=new L,_n=new oi,_r=new oi,Zt=new L,Pt=class n extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yd(e)?kr:Fr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new et().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return Fc.lookAt(e),Fc.updateMatrix(),this.applyMatrix4(Fc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(_n.min,_r.min),_n.expandByPoint(Zt),Zt.addVectors(_n.max,_r.max),_n.expandByPoint(Zt)):(_n.expandByPoint(_r.min),_n.expandByPoint(_r.max))}_n.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Zt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Zt.fromBufferAttribute(o,l),c&&(Rs.fromBufferAttribute(e,l),Zt.add(Rs)),s=Math.max(s,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ot(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<i.count;y++)o[y]=new L,c[y]=new L;let l=new L,h=new L,f=new L,u=new oe,d=new oe,p=new oe,_=new L,g=new L;function m(y,E,A){l.fromBufferAttribute(i,y),h.fromBufferAttribute(i,E),f.fromBufferAttribute(i,A),u.fromBufferAttribute(r,y),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,A),h.sub(l),f.sub(l),d.sub(u),p.sub(u);let R=1/(d.x*p.y-p.x*d.y);isFinite(R)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(R),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(R),o[y].add(_),o[E].add(_),o[A].add(_),c[y].add(g),c[E].add(g),c[A].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,E=M.length;y<E;++y){let A=M[y],R=A.start,D=A.count;for(let F=R,N=R+D;F<N;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let S=new L,x=new L,T=new L,b=new L;function P(y){T.fromBufferAttribute(s,y),b.copy(T);let E=o[y];S.copy(E),S.sub(T.multiplyScalar(T.dot(E))).normalize(),x.crossVectors(b,E);let R=x.dot(c[y])<0?-1:1;a.setXYZW(y,S.x,S.y,S.z,R)}for(let y=0,E=M.length;y<E;++y){let A=M[y],R=A.start,D=A.count;for(let F=R,N=R+D;F<N;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,f=new L;if(e)for(let u=0,d=e.count;u<d;u+=3){let p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,p),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),o.add(h),c.add(h),l.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h),d=0,p=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let m=0;m<h;m++)u[p++]=l[d++]}return new Ot(u,h,f)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,i);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let u=l[h],d=e(u,i);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Or=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_l,this.updateRanges=[],this.version=0,this.uuid=ni()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ni()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},hn=new L,Xs=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Bn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Mt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),i=Mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),i=Mt(i,this.array),s=Mt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),i=Mt(i,this.array),s=Mt(s,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Nr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Nr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},kc=new L,$d=new L,Jd=new et,vn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=kc.subVectors(i,t).cross($d.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(kc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Jd.getNormalMatrix(e),s=this.coplanarPoint(kc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},jd=0,Vn=class extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Qs,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ll,this.blendDst=hl,this.blendEquation=Rn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_f,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Eo,this.stencilZFail=Eo,this.stencilZPass=Eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new vn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new oe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bi=class extends Vn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Cs,vr=new L,Ps=new L,Is=new L,Ls=new oe,Mr=new oe,If=new tt,ao=new L,br=new L,oo=new L,Ch=new oe,Oc=new oe,Ph=new oe,Br=class extends Wt{constructor(e=new Bi){if(super(),this.isSprite=!0,this.type="Sprite",Cs===void 0){Cs=new Pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Or(t,5);Cs.setIndex([0,1,2,0,2,3]),Cs.setAttribute("position",new Xs(i,3,0,!1)),Cs.setAttribute("uv",new Xs(i,2,3,!1))}this.geometry=Cs,this.material=e,this.center=new oe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ze('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ps.setFromMatrixScale(this.matrixWorld),If.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ps.multiplyScalar(-Is.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;co(ao.set(-.5,-.5,0),Is,a,Ps,s,r),co(br.set(.5,-.5,0),Is,a,Ps,s,r),co(oo.set(.5,.5,0),Is,a,Ps,s,r),Ch.set(0,0),Oc.set(1,0),Ph.set(1,1);let o=e.ray.intersectTriangle(ao,br,oo,!1,vr);if(o===null&&(co(br.set(-.5,.5,0),Is,a,Ps,s,r),Oc.set(0,1),o=e.ray.intersectTriangle(ao,oo,br,!1,vr),o===null))return;let c=e.ray.origin.distanceTo(vr);c<e.near||c>e.far||t.push({distance:c,point:vr.clone(),uv:Mi.getInterpolation(vr,ao,br,oo,Ch,Oc,Ph,new oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function co(n,e,t,i,s,r){Ls.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Mr.x=r*Ls.x-s*Ls.y,Mr.y=s*Ls.x+r*Ls.y):Mr.copy(Ls),n.copy(e),n.x+=Mr.x,n.y+=Mr.y,n.applyMatrix4(If)}var vi=new L,Bc=new L,lo=new L,ho=new L,zr=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,t),vi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Bc.copy(e).add(t).multiplyScalar(.5),lo.copy(t).sub(e).normalize(),ho.copy(this.origin).sub(Bc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(lo),o=ho.dot(this.direction),c=-ho.dot(lo),l=ho.lengthSq(),h=Math.abs(1-a*a),f,u,d,p;if(h>0)if(f=a*c-o,u=a*o-c,p=r*h,f>=0)if(u>=-p)if(u<=p){let _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Bc).addScaledVector(lo,u),d}intersectSphere(e,t){if(e.radius<0)return null;vi.subVectors(e.center,this.origin);let i=vi.dot(this.direction),s=vi.dot(vi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,p=t.x-a.x,_=t.y-a.y,g=t.z-a.z,m=i.x-a.x,M=i.y-a.y,S=i.z-a.z,x=Math.abs(c),T=Math.abs(l),b=Math.abs(h),P,y,E,A,R,D,F,N,k,q,Y,ne;if(x>=T&&x>=b?(E=c,D=f,k=p,ne=m,c>=0?(P=l,y=h,A=u,R=d,F=_,N=g,q=M,Y=S):(P=h,y=l,A=d,R=u,F=g,N=_,q=S,Y=M)):T>=b?(E=l,D=u,k=_,ne=M,l>=0?(P=h,y=c,A=d,R=f,F=g,N=p,q=S,Y=m):(P=c,y=h,A=f,R=d,F=p,N=g,q=m,Y=S)):(E=h,D=d,k=g,ne=S,h>=0?(P=c,y=l,A=f,R=u,F=p,N=_,q=m,Y=M):(P=l,y=c,A=u,R=f,F=_,N=p,q=M,Y=m)),E===0)return null;let H=P/E,J=y/E,Z=1/E,Ce=A-H*D,Ee=R-J*D,ct=F-H*k,Ke=N-J*k,it=q-H*ne,I=Y-J*ne,B=it*Ke-I*ct,ee=Ce*I-Ee*it,ce=ct*Ee-Ke*Ce;if(s){if(B<0||ee<0||ce<0)return null}else if((B<0||ee<0||ce<0)&&(B>0||ee>0||ce>0))return null;let re=B+ee+ce;if(re===0)return null;let ge=Z*(B*D+ee*k+ce*ne);return(re>0?ge<0:ge>0)?null:this.at(ge/re,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends Vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=c0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ih=new tt,ts=new zr,fo=new Oi,Lh=new L,uo=new L,po=new L,mo=new L,zc=new L,go=new L,Dh=new L,xo=new L,ht=class extends Wt{constructor(e=new Pt,t=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){go.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(zc.fromBufferAttribute(f,e),a?go.addScaledVector(zc,h):go.addScaledVector(zc.sub(t),h))}t.add(go)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fo.copy(i.boundingSphere),fo.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(fo.containsPoint(ts.origin)===!1&&(ts.intersectSphere(fo,Lh)===null||ts.origin.distanceToSquared(Lh)>(e.far-e.near)**2))&&(Ih.copy(r).invert(),ts.copy(e.ray).applyMatrix4(Ih),!(i.boundingBox!==null&&ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let x=M,T=S;x<T;x+=3){let b=o.getX(x),P=o.getX(x+1),y=o.getX(x+2);s=yo(this,m,e,i,l,h,f,b,P,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){let M=o.getX(g),S=o.getX(g+1),x=o.getX(g+2);s=yo(this,a,e,i,l,h,f,M,S,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let x=M,T=S;x<T;x+=3){let b=x,P=x+1,y=x+2;s=yo(this,m,e,i,l,h,f,b,P,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){let M=g,S=g+1,x=g+2;s=yo(this,a,e,i,l,h,f,M,S,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Kd(n,e,t,i,s,r,a,o){let c;if(e.side===Qt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===fi,o),c===null)return null;xo.copy(o),xo.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(xo);return l<t.near||l>t.far?null:{distance:l,point:xo.clone(),object:n}}function yo(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,uo),n.getVertexPosition(c,po),n.getVertexPosition(l,mo);let h=Kd(n,e,t,i,uo,po,mo,Dh);if(h){let f=new L;Mi.getBarycoord(Dh,uo,po,mo,f),s&&(h.uv=Mi.getInterpolatedAttribute(s,o,c,l,f,new oe)),r&&(h.uv1=Mi.getInterpolatedAttribute(r,o,c,l,f,new oe)),a&&(h.normal=Mi.getInterpolatedAttribute(a,o,c,l,f,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new L,materialIndex:0};Mi.getNormal(uo,po,mo,u.normal),h.face=u,h.barycoord=f}return h}var Si=class extends fn{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Bt,h=Bt,f,u){super(null,a,o,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qs=class extends Ot{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ds=new tt,Nh=new tt,_o=[],Uh=new oi,Qd=new tt,Sr=new ht,wr=new Oi,Vr=class extends ht{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Qd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new oi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ds),Uh.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(Uh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ds),wr.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(i),e.ray.intersectsSphere(wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ds),Nh.multiplyMatrices(i,Ds),Sr.matrixWorld=Nh,Sr.raycast(e,_o);for(let a=0,o=_o.length;a<o;a++){let c=_o[a];c.instanceId=r,c.object=this,t.push(c)}_o.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Si(new Float32Array(s*this.count),s,this.count,m0,Cn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ns=new Oi,ep=new oe(.5,.5),vo=new L,Ys=class{constructor(e=new vn,t=new vn,i=new vn,s=new vn,r=new vn,a=new vn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],_=r[9],g=r[10],m=r[11],M=r[12],S=r[13],x=r[14],T=r[15];if(s[0].setComponents(l-a,d-h,m-p,T-M).normalize(),s[1].setComponents(l+a,d+h,m+p,T+M).normalize(),s[2].setComponents(l+o,d+f,m+_,T+S).normalize(),s[3].setComponents(l-o,d-f,m-_,T-S).normalize(),i)s[4].setComponents(c,u,g,x).normalize(),s[5].setComponents(l-c,d-u,m-g,T-x).normalize();else if(s[4].setComponents(l-c,d-u,m-g,T-x).normalize(),t===zn)s[5].setComponents(l+c,d+u,m+g,T+x).normalize();else if(t===Bs)s[5].setComponents(c,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){ns.center.set(0,0,0);let t=ep.distanceTo(e.center);return ns.radius=.7071067811865476+t,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(vo.x=s.normal.x>0?e.max.x:e.min.x,vo.y=s.normal.y>0?e.max.y:e.min.y,vo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(vo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Hr=class extends fn{constructor(e=[],t=Wi,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Kt=class extends fn{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ci=class extends fn{constructor(e,t,i=Xn,s,r,a,o=Bt,c=Bt,l,h=ii,f=1){if(h!==ii&&h!==ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Bo=class extends ci{constructor(e,t=Xn,i=Wi,s,r,a=Bt,o=Bt,c,l=ii){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Gr=class extends fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gn=class n extends Pt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,s,a,2),p("x","z","y",1,-1,e,i,-t,s,a,3),p("x","y","z",1,-1,e,t,i,s,r,4),p("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(f,2));function p(_,g,m,M,S,x,T,b,P,y,E){let A=x/P,R=T/y,D=x/2,F=T/2,N=b/2,k=P+1,q=y+1,Y=0,ne=0,H=new L;for(let J=0;J<q;J++){let Z=J*R-F;for(let Ce=0;Ce<k;Ce++){let Ee=Ce*A-D;H[_]=Ee*M,H[g]=Z*S,H[m]=N,l.push(H.x,H.y,H.z),H[_]=0,H[g]=0,H[m]=b>0?1:-1,h.push(H.x,H.y,H.z),f.push(Ce/P),f.push(1-J/y),Y+=1}}for(let J=0;J<y;J++)for(let Z=0;Z<P;Z++){let Ce=u+Z+k*J,Ee=u+Z+k*(J+1),ct=u+(Z+1)+k*(J+1),Ke=u+(Z+1)+k*J;c.push(Ce,Ee,Ke),c.push(Ee,ct,Ke),ne+=6}o.addGroup(d,ne,E),d+=ne,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Wr=class n extends Pt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new L,h=new oe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){let d=i+f/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Xr=class n extends Pt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,_=[],g=i/2,m=0;M(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new nt(f,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2));function M(){let x=new L,T=new L,b=0,P=(t-e)/i;for(let y=0;y<=r;y++){let E=[],A=y/r,R=A*(t-e)+e;for(let D=0;D<=s;D++){let F=D/s,N=F*c+o,k=Math.sin(N),q=Math.cos(N);T.x=R*k,T.y=-A*i+g,T.z=R*q,f.push(T.x,T.y,T.z),x.set(k,P,q).normalize(),u.push(x.x,x.y,x.z),d.push(F,1-A),E.push(p++)}_.push(E)}for(let y=0;y<s;y++)for(let E=0;E<r;E++){let A=_[E][y],R=_[E+1][y],D=_[E+1][y+1],F=_[E][y+1];(e>0||E!==0)&&(h.push(A,R,F),b+=3),(t>0||E!==r-1)&&(h.push(R,D,F),b+=3)}l.addGroup(m,b,0),m+=b}function S(x){let T=p,b=new oe,P=new L,y=0,E=x===!0?e:t,A=x===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,g*A,0),u.push(0,A,0),d.push(.5,.5),p++;let R=p;for(let D=0;D<=s;D++){let N=D/s*c+o,k=Math.cos(N),q=Math.sin(N);P.x=E*q,P.y=g*A,P.z=E*k,f.push(P.x,P.y,P.z),u.push(0,A,0),b.x=k*.5+.5,b.y=q*.5*A+.5,d.push(b.x,b.y),p++}for(let D=0;D<s;D++){let F=T+D,N=R+D;x===!0?h.push(N,N+1,F):h.push(N+1,N,F),y+=3}l.addGroup(m,y,x===!0?1:2),m+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var zo=class n extends Pt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],a=[];o(s),l(i),h(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let S=new L,x=new L,T=new L;for(let b=0;b<t.length;b+=3)d(t[b+0],S),d(t[b+1],x),d(t[b+2],T),c(S,x,T,M)}function c(M,S,x,T){let b=T+1,P=[];for(let y=0;y<=b;y++){P[y]=[];let E=M.clone().lerp(x,y/b),A=S.clone().lerp(x,y/b),R=b-y;for(let D=0;D<=R;D++)D===0&&y===b?P[y][D]=E:P[y][D]=E.clone().lerp(A,D/R)}for(let y=0;y<b;y++)for(let E=0;E<2*(b-y)-1;E++){let A=Math.floor(E/2);E%2===0?(u(P[y][A+1]),u(P[y+1][A]),u(P[y][A])):(u(P[y][A+1]),u(P[y+1][A+1]),u(P[y+1][A]))}}function l(M){let S=new L;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(M),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){let M=new L;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];let x=g(M)/2/Math.PI+.5,T=m(M)/Math.PI+.5;a.push(x,1-T)}p(),f()}function f(){for(let M=0;M<a.length;M+=6){let S=a[M+0],x=a[M+2],T=a[M+4],b=Math.max(S,x,T),P=Math.min(S,x,T);b>.9&&P<.1&&(S<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),T<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,S){let x=M*3;S.x=e[x+0],S.y=e[x+1],S.z=e[x+2]}function p(){let M=new L,S=new L,x=new L,T=new L,b=new oe,P=new oe,y=new oe;for(let E=0,A=0;E<r.length;E+=9,A+=6){M.set(r[E+0],r[E+1],r[E+2]),S.set(r[E+3],r[E+4],r[E+5]),x.set(r[E+6],r[E+7],r[E+8]),b.set(a[A+0],a[A+1]),P.set(a[A+2],a[A+3]),y.set(a[A+4],a[A+5]),T.copy(M).add(S).add(x).divideScalar(3);let R=g(T);_(b,A+0,M,R),_(P,A+2,S,R),_(y,A+4,x,R)}}function _(M,S,x,T){T<0&&M.x===1&&(a[S]=M.x-1),x.x===0&&x.z===0&&(a[S]=T/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.detail)}};var Mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$e("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),s=0,r=i.length,a;t?a=t:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);let h=i[s],u=i[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new oe:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new L,s=[],r=[],a=[],o=new L,c=new tt;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(lt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(lt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Zs=class extends Mn{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new oe){let i=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,d=l-this.aY;c=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Vo=class extends Zs{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function bl(){let n=0,e=0,t=0,i=0;function s(r,a,o,c){n=r,e=o,t=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,f){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+f)+(c-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return n+e*r+t*a+i*o}}}var Fh=new L,kh=new L,Vc=new bl,Hc=new bl,Gc=new bl,Ho=class extends Mn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new L){let i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(kh.subVectors(s[0],s[1]).add(s[0]),l=kh);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Fh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Fh),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Vc.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,p,_,g),Hc.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,p,_,g),Gc.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Vc.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Hc.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Gc.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return i.set(Vc.calc(c),Hc.calc(c),Gc.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Oh(n,e,t,i,s){let r=(i-e)*.5,a=(s-t)*.5,o=n*n,c=n*o;return(2*t-2*i+r+a)*c+(-3*t+3*i-2*r-a)*o+r*n+t}function tp(n,e){let t=1-n;return t*t*e}function np(n,e){return 2*(1-n)*n*e}function ip(n,e){return n*n*e}function Rr(n,e,t,i){return tp(n,e)+np(n,t)+ip(n,i)}function sp(n,e){let t=1-n;return t*t*t*e}function rp(n,e){let t=1-n;return 3*t*t*n*e}function ap(n,e){return 3*(1-n)*n*n*e}function op(n,e){return n*n*n*e}function Cr(n,e,t,i,s){return sp(n,e)+rp(n,t)+ap(n,i)+op(n,s)}var qr=class extends Mn{constructor(e=new oe,t=new oe,i=new oe,s=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new oe){let i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Cr(e,s.x,r.x,a.x,o.x),Cr(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Go=class extends Mn{constructor(e=new L,t=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new L){let i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Cr(e,s.x,r.x,a.x,o.x),Cr(e,s.y,r.y,a.y,o.y),Cr(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yr=class extends Mn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wo=class extends Mn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zr=class extends Mn{constructor(e=new oe,t=new oe,i=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new oe){let i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Rr(e,s.x,r.x,a.x),Rr(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xo=class extends Mn{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){let i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Rr(e,s.x,r.x,a.x),Rr(e,s.y,r.y,a.y),Rr(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$r=class extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(Oh(o,c.x,l.x,h.x,f.x),Oh(o,c.y,l.y,h.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new oe().fromArray(s))}return this}},Jc=Object.freeze({__proto__:null,ArcCurve:Vo,CatmullRomCurve3:Ho,CubicBezierCurve:qr,CubicBezierCurve3:Go,EllipseCurve:Zs,LineCurve:Yr,LineCurve3:Wo,QuadraticBezierCurve:Zr,QuadraticBezierCurve3:Xo,SplineCurve:$r}),qo=class extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Jc[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(new Jc[s.type]().fromJSON(s))}return this}},Jr=class extends qo{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Yr(this.currentPoint.clone(),new oe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){let r=new Zr(this.currentPoint.clone(),new oe(e,t),new oe(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){let o=new qr(this.currentPoint.clone(),new oe(e,t),new oe(i,s),new oe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new $r(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,s,r,a,o,c),this}absellipse(e,t,i,s,r,a,o,c){let l=new Zs(e,t,i,s,r,a,o,c);if(this.curves.length>0){let f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Hn=class extends Jr{constructor(e){super(e),this.uuid=ni(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let s=e.holes[t];this.holes.push(new Jr().fromJSON(s))}return this}};function cp(n,e,t=2){let i=e&&e.length,s=i?e[0]*t:n.length,r=Lf(n,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=dp(n,e,r,t)),n.length>80*t){o=n[0],c=n[1];let h=o,f=c;for(let u=t;u<s;u+=t){let d=n[u],p=n[u+1];d<o&&(o=d),p<c&&(c=p),d>h&&(h=d),p>f&&(f=p)}l=Math.max(h-o,f-c),l=l!==0?32767/l:0}return jr(r,a,t,o,c,l,0),a}function Lf(n,e,t,i,s){let r;if(s===wp(n,e,t,i)>0)for(let a=e;a<t;a+=i)r=Bh(a/i|0,n[a],n[a+1],r);else for(let a=t-i;a>=e;a-=i)r=Bh(a/i|0,n[a],n[a+1],r);return r&&$s(r,r.next)&&(Qr(r),r=r.next),r}function rs(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&($s(t,t.next)||Lt(t.prev,t,t.next)===0)){if(Qr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function jr(n,e,t,i,s,r,a){if(!n)return;!a&&r&&yp(n,i,s,r);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(r?hp(n,i,s,r):lp(n)){e.push(c.i,n.i,l.i),Qr(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=fp(rs(n),e),jr(n,e,t,i,s,r,2)):a===2&&up(n,e,t,i,s,r):jr(rs(n),e,t,i,s,r,1);break}}}function lp(n){let e=n.prev,t=n,i=n.next;if(Lt(e,t,i)>=0)return!1;let s=e.x,r=t.x,a=i.x,o=e.y,c=t.y,l=i.y,h=Math.min(s,r,a),f=Math.min(o,c,l),u=Math.max(s,r,a),d=Math.max(o,c,l),p=i.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=f&&p.y<=d&&Tr(s,o,r,c,a,l,p.x,p.y)&&Lt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function hp(n,e,t,i){let s=n.prev,r=n,a=n.next;if(Lt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,c,l),p=Math.min(h,f,u),_=Math.max(o,c,l),g=Math.max(h,f,u),m=jc(d,p,e,t,i),M=jc(_,g,e,t,i),S=n.prevZ,x=n.nextZ;for(;S&&S.z>=m&&x&&x.z<=M;){if(S.x>=d&&S.x<=_&&S.y>=p&&S.y<=g&&S!==s&&S!==a&&Tr(o,h,c,f,l,u,S.x,S.y)&&Lt(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==s&&x!==a&&Tr(o,h,c,f,l,u,x.x,x.y)&&Lt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=m;){if(S.x>=d&&S.x<=_&&S.y>=p&&S.y<=g&&S!==s&&S!==a&&Tr(o,h,c,f,l,u,S.x,S.y)&&Lt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=g&&x!==s&&x!==a&&Tr(o,h,c,f,l,u,x.x,x.y)&&Lt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function fp(n,e){let t=n;do{let i=t.prev,s=t.next.next;!$s(i,s)&&Nf(i,t,t.next,s)&&Kr(i,s)&&Kr(s,i)&&(e.push(i.i,t.i,s.i),Qr(t),Qr(t.next),t=n=s),t=t.next}while(t!==n);return rs(t)}function up(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Mp(a,o)){let c=Uf(a,o);a=rs(a,a.next),c=rs(c,c.next),jr(a,e,t,i,s,r,0),jr(c,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function dp(n,e,t,i){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*i,c=r<a-1?e[r+1]*i:n.length,l=Lf(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(vp(l))}s.sort(pp);for(let r=0;r<s.length;r++)t=mp(s[r],t);return t}function pp(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function mp(n,e){let t=gp(n,e);if(!t)return e;let i=Uf(t,n);return rs(i,i.next),rs(t,t.next)}function gp(n,e){let t=e,i=n.x,s=n.y,r=-1/0,a;if($s(n,t))return t;do{if($s(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(i>=t.x&&t.x>=c&&i!==t.x&&Df(s<l?i:r,s,c,l,s<l?r:i,s,t.x,t.y)){let f=Math.abs(s-t.y)/(i-t.x);Kr(t,n)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&xp(a,t)))&&(a=t,h=f)}t=t.next}while(t!==o);return a}function xp(n,e){return Lt(n.prev,n,e.prev)<0&&Lt(e.next,n,n.next)<0}function yp(n,e,t,i){let s=n;do s.z===0&&(s.z=jc(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,_p(s)}function _p(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,t*=2}while(e>1);return n}function jc(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function vp(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Df(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function Tr(n,e,t,i,s,r,a,o){return!(n===a&&e===o)&&Df(n,e,t,i,s,r,a,o)}function Mp(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!bp(n,e)&&(Kr(n,e)&&Kr(e,n)&&Sp(n,e)&&(Lt(n.prev,n,e.prev)||Lt(n,e.prev,e))||$s(n,e)&&Lt(n.prev,n,n.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function $s(n,e){return n.x===e.x&&n.y===e.y}function Nf(n,e,t,i){let s=bo(Lt(n,e,t)),r=bo(Lt(n,e,i)),a=bo(Lt(t,i,n)),o=bo(Lt(t,i,e));return!!(s!==r&&a!==o||s===0&&Mo(n,t,e)||r===0&&Mo(n,i,e)||a===0&&Mo(t,n,i)||o===0&&Mo(t,e,i))}function Mo(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function bo(n){return n>0?1:n<0?-1:0}function bp(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Nf(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Kr(n,e){return Lt(n.prev,n,n.next)<0?Lt(n,e,n.next)>=0&&Lt(n,n.prev,e)>=0:Lt(n,e,n.prev)<0||Lt(n,n.next,e)<0}function Sp(n,e){let t=n,i=!1,s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Uf(n,e){let t=Kc(n.i,n.x,n.y),i=Kc(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Bh(n,e,t,i){let s=Kc(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Qr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Kc(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wp(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Qc=class{static triangulate(e,t,i=2){return cp(e,t,i)}},is=class n{static area(e){let t=e.length,i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],s=[],r=[];zh(e),Vh(i,e);let a=e.length;t.forEach(zh);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Vh(i,t[c]);let o=Qc.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function zh(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Vh(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Gn=class n extends Pt{constructor(e=new Hn([new oe(.5,.5),new oe(-.5,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new nt(s,3)),this.setAttribute("uv",new nt(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Tp,S,x=!1,T,b,P,y;if(m){S=m.getSpacedPoints(h),x=!0,u=!1;let K=m.isCatmullRomCurve3?m.closed:!1;T=m.computeFrenetFrames(h,K),b=new L,P=new L,y=new L}u||(g=0,d=0,p=0,_=0);let E=o.extractPoints(l),A=E.shape,R=E.holes;if(!is.isClockWise(A)){A=A.reverse();for(let K=0,ie=R.length;K<ie;K++){let ae=R[K];is.isClockWise(ae)&&(R[K]=ae.reverse())}}function F(K){let ae=10000000000000001e-36,he=K[0];for(let de=1;de<=K.length;de++){let He=de%K.length,Fe=K[He],Xe=Fe.x-he.x,Le=Fe.y-he.y,U=Xe*Xe+Le*Le,st=Math.max(Math.abs(Fe.x),Math.abs(Fe.y),Math.abs(he.x),Math.abs(he.y)),Qe=ae*st*st;if(U<=Qe){K.splice(He,1),de--;continue}he=Fe}}F(A),R.forEach(F);let N=R.length,k=A;for(let K=0;K<N;K++){let ie=R[K];A=A.concat(ie)}function q(K,ie,ae){return ie||Ze("ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(ie,ae)}let Y=A.length;function ne(K,ie,ae){let he,de,He,Fe=K.x-ie.x,Xe=K.y-ie.y,Le=ae.x-K.x,U=ae.y-K.y,st=Fe*Fe+Xe*Xe,Qe=Fe*U-Xe*Le;if(Math.abs(Qe)>Number.EPSILON){let C=Math.sqrt(st),v=Math.sqrt(Le*Le+U*U),V=ie.x-Xe/C,G=ie.y+Fe/C,j=ae.x-U/v,ue=ae.y+Le/v,pe=((j-V)*U-(ue-G)*Le)/(Fe*U-Xe*Le);he=V+Fe*pe-K.x,de=G+Xe*pe-K.y;let Q=he*he+de*de;if(Q<=2)return new oe(he,de);He=Math.sqrt(Q/2)}else{let C=!1;Fe>Number.EPSILON?Le>Number.EPSILON&&(C=!0):Fe<-Number.EPSILON?Le<-Number.EPSILON&&(C=!0):Math.sign(Xe)===Math.sign(U)&&(C=!0),C?(he=-Xe,de=Fe,He=Math.sqrt(st)):(he=Fe,de=Xe,He=Math.sqrt(st/2))}return new oe(he/He,de/He)}let H=[];for(let K=0,ie=k.length,ae=ie-1,he=K+1;K<ie;K++,ae++,he++)ae===ie&&(ae=0),he===ie&&(he=0),H[K]=ne(k[K],k[ae],k[he]);let J=[],Z,Ce=H.concat();for(let K=0,ie=N;K<ie;K++){let ae=R[K];Z=[];for(let he=0,de=ae.length,He=de-1,Fe=he+1;he<de;he++,He++,Fe++)He===de&&(He=0),Fe===de&&(Fe=0),Z[he]=ne(ae[he],ae[He],ae[Fe]);J.push(Z),Ce=Ce.concat(Z)}let Ee;if(g===0)Ee=is.triangulateShape(k,R);else{let K=[],ie=[];for(let ae=0;ae<g;ae++){let he=ae/g,de=d*Math.cos(he*Math.PI/2),He=p*Math.sin(he*Math.PI/2)+_;for(let Fe=0,Xe=k.length;Fe<Xe;Fe++){let Le=q(k[Fe],H[Fe],He);ee(Le.x,Le.y,-de),he===0&&K.push(Le)}for(let Fe=0,Xe=N;Fe<Xe;Fe++){let Le=R[Fe];Z=J[Fe];let U=[];for(let st=0,Qe=Le.length;st<Qe;st++){let C=q(Le[st],Z[st],He);ee(C.x,C.y,-de),he===0&&U.push(C)}he===0&&ie.push(U)}}Ee=is.triangulateShape(K,ie)}let ct=Ee.length,Ke=p+_;for(let K=0;K<Y;K++){let ie=u?q(A[K],Ce[K],Ke):A[K];x?(P.copy(T.normals[0]).multiplyScalar(ie.x),b.copy(T.binormals[0]).multiplyScalar(ie.y),y.copy(S[0]).add(P).add(b),ee(y.x,y.y,y.z)):ee(ie.x,ie.y,0)}for(let K=1;K<=h;K++)for(let ie=0;ie<Y;ie++){let ae=u?q(A[ie],Ce[ie],Ke):A[ie];x?(P.copy(T.normals[K]).multiplyScalar(ae.x),b.copy(T.binormals[K]).multiplyScalar(ae.y),y.copy(S[K]).add(P).add(b),ee(y.x,y.y,y.z)):ee(ae.x,ae.y,f/h*K)}for(let K=g-1;K>=0;K--){let ie=K/g,ae=d*Math.cos(ie*Math.PI/2),he=p*Math.sin(ie*Math.PI/2)+_;for(let de=0,He=k.length;de<He;de++){let Fe=q(k[de],H[de],he);ee(Fe.x,Fe.y,f+ae)}for(let de=0,He=R.length;de<He;de++){let Fe=R[de];Z=J[de];for(let Xe=0,Le=Fe.length;Xe<Le;Xe++){let U=q(Fe[Xe],Z[Xe],he);x?ee(U.x,U.y+S[h-1].y,S[h-1].x+ae):ee(U.x,U.y,f+ae)}}}it(),I();function it(){let K=s.length/3;if(u){let ie=0,ae=Y*ie;for(let he=0;he<ct;he++){let de=Ee[he];ce(de[2]+ae,de[1]+ae,de[0]+ae)}ie=h+g*2,ae=Y*ie;for(let he=0;he<ct;he++){let de=Ee[he];ce(de[0]+ae,de[1]+ae,de[2]+ae)}}else{for(let ie=0;ie<ct;ie++){let ae=Ee[ie];ce(ae[2],ae[1],ae[0])}for(let ie=0;ie<ct;ie++){let ae=Ee[ie];ce(ae[0]+Y*h,ae[1]+Y*h,ae[2]+Y*h)}}i.addGroup(K,s.length/3-K,0)}function I(){let K=s.length/3,ie=0;B(k,ie),ie+=k.length;for(let ae=0,he=R.length;ae<he;ae++){let de=R[ae];B(de,ie),ie+=de.length}i.addGroup(K,s.length/3-K,1)}function B(K,ie){let ae=K.length;for(;--ae>=0;){let he=ae,de=ae-1;de<0&&(de=K.length-1);for(let He=0,Fe=h+g*2;He<Fe;He++){let Xe=Y*He,Le=Y*(He+1),U=ie+he+Xe,st=ie+de+Xe,Qe=ie+de+Le,C=ie+he+Le;re(U,st,Qe,C)}}}function ee(K,ie,ae){c.push(K),c.push(ie),c.push(ae)}function ce(K,ie,ae){ge(K),ge(ie),ge(ae);let he=s.length/3,de=M.generateTopUV(i,s,he-3,he-2,he-1);Ye(de[0]),Ye(de[1]),Ye(de[2])}function re(K,ie,ae,he){ge(K),ge(ie),ge(he),ge(ie),ge(ae),ge(he);let de=s.length/3,He=M.generateSideWallUV(i,s,de-6,de-3,de-2,de-1);Ye(He[0]),Ye(He[1]),Ye(He[3]),Ye(He[1]),Ye(He[2]),Ye(He[3])}function ge(K){s.push(c[K*3+0]),s.push(c[K*3+1]),s.push(c[K*3+2])}function Ye(K){r.push(K.x),r.push(K.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Ep(t,i,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];i.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Jc[s.type]().fromJSON(s)),new n(i,e.options)}},Tp={generateTopUV:function(n,e,t,i,s){let r=e[t*3],a=e[t*3+1],o=e[i*3],c=e[i*3+1],l=e[s*3],h=e[s*3+1];return[new oe(r,a),new oe(o,c),new oe(l,h)]},generateSideWallUV:function(n,e,t,i,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[i*3],h=e[i*3+1],f=e[i*3+2],u=e[s*3],d=e[s*3+1],p=e[s*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new oe(a,1-c),new oe(l,1-f),new oe(u,1-p),new oe(_,1-m)]:[new oe(o,1-c),new oe(h,1-f),new oe(d,1-p),new oe(g,1-m)]}};function Ep(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ea=class n extends zo{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},un=class n extends Pt{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=lt(s,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],h=1/t,f=new L,u=new oe,d=new L,p=new L,_=new L,g=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,d.x=m*1,d.y=-g,d.z=m*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(p)}for(let M=0;M<=t;M++){let S=i+M*h*s,x=Math.sin(S),T=Math.cos(S);for(let b=0;b<=e.length-1;b++){f.x=e[b].x*x,f.y=e[b].y,f.z=e[b].x*T,a.push(f.x,f.y,f.z),u.x=M/t,u.y=b/(e.length-1),o.push(u.x,u.y);let P=c[3*b+0]*x,y=c[3*b+1],E=c[3*b+0]*T;l.push(P,y,E)}}for(let M=0;M<t;M++)for(let S=0;S<e.length-1;S++){let x=S+M*e.length,T=x,b=x+e.length,P=x+e.length+1,y=x+1;r.push(T,b,y),r.push(P,y,b)}this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("uv",new nt(o,2)),this.setAttribute("normal",new nt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.points,e.segments,e.phiStart,e.phiLength)}};var dn=class n extends Pt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,f=e/o,u=t/c,d=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let M=m*u-a;for(let S=0;S<l;S++){let x=S*f-r;p.push(x,-M,0),_.push(0,0,1),g.push(S/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<o;M++){let S=M+l*m,x=M+l*(m+1),T=M+1+l*(m+1),b=M+1+l*m;d.push(S,x,b),d.push(x,T,b)}this.setIndex(d),this.setAttribute("position",new nt(p,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var ta=class n extends Pt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new L,u=new L,d=[],p=[],_=[],g=[];for(let m=0;m<=i;m++){let M=[],S=m/i,x=a+S*o,T=e*Math.cos(x),b=Math.sqrt(e*e-T*T),P=0;m===0&&a===0?P=.5/t:m===i&&c===Math.PI&&(P=-.5/t);for(let y=0;y<=t;y++){let E=y/t,A=s+E*r;f.x=-b*Math.cos(A),f.y=T,f.z=b*Math.sin(A),p.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),g.push(E+P,1-S),M.push(l++)}h.push(M)}for(let m=0;m<i;m++)for(let M=0;M<t;M++){let S=h[m][M+1],x=h[m][M],T=h[m+1][M],b=h[m+1][M+1];(m!==0||a>0)&&d.push(S,x,b),(m!==i-1||c<Math.PI)&&d.push(x,T,b)}this.setIndex(d),this.setAttribute("position",new nt(p,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var wi=class n extends Pt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let c=[],l=[],h=[],f=[],u=new L,d=new L,p=new L;for(let _=0;_<=i;_++){let g=a+_/i*o;for(let m=0;m<=s;m++){let M=m/s*r;d.x=(e+t*Math.cos(g))*Math.cos(M),d.y=(e+t*Math.cos(g))*Math.sin(M),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),f.push(m/s),f.push(_/i)}}for(let _=1;_<=i;_++)for(let g=1;g<=s;g++){let m=(s+1)*_+g-1,M=(s+1)*(_-1)+g-1,S=(s+1)*(_-1)+g,x=(s+1)*_+g;c.push(m,M,x),c.push(M,S,x)}this.setIndex(c),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function hs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Hh(s))s.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Hh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function cn(n){let e={};for(let t=0;t<n.length;t++){let i=hs(n[t]);for(let s in i)e[s]=i[s]}return e}function Hh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Ap(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Sl(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}var Pn={clone:hs,merge:cn},Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ut=class extends Vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Re().setHex(s.value);break;case"v2":this.uniforms[i].value=new oe().fromArray(s.value);break;case"v3":this.uniforms[i].value=new L().fromArray(s.value);break;case"v4":this.uniforms[i].value=new It().fromArray(s.value);break;case"m3":this.uniforms[i].value=new et().fromArray(s.value);break;case"m4":this.uniforms[i].value=new tt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Js=class extends Ut{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},pn=class extends Vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tr,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var na=class extends Vn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tr,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},ia=class extends Vn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tr,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ai,this.combine=c0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},js=class extends Vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Yo=class extends Vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ns(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Wc(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var zi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Zo=class extends zi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yc,endingEnd:Yc}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zc:r=e,o=2*t-i;break;case $c:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Zc:a=e,c=2*i-t;break;case $c:a=1,c=i+s[1]-s[0];break;default:a=e-1,c=t}let l=(i-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(i-t)/(s-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,M=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,S=(-1-d)*g+(1.5+d)*_+.5*p,x=d*g-d*_;for(let T=0;T!==o;++T)r[T]=m*a[h+T]+M*a[l+T]+S*a[c+T]+x*a[f+T];return r}},$o=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(i-t)/(s-t),f=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*h;return r}},Jo=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},jo=class extends zi{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(i-t)/(s-t),_=1-p;for(let g=0;g!==o;++g)r[g]=a[l+g]*_+a[c+g]*p;return r}let u=o*2,d=e-1;for(let p=0;p!==o;++p){let _=a[l+p],g=a[c+p],m=d*u+p*2,M=f[m],S=f[m+1],x=e*u+p*2,T=h[x],b=h[x+1],P=Ip(i,t,M,T,s);r[p]=Ff(P,_,S,b,g)}return r}};function Ff(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Pp(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Ip(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=Ff(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let c=Pp(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var bn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ns(t,this.TimeBufferType),this.values=Ns(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Ns(e.times,Array),values:Ns(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Wc(e.settings)&&(i.settings={inTangents:Ns(e.settings.inTangents,Array),outTangents:Ns(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new jo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Pr:t=this.InterpolantFactoryMethodDiscrete;break;case Uo:t=this.InterpolantFactoryMethodLinear;break;case To:t=this.InterpolantFactoryMethodSmooth;break;case qc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return $e("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pr;case this.InterpolantFactoryMethodLinear:return Uo;case this.InterpolantFactoryMethodSmooth:return To;case this.InterpolantFactoryMethodBezier:return qc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Wc(this.settings)&&(Gh(this.settings.inTangents,e),Gh(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Ze("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ze("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&_d(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ze("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===To,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let f=o*i,u=f-i,d=f+i;for(let p=0;p!==i;++p){let _=t[f+p];if(_!==t[u+p]||_!==t[d+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*i,u=a*i;for(let d=0;d!==i;++d)t[u+d]=t[f+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Wc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Gh(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}bn.prototype.ValueTypeName="";bn.prototype.TimeBufferType=Float32Array;bn.prototype.ValueBufferType=Float32Array;bn.prototype.DefaultInterpolation=Uo;var Vi=class extends bn{constructor(e,t,i){super(e,t,i)}};Vi.prototype.ValueTypeName="bool";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Pr;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ko=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}};Ko.prototype.ValueTypeName="color";var Qo=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}};Qo.prototype.ValueTypeName="number";var e0=class extends zi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)ri.slerpFlat(r,0,a,l-o,a,l,c);return r}},sa=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new e0(this.times,this.values,this.getValueSize(),e)}};sa.prototype.ValueTypeName="quaternion";sa.prototype.InterpolantFactoryMethodSmooth=void 0;var Hi=class extends bn{constructor(e,t,i){super(e,t,i)}};Hi.prototype.ValueTypeName="string";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=Pr;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var t0=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}};t0.prototype.ValueTypeName="vector";var n0=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let d=l[f],p=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},kf=new n0,i0=class{constructor(e){this.manager=e!==void 0?e:kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};i0.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ks=class extends Wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ra=class extends Ks{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xc=new tt,Wh=new L,Xh=new L,aa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Wh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wh),Xh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Xc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Xc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Bs||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Xc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},So=new L,wo=new ri,ei=new L,oa=class extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(So,wo,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(So,wo,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(So,wo,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(So,wo,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fi=new L,qh=new oe,Yh=new oe,Jt=class extends oa{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z)}getViewSize(e,t){return this.getViewBounds(e,qh,Yh),t.subVectors(Yh,qh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Er*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var el=class extends aa{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}},li=class extends Ks{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new el}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},hi=class extends oa{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},tl=class extends aa{constructor(){super(new hi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},as=class extends Ks{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.target=new Wt,this.shadow=new tl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Us=-90,Fs=1,s0=class extends Wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Jt(Us,Fs,e,t);s.layers=this.layers,this.add(s);let r=new Jt(Us,Fs,e,t);r.layers=this.layers,this.add(r);let a=new Jt(Us,Fs,e,t);a.layers=this.layers,this.add(a);let o=new Jt(Us,Fs,e,t);o.layers=this.layers,this.add(o);let c=new Jt(Us,Fs,e,t);c.layers=this.layers,this.add(c);let l=new Jt(Us,Fs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===zn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},r0=class extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ca=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Lp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Lp(){this._document.hidden===!1&&this.reset()}var wl="\\[\\]\\.:\\/",Dp=new RegExp("["+wl+"]","g"),Tl="[^"+wl+"]",Np="[^"+wl.replace("\\.","")+"]",Up=/((?:WC+[\/:])*)/.source.replace("WC",Tl),Fp=/(WCOD+)?/.source.replace("WCOD",Np),kp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tl),Op=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tl),Bp=new RegExp("^"+Up+Fp+kp+Op+"$"),zp=["material","materials","bones","map"],nl=class{constructor(e,t,i){let s=i||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Rt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dp,"")}static parseTrackName(e){let t=Bp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);zp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){$e("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ze("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=nl;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Iy=new Float32Array(1);var Zh=new tt,la=class{constructor(e,t,i=0,s=1/0){this.ray=new zr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Gs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zh),this}intersectObject(e,t=!0,i=[]){return il(e,this,i,t),i.sort($h),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)il(e[s],this,i,t);return i.sort($h),i}};function $h(n,e){return n.distance-e.distance}function il(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)il(r[a],e,t,!0)}}var Il=class Il{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};Il.prototype.isMatrix2=!0;var sl=Il;function El(n,e,t,i){let s=Vp(i);switch(t){case gl:return n*e;case m0:return n*e/s.components*s.byteLength;case g0:return n*e/s.components*s.byteLength;case Yi:return n*e*2/s.components*s.byteLength;case x0:return n*e*2/s.components*s.byteLength;case xl:return n*e*3/s.components*s.byteLength;case xn:return n*e*4/s.components*s.byteLength;case y0:return n*e*4/s.components*s.byteLength;case Ma:case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sa:case wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case v0:case b0:return Math.max(n,16)*Math.max(e,8)/4;case _0:case M0:return Math.max(n,8)*Math.max(e,8)/2;case S0:case w0:case E0:case A0:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case T0:case Ta:case R0:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case C0:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case P0:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case I0:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case L0:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case D0:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case N0:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case U0:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case F0:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case k0:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case O0:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case B0:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case z0:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case V0:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case H0:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case G0:case W0:case X0:return Math.ceil(n/4)*Math.ceil(e/4)*16;case q0:case Y0:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ea:case Z0:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vp(n){switch(n){case on:case ul:return{byteLength:1,components:1};case er:case dl:case $t:return{byteLength:2,components:1};case d0:case p0:return{byteLength:2,components:4};case Xn:case u0:case Cn:return{byteLength:4,components:1};case pl:case ml:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ru(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function qp(n){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){let h=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],_=f[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let _=f[d];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Yp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zp=`#ifdef USE_ALPHAHASH
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
#endif`,$p=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qp=`#ifdef USE_AOMAP
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
#endif`,em=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tm=`#ifdef USE_BATCHING
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
#endif`,nm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,im=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,am=`#ifdef USE_IRIDESCENCE
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
#endif`,om=`#ifdef USE_BUMPMAP
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
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,gm=`#define PI 3.141592653589793
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
} // validated`,xm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ym=`vec3 transformedNormal = objectNormal;
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
#endif`,_m=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sm="gl_FragColor = linearToOutputTexel( gl_FragColor );",wm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tm=`#ifdef USE_ENVMAP
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
#endif`,Em=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Pm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Im=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nm=`#ifdef USE_GRADIENTMAP
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
}`,Um=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Om=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Bm=`#ifdef USE_ENVMAP
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
#endif`,zm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wm=`PhysicalMaterial material;
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
#endif`,Xm=`uniform sampler2D dfgLUT;
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
}`,qm=`
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
#endif`,Ym=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$m=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ig=`#if defined( USE_POINTS_UV )
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
#endif`,sg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ag=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,og=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lg=`#ifdef USE_MORPHTARGETS
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
#endif`,hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ug=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,gg=`#ifdef USE_NORMALMAP
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
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Eg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ag=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lg=`float getShadowMask() {
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
}`,Dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ng=`#ifdef USE_SKINNING
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
#endif`,Ug=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
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
#endif`,kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Og=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vg=`#ifdef USE_TRANSMISSION
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
#endif`,Hg=`#ifdef USE_TRANSMISSION
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
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
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
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`#include <common>
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
}`,e1=`#if DEPTH_PACKING == 3200
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
}`,t1=`#define DISTANCE
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
}`,n1=`#define DISTANCE
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
}`,i1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,s1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r1=`uniform float scale;
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
}`,a1=`uniform vec3 diffuse;
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
}`,o1=`#include <common>
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
}`,c1=`uniform vec3 diffuse;
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
}`,l1=`#define LAMBERT
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
}`,h1=`#define LAMBERT
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
}`,f1=`#define MATCAP
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
}`,u1=`#define MATCAP
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
}`,d1=`#define NORMAL
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
}`,p1=`#define NORMAL
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
}`,m1=`#define PHONG
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
}`,g1=`#define PHONG
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
}`,x1=`#define STANDARD
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
}`,y1=`#define STANDARD
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
}`,_1=`#define TOON
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
}`,v1=`#define TOON
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
}`,M1=`uniform float size;
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
}`,b1=`uniform vec3 diffuse;
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
}`,S1=`#include <common>
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
}`,w1=`uniform vec3 color;
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
}`,T1=`uniform float rotation;
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
}`,E1=`uniform vec3 diffuse;
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
}`,at={alphahash_fragment:Yp,alphahash_pars_fragment:Zp,alphamap_fragment:$p,alphamap_pars_fragment:Jp,alphatest_fragment:jp,alphatest_pars_fragment:Kp,aomap_fragment:Qp,aomap_pars_fragment:em,batching_pars_vertex:tm,batching_vertex:nm,begin_vertex:im,beginnormal_vertex:sm,bsdfs:rm,iridescence_fragment:am,bumpmap_pars_fragment:om,clipping_planes_fragment:cm,clipping_planes_pars_fragment:lm,clipping_planes_pars_vertex:hm,clipping_planes_vertex:fm,color_fragment:um,color_pars_fragment:dm,color_pars_vertex:pm,color_vertex:mm,common:gm,cube_uv_reflection_fragment:xm,defaultnormal_vertex:ym,displacementmap_pars_vertex:_m,displacementmap_vertex:vm,emissivemap_fragment:Mm,emissivemap_pars_fragment:bm,colorspace_fragment:Sm,colorspace_pars_fragment:wm,envmap_fragment:Tm,envmap_common_pars_fragment:Em,envmap_pars_fragment:Am,envmap_pars_vertex:Rm,envmap_physical_pars_fragment:Bm,envmap_vertex:Cm,fog_vertex:Pm,fog_pars_vertex:Im,fog_fragment:Lm,fog_pars_fragment:Dm,gradientmap_pars_fragment:Nm,lightmap_pars_fragment:Um,lights_lambert_fragment:Fm,lights_lambert_pars_fragment:km,lights_pars_begin:Om,lights_toon_fragment:zm,lights_toon_pars_fragment:Vm,lights_phong_fragment:Hm,lights_phong_pars_fragment:Gm,lights_physical_fragment:Wm,lights_physical_pars_fragment:Xm,lights_fragment_begin:qm,lights_fragment_maps:Ym,lights_fragment_end:Zm,lightprobes_pars_fragment:$m,logdepthbuf_fragment:Jm,logdepthbuf_pars_fragment:jm,logdepthbuf_pars_vertex:Km,logdepthbuf_vertex:Qm,map_fragment:eg,map_pars_fragment:tg,map_particle_fragment:ng,map_particle_pars_fragment:ig,metalnessmap_fragment:sg,metalnessmap_pars_fragment:rg,morphinstance_vertex:ag,morphcolor_vertex:og,morphnormal_vertex:cg,morphtarget_pars_vertex:lg,morphtarget_vertex:hg,normal_fragment_begin:fg,normal_fragment_maps:ug,normal_pars_fragment:dg,normal_pars_vertex:pg,normal_vertex:mg,normalmap_pars_fragment:gg,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:yg,clearcoat_pars_fragment:_g,iridescence_pars_fragment:vg,opaque_fragment:Mg,packing:bg,premultiplied_alpha_fragment:Sg,project_vertex:wg,dithering_fragment:Tg,dithering_pars_fragment:Eg,roughnessmap_fragment:Ag,roughnessmap_pars_fragment:Rg,shadowmap_pars_fragment:Cg,shadowmap_pars_vertex:Pg,shadowmap_vertex:Ig,shadowmask_pars_fragment:Lg,skinbase_vertex:Dg,skinning_pars_vertex:Ng,skinning_vertex:Ug,skinnormal_vertex:Fg,specularmap_fragment:kg,specularmap_pars_fragment:Og,tonemapping_fragment:Bg,tonemapping_pars_fragment:zg,transmission_fragment:Vg,transmission_pars_fragment:Hg,uv_pars_fragment:Gg,uv_pars_vertex:Wg,uv_vertex:Xg,worldpos_vertex:qg,background_vert:Yg,background_frag:Zg,backgroundCube_vert:$g,backgroundCube_frag:Jg,cube_vert:jg,cube_frag:Kg,depth_vert:Qg,depth_frag:e1,distance_vert:t1,distance_frag:n1,equirect_vert:i1,equirect_frag:s1,linedashed_vert:r1,linedashed_frag:a1,meshbasic_vert:o1,meshbasic_frag:c1,meshlambert_vert:l1,meshlambert_frag:h1,meshmatcap_vert:f1,meshmatcap_frag:u1,meshnormal_vert:d1,meshnormal_frag:p1,meshphong_vert:m1,meshphong_frag:g1,meshphysical_vert:x1,meshphysical_frag:y1,meshtoon_vert:_1,meshtoon_frag:v1,points_vert:M1,points_frag:b1,shadow_vert:S1,shadow_frag:w1,sprite_vert:T1,sprite_frag:E1},Se={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},pi={basic:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Re(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:cn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:cn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Re(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:cn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:cn([Se.points,Se.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:cn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:cn([Se.common,Se.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:cn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:cn([Se.sprite,Se.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:cn([Se.common,Se.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:cn([Se.lights,Se.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};pi.physical={uniforms:cn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};var j0={r:0,b:0,g:0},A1=new tt,au=new et;au.set(-1,0,0,0,1,0,0,0,1);function R1(n,e,t,i,s,r){let a=new Re(0),o=s===!0?0:1,c,l,h=null,f=0,u=null;function d(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){let x=M.backgroundBlurriness>0;S=e.get(S,x)}return S}function p(M){let S=!1,x=d(M);x===null?g(a,o):x&&x.isColor&&(g(x,1),S=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(M,S){let x=d(S);x&&(x.isCubeTexture||x.mapping===_a)?(l===void 0&&(l=new ht(new gn(1,1,1),new Ut({name:"BackgroundCubeMaterial",uniforms:hs(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,b,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(A1.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(au),l.material.toneMapped=ut.getTransfer(x.colorSpace)!==xt,(h!==x||f!==x.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ht(new dn(2,2),new Ut({name:"BackgroundMaterial",uniforms:hs(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ut.getTransfer(x.colorSpace)!==xt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,S){M.getRGB(j0,Sl(n)),t.buffers.color.setClear(j0.r,j0.g,j0.b,S,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),o=S,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:p,addToRenderList:_,dispose:m}}function C1(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(R,D,F,N,k){let q=!1,Y=f(R,N,F,D);r!==Y&&(r=Y,l(r.object)),q=d(R,N,F,k),q&&p(R,N,F,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,x(R,D,F,N),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function h(R){return n.deleteVertexArray(R)}function f(R,D,F,N){let k=N.wireframe===!0,q=i[D.id];q===void 0&&(q={},i[D.id]=q);let Y=R.isInstancedMesh===!0?R.id:0,ne=q[Y];ne===void 0&&(ne={},q[Y]=ne);let H=ne[F.id];H===void 0&&(H={},ne[F.id]=H);let J=H[k];return J===void 0&&(J=u(c()),H[k]=J),J}function u(R){let D=[],F=[],N=[];for(let k=0;k<t;k++)D[k]=0,F[k]=0,N[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:N,object:R,attributes:{},index:null}}function d(R,D,F,N){let k=r.attributes,q=D.attributes,Y=0,ne=F.getAttributes();for(let H in ne)if(ne[H].location>=0){let Z=k[H],Ce=q[H];if(Ce===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(Ce=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(Ce=R.instanceColor)),Z===void 0||Z.attribute!==Ce||Ce&&Z.data!==Ce.data)return!0;Y++}return r.attributesNum!==Y||r.index!==N}function p(R,D,F,N){let k={},q=D.attributes,Y=0,ne=F.getAttributes();for(let H in ne)if(ne[H].location>=0){let Z=q[H];Z===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(Z=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(Z=R.instanceColor));let Ce={};Ce.attribute=Z,Z&&Z.data&&(Ce.data=Z.data),k[H]=Ce,Y++}r.attributes=k,r.attributesNum=Y,r.index=N}function _(){let R=r.newAttributes;for(let D=0,F=R.length;D<F;D++)R[D]=0}function g(R){m(R,0)}function m(R,D){let F=r.newAttributes,N=r.enabledAttributes,k=r.attributeDivisors;F[R]=1,N[R]===0&&(n.enableVertexAttribArray(R),N[R]=1),k[R]!==D&&(n.vertexAttribDivisor(R,D),k[R]=D)}function M(){let R=r.newAttributes,D=r.enabledAttributes;for(let F=0,N=D.length;F<N;F++)D[F]!==R[F]&&(n.disableVertexAttribArray(F),D[F]=0)}function S(R,D,F,N,k,q,Y){Y===!0?n.vertexAttribIPointer(R,D,F,k,q):n.vertexAttribPointer(R,D,F,N,k,q)}function x(R,D,F,N){_();let k=N.attributes,q=F.getAttributes(),Y=D.defaultAttributeValues;for(let ne in q){let H=q[ne];if(H.location>=0){let J=k[ne];if(J===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&(J=R.instanceColor)),J!==void 0){let Z=J.normalized,Ce=J.itemSize,Ee=e.get(J);if(Ee===void 0)continue;let ct=Ee.buffer,Ke=Ee.type,it=Ee.bytesPerElement,I=Ke===n.INT||Ke===n.UNSIGNED_INT||J.gpuType===u0;if(J.isInterleavedBufferAttribute){let B=J.data,ee=B.stride,ce=J.offset;if(B.isInstancedInterleavedBuffer){for(let re=0;re<H.locationSize;re++)m(H.location+re,B.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let re=0;re<H.locationSize;re++)g(H.location+re);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let re=0;re<H.locationSize;re++)S(H.location+re,Ce/H.locationSize,Ke,Z,ee*it,(ce+Ce/H.locationSize*re)*it,I)}else{if(J.isInstancedBufferAttribute){for(let B=0;B<H.locationSize;B++)m(H.location+B,J.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let B=0;B<H.locationSize;B++)g(H.location+B);n.bindBuffer(n.ARRAY_BUFFER,ct);for(let B=0;B<H.locationSize;B++)S(H.location+B,Ce/H.locationSize,Ke,Z,Ce*it,Ce/H.locationSize*B*it,I)}}else if(Y!==void 0){let Z=Y[ne];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(H.location,Z);break;case 3:n.vertexAttrib3fv(H.location,Z);break;case 4:n.vertexAttrib4fv(H.location,Z);break;default:n.vertexAttrib1fv(H.location,Z)}}}}M()}function T(){E();for(let R in i){let D=i[R];for(let F in D){let N=D[F];for(let k in N){let q=N[k];for(let Y in q)h(q[Y].object),delete q[Y];delete N[k]}}delete i[R]}}function b(R){if(i[R.id]===void 0)return;let D=i[R.id];for(let F in D){let N=D[F];for(let k in N){let q=N[k];for(let Y in q)h(q[Y].object),delete q[Y];delete N[k]}}delete i[R.id]}function P(R){for(let D in i){let F=i[D];for(let N in F){let k=F[N];if(k[R.id]===void 0)continue;let q=k[R.id];for(let Y in q)h(q[Y].object),delete q[Y];delete k[R.id]}}}function y(R){for(let D in i){let F=i[D],N=R.isInstancedMesh===!0?R.id:0,k=F[N];if(k!==void 0){for(let q in k){let Y=k[q];for(let ne in Y)h(Y[ne].object),delete Y[ne];delete k[q]}delete F[N],Object.keys(F).length===0&&delete i[D]}}}function E(){A(),a=!0,r!==s&&(r=s,l(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:A,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function P1(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function I1(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==xn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===$t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==on&&P!==Cn&&!y&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&($e("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&$e("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:x,maxSamples:T,samples:b}}function L1(n){let e=this,t=null,i=0,s=!1,r=!1,a=new vn,o=new et,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||i!==0||s;return s=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,_=f.clipIntersection,g=f.clipShadows,m=n.get(f);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{let M=r?0:i,S=M*4,x=m.clippingState||null;c.value=x,x=h(p,u,S,d);for(let T=0;T!==S;++T)x[T]=t[T];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,d,p){let _=f!==null?f.length:0,g=null;if(_!==0){if(g=c.value,p!==!0||g===null){let m=d+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,x=d;S!==_;++S,x+=4)a.copy(f[S]).applyMatrix4(M,o),a.normal.toArray(g,x),g[x+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var ir=4,D1=6,N1=20,U1=256,Aa=new hi,Of=new Re,Ll=null,Dl=0,Nl=0,Ul=!1,F1=new L,fs=new L,rr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=F1}=r;Ll=this._renderer.getRenderTarget(),Dl=this._renderer.getActiveCubeFace(),Nl=this._renderer.getActiveMipmapLevel(),Ul=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ll,Dl,Nl),this._renderer.xr.enabled=Ul,e.scissorTest=!1,nr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ll=this._renderer.getRenderTarget(),Dl=this._renderer.getActiveCubeFace(),Nl=this._renderer.getActiveMipmapLevel(),Ul=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:$t,format:xn,colorSpace:Ir,depthBuffer:!1},s=Bf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bf(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=k1(r)),this._blurMaterial=B1(r,e,t),this._ggxMaterial=O1(r,e,t)}return s}_compileMaterial(e){let t=new ht(new Pt,e);this._renderer.compile(t,Aa)}_sceneToCubeUV(e,t,i,s,r){let c=new Jt(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Of),f.toneMapping=Wn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ht(new gn,new an({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(Of),m=!0);for(let S=0;S<6;S++){let x=S%3;x===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):x===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));let T=this._cubeSize;nr(s,x*T,S>2?T:0,T,T),f.setRenderTarget(s),m&&f.render(_,c),f.render(e,c)}f.toneMapping=d,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Wi||e.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;nr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Aa)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=l*1.25,d=f*u,{_lodMax:p}=this,_=this._sizeLods[i],g=3*_*(i>p-ir?i-p+ir:0),m=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=p-t,nr(r,g,m,3*_,2*_),s.setRenderTarget(r),s.render(o,Aa),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-i,nr(e,g,m,3*_,2*_),s.setRenderTarget(e),s.render(o,Aa)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-ir?s-this._lodMax+ir:0),u=4*(this._cubeSize-h);nr(t,f,u,3*h,2*h),a.setRenderTarget(t),a.render(c,Aa)}};function k1(n){let e=[],t=[],i=n,s=n-ir+1+D1;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,u=6,d=3,p=new Float32Array(d*u*f),_=new Float32Array(d*u*f);for(let m=0;m<f;m++){let M=m%3*2/3-1,S=m>2?0:-1,x=[M,S,0,M+2/3,S,0,M+2/3,S+1,0,M,S,0,M+2/3,S+1,0,M,S+1,0];p.set(x,d*u*m);for(let T=0;T<u;T++){let b=h[T*2]*2-1,P=h[T*2+1]*2-1;m===0?fs.set(1,P,b):m===1?fs.set(-b,1,-P):m===2?fs.set(-b,P,1):m===3?fs.set(-1,P,-b):m===4?fs.set(-b,-1,P):fs.set(b,P,-1),fs.toArray(_,(m*u+T)*d)}}let g=new Pt;g.setAttribute("position",new Ot(p,d)),g.setAttribute("outputDirection",new Ot(_,d)),t.push(new ht(g,null)),i>ir&&i--}return{lodMeshes:t,sizeLods:e}}function Bf(n,e,t){let i=new Nt(n,e,t);return i.texture.mapping=_a,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function O1(n,e,t){return new Ut({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:U1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:tc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function B1(n,e,t){return new Ut({name:"SphericalGaussianBlur",defines:{SAMPLES:N1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:tc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function zf(){return new Ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tc(),fragmentShader:`

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
		`,blending:zt,depthTest:!1,depthWrite:!1})}function Vf(){return new Ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zt,depthTest:!1,depthWrite:!1})}function tc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Q0=class extends Nt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Hr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new gn(5,5,5),r=new Ut({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:zt});r.uniforms.tEquirect.value=t;let a=new ht(s,r),o=t.minFilter;return t.minFilter===Xi&&(t.minFilter=jt),new s0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function z1(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===l0||d===h0)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new Q0(p.height);return _.fromEquirectangularTexture(n,u),e.set(u,_),u.addEventListener("dispose",l),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,p=d===l0||d===h0,_=d===Wi||d===ls;if(p||_){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new rr(n)),g=p?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let M=u.image;return p&&M&&M.height>0||_&&M&&c(M)?(i===null&&(i=new rr(n)),g=p?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===l0?u.mapping=Wi:d===h0&&(u.mapping=ls),u}function c(u){let d=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&d++;return d===p}function l(u){let d=u.target;d.removeEventListener("dispose",l);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function V1(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&ss("WebGLRenderer: "+i+" extension not supported."),s}}}function H1(n,e,t,i){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];let d=r.get(u);d&&(e.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(f){let u=f.attributes;for(let d in u)e.update(u[d],n.ARRAY_BUFFER)}function l(f){let u=[],d=f.index,p=f.attributes.position,_=0;if(p===void 0)return;if(d!==null){let M=d.array;_=d.version;for(let S=0,x=M.length;S<x;S+=3){let T=M[S+0],b=M[S+1],P=M[S+2];u.push(T,b,b,P,P,T)}}else{let M=p.array;_=p.version;for(let S=0,x=M.length/3-1;S<x;S+=3){let T=S+0,b=S+1,P=S+2;u.push(T,b,b,P,P,T)}}let g=new(p.count>=65535?kr:Fr)(u,1);g.version=_;let m=r.get(f);m&&e.remove(m),r.set(f,g)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function G1(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){n.drawElements(i,u,r,f*a),t.update(u,i,1)}function l(f,u,d){d!==0&&(n.drawElementsInstanced(i,u,r,f*a,d),t.update(u,i,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g];t.update(_,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function W1(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function X1(n,e,t){let i=new WeakMap,s=new It;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==f){let E=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],S=0;d===!0&&(S=1),p===!0&&(S=2),_===!0&&(S=3);let x=o.attributes.position.count*S,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let b=new Float32Array(x*T*4*f),P=new Ur(b,x,T,f);P.type=Cn,P.needsUpdate=!0;let y=S*4;for(let A=0;A<f;A++){let R=g[A],D=m[A],F=M[A],N=x*T*4*A;for(let k=0;k<R.count;k++){let q=k*y;d===!0&&(s.fromBufferAttribute(R,k),b[N+q+0]=s.x,b[N+q+1]=s.y,b[N+q+2]=s.z,b[N+q+3]=0),p===!0&&(s.fromBufferAttribute(D,k),b[N+q+4]=s.x,b[N+q+5]=s.y,b[N+q+6]=s.z,b[N+q+7]=0),_===!0&&(s.fromBufferAttribute(F,k),b[N+q+8]=s.x,b[N+q+9]=s.y,b[N+q+10]=s.z,b[N+q+11]=F.itemSize===4?s.w:1)}}u={count:f,texture:P,size:new oe(x,T)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];let p=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function q1(n,e,t,i,s){let r=new WeakMap;function a(l){let h=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Y1={[da]:"LINEAR_TONE_MAPPING",[pa]:"REINHARD_TONE_MAPPING",[ma]:"CINEON_TONE_MAPPING",[ga]:"ACES_FILMIC_TONE_MAPPING",[ya]:"AGX_TONE_MAPPING",[cs]:"NEUTRAL_TONE_MAPPING",[xa]:"CUSTOM_TONE_MAPPING"};function Z1(n,e,t,i,s,r){let a=new Nt(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Pt;l.setAttribute("position",new nt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new nt([0,2,0,0,2,0],2));let h=new Js({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new ht(l,h),u=new hi(-1,1,1,-1,0,1),d=null,p=null,_=!1,g,m=null,M=[],S=!1;this.setSize=function(x,T){a.setSize(x,T),o!==null&&o.setSize(x,T),c!==null&&c.setSize(x,T);for(let b=0;b<M.length;b++){let P=M[b];P.setSize&&P.setSize(x,T)}},this.setEffects=function(x){M=x,S=M.length>0&&M[0].isRenderPass===!0;let T=a.width,b=a.height;M.length>0&&o===null&&(o=new Nt(T,b,{type:$t,depthBuffer:!1,stencilBuffer:!1}),c=new Nt(T,b,{type:$t,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<M.length;P++){let y=M[P];y.setSize&&y.setSize(T,b)}},this.begin=function(x,T){if(_||x.toneMapping===Wn&&M.length===0)return!1;if(m=T,T!==null){let b=T.width,P=T.height;(a.width!==b||a.height!==P)&&this.setSize(b,P)}return S===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=Wn,!0},this.hasRenderPass=function(){return S},this.end=function(x,T){x.toneMapping=g,_=!0;let b=a,P=o;for(let y=0;y<M.length;y++){let E=M[y];E.enabled!==!1&&(E.render(x,P,b,T),E.needsSwap!==!1&&(b=P,P=P===o?c:o))}if(d!==x.outputColorSpace||p!==x.toneMapping){d=x.outputColorSpace,p=x.toneMapping,h.defines={},ut.getTransfer(d)===xt&&(h.defines.SRGB_TRANSFER="");let y=Y1[p];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,x.setRenderTarget(m),x.render(f,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var ou=new fn,Ol=new ci(1,1),cu=new Ur,lu=new Oo,hu=new Hr,Hf=[],Gf=[],Wf=new Float32Array(16),Xf=new Float32Array(9),qf=new Float32Array(4);function ar(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Hf[s];if(r===void 0&&(r=new Float32Array(s),Hf[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function nc(n,e){let t=Gf[e];t===void 0&&(t=new Int32Array(e),Gf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function J1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),qt(t,e)}}function j1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),qt(t,e)}}function K1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),qt(t,e)}}function Q1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;qf.set(i),n.uniformMatrix2fv(this.addr,!1,qf),qt(t,i)}}function e2(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Xf.set(i),n.uniformMatrix3fv(this.addr,!1,Xf),qt(t,i)}}function t2(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Wf.set(i),n.uniformMatrix4fv(this.addr,!1,Wf),qt(t,i)}}function n2(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function i2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),qt(t,e)}}function s2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),qt(t,e)}}function r2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),qt(t,e)}}function a2(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function o2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),qt(t,e)}}function c2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),qt(t,e)}}function l2(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),qt(t,e)}}function h2(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ol.compareFunction=t.isReversedDepthBuffer()?J0:$0,r=Ol):r=ou,t.setTexture2D(e||r,s)}function f2(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||lu,s)}function u2(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||hu,s)}function d2(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||cu,s)}function p2(n){switch(n){case 5126:return $1;case 35664:return J1;case 35665:return j1;case 35666:return K1;case 35674:return Q1;case 35675:return e2;case 35676:return t2;case 5124:case 35670:return n2;case 35667:case 35671:return i2;case 35668:case 35672:return s2;case 35669:case 35673:return r2;case 5125:return a2;case 36294:return o2;case 36295:return c2;case 36296:return l2;case 35678:case 36198:case 36298:case 36306:case 35682:return h2;case 35679:case 36299:case 36307:return f2;case 35680:case 36300:case 36308:case 36293:return u2;case 36289:case 36303:case 36311:case 36292:return d2}}function m2(n,e){n.uniform1fv(this.addr,e)}function g2(n,e){let t=ar(e,this.size,2);n.uniform2fv(this.addr,t)}function x2(n,e){let t=ar(e,this.size,3);n.uniform3fv(this.addr,t)}function y2(n,e){let t=ar(e,this.size,4);n.uniform4fv(this.addr,t)}function _2(n,e){let t=ar(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function v2(n,e){let t=ar(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function M2(n,e){let t=ar(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function b2(n,e){n.uniform1iv(this.addr,e)}function S2(n,e){n.uniform2iv(this.addr,e)}function w2(n,e){n.uniform3iv(this.addr,e)}function T2(n,e){n.uniform4iv(this.addr,e)}function E2(n,e){n.uniform1uiv(this.addr,e)}function A2(n,e){n.uniform2uiv(this.addr,e)}function R2(n,e){n.uniform3uiv(this.addr,e)}function C2(n,e){n.uniform4uiv(this.addr,e)}function P2(n,e,t){let i=this.cache,s=e.length,r=nc(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ol:a=ou;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function I2(n,e,t){let i=this.cache,s=e.length,r=nc(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||lu,r[a])}function L2(n,e,t){let i=this.cache,s=e.length,r=nc(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hu,r[a])}function D2(n,e,t){let i=this.cache,s=e.length,r=nc(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||cu,r[a])}function N2(n){switch(n){case 5126:return m2;case 35664:return g2;case 35665:return x2;case 35666:return y2;case 35674:return _2;case 35675:return v2;case 35676:return M2;case 5124:case 35670:return b2;case 35667:case 35671:return S2;case 35668:case 35672:return w2;case 35669:case 35673:return T2;case 5125:return E2;case 36294:return A2;case 36295:return R2;case 36296:return C2;case 35678:case 36198:case 36298:case 36306:case 35682:return P2;case 35679:case 36299:case 36307:return I2;case 35680:case 36300:case 36308:case 36293:return L2;case 36289:case 36303:case 36311:case 36292:return D2}}var Bl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=p2(t.type)}},zl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=N2(t.type)}},Vl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Fl=/(\w+)(\])?(\[|\.)?/g;function Yf(n,e){n.seq.push(e),n.map[e.id]=e}function U2(n,e,t){let i=n.name,s=i.length;for(Fl.lastIndex=0;;){let r=Fl.exec(i),a=Fl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Yf(t,l===void 0?new Bl(o,n,e):new zl(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Vl(o),Yf(t,f)),t=f}}}var sr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);U2(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Zf(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var F2=37297,k2=0;function O2(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var $f=new et;function B2(n){ut._getMatrix($f,ut.workingColorSpace,n);let e=`mat3( ${$f.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(n)){case Lr:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Jf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+O2(n.getShaderSource(e),o)}else return r}function z2(n,e){let t=B2(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var V2={[da]:"Linear",[pa]:"Reinhard",[ma]:"Cineon",[ga]:"ACESFilmic",[ya]:"AgX",[cs]:"Neutral",[xa]:"Custom"};function H2(n,e){let t=V2[e];return t===void 0?($e("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var K0=new L;function G2(){ut.getLuminanceCoefficients(K0);let n=K0.x.toFixed(4),e=K0.y.toFixed(4),t=K0.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W2(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ca).join(`
`)}function X2(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function q2(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ca(n){return n!==""}function jf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Y2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(n){return n.replace(Y2,$2)}var Z2=new Map;function $2(n,e){let t=at[e];if(t===void 0){let i=Z2.get(e);if(i!==void 0)t=at[i],$e('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Hl(t)}var J2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qf(n){return n.replace(J2,j2)}function j2(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function eu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var K2={[ha]:"SHADOWMAP_TYPE_PCF",[Gi]:"SHADOWMAP_TYPE_VSM"};function Q2(n){return K2[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ex={[Wi]:"ENVMAP_TYPE_CUBE",[ls]:"ENVMAP_TYPE_CUBE",[_a]:"ENVMAP_TYPE_CUBE_UV"};function tx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ex[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var nx={[ls]:"ENVMAP_MODE_REFRACTION"};function ix(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":nx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var sx={[c0]:"ENVMAP_BLENDING_MULTIPLY",[pf]:"ENVMAP_BLENDING_MIX",[mf]:"ENVMAP_BLENDING_ADD"};function rx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":sx[n.combine]||"ENVMAP_BLENDING_NONE"}function ax(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ox(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Q2(t),l=tx(t),h=ix(t),f=rx(t),u=ax(t),d=W2(t),p=X2(r),_=s.createProgram(),g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ca).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ca).join(`
`),m.length>0&&(m+=`
`)):(g=[eu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ca).join(`
`),m=[eu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?at.tonemapping_pars_fragment:"",t.toneMapping!==Wn?H2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,z2("linearToOutputTexel",t.outputColorSpace),G2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ca).join(`
`)),a=Hl(a),a=jf(a,t),a=Kf(a,t),o=Hl(o),o=jf(o,t),o=Kf(o,t),a=Qf(a),o=Qf(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=M+g+a,x=M+m+o,T=Zf(s,s.VERTEX_SHADER,S),b=Zf(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,b),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(R){if(n.debug.checkShaderErrors){let D=s.getProgramInfoLog(_)||"",F=s.getShaderInfoLog(T)||"",N=s.getShaderInfoLog(b)||"",k=D.trim(),q=F.trim(),Y=N.trim(),ne=!0,H=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,T,b);else{let J=Jf(s,T,"vertex"),Z=Jf(s,b,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+J+`
`+Z)}else k!==""?$e("WebGLProgram: Program Info Log:",k):(q===""||Y==="")&&(H=!1);H&&(R.diagnostics={runnable:ne,programLog:k,vertexShader:{log:q,prefix:g},fragmentShader:{log:Y,prefix:m}})}s.deleteShader(T),s.deleteShader(b),y=new sr(s,_),E=q2(s,_)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(_,F2)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=k2++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}var cx=0,Gl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Wl(e),t.set(e,i)),i}},Wl=class{constructor(e){this.id=cx++,this.code=e,this.usedTimes=0}};function lx(n){return n===Yi||n===Ta||n===Ea}function hx(n,e,t,i,s,r){let a=new Gs,o=new Gl,c=new Set,l=[],h=new Map,f=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function _(y,E,A,R,D,F){let N=R.fog,k=D.geometry,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,Y=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ne=e.get(y.envMap||q,Y),H=ne&&ne.mapping===_a?ne.image.height:null,J=d[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&$e("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let Z=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Ce=Z!==void 0?Z.length:0,Ee=0;k.morphAttributes.position!==void 0&&(Ee=1),k.morphAttributes.normal!==void 0&&(Ee=2),k.morphAttributes.color!==void 0&&(Ee=3);let ct,Ke,it,I;if(J){let Tt=pi[J];ct=Tt.vertexShader,Ke=Tt.fragmentShader}else{ct=y.vertexShader,Ke=y.fragmentShader;let Tt=o.getVertexShaderStage(y),_t=o.getFragmentShaderStage(y);o.update(y,Tt,_t),it=Tt.id,I=_t.id}let B=n.getRenderTarget(),ee=n.state.buffers.depth.getReversed(),ce=D.isInstancedMesh===!0,re=D.isBatchedMesh===!0,ge=!!y.map,Ye=!!y.matcap,K=!!ne,ie=!!y.aoMap,ae=!!y.lightMap,he=!!y.bumpMap&&y.wireframe===!1,de=!!y.normalMap,He=!!y.displacementMap,Fe=!!y.emissiveMap,Xe=!!y.metalnessMap,Le=!!y.roughnessMap,U=y.anisotropy>0,st=y.clearcoat>0,Qe=y.dispersion>0,C=y.retroreflectivity>0,v=y.iridescence>0,V=y.sheen>0,G=y.transmission>0,j=U&&!!y.anisotropyMap,ue=st&&!!y.clearcoatMap,pe=st&&!!y.clearcoatNormalMap,Q=st&&!!y.clearcoatRoughnessMap,se=v&&!!y.iridescenceMap,ye=v&&!!y.iridescenceThicknessMap,ze=V&&!!y.sheenColorMap,xe=V&&!!y.sheenRoughnessMap,me=!!y.specularMap,Ne=!!y.specularColorMap,Ge=!!y.specularIntensityMap,je=G&&!!y.transmissionMap,z=G&&!!y.thicknessMap,_e=!!y.gradientMap,te=!!y.alphaMap,ve=y.alphaTest>0,Pe=!!y.alphaHash,le=!!y.extensions,We=Wn;y.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(We=n.toneMapping);let Be={shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:ct,fragmentShader:Ke,defines:y.defines,customVertexShaderID:it,customFragmentShaderID:I,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:re,batchingColor:re&&D._colorsTexture!==null,instancing:ce,instancingColor:ce&&D.instanceColor!==null,instancingMorph:ce&&D.morphTexture!==null,outputColorSpace:B===null?n.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:ut.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:ge,matcap:Ye,envMap:K,envMapMode:K&&ne.mapping,envMapCubeUVHeight:H,aoMap:ie,lightMap:ae,bumpMap:he,normalMap:de,displacementMap:He,emissiveMap:Fe,normalMapObjectSpace:de&&y.normalMapType===yf,normalMapTangentSpace:de&&y.normalMapType===tr,packedNormalMap:de&&y.normalMapType===tr&&lx(y.normalMap.format),metalnessMap:Xe,roughnessMap:Le,anisotropy:U,anisotropyMap:j,clearcoat:st,clearcoatMap:ue,clearcoatNormalMap:pe,clearcoatRoughnessMap:Q,dispersion:Qe,retroreflection:C,iridescence:v,iridescenceMap:se,iridescenceThicknessMap:ye,sheen:V,sheenColorMap:ze,sheenRoughnessMap:xe,specularMap:me,specularColorMap:Ne,specularIntensityMap:Ge,transmission:G,transmissionMap:je,thicknessMap:z,gradientMap:_e,opaque:y.transparent===!1&&y.blending===Qs&&y.alphaToCoverage===!1,alphaMap:te,alphaTest:ve,alphaHash:Pe,combine:y.combine,mapUv:ge&&p(y.map.channel),aoMapUv:ie&&p(y.aoMap.channel),lightMapUv:ae&&p(y.lightMap.channel),bumpMapUv:he&&p(y.bumpMap.channel),normalMapUv:de&&p(y.normalMap.channel),displacementMapUv:He&&p(y.displacementMap.channel),emissiveMapUv:Fe&&p(y.emissiveMap.channel),metalnessMapUv:Xe&&p(y.metalnessMap.channel),roughnessMapUv:Le&&p(y.roughnessMap.channel),anisotropyMapUv:j&&p(y.anisotropyMap.channel),clearcoatMapUv:ue&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:pe&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:xe&&p(y.sheenRoughnessMap.channel),specularMapUv:me&&p(y.specularMap.channel),specularColorMapUv:Ne&&p(y.specularColorMap.channel),specularIntensityMapUv:Ge&&p(y.specularIntensityMap.channel),transmissionMapUv:je&&p(y.transmissionMap.channel),thicknessMapUv:z&&p(y.thicknessMap.channel),alphaMapUv:te&&p(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(de||U),vertexNormals:!!k.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!k.attributes.uv&&(ge||te),fog:!!N,useFog:y.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||k.attributes.normal===void 0&&de===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ee,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Ee,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:We,decodeVideoTexture:ge&&y.map.isVideoTexture===!0&&ut.getTransfer(y.map.colorSpace)===xt,decodeVideoTextureEmissive:Fe&&y.emissiveMap.isVideoTexture===!0&&ut.getTransfer(y.emissiveMap.colorSpace)===xt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===An,flipSided:y.side===Qt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:le&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&y.extensions.multiDraw===!0||re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let A in y.defines)E.push(A),E.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(m(E,y),M(E,y),E.push(n.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function m(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numSunLights),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numSunLightShadows),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function M(y,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function S(y){let E=d[y.type],A;if(E){let R=pi[E];A=Pn.clone(R.uniforms)}else A=y.uniforms;return A}function x(y,E){let A=h.get(E);return A!==void 0?++A.usedTimes:(A=new ox(n,E,y,s),l.push(A),h.set(E,A)),A}function T(y){if(--y.usedTimes===0){let E=l.indexOf(y);l[E]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function P(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:S,acquireProgram:x,releaseProgram:T,releaseShaderCache:b,programs:l,dispose:P}}function fx(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function ux(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function tu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nu(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,p,_,g,m){let M=n[e];return M===void 0?(M={id:u.id,object:u,geometry:d,material:p,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},n[e]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=p,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=g,M.group=m),e++,M}function c(u,d,p,_,g,m,M){M.reversedDepth===!0&&(g=-g);let S=o(u,d,p,_,g,m);p.transmission>0?i.push(S):p.transparent===!0?s.push(S):t.push(S)}function l(u,d,p,_,g,m){let M=o(u,d,p,_,g,m);p.transmission>0?i.unshift(M):p.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,d){t.length>1&&t.sort(u||ux),i.length>1&&i.sort(d||tu),s.length>1&&s.sort(d||tu)}function f(){for(let u=e,d=n.length;u<d;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:h}}function dx(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new nu,n.set(i,[a])):s>=r.length?(a=new nu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function px(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new Re};break;case"SpotLight":t={position:new L,direction:new L,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function mx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var gx=0;function xx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function yx(n){let e=new px,t=mx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);let s=new L,r=new tt,a=new tt;function o(l){let h=0,f=0,u=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,M=0,S=0,x=0,T=0,b=0,P=0,y=0,E=0,A=0;l.sort(xx);for(let D=0,F=l.length;D<F;D++){let N=l[D],k=N.color,q=N.intensity,Y=N.distance,ne=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Yi?ne=N.shadow.map.texture:ne=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=k.r*q,f+=k.g*q,u+=k.b*q;else if(N.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(N.sh.coefficients[H],q);A++}else if(N.isSunLight){let H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let J=N.shadow,Z=t.get(N);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),i.sunShadow[p]=Z,i.sunShadowMap[p]=ne;let Ce=J.getViewportCount();for(let Ee=0;Ee<Ce;Ee++)i.sunShadowMatrix[_+Ee]=J.getMatrix(Ee),i.sunShadowCascade[_+Ee]=J._cascadeData[Ee];_+=Ce,p++}i.sun[d]=H,d++}else if(N.isDirectionalLight){let H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let J=N.shadow,Z=t.get(N);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize=J.mapSize,i.directionalShadow[g]=Z,i.directionalShadowMap[g]=ne,i.directionalShadowMatrix[g]=N.shadow.matrix,T++}i.directional[g]=H,g++}else if(N.isSpotLight){let H=e.get(N);H.position.setFromMatrixPosition(N.matrixWorld),H.color.copy(k).multiplyScalar(q),H.distance=Y,H.coneCos=Math.cos(N.angle),H.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),H.decay=N.decay,i.spot[M]=H;let J=N.shadow;if(N.map&&(i.spotLightMap[y]=N.map,y++,J.updateMatrices(N),N.castShadow&&E++),i.spotLightMatrix[M]=J.matrix,N.castShadow){let Z=t.get(N);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize=J.mapSize,i.spotShadow[M]=Z,i.spotShadowMap[M]=ne,P++}M++}else if(N.isRectAreaLight){let H=e.get(N);H.color.copy(k).multiplyScalar(q),H.halfWidth.set(N.width*.5,0,0),H.halfHeight.set(0,N.height*.5,0),i.rectArea[S]=H,S++}else if(N.isPointLight){let H=e.get(N);if(H.color.copy(N.color).multiplyScalar(N.intensity),H.distance=N.distance,H.decay=N.decay,N.castShadow){let J=N.shadow,Z=t.get(N);Z.shadowIntensity=J.intensity,Z.shadowBias=J.bias,Z.shadowNormalBias=J.normalBias,Z.shadowRadius=J.radius,Z.shadowMapSize=J.mapSize,Z.shadowCameraNear=J.camera.near,Z.shadowCameraFar=J.camera.far,i.pointShadow[m]=Z,i.pointShadowMap[m]=ne,i.pointShadowMatrix[m]=N.shadow.matrix,b++}i.point[m]=H,m++}else if(N.isHemisphereLight){let H=e.get(N);H.skyColor.copy(N.color).multiplyScalar(q),H.groundColor.copy(N.groundColor).multiplyScalar(q),i.hemi[x]=H,x++}}S>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;let R=i.hash;(R.sunLength!==d||R.directionalLength!==g||R.pointLength!==m||R.spotLength!==M||R.rectAreaLength!==S||R.hemiLength!==x||R.numSunShadows!==p||R.numDirectionalShadows!==T||R.numPointShadows!==b||R.numSpotShadows!==P||R.numSpotMaps!==y||R.numLightProbes!==A)&&(i.sun.length=d,i.directional.length=g,i.spot.length=M,i.rectArea.length=S,i.point.length=m,i.hemi.length=x,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+y-E,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=A,R.sunLength=d,R.directionalLength=g,R.pointLength=m,R.spotLength=M,R.rectAreaLength=S,R.hemiLength=x,R.numSunShadows=p,R.numDirectionalShadows=T,R.numPointShadows=b,R.numSpotShadows=P,R.numSpotMaps=y,R.numLightProbes=A,i.version=gx++)}function c(l,h){let f=0,u=0,d=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let M=0,S=l.length;M<S;M++){let x=l[M];if(x.isSunLight){let T=i.sun[f];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),f++}else if(x.isDirectionalLight){let T=i.directional[u];T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),u++}else if(x.isSpotLight){let T=i.spot[p];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),p++}else if(x.isRectAreaLight){let T=i.rectArea[_];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){let T=i.point[d];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){let T=i.hemi[g];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:i}}function iu(n){let e=new yx(n),t=[],i=[],s=[];function r(u){f.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function _x(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new iu(n),e.set(s,[o])):r>=a.length?(o=new iu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var vx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mx=`uniform sampler2D shadow_pass;
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
}`,bx=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Sx=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],su=new tt,Ra=new L,kl=new L;function wx(n,e,t){let i=new Ys,s=new oe,r=new oe,a=new It,o=new js,c=new Yo,l={},h=t.maxTextureSize,f={[fi]:Qt,[Qt]:fi,[An]:An},u=new Ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:vx,fragmentShader:Mx}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new Pt;p.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ht(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ha;let m=this.type;this.render=function(b,P,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Kh&&($e("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ha);let E=n.getRenderTarget(),A=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),D=n.state;D.setBlending(zt),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let F=m!==this.type;F&&P.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(k=>k.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,k=b.length;N<k;N++){let q=b[N],Y=q.shadow;if(Y===void 0){$e("WebGLShadowMap:",q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let ne=Y.getFrameExtents();s.multiply(ne),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,Y.mapSize.y=r.y));let H=n.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=H,Y.map===null||F===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Gi){if(q.isPointLight){$e("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Nt(s.x,s.y,{format:Yi,type:$t,minFilter:jt,magFilter:jt,generateMipmaps:!1}),Y.map.texture.name=q.name+".shadowMap",Y.map.depthTexture=new ci(s.x,s.y,Cn),Y.map.depthTexture.name=q.name+".shadowMapDepth",Y.map.depthTexture.format=ii,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Bt,Y.map.depthTexture.magFilter=Bt}else q.isPointLight?(Y.map=new Q0(s.x),Y.map.depthTexture=new Bo(s.x,Xn)):(Y.map=new Nt(s.x,s.y),Y.map.depthTexture=new ci(s.x,s.y,Xn)),Y.map.depthTexture.name=q.name+".shadowMap",Y.map.depthTexture.format=ii,this.type===ha?(Y.map.depthTexture.compareFunction=H?J0:$0,Y.map.depthTexture.minFilter=jt,Y.map.depthTexture.magFilter=jt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Bt,Y.map.depthTexture.magFilter=Bt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let J=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();q.isPointLight!==!0&&Y.updateMatrices(q,y);for(let Z=0;Z<J;Z++){let Ce=Y.getCamera(Z);if(q.isPointLight){let Ee=Y.camera,ct=Y.matrix,Ke=q.distance||Ee.far;Ke!==Ee.far&&(Ee.far=Ke,Ee.updateProjectionMatrix()),Ra.setFromMatrixPosition(q.matrixWorld),Ee.position.copy(Ra),kl.copy(Ee.position),kl.add(bx[Z]),Ee.up.copy(Sx[Z]),Ee.lookAt(kl),Ee.updateMatrixWorld(),ct.makeTranslation(-Ra.x,-Ra.y,-Ra.z),su.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(su,Ee.coordinateSystem,Ee.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)n.setRenderTarget(Y.map,Z),n.clear();else{Z===0&&(n.setRenderTarget(Y.map),n.clear());let Ee=Y.getViewport(Z);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),D.viewport(a)}i=Y.getFrustum(Z),x(P,y,Ce,q,this.type)}Y.isPointLightShadow!==!0&&this.type===Gi&&M(Y,y),Y.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(E,A,R)};function M(b,P){let y=e.update(_);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new Nt(s.x,s.y,{format:Yi,type:$t}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(P,null,y,u,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(P,null,y,d,_,null)}function S(b,P,y,E){let A=null,R=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)A=R;else if(A=y.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let D=A.uuid,F=P.uuid,N=l[D];N===void 0&&(N={},l[D]=N);let k=N[F];k===void 0&&(k=A.clone(),N[F]=k,P.addEventListener("dispose",T)),A=k}if(A.visible=P.visible,A.wireframe=P.wireframe,E===Gi?A.side=P.shadowSide!==null?P.shadowSide:P.side:A.side=P.shadowSide!==null?P.shadowSide:f[P.side],A.alphaMap=P.alphaMap,A.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,A.map=P.map,A.clipShadows=P.clipShadows,A.clippingPlanes=P.clippingPlanes,A.clipIntersection=P.clipIntersection,A.displacementMap=P.displacementMap,A.displacementScale=P.displacementScale,A.displacementBias=P.displacementBias,A.wireframeLinewidth=P.wireframeLinewidth,A.linewidth=P.linewidth,y.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let D=n.properties.get(A);D.light=y}return A}function x(b,P,y,E,A){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&A===Gi)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);let F=e.update(b),N=b.material;if(Array.isArray(N)){let k=F.groups;for(let q=0,Y=k.length;q<Y;q++){let ne=k[q],H=N[ne.materialIndex];if(H&&H.visible){let J=S(b,H,E,A);b.onBeforeShadow(n,b,P,y,F,J,ne),n.renderBufferDirect(y,null,F,J,b,ne),b.onAfterShadow(n,b,P,y,F,J,ne)}}}else if(N.visible){let k=S(b,N,E,A);b.onBeforeShadow(n,b,P,y,F,k,null),n.renderBufferDirect(y,null,F,k,b,null),b.onAfterShadow(n,b,P,y,F,k,null)}}let D=b.children;for(let F=0,N=D.length;F<N;F++)x(D[F],P,y,E,A)}function T(b){b.target.removeEventListener("dispose",T);for(let y in l){let E=l[y],A=b.target.uuid;A in E&&(E[A].dispose(),delete E[A])}}}function Tx(n,e){function t(){let z=!1,_e=new It,te=null,ve=new It(0,0,0,0);return{setMask:function(Pe){te!==Pe&&!z&&(n.colorMask(Pe,Pe,Pe,Pe),te=Pe)},setLocked:function(Pe){z=Pe},setClear:function(Pe,le,We,Be,Tt){Tt===!0&&(Pe*=Be,le*=Be,We*=Be),_e.set(Pe,le,We,Be),ve.equals(_e)===!1&&(n.clearColor(Pe,le,We,Be),ve.copy(_e))},reset:function(){z=!1,te=null,ve.set(-1,0,0,0)}}}function i(){let z=!1,_e=!1,te=null,ve=null,Pe=null;return{setReversed:function(le){if(_e!==le){let We=e.get("EXT_clip_control");le?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),_e=le;let Be=Pe;Pe=null,this.setClear(Be)}},getReversed:function(){return _e},setTest:function(le){le?B(n.DEPTH_TEST):ee(n.DEPTH_TEST)},setMask:function(le){te!==le&&!z&&(n.depthMask(le),te=le)},setFunc:function(le){if(_e&&(le=Cf[le]),ve!==le){switch(le){case Ao:n.depthFunc(n.NEVER);break;case Ro:n.depthFunc(n.ALWAYS);break;case Co:n.depthFunc(n.LESS);break;case Os:n.depthFunc(n.LEQUAL);break;case Po:n.depthFunc(n.EQUAL);break;case Io:n.depthFunc(n.GEQUAL);break;case Lo:n.depthFunc(n.GREATER);break;case Do:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=le}},setLocked:function(le){z=le},setClear:function(le){Pe!==le&&(Pe=le,_e&&(le=1-le),n.clearDepth(le))},reset:function(){z=!1,te=null,ve=null,Pe=null,_e=!1}}}function s(){let z=!1,_e=null,te=null,ve=null,Pe=null,le=null,We=null,Be=null,Tt=null;return{setTest:function(_t){z||(_t?B(n.STENCIL_TEST):ee(n.STENCIL_TEST))},setMask:function(_t){_e!==_t&&!z&&(n.stencilMask(_t),_e=_t)},setFunc:function(_t,Un,Kn){(te!==_t||ve!==Un||Pe!==Kn)&&(n.stencilFunc(_t,Un,Kn),te=_t,ve=Un,Pe=Kn)},setOp:function(_t,Un,Kn){(le!==_t||We!==Un||Be!==Kn)&&(n.stencilOp(_t,Un,Kn),le=_t,We=Un,Be=Kn)},setLocked:function(_t){z=_t},setClear:function(_t){Tt!==_t&&(n.clearStencil(_t),Tt=_t)},reset:function(){z=!1,_e=null,te=null,ve=null,Pe=null,le=null,We=null,Be=null,Tt=null}}}let r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],_=null,g=!1,m=null,M=null,S=null,x=null,T=null,b=null,P=null,y=new Re(0,0,0),E=0,A=!1,R=null,D=null,F=null,N=null,k=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,ne=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(H)[1]),Y=ne>=1):H.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),Y=ne>=2);let J=null,Z={},Ce=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),ct=new It().fromArray(Ce),Ke=new It().fromArray(Ee);function it(z,_e,te,ve){let Pe=new Uint8Array(4),le=n.createTexture();n.bindTexture(z,le),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let We=0;We<te;We++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(_e,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,Pe):n.texImage2D(_e+We,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Pe);return le}let I={};I[n.TEXTURE_2D]=it(n.TEXTURE_2D,n.TEXTURE_2D,1),I[n.TEXTURE_CUBE_MAP]=it(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[n.TEXTURE_2D_ARRAY]=it(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),I[n.TEXTURE_3D]=it(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),B(n.DEPTH_TEST),a.setFunc(Os),he(!1),de(rl),B(n.CULL_FACE),ie(zt);function B(z){h[z]!==!0&&(n.enable(z),h[z]=!0)}function ee(z){h[z]!==!1&&(n.disable(z),h[z]=!1)}function ce(z,_e){return u[z]!==_e?(n.bindFramebuffer(z,_e),u[z]=_e,z===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=_e),z===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=_e),!0):!1}function re(z,_e){let te=p,ve=!1;if(z){te=d.get(_e),te===void 0&&(te=[],d.set(_e,te));let Pe=z.textures;if(te.length!==Pe.length||te[0]!==n.COLOR_ATTACHMENT0){for(let le=0,We=Pe.length;le<We;le++)te[le]=n.COLOR_ATTACHMENT0+le;te.length=Pe.length,ve=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,ve=!0);ve&&n.drawBuffers(te)}function ge(z){return _!==z?(n.useProgram(z),_=z,!0):!1}let Ye={[Rn]:n.FUNC_ADD,[Qh]:n.FUNC_SUBTRACT,[ef]:n.FUNC_REVERSE_SUBTRACT};Ye[tf]=n.MIN,Ye[nf]=n.MAX;let K={[os]:n.ZERO,[sf]:n.ONE,[rf]:n.SRC_COLOR,[ll]:n.SRC_ALPHA,[lf]:n.SRC_ALPHA_SATURATE,[ua]:n.DST_COLOR,[fa]:n.DST_ALPHA,[af]:n.ONE_MINUS_SRC_COLOR,[hl]:n.ONE_MINUS_SRC_ALPHA,[cf]:n.ONE_MINUS_DST_COLOR,[of]:n.ONE_MINUS_DST_ALPHA,[hf]:n.CONSTANT_COLOR,[ff]:n.ONE_MINUS_CONSTANT_COLOR,[uf]:n.CONSTANT_ALPHA,[df]:n.ONE_MINUS_CONSTANT_ALPHA};function ie(z,_e,te,ve,Pe,le,We,Be,Tt,_t){if(z===zt){g===!0&&(ee(n.BLEND),g=!1);return}if(g===!1&&(B(n.BLEND),g=!0),z!==o0){if(z!==m||_t!==A){if((M!==Rn||T!==Rn)&&(n.blendEquation(n.FUNC_ADD),M=Rn,T=Rn),_t)switch(z){case Qs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case al:n.blendFunc(n.ONE,n.ONE);break;case ol:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case cl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ze("WebGLState: Invalid blending: ",z);break}else switch(z){case Qs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case al:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ol:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cl:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",z);break}S=null,x=null,b=null,P=null,y.set(0,0,0),E=0,m=z,A=_t}return}Pe=Pe||_e,le=le||te,We=We||ve,(_e!==M||Pe!==T)&&(n.blendEquationSeparate(Ye[_e],Ye[Pe]),M=_e,T=Pe),(te!==S||ve!==x||le!==b||We!==P)&&(n.blendFuncSeparate(K[te],K[ve],K[le],K[We]),S=te,x=ve,b=le,P=We),(Be.equals(y)===!1||Tt!==E)&&(n.blendColor(Be.r,Be.g,Be.b,Tt),y.copy(Be),E=Tt),m=z,A=!1}function ae(z,_e){z.side===An?ee(n.CULL_FACE):B(n.CULL_FACE);let te=z.side===Qt;_e&&(te=!te),he(te),z.blending===Qs&&z.transparent===!1?ie(zt):ie(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let ve=z.stencilWrite;o.setTest(ve),ve&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Fe(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?B(n.SAMPLE_ALPHA_TO_COVERAGE):ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function he(z){R!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),R=z)}function de(z){z!==Jh?(B(n.CULL_FACE),z!==D&&(z===rl?n.cullFace(n.BACK):z===jh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ee(n.CULL_FACE),D=z}function He(z){z!==F&&(Y&&n.lineWidth(z),F=z)}function Fe(z,_e,te){z?(B(n.POLYGON_OFFSET_FILL),(N!==_e||k!==te)&&(N=_e,k=te,a.getReversed()&&(_e=-_e),n.polygonOffset(_e,te))):ee(n.POLYGON_OFFSET_FILL)}function Xe(z){z?B(n.SCISSOR_TEST):ee(n.SCISSOR_TEST)}function Le(z){z===void 0&&(z=n.TEXTURE0+q-1),J!==z&&(n.activeTexture(z),J=z)}function U(z,_e,te){te===void 0&&(J===null?te=n.TEXTURE0+q-1:te=J);let ve=Z[te];ve===void 0&&(ve={type:void 0,texture:void 0},Z[te]=ve),(ve.type!==z||ve.texture!==_e)&&(J!==te&&(n.activeTexture(te),J=te),n.bindTexture(z,_e||I[z]),ve.type=z,ve.texture=_e)}function st(){let z=Z[J];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Qe(){try{n.compressedTexImage2D(...arguments)}catch(z){Ze("WebGLState:",z)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(z){Ze("WebGLState:",z)}}function v(){try{n.texSubImage2D(...arguments)}catch(z){Ze("WebGLState:",z)}}function V(){try{n.texSubImage3D(...arguments)}catch(z){Ze("WebGLState:",z)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(z){Ze("WebGLState:",z)}}function j(){try{n.compressedTexSubImage3D(...arguments)}catch(z){Ze("WebGLState:",z)}}function ue(){try{n.texStorage2D(...arguments)}catch(z){Ze("WebGLState:",z)}}function pe(){try{n.texStorage3D(...arguments)}catch(z){Ze("WebGLState:",z)}}function Q(){try{n.texImage2D(...arguments)}catch(z){Ze("WebGLState:",z)}}function se(){try{n.texImage3D(...arguments)}catch(z){Ze("WebGLState:",z)}}function ye(z){return f[z]!==void 0?f[z]:n.getParameter(z)}function ze(z,_e){f[z]!==_e&&(n.pixelStorei(z,_e),f[z]=_e)}function xe(z){ct.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ct.copy(z))}function me(z){Ke.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Ke.copy(z))}function Ne(z,_e){let te=l.get(_e);te===void 0&&(te=new WeakMap,l.set(_e,te));let ve=te.get(z);ve===void 0&&(ve=n.getUniformBlockIndex(_e,z.name),te.set(z,ve))}function Ge(z,_e){let ve=l.get(_e).get(z);c.get(_e)!==ve&&(n.uniformBlockBinding(_e,ve,z.__bindingPointIndex),c.set(_e,ve))}function je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},J=null,Z={},u={},d=new WeakMap,p=[],_=null,g=!1,m=null,M=null,S=null,x=null,T=null,b=null,P=null,y=new Re(0,0,0),E=0,A=!1,R=null,D=null,F=null,N=null,k=null,ct.set(0,0,n.canvas.width,n.canvas.height),Ke.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:B,disable:ee,bindFramebuffer:ce,drawBuffers:re,useProgram:ge,setBlending:ie,setMaterial:ae,setFlipSided:he,setCullFace:de,setLineWidth:He,setPolygonOffset:Fe,setScissorTest:Xe,activeTexture:Le,bindTexture:U,unbindTexture:st,compressedTexImage2D:Qe,compressedTexImage3D:C,texImage2D:Q,texImage3D:se,pixelStorei:ze,getParameter:ye,updateUBOMapping:Ne,uniformBlockBinding:Ge,texStorage2D:ue,texStorage3D:pe,texSubImage2D:v,texSubImage3D:V,compressedTexSubImage2D:G,compressedTexSubImage3D:j,scissor:xe,viewport:me,reset:je}}function Ex(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,h=new WeakMap,f=new Set,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,v){return p?new OffscreenCanvas(C,v):Dr("canvas")}function g(C,v,V){let G=1,j=Qe(C);if((j.width>V||j.height>V)&&(G=V/Math.max(j.width,j.height)),G<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ue=Math.floor(G*j.width),pe=Math.floor(G*j.height);u===void 0&&(u=_(ue,pe));let Q=v?_(ue,pe):u;return Q.width=ue,Q.height=pe,Q.getContext("2d").drawImage(C,0,0,ue,pe),$e("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+ue+"x"+pe+")."),Q}else return"data"in C&&$e("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),C;return C}function m(C){return C.generateMipmaps}function M(C){n.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(C,v,V,G,j,ue=!1){if(C!==null){if(n[C]!==void 0)return n[C];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let pe;G&&(pe=e.get("EXT_texture_norm16"),pe||$e("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(V===n.FLOAT&&(Q=n.R32F),V===n.HALF_FLOAT&&(Q=n.R16F),V===n.UNSIGNED_BYTE&&(Q=n.R8),V===n.UNSIGNED_SHORT&&pe&&(Q=pe.R16_EXT),V===n.SHORT&&pe&&(Q=pe.R16_SNORM_EXT)),v===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.R8UI),V===n.UNSIGNED_SHORT&&(Q=n.R16UI),V===n.UNSIGNED_INT&&(Q=n.R32UI),V===n.BYTE&&(Q=n.R8I),V===n.SHORT&&(Q=n.R16I),V===n.INT&&(Q=n.R32I)),v===n.RG&&(V===n.FLOAT&&(Q=n.RG32F),V===n.HALF_FLOAT&&(Q=n.RG16F),V===n.UNSIGNED_BYTE&&(Q=n.RG8),V===n.UNSIGNED_SHORT&&pe&&(Q=pe.RG16_EXT),V===n.SHORT&&pe&&(Q=pe.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RG8UI),V===n.UNSIGNED_SHORT&&(Q=n.RG16UI),V===n.UNSIGNED_INT&&(Q=n.RG32UI),V===n.BYTE&&(Q=n.RG8I),V===n.SHORT&&(Q=n.RG16I),V===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),V===n.UNSIGNED_INT&&(Q=n.RGB32UI),V===n.BYTE&&(Q=n.RGB8I),V===n.SHORT&&(Q=n.RGB16I),V===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),V===n.UNSIGNED_INT&&(Q=n.RGBA32UI),V===n.BYTE&&(Q=n.RGBA8I),V===n.SHORT&&(Q=n.RGBA16I),V===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(V===n.UNSIGNED_SHORT&&pe&&(Q=pe.RGB16_EXT),V===n.SHORT&&pe&&(Q=pe.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){let se=ue?Lr:ut.getTransfer(j);V===n.FLOAT&&(Q=n.RGBA32F),V===n.HALF_FLOAT&&(Q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Q=se===xt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&pe&&(Q=pe.RGBA16_EXT),V===n.SHORT&&pe&&(Q=pe.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function T(C,v){let V;return C?v===null||v===Xn||v===qi?V=n.DEPTH24_STENCIL8:v===Cn?V=n.DEPTH32F_STENCIL8:v===er&&(V=n.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Xn||v===qi?V=n.DEPTH_COMPONENT24:v===Cn?V=n.DEPTH_COMPONENT32F:v===er&&(V=n.DEPTH_COMPONENT16),V}function b(C,v){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Bt&&C.minFilter!==jt?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function P(C){let v=C.target;v.removeEventListener("dispose",P),E(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&f.delete(v)}function y(C){let v=C.target;v.removeEventListener("dispose",y),R(v)}function E(C){let v=i.get(C);if(v.__webglInit===void 0)return;let V=C.source,G=d.get(V);if(G){let j=G[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&A(C),Object.keys(G).length===0&&d.delete(V)}i.remove(C)}function A(C){let v=i.get(C);n.deleteTexture(v.__webglTexture);let V=C.source,G=d.get(V);delete G[v.__cacheKey],a.memory.textures--}function R(C){let v=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let j=0;j<v.__webglFramebuffer[G].length;j++)n.deleteFramebuffer(v.__webglFramebuffer[G][j]);else n.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)n.deleteFramebuffer(v.__webglFramebuffer[G]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let V=C.textures;for(let G=0,j=V.length;G<j;G++){let ue=i.get(V[G]);ue.__webglTexture&&(n.deleteTexture(ue.__webglTexture),a.memory.textures--),i.remove(V[G])}i.remove(C)}let D=0;function F(){D=0}function N(){return D}function k(C){D=C}function q(){let C=D;return C>=s.maxTextures&&$e("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function Y(C){let v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function ne(C,v){let V=i.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){let G=C.image;if(G===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{ee(V,C,v);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+v)}function H(C,v){let V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ee(V,C,v);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+v)}function J(C,v){let V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ee(V,C,v);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+v)}function Z(C,v){let V=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){ce(V,C,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+v)}let Ce={[En]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[No]:n.MIRRORED_REPEAT},Ee={[Bt]:n.NEAREST,[gf]:n.NEAREST_MIPMAP_NEAREST,[va]:n.NEAREST_MIPMAP_LINEAR,[jt]:n.LINEAR,[f0]:n.LINEAR_MIPMAP_NEAREST,[Xi]:n.LINEAR_MIPMAP_LINEAR},ct={[vf]:n.NEVER,[Tf]:n.ALWAYS,[Mf]:n.LESS,[$0]:n.LEQUAL,[bf]:n.EQUAL,[J0]:n.GEQUAL,[Sf]:n.GREATER,[wf]:n.NOTEQUAL};function Ke(C,v){if(v.type===Cn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===jt||v.magFilter===f0||v.magFilter===va||v.magFilter===Xi||v.minFilter===jt||v.minFilter===f0||v.minFilter===va||v.minFilter===Xi)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Ce[v.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Ce[v.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Ce[v.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Ee[v.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Ee[v.minFilter]),v.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,ct[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Bt||v.minFilter!==va&&v.minFilter!==Xi||v.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function it(C,v){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",P));let G=v.source,j=d.get(G);j===void 0&&(j={},d.set(G,j));let ue=Y(v);if(ue!==C.__cacheKey){j[ue]===void 0&&(j[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),j[ue].usedTimes++;let pe=j[C.__cacheKey];pe!==void 0&&(j[C.__cacheKey].usedTimes--,pe.usedTimes===0&&A(v)),C.__cacheKey=ue,C.__webglTexture=j[ue].texture}return V}function I(C,v,V){return Math.floor(Math.floor(C/V)/v)}function B(C,v,V,G){let ue=C.updateRanges;if(ue.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,V,G,v.data);else{ue.sort((ze,xe)=>ze.start-xe.start);let pe=0;for(let ze=1;ze<ue.length;ze++){let xe=ue[pe],me=ue[ze],Ne=xe.start+xe.count,Ge=I(me.start,v.width,4),je=I(xe.start,v.width,4);me.start<=Ne+1&&Ge===je&&I(me.start+me.count-1,v.width,4)===Ge?xe.count=Math.max(xe.count,me.start+me.count-xe.start):(++pe,ue[pe]=me)}ue.length=pe+1;let Q=t.getParameter(n.UNPACK_ROW_LENGTH),se=t.getParameter(n.UNPACK_SKIP_PIXELS),ye=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ze=0,xe=ue.length;ze<xe;ze++){let me=ue[ze],Ne=Math.floor(me.start/4),Ge=Math.ceil(me.count/4),je=Ne%v.width,z=Math.floor(Ne/v.width),_e=Ge,te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,je),t.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,je,z,_e,te,V,G,v.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,se),t.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function ee(C,v,V){let G=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=n.TEXTURE_3D);let j=it(C,v),ue=v.source;t.bindTexture(G,C.__webglTexture,n.TEXTURE0+V);let pe=i.get(ue);if(ue.version!==pe.__version||j===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let te=ut.getPrimaries(ut.workingColorSpace),ve=v.colorSpace===Ti?null:ut.getPrimaries(v.colorSpace),Pe=v.colorSpace===Ti||te===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let se=g(v.image,!1,s.maxTextureSize);se=st(v,se);let ye=r.convert(v.format,v.colorSpace),ze=r.convert(v.type),xe=x(v.internalFormat,ye,ze,v.normalized,v.colorSpace,v.isVideoTexture);Ke(G,v);let me,Ne=v.mipmaps,Ge=v.isVideoTexture!==!0,je=pe.__version===void 0||j===!0,z=ue.dataReady,_e=b(v,se);if(v.isDepthTexture)xe=T(v.format===ui,v.type),je&&(Ge?t.texStorage2D(n.TEXTURE_2D,1,xe,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,xe,se.width,se.height,0,ye,ze,null));else if(v.isDataTexture)if(Ne.length>0){Ge&&je&&t.texStorage2D(n.TEXTURE_2D,_e,xe,Ne[0].width,Ne[0].height);for(let te=0,ve=Ne.length;te<ve;te++)me=Ne[te],Ge?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,me.width,me.height,ye,ze,me.data):t.texImage2D(n.TEXTURE_2D,te,xe,me.width,me.height,0,ye,ze,me.data);v.generateMipmaps=!1}else Ge?(je&&t.texStorage2D(n.TEXTURE_2D,_e,xe,se.width,se.height),z&&B(v,se,ye,ze)):t.texImage2D(n.TEXTURE_2D,0,xe,se.width,se.height,0,ye,ze,se.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ge&&je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,xe,Ne[0].width,Ne[0].height,se.depth);for(let te=0,ve=Ne.length;te<ve;te++)if(me=Ne[te],v.format!==xn)if(ye!==null)if(Ge){if(z)if(v.layerUpdates.size>0){let Pe=El(me.width,me.height,v.format,v.type);for(let le of v.layerUpdates){let We=me.data.subarray(le*Pe/me.data.BYTES_PER_ELEMENT,(le+1)*Pe/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,le,me.width,me.height,1,ye,We)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,me.width,me.height,se.depth,ye,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,xe,me.width,me.height,se.depth,0,me.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,me.width,me.height,se.depth,ye,ze,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,xe,me.width,me.height,se.depth,0,ye,ze,me.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Ge&&je&&t.texStorage2D(n.TEXTURE_2D,_e,xe,Ne[0].width,Ne[0].height);for(let te=0,ve=Ne.length;te<ve;te++)me=Ne[te],v.format!==xn?ye!==null?Ge?z&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,me.width,me.height,ye,me.data):t.compressedTexImage2D(n.TEXTURE_2D,te,xe,me.width,me.height,0,me.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,me.width,me.height,ye,ze,me.data):t.texImage2D(n.TEXTURE_2D,te,xe,me.width,me.height,0,ye,ze,me.data)}else if(v.isDataArrayTexture)if(Ge){if(je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,xe,se.width,se.height,se.depth),z)if(v.layerUpdates.size>0){let te=El(se.width,se.height,v.format,v.type);for(let ve of v.layerUpdates){let Pe=se.data.subarray(ve*te/se.data.BYTES_PER_ELEMENT,(ve+1)*te/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ve,se.width,se.height,1,ye,ze,Pe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ye,ze,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,se.width,se.height,se.depth,0,ye,ze,se.data);else if(v.isData3DTexture)Ge?(je&&t.texStorage3D(n.TEXTURE_3D,_e,xe,se.width,se.height,se.depth),z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ye,ze,se.data)):t.texImage3D(n.TEXTURE_3D,0,xe,se.width,se.height,se.depth,0,ye,ze,se.data);else if(v.isFramebufferTexture){if(je)if(Ge)t.texStorage2D(n.TEXTURE_2D,_e,xe,se.width,se.height);else{let te=se.width,ve=se.height;for(let Pe=0;Pe<_e;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,xe,te,ve,0,ye,ze,null),te>>=1,ve>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){let te=n.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),se.parentNode!==te){te.appendChild(se),f.add(v),te.onpaint=ve=>{let Pe=ve.changedElements;for(let le of f)Pe.includes(le.image)&&(le.needsUpdate=!0)},te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,se);else{let Pe=n.RGBA,le=n.RGBA,We=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Pe,le,We,se)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Ge&&je){let te=Qe(Ne[0]);t.texStorage2D(n.TEXTURE_2D,_e,xe,te.width,te.height)}for(let te=0,ve=Ne.length;te<ve;te++)me=Ne[te],Ge?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ye,ze,me):t.texImage2D(n.TEXTURE_2D,te,xe,ye,ze,me);v.generateMipmaps=!1}else if(Ge){if(je){let te=Qe(se);t.texStorage2D(n.TEXTURE_2D,_e,xe,te.width,te.height)}z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,ze,se)}else t.texImage2D(n.TEXTURE_2D,0,xe,ye,ze,se);m(v)&&M(G),pe.__version=ue.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function ce(C,v,V){if(v.image.length!==6)return;let G=it(C,v),j=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+V);let ue=i.get(j);if(j.version!==ue.__version||G===!0){t.activeTexture(n.TEXTURE0+V);let pe=ut.getPrimaries(ut.workingColorSpace),Q=v.colorSpace===Ti?null:ut.getPrimaries(v.colorSpace),se=v.colorSpace===Ti||pe===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ye=v.isCompressedTexture||v.image[0].isCompressedTexture,ze=v.image[0]&&v.image[0].isDataTexture,xe=[];for(let le=0;le<6;le++)!ye&&!ze?xe[le]=g(v.image[le],!0,s.maxCubemapSize):xe[le]=ze?v.image[le].image:v.image[le],xe[le]=st(v,xe[le]);let me=xe[0],Ne=r.convert(v.format,v.colorSpace),Ge=r.convert(v.type),je=x(v.internalFormat,Ne,Ge,v.normalized,v.colorSpace),z=v.isVideoTexture!==!0,_e=ue.__version===void 0||G===!0,te=j.dataReady,ve=b(v,me);Ke(n.TEXTURE_CUBE_MAP,v);let Pe;if(ye){z&&_e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,je,me.width,me.height);for(let le=0;le<6;le++){Pe=xe[le].mipmaps;for(let We=0;We<Pe.length;We++){let Be=Pe[We];v.format!==xn?Ne!==null?z?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We,0,0,Be.width,Be.height,Ne,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We,je,Be.width,Be.height,0,Be.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We,0,0,Be.width,Be.height,Ne,Ge,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We,je,Be.width,Be.height,0,Ne,Ge,Be.data)}}}else{if(Pe=v.mipmaps,z&&_e){Pe.length>0&&ve++;let le=Qe(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,je,le.width,le.height)}for(let le=0;le<6;le++)if(ze){z?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,xe[le].width,xe[le].height,Ne,Ge,xe[le].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,je,xe[le].width,xe[le].height,0,Ne,Ge,xe[le].data);for(let We=0;We<Pe.length;We++){let Tt=Pe[We].image[le].image;z?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We+1,0,0,Tt.width,Tt.height,Ne,Ge,Tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We+1,je,Tt.width,Tt.height,0,Ne,Ge,Tt.data)}}else{z?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Ne,Ge,xe[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,je,Ne,Ge,xe[le]);for(let We=0;We<Pe.length;We++){let Be=Pe[We];z?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We+1,0,0,Ne,Ge,Be.image[le]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,We+1,je,Ne,Ge,Be.image[le])}}}m(v)&&M(n.TEXTURE_CUBE_MAP),ue.__version=j.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function re(C,v,V,G,j,ue){let pe=r.convert(V.format,V.colorSpace),Q=r.convert(V.type),se=x(V.internalFormat,pe,Q,V.normalized,V.colorSpace),ye=i.get(v),ze=i.get(V);if(ze.__renderTarget=v,!ye.__hasExternalTextures){let xe=Math.max(1,v.width>>ue),me=Math.max(1,v.height>>ue);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?t.texImage3D(j,ue,se,xe,me,v.depth,0,pe,Q,null):t.texImage2D(j,ue,se,xe,me,0,pe,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Le(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,j,ze.__webglTexture,0,Xe(v)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,j,ze.__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(C,v,V){if(n.bindRenderbuffer(n.RENDERBUFFER,C),v.depthBuffer){let G=v.depthTexture,j=G&&G.isDepthTexture?G.type:null,ue=T(v.stencilBuffer,j),pe=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Le(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe(v),ue,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe(v),ue,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ue,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,C)}else{let G=v.textures;for(let j=0;j<G.length;j++){let ue=G[j],pe=r.convert(ue.format,ue.colorSpace),Q=r.convert(ue.type),se=x(ue.internalFormat,pe,Q,ue.normalized,ue.colorSpace);Le(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe(v),se,v.width,v.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe(v),se,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,se,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ye(C,v,V){let G=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=i.get(v.depthTexture);if(j.__renderTarget=v,(!j.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G){if(j.__webglInit===void 0&&(j.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),j.__webglTexture===void 0){j.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,v.depthTexture);let ye=r.convert(v.depthTexture.format),ze=r.convert(v.depthTexture.type),xe;v.depthTexture.format===ii?xe=n.DEPTH_COMPONENT24:v.depthTexture.format===ui&&(xe=n.DEPTH24_STENCIL8);for(let me=0;me<6;me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,xe,v.width,v.height,0,ye,ze,null)}}else ne(v.depthTexture,0);let ue=j.__webglTexture,pe=Xe(v),Q=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,se=v.depthTexture.format===ui?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===ii)Le(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,Q,ue,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,se,Q,ue,0);else if(v.depthTexture.format===ui)Le(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,Q,ue,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,se,Q,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function K(C){let v=i.get(C),V=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){let G=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){let j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",j)};G.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=G}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(V)for(let G=0;G<6;G++)Ye(v.__webglFramebuffer[G],C,G);else{let G=C.texture.mipmaps;G&&G.length>0?Ye(v.__webglFramebuffer[0],C,0):Ye(v.__webglFramebuffer,C,0)}else if(V){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=n.createRenderbuffer(),ge(v.__webglDepthbuffer[G],C,!1);else{let j=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,ue)}}else{let G=C.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ge(v.__webglDepthbuffer,C,!1);else{let j=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,ue)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ie(C,v,V){let G=i.get(C);v!==void 0&&re(G.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&K(C)}function ae(C){let v=C.texture,V=i.get(C),G=i.get(v);C.addEventListener("dispose",y);let j=C.textures,ue=C.isWebGLCubeRenderTarget===!0,pe=j.length>1;if(pe||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=v.version,a.memory.textures++),ue){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let se=0;se<v.mipmaps.length;se++)V.__webglFramebuffer[Q][se]=n.createFramebuffer()}else V.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)V.__webglFramebuffer[Q]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(pe)for(let Q=0,se=j.length;Q<se;Q++){let ye=i.get(j[Q]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&Le(C)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<j.length;Q++){let se=j[Q];V.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);let ye=r.convert(se.format,se.colorSpace),ze=r.convert(se.type),xe=x(se.internalFormat,ye,ze,se.normalized,se.colorSpace,C.isXRRenderTarget===!0),me=Xe(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,me,xe,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),ge(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ue){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Ke(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let se=0;se<v.mipmaps.length;se++)re(V.__webglFramebuffer[Q][se],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,se);else re(V.__webglFramebuffer[Q],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(v)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let Q=0,se=j.length;Q<se;Q++){let ye=j[Q],ze=i.get(ye),xe=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(xe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,ze.__webglTexture),Ke(xe,ye),re(V.__webglFramebuffer,C,ye,n.COLOR_ATTACHMENT0+Q,xe,0),m(ye)&&M(xe)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Q=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,G.__webglTexture),Ke(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let se=0;se<v.mipmaps.length;se++)re(V.__webglFramebuffer[se],C,v,n.COLOR_ATTACHMENT0,Q,se);else re(V.__webglFramebuffer,C,v,n.COLOR_ATTACHMENT0,Q,0);m(v)&&M(Q),t.unbindTexture()}C.depthBuffer&&K(C)}function he(C){let v=C.textures;for(let V=0,G=v.length;V<G;V++){let j=v[V];if(m(j)){let ue=S(C),pe=i.get(j).__webglTexture;t.bindTexture(ue,pe),M(ue),t.unbindTexture()}}}let de=[],He=[];function Fe(C){if(C.samples>0){if(Le(C)===!1){let v=C.textures,V=C.width,G=C.height,j=n.COLOR_BUFFER_BIT,ue=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(C),Q=v.length>1;if(Q)for(let ye=0;ye<v.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let se=C.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ye=0;ye<v.length;ye++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[ye]);let ze=i.get(v[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ze,0)}n.blitFramebuffer(0,0,V,G,0,0,V,G,j,n.NEAREST),c===!0&&(de.length=0,He.length=0,de.push(n.COLOR_ATTACHMENT0+ye),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(de.push(ue),He.push(ue),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,He)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let ye=0;ye<v.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,pe.__webglColorRenderbuffer[ye]);let ze=i.get(v[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){let v=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Xe(C){return Math.min(s.maxSamples,C.samples)}function Le(C){let v=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(C){let v=a.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function st(C,v){let V=C.colorSpace,G=C.format,j=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==Ir&&V!==Ti&&(ut.getTransfer(V)===xt?(G!==xn||j!==on)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",V)),v}function Qe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=F,this.getTextureUnits=N,this.setTextureUnits=k,this.setTexture2D=ne,this.setTexture2DArray=H,this.setTexture3D=J,this.setTextureCube=Z,this.rebindTextures=ie,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Le,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ax(n,e){function t(i,s=Ti){let r,a=ut.getTransfer(s);if(i===on)return n.UNSIGNED_BYTE;if(i===d0)return n.UNSIGNED_SHORT_4_4_4_4;if(i===p0)return n.UNSIGNED_SHORT_5_5_5_1;if(i===pl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ml)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ul)return n.BYTE;if(i===dl)return n.SHORT;if(i===er)return n.UNSIGNED_SHORT;if(i===u0)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===Cn)return n.FLOAT;if(i===$t)return n.HALF_FLOAT;if(i===gl)return n.ALPHA;if(i===xl)return n.RGB;if(i===xn)return n.RGBA;if(i===ii)return n.DEPTH_COMPONENT;if(i===ui)return n.DEPTH_STENCIL;if(i===m0)return n.RED;if(i===g0)return n.RED_INTEGER;if(i===Yi)return n.RG;if(i===x0)return n.RG_INTEGER;if(i===y0)return n.RGBA_INTEGER;if(i===Ma||i===ba||i===Sa||i===wa)if(a===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_0||i===v0||i===M0||i===b0)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_0)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===v0)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===M0)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===b0)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===S0||i===w0||i===T0||i===E0||i===A0||i===Ta||i===R0)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===S0||i===w0)return a===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===T0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===E0)return r.COMPRESSED_R11_EAC;if(i===A0)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ta)return r.COMPRESSED_RG11_EAC;if(i===R0)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===C0||i===P0||i===I0||i===L0||i===D0||i===N0||i===U0||i===F0||i===k0||i===O0||i===B0||i===z0||i===V0||i===H0)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===C0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===P0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===I0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===L0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===D0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===N0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===U0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===F0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===k0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===O0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===B0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===z0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===V0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===H0)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===G0||i===W0||i===X0)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===G0)return a===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===W0)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===X0)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===q0||i===Y0||i===Ea||i===Z0)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===q0)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Y0)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Z0)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===qi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cx=`
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

}`,Xl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Gr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Ut({vertexShader:Rx,fragmentShader:Cx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new dn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ql=class extends si{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,p=null,_=typeof XRWebGLBinding<"u",g=new Xl,m={},M=t.getContextAttributes(),S=null,x=null,T=[],b=[],P=new oe,y=null,E=null,A=new Jt;A.viewport=new It;let R=new Jt;R.viewport=new It;let D=[A,R],F=new r0,N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let B=T[I];return B===void 0&&(B=new Ws,T[I]=B),B.getTargetRaySpace()},this.getControllerGrip=function(I){let B=T[I];return B===void 0&&(B=new Ws,T[I]=B),B.getGripSpace()},this.getHand=function(I){let B=T[I];return B===void 0&&(B=new Ws,T[I]=B),B.getHandSpace()};function q(I){let B=b.indexOf(I.inputSource);if(B===-1)return;let ee=T[B];ee!==void 0&&(ee.update(I.inputSource,I.frame,l||a),ee.dispatchEvent({type:I.type,data:I.inputSource}))}function Y(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",ne);for(let I=0;I<T.length;I++){let B=b[I];B!==null&&(b[I]=null,T[I].disconnect(B))}N=null,k=null,g.reset();for(let I in m)delete m[I];if(e.setRenderTarget(S),d=null,u=null,f=null,s=null,x=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),E!==null){let I=E.camera;I.fov=E.fov,I.zoom=E.zoom,I.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,i.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,i.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(I){if(s=I,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",ne),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,ce=null,re=null;M.depth&&(re=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=M.stencil?ui:ii,ce=M.stencil?qi:Xn);let ge={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(ge),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new Nt(u.textureWidth,u.textureHeight,{format:xn,type:on,depthTexture:new ci(u.textureWidth,u.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ee={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Nt(d.framebufferWidth,d.framebufferHeight,{format:xn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),it.setContext(s),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ne(I){for(let B=0;B<I.removed.length;B++){let ee=I.removed[B],ce=b.indexOf(ee);ce>=0&&(b[ce]=null,T[ce].disconnect(ee))}for(let B=0;B<I.added.length;B++){let ee=I.added[B],ce=b.indexOf(ee);if(ce===-1){for(let ge=0;ge<T.length;ge++)if(ge>=b.length){b.push(ee),ce=ge;break}else if(b[ge]===null){b[ge]=ee,ce=ge;break}if(ce===-1)break}let re=T[ce];re&&re.connect(ee)}}let H=new L,J=new L;function Z(I,B,ee){H.setFromMatrixPosition(B.matrixWorld),J.setFromMatrixPosition(ee.matrixWorld);let ce=H.distanceTo(J),re=B.projectionMatrix.elements,ge=ee.projectionMatrix.elements,Ye=re[14]/(re[10]-1),K=re[14]/(re[10]+1),ie=(re[9]+1)/re[5],ae=(re[9]-1)/re[5],he=(re[8]-1)/re[0],de=(ge[8]+1)/ge[0],He=Ye*he,Fe=Ye*de,Xe=ce/(-he+de),Le=Xe*-he;if(B.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(Le),I.translateZ(Xe),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),re[10]===-1)I.projectionMatrix.copy(B.projectionMatrix),I.projectionMatrixInverse.copy(B.projectionMatrixInverse);else{let U=Ye+Xe,st=K+Xe,Qe=He-Le,C=Fe+(ce-Le),v=ie*K/st*U,V=ae*K/st*U;I.projectionMatrix.makePerspective(Qe,C,v,V,U,st),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function Ce(I,B){B===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(B.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(s===null)return;let B=I.near,ee=I.far;g.texture!==null&&(g.depthNear>0&&(B=g.depthNear),g.depthFar>0&&(ee=g.depthFar)),F.near=R.near=A.near=B,F.far=R.far=A.far=ee,(N!==F.near||k!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),N=F.near,k=F.far),F.layers.mask=I.layers.mask|6,A.layers.mask=F.layers.mask&-5,R.layers.mask=F.layers.mask&-3;let ce=I.parent,re=F.cameras;Ce(F,ce);for(let ge=0;ge<re.length;ge++)Ce(re[ge],ce);re.length===2?Z(F,A,R):F.projectionMatrix.copy(A.projectionMatrix),E===null&&I.isPerspectiveCamera&&(E={camera:I,fov:I.fov,zoom:I.zoom}),Ee(I,F,ce)};function Ee(I,B,ee){ee===null?I.matrix.copy(B.matrixWorld):(I.matrix.copy(ee.matrixWorld),I.matrix.invert(),I.matrix.multiply(B.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(B.projectionMatrix),I.projectionMatrixInverse.copy(B.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=Vs*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(I){c=I,u!==null&&(u.fixedFoveation=I),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=I)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(I){return m[I]};let ct=null;function Ke(I,B){if(h=B.getViewerPose(l||a),p=B,h!==null){let ee=h.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let ce=!1;ee.length!==F.cameras.length&&(F.cameras.length=0,ce=!0);for(let K=0;K<ee.length;K++){let ie=ee[K],ae=null;if(d!==null)ae=d.getViewport(ie);else{let de=f.getViewSubImage(u,ie);ae=de.viewport,K===0&&(e.setRenderTargetTextures(x,de.colorTexture,de.depthStencilTexture),e.setRenderTarget(x))}let he=D[K];he===void 0&&(he=new Jt,he.layers.enable(K),he.viewport=new It,D[K]=he),he.matrix.fromArray(ie.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(ie.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(ae.x,ae.y,ae.width,ae.height),K===0&&(F.matrix.copy(he.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ce===!0&&F.cameras.push(he)}let re=s.enabledFeatures;if(re&&re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=i.getBinding();let K=f.getDepthInformation(ee[0]);K&&K.isValid&&K.texture&&g.init(K,s.renderState)}if(re&&re.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let K=0;K<ee.length;K++){let ie=ee[K].camera;if(ie){let ae=m[ie];ae||(ae=new Gr,m[ie]=ae);let he=f.getCameraImage(ie);ae.sourceTexture=he}}}}for(let ee=0;ee<T.length;ee++){let ce=b[ee],re=T[ee];ce!==null&&re!==void 0&&re.update(ce,B,l||a)}ct&&ct(I,B),B.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:B}),p=null}let it=new ru;it.setAnimationLoop(Ke),this.setAnimationLoop=function(I){ct=I},this.dispose=function(){}}},Px=new tt,fu=new et;fu.set(-1,0,0,0,1,0,0,0,1);function Ix(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Sl(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,S,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,M,S):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Qt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Qt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let M=e.get(m),S=M.envMap,x=M.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(Px.makeRotationFromEuler(x)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(fu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=S*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Lx(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,T){let b=T.program;i.uniformBlockBinding(x,b)}function l(x,T){let b=s[x.id];b===void 0&&(g(x),b=h(x),s[x.id]=b,x.addEventListener("dispose",M));let P=T.program;i.updateUBOMapping(x,P);let y=e.render.frame;r[x.id]!==y&&(u(x),r[x.id]=y)}function h(x){let T=f();x.__bindingPointIndex=T;let b=n.createBuffer(),P=x.__size,y=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,P,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,b),b}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let T=s[x.id],b=x.uniforms,P=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let y=0,E=b.length;y<E;y++){let A=b[y];if(Array.isArray(A))for(let R=0,D=A.length;R<D;R++)d(A[R],y,R,P);else d(A,y,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,T,b,P){if(_(x,T,b,P)===!0){let y=x.__offset,E=x.value;if(Array.isArray(E)){let A=0;for(let R=0;R<E.length;R++){let D=E[R],F=m(D);p(D,x.__data,A),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(A+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,x.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,x.__data)}}function p(x,T,b){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,b)}function _(x,T,b,P){let y=x.value,E=T+"_"+b;if(P[E]===void 0)return typeof y=="number"||typeof y=="boolean"?P[E]=y:ArrayBuffer.isView(y)?P[E]=y.slice():P[E]=y.clone(),!0;{let A=P[E];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return P[E]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(A.equals(y)===!1)return A.copy(y),!0}}return!1}function g(x){let T=x.uniforms,b=0,P=16;for(let E=0,A=T.length;E<A;E++){let R=Array.isArray(T[E])?T[E]:[T[E]];for(let D=0,F=R.length;D<F;D++){let N=R[D],k=Array.isArray(N.value)?N.value:[N.value];for(let q=0,Y=k.length;q<Y;q++){let ne=k[q],H=m(ne),J=b%P,Z=J%H.boundary,Ce=J+Z;b+=Z,Ce!==0&&P-Ce<H.storage&&(b+=P-Ce),N.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=H.storage}}}let y=b%P;return y>0&&(b+=P-y),x.__size=b,x.__cache={},this}function m(x){let T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):$e("WebGLRenderer: Unsupported uniform value type.",x),T}function M(x){let T=x.target;T.removeEventListener("dispose",M);let b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function S(){for(let x in s)n.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:S}}var Dx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),di=null;function Nx(){return di===null&&(di=new Si(Dx,16,16,Yi,$t),di.name="DFG_LUT",di.minFilter=jt,di.magFilter=jt,di.wrapS=ti,di.wrapT=ti,di.generateMipmaps=!1,di.needsUpdate=!0),di}var ec=class{constructor(e={}){let{canvas:t=Ef(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=on}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let _=d,g=new Set([y0,x0,g0]),m=new Set([on,Xn,er,qi,d0,p0]),M=new Uint32Array(4),S=new Int32Array(4),x=new L,T=null,b=null,P=[],y=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,R=!1,D=null,F=null,N=null,k=null;this._outputColorSpace=Ct;let q=0,Y=0,ne=null,H=-1,J=null,Z=new It,Ce=new It,Ee=null,ct=new Re(0),Ke=0,it=t.width,I=t.height,B=1,ee=null,ce=null,re=new It(0,0,it,I),ge=new It(0,0,it,I),Ye=!1,K=new Ys,ie=!1,ae=!1,he=new tt,de=new L,He=new It,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Le(){return ne===null?B:1}let U=i;function st(w,O){return t.getContext(w,O)}let Qe,C,v,V,G,j,ue,pe,Q,se,ye,ze,xe,me,Ne,Ge,je,z,_e,te,ve,Pe,le;try{let w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",Un,!1),U===null){let O="webgl2";if(U=st(O,w),U===null)throw st(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}We()}catch(w){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",Un,!1),Ze("WebGLRenderer: "+w.message),w}function We(){Qe=new V1(U),Qe.init(),ve=new Ax(U,Qe),C=new I1(U,Qe,e,ve),v=new Tx(U,Qe),C.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),F=U.createFramebuffer(),N=U.createFramebuffer(),k=U.createFramebuffer(),V=new W1(U),G=new fx,j=new Ex(U,Qe,v,G,C,ve,V),ue=new z1(A),pe=new qp(U),Pe=new C1(U,pe),Q=new H1(U,pe,V,Pe),se=new q1(U,Q,pe,Pe,V),z=new X1(U,C,j),Ne=new L1(G),ye=new hx(A,ue,Qe,C,Pe,Ne),ze=new Ix(A,G),xe=new dx,me=new _x(Qe),je=new R1(A,ue,v,se,p,c),Ge=new wx(A,se,C),le=new Lx(U,V,C,v),_e=new P1(U,Qe,V),te=new G1(U,Qe,V),V.programs=ye.programs,A.capabilities=C,A.extensions=Qe,A.properties=G,A.renderLists=xe,A.shadowMap=Ge,A.state=v,A.info=V}_!==on&&(E=new Z1(_,t.width,t.height,o,s,r));let Be=new ql(A,U);this.xr=Be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let w=Qe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Qe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(w){w!==void 0&&(B=w,this.setSize(it,I,!1))},this.getSize=function(w){return w.set(it,I)},this.setSize=function(w,O,$=!0){if(Be.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}it=w,I=O,t.width=Math.floor(w*B),t.height=Math.floor(O*B),$===!0&&(t.style.width=w+"px",t.style.height=O+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(it*B,I*B).floor()},this.setDrawingBufferSize=function(w,O,$){it=w,I=O,B=$,t.width=Math.floor(w*$),t.height=Math.floor(O*$),this.setViewport(0,0,w,O)},this.setEffects=function(w){if(_===on){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let O=0;O<w.length;O++)if(w[O].isOutputPass===!0){$e("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Z)},this.getViewport=function(w){return w.copy(re)},this.setViewport=function(w,O,$,W){w.isVector4?re.set(w.x,w.y,w.z,w.w):re.set(w,O,$,W),v.viewport(Z.copy(re).multiplyScalar(B).round())},this.getScissor=function(w){return w.copy(ge)},this.setScissor=function(w,O,$,W){w.isVector4?ge.set(w.x,w.y,w.z,w.w):ge.set(w,O,$,W),v.scissor(Ce.copy(ge).multiplyScalar(B).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(w){v.setScissorTest(Ye=w)},this.setOpaqueSort=function(w){ee=w},this.setTransparentSort=function(w){ce=w},this.getClearColor=function(w){return w.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(w=!0,O=!0,$=!0){let W=0;if(w){let X=!1;if(ne!==null){let Ae=ne.texture.format;X=g.has(Ae)}if(X){let Ae=ne.texture.type,De=m.has(Ae),Te=je.getClearColor(),ke=je.getClearAlpha(),Ve=Te.r,rt=Te.g,dt=Te.b;De?(M[0]=Ve,M[1]=rt,M[2]=dt,M[3]=ke,U.clearBufferuiv(U.COLOR,0,M)):(S[0]=Ve,S[1]=rt,S[2]=dt,S[3]=ke,U.clearBufferiv(U.COLOR,0,S))}else W|=U.COLOR_BUFFER_BIT}O&&(W|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),D=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",Un,!1),je.dispose(),xe.dispose(),me.dispose(),G.dispose(),ue.dispose(),se.dispose(),Pe.dispose(),le.dispose(),ye.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",oh),Be.removeEventListener("sessionend",ch),Ki.stop()};function Tt(w){w.preventDefault(),Nr("WebGLRenderer: Context Lost."),R=!0}function _t(){Nr("WebGLRenderer: Context Restored."),R=!1;let w=V.autoReset,O=Ge.enabled,$=Ge.autoUpdate,W=Ge.needsUpdate,X=Ge.type;We(),V.autoReset=w,Ge.enabled=O,Ge.autoUpdate=$,Ge.needsUpdate=W,Ge.type=X}function Un(w){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Kn(w){let O=w.target;O.removeEventListener("dispose",Kn),fd(O)}function fd(w){ud(w),G.remove(w)}function ud(w){let O=G.get(w).programs;O!==void 0&&(O.forEach(function($){ye.releaseProgram($)}),w.isShaderMaterial&&ye.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,$,W,X,Ae){O===null&&(O=Fe);let De=X.isMesh&&X.matrixWorld.determinantAffine()<0,Te=md(w,O,$,W,X);v.setMaterial(W,De);let ke=$.index,Ve=1;if(W.wireframe===!0){if(ke=Q.getWireframeAttribute($),ke===void 0)return;Ve=2}let rt=$.drawRange,dt=$.attributes.position,Oe=rt.start*Ve,vt=(rt.start+rt.count)*Ve;Ae!==null&&(Oe=Math.max(Oe,Ae.start*Ve),vt=Math.min(vt,(Ae.start+Ae.count)*Ve)),ke!==null?(Oe=Math.max(Oe,0),vt=Math.min(vt,ke.count)):dt!=null&&(Oe=Math.max(Oe,0),vt=Math.min(vt,dt.count));let Vt=vt-Oe;if(Vt<0||Vt===1/0)return;Pe.setup(X,W,Te,$,ke);let At,wt=_e;if(ke!==null&&(At=pe.get(ke),wt=te,wt.setIndex(At)),X.isMesh)W.wireframe===!0?(v.setLineWidth(W.wireframeLinewidth*Le()),wt.setMode(U.LINES)):wt.setMode(U.TRIANGLES);else if(X.isLine){let nn=W.linewidth;nn===void 0&&(nn=1),v.setLineWidth(nn*Le()),X.isLineSegments?wt.setMode(U.LINES):X.isLineLoop?wt.setMode(U.LINE_LOOP):wt.setMode(U.LINE_STRIP)}else X.isPoints?wt.setMode(U.POINTS):X.isSprite&&wt.setMode(U.TRIANGLES);if(X.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))wt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let nn=X._multiDrawStarts,Ie=X._multiDrawCounts,ln=X._multiDrawCount,gt=ke?pe.get(ke).bytesPerElement:1,wn=G.get(W).currentProgram.getUniforms();for(let Qn=0;Qn<ln;Qn++)wn.setValue(U,"_gl_DrawID",Qn),wt.render(nn[Qn]/gt,Ie[Qn])}else if(X.isInstancedMesh)wt.renderInstances(Oe,Vt,X.count);else if($.isInstancedBufferGeometry){let nn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ie=Math.min($.instanceCount,nn);wt.renderInstances(Oe,Vt,Ie)}else wt.render(Oe,Vt)};function ah(w,O,$,W){D!==null&&w.isNodeMaterial&&D.setObject(W,w),ie===!0&&Ne.setState(w,$,!1),w.transparent===!0&&w.side===An&&w.forceSinglePass===!1?(w.side=Qt,w.needsUpdate=!0,Ka(w,O,W),w.side=fi,w.needsUpdate=!0,Ka(w,O,W),w.side=An):Ka(w,O,W)}this.compile=function(w,O,$=null){$===null&&($=w),D!==null&&D.renderStart(w,O,$),b=me.get($),b.init(O),y.push(b),$.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),w!==$&&w.traverseVisible(function(X){X.isLight&&X.layers.test(O.layers)&&(b.pushLight(X),X.castShadow&&b.pushShadow(X))}),b.setupLights(),D!==null&&D.updateLights(b.state.lightsArray),ae=this.localClippingEnabled,ie=Ne.init(this.clippingPlanes,ae),ie===!0&&Ne.setGlobalState(this.clippingPlanes,O),D!==null&&Ge.render(b.state.shadowsArray,$,O);let W=new Set;return w.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let Ae=X.material;if(Ae)if(Array.isArray(Ae))for(let De=0;De<Ae.length;De++){let Te=Ae[De];ah(Te,$,O,X),W.add(Te)}else ah(Ae,$,O,X),W.add(Ae)}),b=y.pop(),D!==null&&D.renderEnd(),W},this.compileAsync=function(w,O,$=null){let W=this.compile(w,O,$);return new Promise(X=>{function Ae(){if(W.forEach(function(De){let ke=G.get(De).currentProgram;(ke===void 0||ke.isReady())&&W.delete(De)}),W.size===0){X(w);return}setTimeout(Ae,10)}Qe.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let _c=null;function dd(w){_c&&_c(w)}function oh(){Ki.stop()}function ch(){Ki.start()}let Ki=new ru;Ki.setAnimationLoop(dd),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(w){_c=w,Be.setAnimationLoop(w),w===null?Ki.stop():Ki.start()},Be.addEventListener("sessionstart",oh),Be.addEventListener("sessionend",ch),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;D!==null&&D.renderStart(w,O);let $=Be.enabled===!0&&Be.isPresenting===!0,W=E!==null&&(ne===null||$)&&E.begin(A,ne);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(O),O=Be.getCamera()),w.isScene===!0&&w.onBeforeRender(A,w,O,ne),b=me.get(w,y.length),b.init(O),b.state.textureUnits=j.getTextureUnits(),y.push(b),he.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),K.setFromProjectionMatrix(he,zn,O.reversedDepth),ae=this.localClippingEnabled,ie=Ne.init(this.clippingPlanes,ae),T=xe.get(w,P.length),T.init(),P.push(T),Be.enabled===!0&&Be.isPresenting===!0){let De=A.xr.getDepthSensingMesh();De!==null&&vc(De,O,-1/0,A.sortObjects)}vc(w,O,0,A.sortObjects),T.finish(),D!==null&&D.updateLights(b.state.lightsArray),A.sortObjects===!0&&T.sort(ee,ce),Xe=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,Xe&&je.addToRenderList(T,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ie===!0&&Ne.beginShadows();let X=b.state.shadowsArray;if(Ge.render(X,w,O),ie===!0&&Ne.endShadows(),(W&&E.hasRenderPass())===!1){let De=T.opaque,Te=T.transmissive;if(b.setupLights(),O.isArrayCamera){let ke=O.cameras;if(Te.length>0)for(let Ve=0,rt=ke.length;Ve<rt;Ve++){let dt=ke[Ve];hh(De,Te,w,dt)}Xe&&je.render(w);for(let Ve=0,rt=ke.length;Ve<rt;Ve++){let dt=ke[Ve];lh(T,w,dt,dt.viewport)}}else Te.length>0&&hh(De,Te,w,O),Xe&&je.render(w),lh(T,w,O)}ne!==null&&Y===0&&(j.updateMultisampleRenderTarget(ne),j.updateRenderTargetMipmap(ne)),W&&E.end(A),w.isScene===!0&&w.onAfterRender(A,w,O),Pe.resetDefaultState(),H=-1,J=null,y.pop(),y.length>0?(b=y[y.length-1],j.setTextureUnits(b.state.textureUnits),ie===!0&&Ne.setGlobalState(A.clippingPlanes,b.state.camera)):b=null,P.pop(),P.length>0?T=P[P.length-1]:T=null,D!==null&&D.renderEnd()};function vc(w,O,$,W){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(K)){W&&He.setFromMatrixPosition(w.matrixWorld).applyMatrix4(he);let De=se.update(w),Te=w.material;Te.visible&&T.push(w,De,Te,$,He.z,null,O)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(K))){let De=se.update(w),Te=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),He.copy(w.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),He.copy(De.boundingSphere.center)),He.applyMatrix4(w.matrixWorld).applyMatrix4(he)),Array.isArray(Te)){let ke=De.groups;for(let Ve=0,rt=ke.length;Ve<rt;Ve++){let dt=ke[Ve],Oe=Te[dt.materialIndex];Oe&&Oe.visible&&T.push(w,De,Oe,$,He.z,dt,O)}}else Te.visible&&T.push(w,De,Te,$,He.z,null,O)}}let Ae=w.children;for(let De=0,Te=Ae.length;De<Te;De++)vc(Ae[De],O,$,W)}function lh(w,O,$,W){let{opaque:X,transmissive:Ae,transparent:De}=w;b.setupLightsView($),ie===!0&&Ne.setGlobalState(A.clippingPlanes,$),W&&v.viewport(Z.copy(W)),X.length>0&&ja(X,O,$),Ae.length>0&&ja(Ae,O,$),De.length>0&&ja(De,O,$),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function hh(w,O,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[W.id]===void 0){let Oe=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[W.id]=new Nt(1,1,{generateMipmaps:!0,type:Oe?$t:on,minFilter:Xi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ut.workingColorSpace})}let Ae=b.state.transmissionRenderTarget[W.id],De=W.viewport||Z;Ae.setSize(De.z*A.transmissionResolutionScale,De.w*A.transmissionResolutionScale);let Te=A.getRenderTarget(),ke=A.getActiveCubeFace(),Ve=A.getActiveMipmapLevel();A.setRenderTarget(Ae),A.getClearColor(ct),Ke=A.getClearAlpha(),Ke<1&&A.setClearColor(16777215,.5),A.clear(),Xe&&je.render($);let rt=A.toneMapping;A.toneMapping=Wn;let dt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),b.setupLightsView(W),ie===!0&&Ne.setGlobalState(A.clippingPlanes,W),ja(w,$,W),j.updateMultisampleRenderTarget(Ae),j.updateRenderTargetMipmap(Ae),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let vt=0,Vt=O.length;vt<Vt;vt++){let At=O[vt],{object:wt,geometry:nn,material:Ie,group:ln}=At;if(Ie.side===An&&wt.layers.test(W.layers)){let gt=Ie.side;Ie.side=Qt,Ie.needsUpdate=!0,fh(wt,$,W,nn,Ie,ln),Ie.side=gt,Ie.needsUpdate=!0,Oe=!0}}Oe===!0&&(j.updateMultisampleRenderTarget(Ae),j.updateRenderTargetMipmap(Ae))}A.setRenderTarget(Te,ke,Ve),A.setClearColor(ct,Ke),dt!==void 0&&(W.viewport=dt),A.toneMapping=rt}function ja(w,O,$){let W=O.isScene===!0?O.overrideMaterial:null;for(let X=0,Ae=w.length;X<Ae;X++){let De=w[X],{object:Te,geometry:ke,group:Ve}=De,rt=De.material;rt.allowOverride===!0&&W!==null&&(rt=W),Te.layers.test($.layers)&&fh(Te,O,$,ke,rt,Ve)}}function fh(w,O,$,W,X,Ae){D!==null&&X.isNodeMaterial&&D.setObject(w,X),w.onBeforeRender(A,O,$,W,X,Ae),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),X.onBeforeRender(A,O,$,W,w,Ae),X.transparent===!0&&X.side===An&&X.forceSinglePass===!1?(X.side=Qt,X.needsUpdate=!0,A.renderBufferDirect($,O,W,X,w,Ae),X.side=fi,X.needsUpdate=!0,A.renderBufferDirect($,O,W,X,w,Ae),X.side=An):A.renderBufferDirect($,O,W,X,w,Ae),w.onAfterRender(A,O,$,W,X,Ae)}function Ka(w,O,$){O.isScene!==!0&&(O=Fe);let W=G.get(w),X=b.state.lights,Ae=b.state.shadowsArray,De=X.state.version,Te=ye.getParameters(w,X.state,Ae,O,$,b.state.lightProbeGridArray),ke=ye.getProgramCacheKey(Te),Ve=W.programs;W.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?O.environment:null,W.fog=O.fog;let rt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;W.envMap=ue.get(w.envMap||W.environment,rt),W.envMapRotation=W.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Ve===void 0&&(w.addEventListener("dispose",Kn),Ve=new Map,W.programs=Ve);let dt=Ve.get(ke);if(dt!==void 0){if(W.currentProgram===dt&&W.lightsStateVersion===De)return dh(w,Te),dt}else Te.uniforms=ye.getUniforms(w),D!==null&&w.isNodeMaterial&&D.build(w,$,Te),w.onBeforeCompile(Te,A),dt=ye.acquireProgram(Te,ke),Ve.set(ke,dt),W.uniforms=Te.uniforms;let Oe=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Oe.clippingPlanes=Ne.uniform),dh(w,Te),W.needsLights=xd(w),W.lightsStateVersion=De,W.needsLights&&(Oe.ambientLightColor.value=X.state.ambient,Oe.lightProbe.value=X.state.probe,Oe.sunLights.value=X.state.sun,Oe.sunLightShadows.value=X.state.sunShadow,Oe.directionalLights.value=X.state.directional,Oe.directionalLightShadows.value=X.state.directionalShadow,Oe.spotLights.value=X.state.spot,Oe.spotLightShadows.value=X.state.spotShadow,Oe.rectAreaLights.value=X.state.rectArea,Oe.ltc_1.value=X.state.rectAreaLTC1,Oe.ltc_2.value=X.state.rectAreaLTC2,Oe.pointLights.value=X.state.point,Oe.pointLightShadows.value=X.state.pointShadow,Oe.hemisphereLights.value=X.state.hemi,Oe.sunShadowMatrix.value=X.state.sunShadowMatrix,Oe.sunShadowCascade.value=X.state.sunShadowCascade,Oe.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Oe.spotLightMatrix.value=X.state.spotLightMatrix,Oe.spotLightMap.value=X.state.spotLightMap,Oe.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=b.state.lightProbeGridArray.length>0,W.currentProgram=dt,W.uniformsList=null,dt}function uh(w){if(w.uniformsList===null){let O=w.currentProgram.getUniforms();w.uniformsList=sr.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function dh(w,O){let $=G.get(w);$.outputColorSpace=O.outputColorSpace,$.batching=O.batching,$.batchingColor=O.batchingColor,$.instancing=O.instancing,$.instancingColor=O.instancingColor,$.instancingMorph=O.instancingMorph,$.skinning=O.skinning,$.morphTargets=O.morphTargets,$.morphNormals=O.morphNormals,$.morphColors=O.morphColors,$.morphTargetsCount=O.morphTargetsCount,$.numClippingPlanes=O.numClippingPlanes,$.numIntersection=O.numClipIntersection,$.vertexAlphas=O.vertexAlphas,$.vertexTangents=O.vertexTangents,$.toneMapping=O.toneMapping}function pd(w,O){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let $=0,W=w.length;$<W;$++){let X=w[$];if(X.texture!==null&&X.boundingBox.containsPoint(x))return X}return null}function md(w,O,$,W,X){O.isScene!==!0&&(O=Fe),j.resetTextureUnits();let Ae=O.fog,De=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?O.environment:null,Te=ne===null?A.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ut.workingColorSpace,ke=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ve=ue.get(W.envMap||De,ke),rt=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,dt=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Oe=!!$.morphAttributes.position,vt=!!$.morphAttributes.normal,Vt=!!$.morphAttributes.color,At=Wn;W.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(At=A.toneMapping);let wt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,nn=wt!==void 0?wt.length:0,Ie=G.get(W),ln=b.state.lights;if(ie===!0&&(ae===!0||w!==J)){let Et=w===J&&W.id===H;Ne.setState(W,w,Et)}let gt=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==ln.state.version||Ie.outputColorSpace!==Te||X.isBatchedMesh&&Ie.batching===!1||!X.isBatchedMesh&&Ie.batching===!0||X.isBatchedMesh&&Ie.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ie.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ie.instancing===!1||!X.isInstancedMesh&&Ie.instancing===!0||X.isSkinnedMesh&&Ie.skinning===!1||!X.isSkinnedMesh&&Ie.skinning===!0||X.isInstancedMesh&&Ie.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ie.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ie.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ie.instancingMorph===!1&&X.morphTexture!==null||Ie.envMap!==Ve||W.fog===!0&&Ie.fog!==Ae||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==Ne.numPlanes||Ie.numIntersection!==Ne.numIntersection)||Ie.vertexAlphas!==rt||Ie.vertexTangents!==dt||Ie.morphTargets!==Oe||Ie.morphNormals!==vt||Ie.morphColors!==Vt||Ie.toneMapping!==At||Ie.morphTargetsCount!==nn||!!Ie.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Ie.__version=W.version);let wn=Ie.currentProgram;gt===!0&&(wn=Ka(W,O,X),D&&W.isNodeMaterial&&D.onUpdateProgram(W,wn,Ie));let Qn=!1,Ci=!1,xs=!1,St=wn.getUniforms(),kt=Ie.uniforms;if(v.useProgram(wn.program)&&(Qn=!0,Ci=!0,xs=!0),W.id!==H&&(H=W.id,Ci=!0),Ie.needsLights){let Et=pd(b.state.lightProbeGridArray,X);Ie.lightProbeGrid!==Et&&(Ie.lightProbeGrid=Et,Ci=!0)}if(Qn||J!==w){v.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),St.setValue(U,"projectionMatrix",w.projectionMatrix),St.setValue(U,"viewMatrix",w.matrixWorldInverse);let Ii=St.map.cameraPosition;Ii!==void 0&&Ii.setValue(U,de.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&St.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&St.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),J!==w&&(J=w,Ci=!0,xs=!0)}if(Ie.needsLights&&(ln.state.sunShadowMap.length>0&&St.setValue(U,"sunShadowMap",ln.state.sunShadowMap,j),ln.state.directionalShadowMap.length>0&&St.setValue(U,"directionalShadowMap",ln.state.directionalShadowMap,j),ln.state.spotShadowMap.length>0&&St.setValue(U,"spotShadowMap",ln.state.spotShadowMap,j),ln.state.pointShadowMap.length>0&&St.setValue(U,"pointShadowMap",ln.state.pointShadowMap,j)),X.isSkinnedMesh){St.setOptional(U,X,"bindMatrix"),St.setOptional(U,X,"bindMatrixInverse");let Et=X.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),St.setValue(U,"boneTexture",Et.boneTexture,j))}X.isBatchedMesh&&(St.setOptional(U,X,"batchingTexture"),St.setValue(U,"batchingTexture",X._matricesTexture,j),St.setOptional(U,X,"batchingIdTexture"),St.setValue(U,"batchingIdTexture",X._indirectTexture,j),St.setOptional(U,X,"batchingColorTexture"),X._colorsTexture!==null&&St.setValue(U,"batchingColorTexture",X._colorsTexture,j));let Pi=$.morphAttributes;if((Pi.position!==void 0||Pi.normal!==void 0||Pi.color!==void 0)&&z.update(X,$,wn),(Ci||Ie.receiveShadow!==X.receiveShadow)&&(Ie.receiveShadow=X.receiveShadow,St.setValue(U,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&O.environment!==null&&(kt.envMapIntensity.value=O.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=Nx()),Ci){if(St.setValue(U,"toneMappingExposure",A.toneMappingExposure),Ie.needsLights&&gd(kt,xs),Ae&&W.fog===!0&&ze.refreshFogUniforms(kt,Ae),ze.refreshMaterialUniforms(kt,W,B,I,b.state.transmissionRenderTarget[w.id]),Ie.needsLights&&Ie.lightProbeGrid){let Et=Ie.lightProbeGrid;kt.probesSH.value=Et.texture,kt.probesMin.value.copy(Et.boundingBox.min),kt.probesMax.value.copy(Et.boundingBox.max),kt.probesResolution.value.copy(Et.resolution)}sr.upload(U,uh(Ie),kt,j)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(sr.upload(U,uh(Ie),kt,j),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&St.setValue(U,"center",X.center),St.setValue(U,"modelViewMatrix",X.modelViewMatrix),St.setValue(U,"normalMatrix",X.normalMatrix),St.setValue(U,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){let Et=W.uniformsGroups;for(let Ii=0,ys=Et.length;Ii<ys;Ii++){let mh=Et[Ii];le.update(mh,wn),le.bind(mh,wn)}}return wn}function gd(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.sunLights.needsUpdate=O,w.sunLightShadows.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function xd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(w,O,$){let W=G.get(w);W.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),G.get(w.texture).__webglTexture=O,G.get(w.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,O){let $=G.get(w);$.__webglFramebuffer=O,$.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,$=0){ne=w,q=O,Y=$;let W=null,X=!1,Ae=!1;if(w){let Te=G.get(w);if(Te.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,Te.__webglFramebuffer),Z.copy(w.viewport),Ce.copy(w.scissor),Ee=w.scissorTest,v.viewport(Z),v.scissor(Ce),v.setScissorTest(Ee),H=-1;return}else if(Te.__webglFramebuffer===void 0)j.setupRenderTarget(w);else if(Te.__hasExternalTextures)j.rebindTextures(w,G.get(w.texture).__webglTexture,G.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let rt=w.depthTexture;if(Te.__boundDepthTexture!==rt){if(rt!==null&&G.has(rt)&&(w.width!==rt.image.width||w.height!==rt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(w)}}let ke=w.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ae=!0);let Ve=G.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ve[O])?W=Ve[O][$]:W=Ve[O],X=!0):w.samples>0&&j.useMultisampledRTT(w)===!1?W=G.get(w).__webglMultisampledFramebuffer:Array.isArray(Ve)?W=Ve[$]:W=Ve,Z.copy(w.viewport),Ce.copy(w.scissor),Ee=w.scissorTest}else Z.copy(re).multiplyScalar(B).floor(),Ce.copy(ge).multiplyScalar(B).floor(),Ee=Ye;if($!==0&&(W=F),v.bindFramebuffer(U.FRAMEBUFFER,W)&&v.drawBuffers(w,W),v.viewport(Z),v.scissor(Ce),v.setScissorTest(Ee),X){let Te=G.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,Te.__webglTexture,$)}else if(Ae){let Te=O;for(let ke=0;ke<w.textures.length;ke++){let Ve=G.get(w.textures[ke]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ke,Ve.__webglTexture,$,Te)}}else if(w!==null&&$!==0){let Te=G.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Te.__webglTexture,$)}H=-1};function ph(w){let O=G.get(w);return(O.__readFormat!==w.format||O.__readType!==w.type)&&(O.__readFormat=w.format,O.__readType=w.type,O.__formatReadable=C.textureFormatReadable(w.format),O.__typeReadable=C.textureTypeReadable(w.type)),O}this.readRenderTargetPixels=function(w,O,$,W,X,Ae,De,Te=0){if(!(w&&w.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=G.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&De!==void 0&&(ke=ke[De]),ke){v.bindFramebuffer(U.FRAMEBUFFER,ke);try{let Ve=w.textures[Te],rt=Ve.format,dt=Ve.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Te);let Oe=ph(Ve);if(Oe.__formatReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Oe.__typeReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-W&&$>=0&&$<=w.height-X&&U.readPixels(O,$,W,X,ve.convert(rt),ve.convert(dt),Ae)}finally{let Ve=ne!==null?G.get(ne).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(w,O,$,W,X,Ae,De,Te=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=G.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&De!==void 0&&(ke=ke[De]),ke)if(O>=0&&O<=w.width-W&&$>=0&&$<=w.height-X){v.bindFramebuffer(U.FRAMEBUFFER,ke);let Ve=w.textures[Te],rt=Ve.format,dt=Ve.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Te);let Oe=ph(Ve);if(Oe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Oe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let vt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,vt),U.bufferData(U.PIXEL_PACK_BUFFER,Ae.byteLength,U.STREAM_READ),U.readPixels(O,$,W,X,ve.convert(rt),ve.convert(dt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Vt=ne!==null?G.get(ne).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Vt);let At=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Rf(U,At,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,vt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ae),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(vt),U.deleteSync(At),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,O=null,$=0){let W=Math.pow(2,-$),X=Math.floor(w.image.width*W),Ae=Math.floor(w.image.height*W),De=O!==null?O.x:0,Te=O!==null?O.y:0;j.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,De,Te,X,Ae),v.unbindTexture()},this.copyTextureToTexture=function(w,O,$=null,W=null,X=0,Ae=0){let De,Te,ke,Ve,rt,dt,Oe,vt,Vt,At=w.isCompressedTexture?w.mipmaps[Ae]:w.image;if($!==null)De=$.max.x-$.min.x,Te=$.max.y-$.min.y,ke=$.isBox3?$.max.z-$.min.z:1,Ve=$.min.x,rt=$.min.y,dt=$.isBox3?$.min.z:0;else{let kt=Math.pow(2,-X);De=Math.floor(At.width*kt),Te=Math.floor(At.height*kt),w.isDataArrayTexture?ke=At.depth:w.isData3DTexture?ke=Math.floor(At.depth*kt):ke=1,Ve=0,rt=0,dt=0}W!==null?(Oe=W.x,vt=W.y,Vt=W.z):(Oe=0,vt=0,Vt=0);let wt=ve.convert(O.format),nn=ve.convert(O.type),Ie;O.isData3DTexture?(j.setTexture3D(O,0),Ie=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(j.setTexture2DArray(O,0),Ie=U.TEXTURE_2D_ARRAY):(j.setTexture2D(O,0),Ie=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let ln=v.getParameter(U.UNPACK_ROW_LENGTH),gt=v.getParameter(U.UNPACK_IMAGE_HEIGHT),wn=v.getParameter(U.UNPACK_SKIP_PIXELS),Qn=v.getParameter(U.UNPACK_SKIP_ROWS),Ci=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,At.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,At.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Ve),v.pixelStorei(U.UNPACK_SKIP_ROWS,rt),v.pixelStorei(U.UNPACK_SKIP_IMAGES,dt);let xs=w.isDataArrayTexture||w.isData3DTexture,St=O.isDataArrayTexture||O.isData3DTexture;if(w.isDepthTexture){let kt=G.get(w),Pi=G.get(O),Et=G.get(kt.__renderTarget),Ii=G.get(Pi.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,Et.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let ys=0;ys<ke;ys++)xs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(w).__webglTexture,X,dt+ys),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(O).__webglTexture,Ae,Vt+ys)),U.blitFramebuffer(Ve,rt,De,Te,Oe,vt,De,Te,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(X!==0||w.isRenderTargetTexture||G.has(w)){let kt=G.get(w),Pi=G.get(O);v.bindFramebuffer(U.READ_FRAMEBUFFER,N),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,k);for(let Et=0;Et<ke;Et++)xs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,kt.__webglTexture,X,dt+Et):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,kt.__webglTexture,X),St?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pi.__webglTexture,Ae,Vt+Et):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pi.__webglTexture,Ae),X!==0?U.blitFramebuffer(Ve,rt,De,Te,Oe,vt,De,Te,U.COLOR_BUFFER_BIT,U.NEAREST):St?U.copyTexSubImage3D(Ie,Ae,Oe,vt,Vt+Et,Ve,rt,De,Te):U.copyTexSubImage2D(Ie,Ae,Oe,vt,Ve,rt,De,Te);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else St?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(Ie,Ae,Oe,vt,Vt,De,Te,ke,wt,nn,At.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Ie,Ae,Oe,vt,Vt,De,Te,ke,wt,At.data):U.texSubImage3D(Ie,Ae,Oe,vt,Vt,De,Te,ke,wt,nn,At):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ae,Oe,vt,De,Te,wt,nn,At.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ae,Oe,vt,At.width,At.height,wt,At.data):U.texSubImage2D(U.TEXTURE_2D,Ae,Oe,vt,De,Te,wt,nn,At);v.pixelStorei(U.UNPACK_ROW_LENGTH,ln),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,gt),v.pixelStorei(U.UNPACK_SKIP_PIXELS,wn),v.pixelStorei(U.UNPACK_SKIP_ROWS,Qn),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Ci),Ae===0&&O.generateMipmaps&&U.generateMipmap(Ie),v.unbindTexture()},this.initRenderTarget=function(w){G.get(w).__webglFramebuffer===void 0&&j.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?j.setTextureCube(w,0):w.isData3DTexture?j.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?j.setTexture2DArray(w,0):j.setTexture2D(w,0),v.unbindTexture()},this.resetState=function(){q=0,Y=0,ne=null,v.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};var uu={uniforms:{tDiffuse:{value:null},resolution:{value:new oe(1,1)},pixel:{value:1},posterize:{value:0},halftone:{value:0},dotSize:{value:3},misreg:{value:1},grain:{value:.04},saturation:{value:1.08},lens:{value:0},chroma:{value:0},mist:{value:0},tilt:{value:0},vignette:{value:0},warmth:{value:0},fade:{value:0},ink:{value:0},wash:{value:0},hatch:{value:0},shadowTint:{value:0},paper:{value:new Re("#f6eedb")},alphaOut:{value:0},tText:{value:null},textKeep:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
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
    }`};function du(n,e,t){let i={x:(n.x-.5)*t,y:n.y-.5},s=i.x*i.x+i.y*i.y,r=(t*t+1)*.25,a=(1+e*s)/(1+e*r*.55);return{x:i.x*a/t+.5,y:i.y*a+.5}}var ic=class extends Jt{constructor(...e){super(...e),this.oblique=0,this.lean=0,this.focus=60}updateProjectionMatrix(){if(super.updateProjectionMatrix(),this.oblique||this.lean){let e=this.focus,t=new tt().set(1,this.lean,this.oblique,this.oblique*e,0,1,-this.oblique*.35,-this.oblique*.35*e,0,0,1,0,0,0,0,1);this.projectionMatrix.multiply(t)}pu(this)}};function pu(n){n.standUp&&n.projectionMatrix.multiply(n.standUp),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}var sc=class extends hi{updateProjectionMatrix(){super.updateProjectionMatrix(),pu(this)}},mu=n=>en.clamp((n-30)*.6,0,32),Pa={print:{label:"Impression art-book",halftone:.7,dot:2.2,misreg:.9,pixel:1,posterize:0,lens:.05,chroma:.25,mist:.22,tilt:.12,vignette:.2,warmth:.2,fade:.06,grain:.05,saturation:1.2,wobble:1,ink:.45,wash:.45,hatch:0,shadowTint:.55},gouache:{label:"Encre et gouache",halftone:0,dot:3,misreg:0,pixel:1,posterize:0,lens:.05,chroma:.15,mist:.2,tilt:.1,vignette:.2,warmth:.32,fade:.05,grain:.06,saturation:1.22,wobble:1.15,ink:.85,wash:.85,hatch:.3,shadowTint:.8},film:{label:"Film rétro",halftone:0,dot:3,misreg:0,pixel:1,posterize:0,lens:.1,chroma:.6,mist:.45,tilt:.22,vignette:.42,warmth:.55,fade:.2,grain:.09,saturation:1.05,wobble:1,ink:0,wash:.15,hatch:0,shadowTint:.4},pixel:{label:"Pixel art",halftone:0,dot:3,misreg:0,pixel:3,posterize:10,lens:0,chroma:0,mist:.08,tilt:0,vignette:.12,warmth:.22,fade:.04,grain:.012,saturation:1.2,wobble:.6,ink:.3,wash:0,hatch:0,shadowTint:.5},clean:{label:"Net",halftone:0,dot:3,misreg:0,pixel:1,posterize:0,lens:0,chroma:0,mist:0,tilt:0,vignette:0,warmth:0,fade:0,grain:0,saturation:1.05,wobble:.5,ink:.15,wash:0,hatch:0,shadowTint:.2}},Ia={day:{sky:"#d9e6fa",ground:"#b49a78",hemi:1.25,sun:"#ffeccc",sunI:3.2,bounce:"#ffd09a",bounceI:.5,rim:"#cfe0ff",rimI:.55,env:.35,exposure:1.03,lampScale:.35,sunAz:145,sunEl:52,backdrop:"#f3e9d4"},golden:{sky:"#e4d0c4",ground:"#8a5e3c",hemi:.95,sun:"#ffb560",sunI:3.4,bounce:"#ffa868",bounceI:.6,rim:"#b8c8ff",rimI:.6,env:.3,exposure:1,lampScale:.9,sunAz:115,sunEl:26,backdrop:"#f1dfc4"},dusk:{sky:"#8a8fc4",ground:"#4a3550",hemi:.8,sun:"#ff8a5a",sunI:1.5,bounce:"#ff9a80",bounceI:.4,rim:"#9aa8ff",rimI:.7,env:.22,exposure:1.1,lampScale:1.6,sunAz:235,sunEl:20,backdrop:"#ddd3d6"},night:{sky:"#3b4a82",ground:"#1a1a26",hemi:.55,sun:"#a8bcff",sunI:.5,bounce:"#6d7fc4",bounceI:.18,rim:"#7f95ff",rimI:.6,env:.14,exposure:1.2,lampScale:2.6,sunAz:200,sunEl:55,backdrop:"#2a3046"}};var or={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Sn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Ux=new hi(-1,1,1,-1,0,1),Yl=class extends Pt{constructor(){super(),this.setAttribute("position",new nt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new nt([0,2,0,0,2,0],2))}},Fx=new Yl,Zi=class{constructor(e){this._mesh=new ht(Fx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ux)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var cr=class extends Sn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Pn.clone(e.uniforms),this.material=new Ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Zi(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var La=class extends Sn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},rc=class extends Sn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var ac=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new oe);this._width=i.width,this._height=i.height,t=new Nt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cr(or),this.copyPass.material.blending=zt,this.timer=new ca}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}La!==void 0&&(a instanceof La?i=!0:a instanceof rc&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Da=class extends Sn{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Re}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Na={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var oc=class extends Sn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Pn.clone(Na.uniforms),this.material=new Js({name:Na.name,uniforms:this.uniforms,vertexShader:Na.vertexShader,fragmentShader:Na.fragmentShader}),this._fsQuad=new Zi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ut.getTransfer(this._outputColorSpace)===xt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===da?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===pa?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ma?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ga?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ya?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===cs?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===xa&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Ua={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new oe},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new tt},cameraProjectionMatrixInverse:{value:new tt},cameraWorldMatrix:{value:new tt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new L(-1,-1,-1)},sceneBoxMax:{value:new L(1,1,1)}},vertexShader:`

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
		}`},Fa={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},cc={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function gu(n=5){let e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=kx(e),i=t.length,s=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=t[a],c=2*Math.PI*o/i,l=new L(Math.cos(c),Math.sin(c),0).normalize();s[a*4]=(l.x*.5+.5)*255,s[a*4+1]=(l.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}let r=new Si(s,e,e);return r.wrapS=En,r.wrapT=En,r.needsUpdate=!0,r}function kx(n){let e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=e*e,i=Array(t).fill(0),s=Math.floor(e/2),r=e-1;for(let a=1;a<=t;){if(s===-1&&r===e?(r=e-2,s=0):(r===e&&(r=0),s<0&&(s=e-1)),i[s*e+r]!==0){r-=2,s++;continue}else i[s*e+r]=a++;r++,s--}return i}var ka={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Zl(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new oe},cameraProjectionMatrixInverse:{value:new tt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Zl(n,e,t){let i=Ox(n,e,t),s="vec3[SAMPLES](";for(let r=0;r<n;r++){let a=i[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<n-1?",":")"}`}return s}function Ox(n,e,t){let i=[];for(let s=0;s<n;s++){let r=2*Math.PI*e*s/n,a=Math.pow(s/(n-1),t);i.push(new L(Math.cos(r),Math.sin(r),a))}return i}var lc=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,s,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,c=Math.floor(e+o),l=Math.floor(t+o),h=(3-Math.sqrt(3))/6,f=(c+l)*h,u=c-f,d=l-f,p=e-u,_=t-d,g,m;p>_?(g=1,m=0):(g=0,m=1);let M=p-g+h,S=_-m+h,x=p-1+2*h,T=_-1+2*h,b=c&255,P=l&255,y=this.perm[b+this.perm[P]]%12,E=this.perm[b+g+this.perm[P+m]]%12,A=this.perm[b+1+this.perm[P+1]]%12,R=.5-p*p-_*_;R<0?i=0:(R*=R,i=R*R*this._dot(this.grad3[y],p,_));let D=.5-M*M-S*S;D<0?s=0:(D*=D,s=D*D*this._dot(this.grad3[E],M,S));let F=.5-x*x-T*T;return F<0?r=0:(F*=F,r=F*F*this._dot(this.grad3[A],x,T)),70*(i+s+r)}noise3d(e,t,i){let s,r,a,o,l=(e+t+i)*.3333333333333333,h=Math.floor(e+l),f=Math.floor(t+l),u=Math.floor(i+l),d=1/6,p=(h+f+u)*d,_=h-p,g=f-p,m=u-p,M=e-_,S=t-g,x=i-m,T,b,P,y,E,A;M>=S?S>=x?(T=1,b=0,P=0,y=1,E=1,A=0):M>=x?(T=1,b=0,P=0,y=1,E=0,A=1):(T=0,b=0,P=1,y=1,E=0,A=1):S<x?(T=0,b=0,P=1,y=0,E=1,A=1):M<x?(T=0,b=1,P=0,y=0,E=1,A=1):(T=0,b=1,P=0,y=1,E=1,A=0);let R=M-T+d,D=S-b+d,F=x-P+d,N=M-y+2*d,k=S-E+2*d,q=x-A+2*d,Y=M-1+3*d,ne=S-1+3*d,H=x-1+3*d,J=h&255,Z=f&255,Ce=u&255,Ee=this.perm[J+this.perm[Z+this.perm[Ce]]]%12,ct=this.perm[J+T+this.perm[Z+b+this.perm[Ce+P]]]%12,Ke=this.perm[J+y+this.perm[Z+E+this.perm[Ce+A]]]%12,it=this.perm[J+1+this.perm[Z+1+this.perm[Ce+1]]]%12,I=.6-M*M-S*S-x*x;I<0?s=0:(I*=I,s=I*I*this._dot3(this.grad3[Ee],M,S,x));let B=.6-R*R-D*D-F*F;B<0?r=0:(B*=B,r=B*B*this._dot3(this.grad3[ct],R,D,F));let ee=.6-N*N-k*k-q*q;ee<0?a=0:(ee*=ee,a=ee*ee*this._dot3(this.grad3[Ke],N,k,q));let ce=.6-Y*Y-ne*ne-H*H;return ce<0?o=0:(ce*=ce,o=ce*ce*this._dot3(this.grad3[it],Y,ne,H)),32*(s+r+a+o)}noise4d(e,t,i,s){let r=this.grad4,a=this.simplex,o=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,f,u,d,p,_=(e+t+i+s)*c,g=Math.floor(e+_),m=Math.floor(t+_),M=Math.floor(i+_),S=Math.floor(s+_),x=(g+m+M+S)*l,T=g-x,b=m-x,P=M-x,y=S-x,E=e-T,A=t-b,R=i-P,D=s-y,F=E>A?32:0,N=E>R?16:0,k=A>R?8:0,q=E>D?4:0,Y=A>D?2:0,ne=R>D?1:0,H=F+N+k+q+Y+ne,J=a[H][0]>=3?1:0,Z=a[H][1]>=3?1:0,Ce=a[H][2]>=3?1:0,Ee=a[H][3]>=3?1:0,ct=a[H][0]>=2?1:0,Ke=a[H][1]>=2?1:0,it=a[H][2]>=2?1:0,I=a[H][3]>=2?1:0,B=a[H][0]>=1?1:0,ee=a[H][1]>=1?1:0,ce=a[H][2]>=1?1:0,re=a[H][3]>=1?1:0,ge=E-J+l,Ye=A-Z+l,K=R-Ce+l,ie=D-Ee+l,ae=E-ct+2*l,he=A-Ke+2*l,de=R-it+2*l,He=D-I+2*l,Fe=E-B+3*l,Xe=A-ee+3*l,Le=R-ce+3*l,U=D-re+3*l,st=E-1+4*l,Qe=A-1+4*l,C=R-1+4*l,v=D-1+4*l,V=g&255,G=m&255,j=M&255,ue=S&255,pe=o[V+o[G+o[j+o[ue]]]]%32,Q=o[V+J+o[G+Z+o[j+Ce+o[ue+Ee]]]]%32,se=o[V+ct+o[G+Ke+o[j+it+o[ue+I]]]]%32,ye=o[V+B+o[G+ee+o[j+ce+o[ue+re]]]]%32,ze=o[V+1+o[G+1+o[j+1+o[ue+1]]]]%32,xe=.6-E*E-A*A-R*R-D*D;xe<0?h=0:(xe*=xe,h=xe*xe*this._dot4(r[pe],E,A,R,D));let me=.6-ge*ge-Ye*Ye-K*K-ie*ie;me<0?f=0:(me*=me,f=me*me*this._dot4(r[Q],ge,Ye,K,ie));let Ne=.6-ae*ae-he*he-de*de-He*He;Ne<0?u=0:(Ne*=Ne,u=Ne*Ne*this._dot4(r[se],ae,he,de,He));let Ge=.6-Fe*Fe-Xe*Xe-Le*Le-U*U;Ge<0?d=0:(Ge*=Ge,d=Ge*Ge*this._dot4(r[ye],Fe,Xe,Le,U));let je=.6-st*st-Qe*Qe-C*C-v*v;return je<0?p=0:(je*=je,p=je*je*this._dot4(r[ze],st,Qe,C,v)),27*(h+f+u+d+p)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,s){return e[0]*t+e[1]*i+e[2]*s}_dot4(e,t,i,s,r){return e[0]*t+e[1]*i+e[2]*s+e[3]*r}};var Oa=class n extends Sn{constructor(e,t,i=512,s=512,r,a,o){super(),this.width=i,this.height=s,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=gu(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Nt(this.width,this.height,{type:$t,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Ut({defines:Object.assign({},Ua.defines),uniforms:Pn.clone(Ua.uniforms),vertexShader:Ua.vertexShader,fragmentShader:Ua.fragmentShader,blending:zt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new na,this.normalMaterial.blending=zt,this.pdMaterial=new Ut({defines:Object.assign({},ka.defines),uniforms:Pn.clone(ka.uniforms),vertexShader:ka.vertexShader,fragmentShader:ka.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Ut({defines:Object.assign({},Fa.defines),uniforms:Pn.clone(Fa.uniforms),vertexShader:Fa.vertexShader,fragmentShader:Fa.fragmentShader,blending:zt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Ut({uniforms:Pn.clone(or.uniforms),vertexShader:or.vertexShader,fragmentShader:or.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ua,blendDst:os,blendEquation:Rn,blendSrcAlpha:fa,blendDstAlpha:os,blendEquationAlpha:Rn}),this.blendMaterial=new Ut({uniforms:Pn.clone(cc.uniforms),vertexShader:cc.vertexShader,fragmentShader:cc.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:o0,blendSrc:ua,blendDst:os,blendEquation:Rn,blendSrcAlpha:fa,blendDstAlpha:os,blendEquationAlpha:Rn}),this._fsQuad=new Zi(null),this._originalClearColor=new Re,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new ci,this.depthTexture.format=ui,this.depthTexture.type=qi,this.normalRenderTarget=new Nt(this.width,this.height,{minFilter:Bt,magFilter:Bt,type:$t,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Zl(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case n.OUTPUT.Off:break;case n.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case n.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case n.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case n.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=zt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new lc,i=e*e*4,s=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let c=a,l=o;s[(a*e+o)*4]=(t.noise(c,l)*.5+.5)*255,s[(a*e+o)*4+1]=(t.noise(c+e,l)*.5+.5)*255,s[(a*e+o)*4+2]=(t.noise(c,l+e)*.5+.5)*255,s[(a*e+o)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}let r=new Si(s,e,e,xn,on);return r.wrapS=En,r.wrapT=En,r.needsUpdate=!0,r}};Oa.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var hc=class extends ki{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new gn;e.deleteAttribute("uv");let t=new pn({side:Qt}),i=new pn,s=new li(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ht(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Vr(e,i,6),o=new Wt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new ht(e,lr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ht(e,lr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let h=new ht(e,lr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new ht(e,lr(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new ht(e,lr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new ht(e,lr(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function lr(n){return new ia({color:0,emissive:16777215,emissiveIntensity:n})}function fc(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,c=new Pt,l=0;for(let h=0;h<n.length;++h){let f=n[h],u=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(e){let d;if(t)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(t){let h=0,f=[];for(let u=0;u<n.length;++u){let d=n[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=n[u].attributes.position.count}c.setIndex(f)}for(let h in r){let f=xu(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let _=0;_<a[h].length;++_)d.push(a[h][_][u]);let p=xu(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function xu(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new Ot(a,t,i),c=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute){let f=c/t;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<t;p++){let _=h.getComponent(u,p);o.setComponent(u+f,p,_)}}else a.set(h.array,c);c+=h.count*t}return s!==void 0&&(o.gpuType=s),o}var Ba=new L;function In(n,e,t,i,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;Ba.copy(e),Ba[i]=0,Ba.normalize();let l=.5*a/(a+o),h=1-Ba.angleTo(n)/c;return Math.sign(Ba[t])===1?h*l:o/(a+o)+l+l*(1-h)}var uc=class n extends gn{constructor(e=1,t=1,i=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,i/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new L,l=new L,h=new L(e,t,i).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=f.length/6,_=new L,g=.5/a;for(let m=0,M=0;m<f.length;m+=3,M+=2)switch(c.fromArray(f,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),f[m+0]=h.x*Math.sign(c.x)+l.x*r,f[m+1]=h.y*Math.sign(c.y)+l.y*r,f[m+2]=h.z*Math.sign(c.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:_.set(1,0,0),d[M+0]=In(_,l,"z","y",r,i),d[M+1]=1-In(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),d[M+0]=1-In(_,l,"z","y",r,i),d[M+1]=1-In(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),d[M+0]=1-In(_,l,"x","z",r,e),d[M+1]=In(_,l,"z","x",r,i);break;case 3:_.set(0,-1,0),d[M+0]=1-In(_,l,"x","z",r,e),d[M+1]=1-In(_,l,"z","x",r,i);break;case 4:_.set(0,0,1),d[M+0]=1-In(_,l,"x","y",r,e),d[M+1]=1-In(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),d[M+0]=In(_,l,"x","y",r,e),d[M+1]=1-In(_,l,"y","x",r,t);break}}static fromJSON(e){return new n(e.width,e.height,e.depth,e.segments,e.radius)}};function $l(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Me(n){let e=typeof n=="string"?$l(n):n>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Jl={value:1},Bx=`
uniform float uWobble;
float hb3(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hb3(i), hb3(i + vec3(1,0,0)), f.x), mix(hb3(i + vec3(0,1,0)), hb3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hb3(i + vec3(0,0,1)), hb3(i + vec3(1,0,1)), f.x), mix(hb3(i + vec3(0,1,1)), hb3(i + vec3(1,1,1)), f.x), f.y), f.z) * 2.0 - 1.0;
}
`,zx=`#include <begin_vertex>
{
  vec3 wp = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vec3 q = wp * 0.45;
  vec3 w = uWobble * vec3(0.045 * vnoise(q), 0.03 * vnoise(q + 11.3), 0.045 * vnoise(q + 27.1))
         + uWobble * 0.012 * vec3(vnoise(wp * 2.1 + 5.0), vnoise(wp * 2.1 + 9.0), vnoise(wp * 2.1 + 13.0));
  // flat on the floor (floors, rugs, mats, footprints): no vertical sag. Meshes of
  // different density bend differently, and what lies just under would show through
  // as dark blots.
  w.y *= smoothstep(0.02, 0.3, abs(wp.y));
  transformed += w;
}`;function ps(n){return n.onBeforeCompile=e=>{e.uniforms.uWobble=Jl,e.vertexShader=Bx+e.vertexShader.replace("#include <begin_vertex>",zx)},n.customProgramCacheKey=()=>"handmade",n}var yu=new Map;function Vx(n,e={}){let t=`${n}|${e.roughness??""}|${e.metalness??""}|${e.emissive??""}|${e.ei??""}|${e.opacity??""}|${e.flat?1:0}|${e.vc?1:0}|${e.side??""}`,i=yu.get(t);return i||(i=new pn({color:new Re(n),roughness:e.roughness??.92,metalness:e.metalness??0,emissive:new Re(e.emissive??0),emissiveIntensity:e.ei??1,transparent:(e.opacity??1)<1,opacity:e.opacity??1,flatShading:!!e.flat,vertexColors:!!e.vc,side:e.side??fi,depthWrite:(e.opacity??1)>=1}),ps(i),i.userData.shared=!0,yu.set(t,i)),i}function Hx(n,e){let t=Gx.set(e),i=n.attributes.position.count,s=new Float32Array(i*3);for(let r=0;r<i;r++)s[r*3]=t.r,s[r*3+1]=t.g,s[r*3+2]=t.b;n.setAttribute("color",new Ot(s,3))}var Gx=new Re;var Tu=["position","normal","uv","color"];function Wx(n,e=.45){var E;let t=n.attributes.position.array,i=1/0,s=1/0,r=1/0,a=-1/0,o=-1/0,c=-1/0;for(let A=0;A<t.length;A+=3){let R=t[A],D=t[A+1],F=t[A+2];R<i&&(i=R),R>a&&(a=R),D<s&&(s=D),D>o&&(o=D),F<r&&(r=F),F>c&&(c=F)}if(Math.max(a-i,o-s,c-r)<=e)return n;let l=Tu.filter(A=>n.attributes[A]),h=l.map(A=>n.attributes[A].itemSize),f=h.reduce((A,R)=>A+R,0),u=n.attributes.position.count,d=new Float32Array(Math.max(u*f*4,256)),p=0;for(let A=0;A<l.length;A++){let R=n.attributes[l[A]].array,D=h[A];for(let F=0;F<u;F++)for(let N=0;N<D;N++)d[F*f+p+N]=R[F*D+N];p+=D}let _=u,g=e*e,m=new Uint32Array(Math.max(64,(n.index?n.index.count:u)*4)),M=0,S=new Int32Array(256),x=(A,R)=>{let D=A*f,F=R*f,N=d[D]-d[F],k=d[D+1]-d[F+1],q=d[D+2]-d[F+2];return N*N+k*k+q*q},T=(A,R)=>{if((_+1)*f>d.length){let k=new Float32Array(d.length*2);k.set(d),d=k}let D=A*f,F=R*f,N=_*f;for(let k=0;k<f;k++)d[N+k]=(d[D+k]+d[F+k])*.5;return _++},b=(E=n.index)==null?void 0:E.array,P=b?b.length/3:u/3;for(let A=0;A<P;A++){let R=0;for(S[R++]=b?b[A*3]:A*3,S[R++]=b?b[A*3+1]:A*3+1,S[R++]=b?b[A*3+2]:A*3+2,S[R++]=0;R;){let D=S[--R],F=S[--R],N=S[--R],k=S[--R],q=x(k,N),Y=x(N,F),ne=x(F,k),H=Math.max(q,Y,ne);if(H<=g||D>9){if(M+3>m.length){let Z=new Uint32Array(m.length*2);Z.set(m),m=Z}m[M++]=k,m[M++]=N,m[M++]=F;continue}if(R+8>S.length){let Z=new Int32Array(S.length*2);Z.set(S),S=Z}let J=D+1;if(H===q){let Z=T(k,N);S[R++]=Z,S[R++]=N,S[R++]=F,S[R++]=J,S[R++]=k,S[R++]=Z,S[R++]=F,S[R++]=J}else if(H===Y){let Z=T(N,F);S[R++]=k,S[R++]=Z,S[R++]=F,S[R++]=J,S[R++]=k,S[R++]=N,S[R++]=Z,S[R++]=J}else{let Z=T(F,k);S[R++]=Z,S[R++]=N,S[R++]=F,S[R++]=J,S[R++]=k,S[R++]=N,S[R++]=Z,S[R++]=J}}}let y=new Pt;p=0;for(let A=0;A<l.length;A++){let R=h[A],D=new Float32Array(_*R);for(let F=0;F<_;F++)for(let N=0;N<R;N++)D[F*R+N]=d[F*f+p+N];y.setAttribute(l[A],new Ot(D,R)),p+=R}return y.setIndex(new Ot(_>65535?m.slice(0,M):Uint16Array.from(m.subarray(0,M)),1)),n.dispose(),y}function Xx(n,e,t){for(let s of Object.keys(n.attributes))Tu.includes(s)||n.deleteAttribute(s);n.attributes.normal||n.computeVertexNormals(),t?n.attributes.uv||n.setAttribute("uv",new nt(new Float32Array(n.attributes.position.count*2),2)):n.deleteAttribute("uv"),n.clearGroups();let i=e?Wx(n):n;if(!i.index){let s=i.attributes.position.count,r=s>65535?new Uint32Array(s):new Uint16Array(s);for(let a=0;a<s;a++)r[a]=a;i.setIndex(new Ot(r,1))}return i}var Eu=1,Au=0,qx=new L,Yx=new tt,us=new tt;function Zn(n){Eu=n,Au=0}var tn=class{constructor(){this.group=new Dt,this.buckets=new Map,this.r=Me(Eu*131+ ++Au)}geo(e,t,i={}){let s=i.material;s||(i.vc||Hx(e,t),s=Vx("#ffffff",{...i,vc:!0}));let r=!i.vc&&i.tess!==!1,a=i.shadow??!0,o=`${s.uuid}|${r}|${a}`,c=this.buckets.get(o);return c||this.buckets.set(o,c={m:s,gs:[],shadow:a,tess:r}),c.gs.push(e),e}merge(e,t=0,i=0,s=0,r=0){let a=new tt().makeRotationY(t).setPosition(i,s,r);for(let[o,c]of e.buckets){let l=this.buckets.get(o);l||this.buckets.set(o,l={m:c.m,gs:[],shadow:c.shadow,tess:c.tess});for(let h of c.gs)l.gs.push(h.applyMatrix4(a))}return e.buckets.clear(),e.group.children.length&&(e.group.rotation.y=t,e.group.position.set(i,s,r),this.group.add(e.group)),this}_place(e,t,i,s,r,a){let o=this.r;if(!a){e.computeBoundingBox();let h=e.boundingBox.getSize(qx);a=[h.x,h.y,h.z]}let c=(r.jitter??1)*Math.min(1,1.2/Math.max(a[0],a[1],a[2],.01)),l=Yx.identity();return c&&(l.premultiply(us.makeRotationX((o()-.5)*.014*c)),l.premultiply(us.makeRotationZ((o()-.5)*.014*c)),l.premultiply(us.makeRotationY((o()-.5)*.02*c))),r.rx&&l.premultiply(us.makeRotationX(r.rx)),r.rz&&l.premultiply(us.makeRotationZ(r.rz)),r.ry&&l.premultiply(us.makeRotationY(r.ry)),l.premultiply(us.makeTranslation(t+(o()-.5)*.01*c,i,s+(o()-.5)*.01*c)),e.boundingBox=null,e.boundingSphere=null,e.applyMatrix4(l),e}_boxGeo(e,t,i,s){if(e=Math.max(e,.001),t=Math.max(t,.001),i=Math.max(i,.001),s.round){let r=Math.min(s.round,e/2.05,t/2.05,i/2.05);return new uc(e,t,i,3,r)}return new gn(e,t,i)}box(e,t,i,s,r,a,o,c={}){return this.geo(this._place(this._boxGeo(e,t,i,c),s,r+t/2,a,c,[e,t,i]),o,c)}cbox(e,t,i,s,r,a,o,c={}){return this.geo(this._place(this._boxGeo(e,t,i,c),s,r,a,c,[e,t,i]),o,c)}cyl(e,t,i,s,r,a,o,c={}){let l=new Xr(e,t,i,c.seg??16,Math.max(1,Math.ceil(i/.4)),!1,c.t0??0,c.tl??Math.PI*2);return this.geo(this._place(l,s,c.center?r:r+i/2,a,c),o,c)}sphere(e,t,i,s,r,a={}){let o=new ta(e,a.seg??16,Math.max(6,Math.round((a.seg??16)*.7)));return a.sy&&o.scale(1,a.sy,1),this.geo(this._place(o,t,i,s,a),r,a)}frame(e,t,i,s,r,a,o,c=.03,l={}){this.box(e,i,c,s,r,a,o,l),this.box(e,i,c,s,r+t-i,a,o,l),this.box(i,t-2*i,c,s-e/2+i/2,r+i,a,o,l),this.box(i,t-2*i,c,s+e/2-i/2,r+i,a,o,l)}add(e){return this.group.add(e),e}build(){for(let{m:e,gs:t,shadow:i,tess:s}of this.buckets.values()){let r=fc(t.map(o=>Xx(o,s,!!e.map)),!1);if(t.forEach(o=>o.dispose()),!r)continue;r.computeBoundingSphere();let a=new ht(r,e);a.castShadow=i&&!e.transparent,e.alphaTest>0&&(a.customDepthMaterial=ny(e)),a.receiveShadow=!0,this.group.add(a)}return this.buckets.clear(),this.group}},hr={green:["#2f5e2c","#3f7a35","#5a9440","#7cae4f","#a9c96c"],lime:["#557f2e","#76a03c","#98bd50","#bcd673","#dfe9a4"],dark:["#1d3a26","#27502f","#346638","#4a7d45","#67965a"],olive:["#4b5a2a","#647534","#7f9042","#9eab5c","#c1c886"],autumn:["#7a3b1a","#a2531f","#c9762a","#e0a33a","#f0c75a"],blossom:["#b85c84","#d77aa1","#e99bbb","#f4bfd3","#fbe0ea"],tropical:["#1f5a2e","#2f7a3a","#3f9a45","#6cbf4f","#a5d867"],pine:["#163a2e","#1f4d3a","#2a6046","#3a7553","#5a8f68"],kelp:["#2a4a2a","#3f6a32","#5a8a3a","#7aa84a","#a8c46a"],coral:["#a8445a","#d0607a","#ec8a9a","#f6b0b8","#fbd6d8"],dry:["#6a6a3a","#8a8448","#a8a05a","#c4ba74","#ddd49a"]},ds=new ea(1,0).attributes.position.array.slice(),dc=new Re,Zx=new L,_u=new L,Yt=new L,Yn=new L,Ji=new L,_3=new L(0,1,0);function jl(n,e,t,i,s,r,a,o,c=1){return n.pos.push(e,t,i),n.nor.push(s,r,a),n.col.push(o.r*c,o.g*c,o.b*c),n.pos.length/3-1}function Kl(n,e,t,i,s){return _u.set(n-s.x,(e-s.y)*.75,t-s.z).normalize(),Zx.copy(i).lerp(_u,s.blend).normalize()}function $x(n,e,t,i,s,r,a,o){Ji.set(o()-.5,o()-.5,o()-.5),Yt.copy(Ji).addScaledVector(t,-Ji.dot(t)),Yt.lengthSq()<1e-6&&Yt.set(1,0,0),Yt.normalize(),Yn.crossVectors(t,Yt);let c=i*.12,l=[e.x-Yt.x*i*.4,e.y-Yt.y*i*.4,e.z-Yt.z*i*.4],h=[e.x+Yt.x*i*.6+t.x*c,e.y+Yt.y*i*.6+t.y*c,e.z+Yt.z*i*.6+t.z*c],f=[e.x+Yn.x*s*.5+t.x*c,e.y+Yn.y*s*.5+t.y*c,e.z+Yn.z*s*.5+t.z*c],u=[e.x-Yn.x*s*.5+t.x*c,e.y-Yn.y*s*.5+t.y*c,e.z-Yn.z*s*.5+t.z*c];dc.set(r);let d=t.clone(),p=[];for(let[_,g]of[[l,.85],[h,1.08],[f,1],[u,.97]]){let m=Kl(_[0],_[1],_[2],d,a);p.push(jl(n,_[0],_[1],_[2],m.x,m.y,m.z,dc,g))}n.idx.push(p[0],p[1],p[2],p[0],p[3],p[1])}function Jx(n,e,t,i,s,r,a,o,c){dc.set(o);for(let l=0;l<ds.length;l+=3){let h=e+ds[l]*s,f=t+ds[l+1]*r,u=i+ds[l+2]*a;Ji.set(ds[l],ds[l+1],ds[l+2]);let d=Kl(h,f,u,Ji,c);n.idx.push(jl(n,h,f,u,d.x,d.y,d.z,dc,.55))}}function jx(n){let e=new Pt;for(e.setAttribute("position",new nt(n.pos,3)),e.setAttribute("normal",new nt(n.nor,3)),e.setAttribute("color",new nt(n.col,3));n.uv.length<n.pos.length/3*2;)n.uv.push(.5,.5);return e.setAttribute("uv",new nt(n.uv,2)),e.setIndex(n.idx),e}var Kx=new Re("#ffffff");function vu(n,e,t,i,s,r,a){for(Ji.set(Math.cos(s),Math.sin(s),.3),Yt.copy(Ji).addScaledVector(t,-Ji.dot(t)),Yt.lengthSq()<1e-6&&Yt.set(1,0,0),Yt.normalize().multiplyScalar(i/2),Yn.crossVectors(t,Yt);n.uv.length<n.pos.length/3*2;)n.uv.push(.5,.5);let o=[];for(let[c,l,h,f]of[[-1,-1,0,0],[1,-1,1,0],[1,1,1,1],[-1,1,0,1]]){let u=e.x+Yt.x*c+Yn.x*l,d=e.y+Yt.y*c+Yn.y*l,p=e.z+Yt.z*c+Yn.z*l,_=Kl(u,d,p,t,{...a,blend:.75});o.push(jl(n,u,d,p,_.x,_.y,_.z,Kx,r*(.92+(d-a.y)*.25))),n.uv.push(h,f)}n.idx.push(o[0],o[1],o[2],o[0],o[2],o[3])}function Qx(n,e=0,t=0,i=0){let s=Me(n.seed??1),r=Math.max(.045,(n.voxel??.16)*1.15),a=n.rx,o=n.ry,c=n.rz??n.rx,l=n.cy??o,h=hr[n.palette]??hr.green,f={pos:[],nor:[],col:[],idx:[],uv:[]},u={x:e,y:t+l,z:i,blend:.6},d=(n.density??1)*(1-(n.sparse??.1)*.6),p=Math.min(a,o,c),_=o>Math.max(a,c)*1.8,g=en.clamp(Math.round(a*o*c/(p*p*p)*1.6+2),3,16),m=[];for(let x=0;x<g;x++){let T,b,P,y;if(x===0)T=0,b=_?-o*.2:-o*.05,P=0,y=p*.75;else if(_){b=(x/(g-1)*1.6-.75)*o;let A=Math.sqrt(Math.max(.05,1-(b/o)**2));T=(s()-.5)*a*.5*A,P=(s()-.5)*c*.5*A,y=Math.max(r*1.5,p*(.55+s()*.35)*A)}else{let E=s()*1.6-.6,A=s()*Math.PI*2,R=Math.sqrt(1-Math.min(1,E*E)),D=.35+s()*.4;T=R*Math.cos(A)*a*D,b=E*o*D,P=R*Math.sin(A)*c*D,y=p*(.42+s()*.42);let F=Math.max(Math.abs(T)+y*.8-a,Math.abs(b)+y*.8-o,Math.abs(P)+y*.8-c,0);y=Math.max(r*1.2,y-F)}m.push({x:e+T*(1+(n.lean??0)),y:t+l+b,z:i+P,r:y})}for(let x of m)Jx(f,x.x,x.y,x.z,x.r*.7,x.r*.64,x.r*.7,h[0],u);let M=new L,S=new L;for(let x of m){let T=Math.max(5,Math.round(x.r*x.r/(r*r)*.55*d+5));for(let b=0;b<T;b++){let P=s()*1.7-.7,y=s()*Math.PI*2,E=Math.sqrt(Math.max(0,1-P*P));S.set(E*Math.cos(y),P,E*Math.sin(y)),M.set(x.x+S.x*x.r*.55,x.y+S.y*x.r*.5,x.z+S.z*x.r*.55),vu(f,M,S,x.r*(1.05+s()*.45),s()*Math.PI*2,.86+s()*.3,u)}for(let b=0;b<2;b++)S.set(Math.cos(b*Math.PI/2+.4),.15,Math.sin(b*Math.PI/2+.4)).normalize(),vu(f,M.set(x.x,x.y,x.z),S,x.r*1.7,s()*Math.PI,.9,u)}if(n.droop){let x=Math.max(2,Math.round(a*c*7*(n.droopDensity??1)));for(let T=0;T<x;T++){let b=m[Math.floor(s()*m.length)],P=s()*Math.PI*2,y=b.x+Math.cos(P)*b.r*.8,E=b.z+Math.sin(P)*b.r*.8;n.droopFront&&(E=i+c*(.7+s()*.3));let A=b.y-b.r*.3,R=n.droop*(.25+s()*.75),D=!!n.droopColor&&s()<.8,F=r*(D?.22:.45),N=Math.max(2,Math.round((D?Math.min(R,.6):R)/F));for(let k=0;k<N;k++){A-=F,y+=(s()-.5)*r*.25,n.droopFront&&(E+=(s()-.35)*r*.12);let q=1-k/N*(D?.8:.45);M.set(y,A,E);let Y=D?3:2;for(let ne=0;ne<Y;ne++){let H=ne%2?1:-1;S.set(H*(.6+s()*.4),.3+s()*.4,n.droopFront?1:s()-.5).normalize();let J=D?s()<.25?"#c7b4ef":n.droopColor:h[1+Math.floor(s()*3)],Z=(D?r*.38:r*.85)*q*(.8+s()*.4);$x(f,M.clone().addScaledVector(S,Z*.3),S,Z,Z*.7,J,{...u,blend:.35},s)}}}}return f.pos.length?jx(f):null}var $i=new Map;function ft(n,e,t=0,i=0,s=0){var c;let r=JSON.stringify(e),a=$i.get(r);if(a===void 0){if(a=Qx(e,0,0,0),$i.set(r,a),$i.size>600){let l=$i.keys().next().value;(c=$i.get(l))==null||c.dispose(),$i.delete(l)}}else $i.delete(r),$i.set(r,a);let o=a&&a.clone();o&&n.geo(t||i||s?o.translate(t,i,s):o,"#ffffff",{material:ty(e.palette,e.flowers),tess:!1})}var Mu=new Map;function ey(n,e){let t=hr[n]??hr.green,i=256,s=document.createElement("canvas");s.width=s.height=i;let r=s.getContext("2d"),a=Me(`${n}|${e}`),o=(l,h,f,u,d,p)=>{r.save(),r.translate(l,h),r.rotate(f),r.fillStyle=p,r.beginPath(),r.moveTo(0,0),r.quadraticCurveTo(d,u*.45,0,u),r.quadraticCurveTo(-d,u*.45,0,0),r.fill(),r.strokeStyle="rgba(0,0,0,0.18)",r.lineWidth=1.2,r.beginPath(),r.moveTo(0,u*.1),r.lineTo(0,u*.85),r.stroke(),r.restore()};for(let l=0;l<3;l++){let h=[70,90,70][l];for(let f=0;f<h;f++){let u=a()*Math.PI*2,d=Math.sqrt(a())*i*(.22+l*.08),p=i/2+Math.cos(u)*d,_=i/2+Math.sin(u)*d*.9,g=Math.atan2(_-i/2,p-i/2)-Math.PI/2+(a()-.5)*1.4,m=t[Math.min(t.length-1,l+Math.floor(a()*3))];o(p,_,g,26+a()*22,9+a()*6,m)}}if(e)for(let l=0;l<26;l++){let h=a()*Math.PI*2,f=Math.sqrt(a())*i*.36,u=i/2+Math.cos(h)*f,d=i/2+Math.sin(h)*f;r.fillStyle=e;for(let p=0;p<5;p++)r.beginPath(),r.arc(u+Math.cos(p*1.256)*4,d+Math.sin(p*1.256)*4,3.6,0,Math.PI*2),r.fill();r.fillStyle="#f2c94c",r.beginPath(),r.arc(u,d,2.2,0,Math.PI*2),r.fill()}let c=new Kt(s);return c.colorSpace=Ct,c.anisotropy=4,c}function ty(n="green",e=null){let t=`${n}|${e??""}`,i=Mu.get(t);return i||(i=ps(new pn({map:ey(n,e),alphaTest:.45,side:An,vertexColors:!0,roughness:.85})),i.userData.shared=!0,Mu.set(t,i)),i}var bu=new Map;function ny(n){let e=bu.get(n.uuid);return e||(e=new js({depthPacking:yl,map:n.map,alphaTest:n.alphaTest}),bu.set(n.uuid,e)),e}var Su=new Map;function Gt(n,e){let t=new Re(n),i={};return t.getHSL(i),t.setHSL(i.h,i.s,en.clamp(i.l+e,0,1)),"#"+t.getHexString()}function iy(n,e,t){let i=`${n}|${e}|${t}`,s=Su.get(i);if(s)return s;let r=256,a=document.createElement("canvas");a.width=a.height=r;let o=a.getContext("2d"),c=Me(i);o.fillStyle=e,o.fillRect(0,0,r,r);let l=(h,f,u=2)=>{for(let d=0;d<h;d++)o.fillStyle=Gt(e,(c()-.5)*f),o.globalAlpha=.35,o.fillRect(c()*r,c()*r,u+c()*u,u+c()*u);o.globalAlpha=1};switch(n){case"wood":{for(let f=0;f<8;f++){let u=f*r/8,d=-c()*r;for(;d<r;){let p=r*(.45+c()*.6);o.fillStyle=Gt(e,(c()-.5)*.09),o.fillRect(d,u,p,r/8);for(let _=0;_<4;_++){o.strokeStyle=Gt(e,-.05-c()*.05),o.globalAlpha=.35,o.beginPath();let g=u+c()*(r/8);o.moveTo(d,g),o.lineTo(d+p,g+(c()-.5)*3),o.stroke(),o.globalAlpha=1}o.fillStyle=t,o.fillRect(d,u,1.5,r/8),d+=p}o.fillStyle=t,o.fillRect(0,u,r,1.5)}break}case"tile":{let f=r/4;for(let u=0;u<4;u++)for(let d=0;d<4;d++)o.fillStyle=Gt(e,(c()-.5)*.04),o.fillRect(u*f+1,d*f+1,f-2,f-2);o.fillStyle=t;for(let u=0;u<=4;u++)o.fillRect(u*f-1,0,2,r),o.fillRect(0,u*f-1,r,2);for(let u=0;u<=4;u++)for(let d=0;d<=4;d++)o.save(),o.translate(u*f,d*f),o.rotate(Math.PI/4),o.fillRect(-7,-7,14,14),o.restore();break}case"checker":{let f=r/4;for(let u=0;u<4;u++)for(let d=0;d<4;d++)o.fillStyle=(u+d)%2?t:e,o.fillRect(u*f,d*f,f,f);l(500,.06);break}case"stripes":{o.fillStyle=t;for(let h=0;h<4;h++)o.fillRect(h*(r/4),0,r/8,r);l(300,.05);break}case"lines":{o.fillStyle=t;for(let h=0;h<16;h++)o.fillRect(0,h*(r/16),r,2);l(400,.08);break}case"stone":{o.fillStyle=t,o.fillRect(0,0,r,r);let h=3,f=r/h;for(let u=0;u<h;u++)for(let d=0;d<h;d++){let p=f*(.75+c()*.2),_=f*(.75+c()*.2);o.fillStyle=Gt(e,(c()-.5)*.12);let g=u*f+(f-p)/2,m=d*f+(f-_)/2;o.beginPath(),o.moveTo(g+c()*6,m+c()*6),o.lineTo(g+p-c()*6,m+c()*6),o.lineTo(g+p-c()*6,m+_-c()*6),o.lineTo(g+c()*6,m+_-c()*6),o.closePath(),o.fill()}for(let u=0;u<60;u++)o.fillStyle=hr.green[2+Math.floor(c()*3)],o.globalAlpha=.6,o.fillRect(c()*r,c()*r,3+c()*5,3+c()*5);o.globalAlpha=1;break}case"carpet":{l(3e3,.08,1.5);break}case"grass":{for(let h=0;h<4e3;h++)o.fillStyle=hr.green[Math.floor(c()*5)],o.globalAlpha=.5,o.fillRect(c()*r,c()*r,2+c()*3,2+c()*3);o.globalAlpha=1;break}case"brick":{let f=r/8;o.fillStyle=t,o.fillRect(0,0,r,r);for(let u=0;u<8;u++){let d=u%2?f:0;for(let p=-d;p<r;p+=f*2)o.fillStyle=Gt(e,(c()-.5)*.1),o.fillRect(p+1.5,u*f+1.5,f*2-3,f-3)}break}case"sand":{l(2600,.1,1.4),o.strokeStyle=Gt(t,-.02),o.lineWidth=2;for(let h=0;h<9;h++){o.globalAlpha=.35,o.beginPath();let f=c()*r;for(let u=0;u<=r;u+=8)o.lineTo(u,f+Math.sin(u/22+h)*6);o.stroke()}o.globalAlpha=1;break}case"water":{let h=o.createLinearGradient(0,0,r,r);h.addColorStop(0,e),h.addColorStop(1,Gt(e,-.06)),o.fillStyle=h,o.fillRect(0,0,r,r),o.strokeStyle=t,o.lineCap="round";for(let f=0;f<26;f++){o.globalAlpha=.5+c()*.4,o.lineWidth=2+c()*2;let u=c()*r,d=c()*r,p=14+c()*26;o.beginPath(),o.arc(u,d,p,Math.PI*1.15,Math.PI*1.85),o.stroke()}o.fillStyle="#ffffff";for(let f=0;f<40;f++)o.globalAlpha=.5,o.fillRect(c()*r,c()*r,2,2);o.globalAlpha=1;break}case"snow":{l(1500,.05,2),o.fillStyle="#ffffff";for(let h=0;h<90;h++)o.globalAlpha=.6,o.beginPath(),o.arc(c()*r,c()*r,2+c()*5,0,Math.PI*2),o.fill();o.globalAlpha=1;break}case"marble":{l(300,.03,4),o.strokeStyle=t;for(let h=0;h<7;h++){o.globalAlpha=.25+c()*.3,o.lineWidth=.8+c()*1.6,o.beginPath();let f=c()*r,u=0;for(o.moveTo(f,u);u<r;)f+=(c()-.5)*40,u+=12+c()*18,o.lineTo(f,u);o.stroke()}o.globalAlpha=.5,o.fillStyle=Gt(t,.1),o.fillRect(0,r/2-1,r,2),o.fillRect(r/2-1,0,2,r),o.globalAlpha=1;break}case"tatami":{let h=r/2;for(let[f,u,d,p]of[[0,0,h,r],[h,0,h,h],[h,h,h,h]]){o.fillStyle=Gt(e,(c()-.5)*.05),o.fillRect(f,u,d,p),o.strokeStyle=Gt(e,-.08),o.globalAlpha=.35;let _=p>d;for(let g=3;g<(_?d:p);g+=4)o.beginPath(),_?(o.moveTo(f+g,u),o.lineTo(f+g,u+p)):(o.moveTo(f,u+g),o.lineTo(f+d,u+g)),o.stroke();o.globalAlpha=1,o.strokeStyle=t,o.lineWidth=6,o.strokeRect(f+3,u+3,d-6,p-6),o.lineWidth=1}break}case"planks":{for(let f=0;f<4;f++){let u=f*r/4;o.fillStyle=Gt(e,(c()-.5)*.1),o.fillRect(u,0,r/4,r);for(let d=0;d<5;d++){o.strokeStyle=Gt(e,-.07),o.globalAlpha=.4,o.beginPath();let p=u+c()*(r/4);o.moveTo(p,0),o.bezierCurveTo(p+6,r/3,p-6,2*r/3,p+2,r),o.stroke()}o.globalAlpha=1,o.fillStyle=t,o.fillRect(u,0,3,r);for(let d of[8,r/2,r-8])o.fillRect(u+10,d,3,3),o.fillRect(u+r/4-12,d,3,3)}break}case"parquet":{let h=r/8;for(let f=-1;f<9;f++)for(let u=-1;u<9;u++)o.fillStyle=Gt(e,(c()-.5)*.12),(f+u)%2?o.fillRect(f*h,u*h,h*2,h):o.fillRect(f*h,u*h,h,h*2),o.strokeStyle=t,o.lineWidth=1.2,(f+u)%2?o.strokeRect(f*h,u*h,h*2,h):o.strokeRect(f*h,u*h,h,h*2);break}case"metal":{let h=r/2;for(let f=0;f<2;f++)for(let u=0;u<2;u++){o.fillStyle=Gt(e,(c()-.5)*.05),o.fillRect(f*h+2,u*h+2,h-4,h-4),o.fillStyle=t;for(let[d,p]of[[8,8],[h-12,8],[8,h-12],[h-12,h-12]])o.beginPath(),o.arc(f*h+d+2,u*h+p+2,3,0,Math.PI*2),o.fill()}o.strokeStyle=Gt(e,.08),o.globalAlpha=.5;for(let f=10;f<r;f+=18)for(let u=10;u<r;u+=18)o.beginPath(),o.moveTo(f-4,u+((f+u)%36?3:-3)),o.lineTo(f+4,u-((f+u)%36?3:-3)),o.stroke();o.globalAlpha=1;break}case"mosaic":{let f=r/16;for(let u=0;u<16;u++)for(let d=0;d<16;d++){let p=Math.abs(u-8+.5)+Math.abs(d-8+.5);o.fillStyle=Math.floor(p)%4===0?t:Gt(e,(c()-.5)*.1),o.fillRect(u*f+.8,d*f+.8,f-1.6,f-1.6)}break}case"cobble":{o.fillStyle=t,o.fillRect(0,0,r,r);for(let h=0;h<70;h++)o.fillStyle=Gt(e,(c()-.5)*.16),o.beginPath(),o.ellipse(c()*r,c()*r,12+c()*10,10+c()*8,c()*3,0,Math.PI*2),o.fill();break}case"hex":{let f=18*Math.sqrt(3);for(let u=-1;u<r/(18*1.5)+1;u++)for(let d=-1;d<r/f+1;d++){let p=d*f+(u%2?f/2:0),_=u*18*1.5;o.fillStyle=Gt(e,(c()-.5)*.08),o.strokeStyle=t,o.lineWidth=2,o.beginPath();for(let g=0;g<6;g++)o.lineTo(p+Math.cos(Math.PI/6+g*Math.PI/3)*18,_+Math.sin(Math.PI/6+g*Math.PI/3)*18);o.closePath(),o.fill(),o.stroke()}break}case"straw":{l(800,.06,2);for(let h=0;h<900;h++){o.strokeStyle=c()<.5?t:Gt(e,.08),o.globalAlpha=.6,o.lineWidth=1.2;let f=c()*r,u=c()*r,d=c()*Math.PI,p=6+c()*10;o.beginPath(),o.moveTo(f,u),o.lineTo(f+Math.cos(d)*p,u+Math.sin(d)*p),o.stroke()}o.globalAlpha=1;break}default:l(800,.04)}return s=new Kt(a),s.colorSpace=Ct,s.wrapS=s.wrapT=En,s.anisotropy=4,Su.set(i,s),s}var wu=new Map;function mt(n,e,t,i,s){let r=`${n}|${e}|${t}|${i}|${s}`,a=wu.get(r);if(!a){let o=iy(n,e,t).clone();o.needsUpdate=!0,o.repeat.set(i,s);let c={tile:.55,marble:.35,water:.18,metal:.45,ice:.2}[n]??.92;a=ps(new pn({map:o,roughness:c,metalness:n==="metal"?.35:0})),a.userData.shared=!0,wu.set(r,a)}return a}var $n=(n,e)=>e[Math.floor(n()*e.length)],pc="#6b4a34",ms={palm(n,e){let t=1.1+e()*.4,i=(e()-.5)*.3;for(let r=0;r<6;r++)n.cyl(.07-r*.006,.08-r*.006,t/6+.02,i*r*.06,r*t/6,0,r%2?"#8a6a4a":"#7a5a3a",{seg:8});let s=[i*.36,t,0];for(let r=0;r<8;r++){let a=r/8*Math.PI*2+e()*.3;n.cbox(.14,.02,.7,s[0]+Math.cos(a)*.3,s[1]-.06,Math.sin(a)*.3,["#2f7a3a","#3f9a45","#5aa84a"][r%3],{ry:-a+Math.PI/2,rx:.45,flat:!0})}for(let r=0;r<3;r++)n.sphere(.06,s[0]+Math.cos(r*2.1)*.08,t-.08,Math.sin(r*2.1)*.08,"#6b4a2a",{seg:8})},pine(n,e){let t=1+e()*.5;n.cyl(.06,.08,t*.25,0,0,0,pc,{seg:8});for(let i=0;i<3;i++)ft(n,{seed:Math.floor(e()*9999),rx:.42-i*.11,ry:.22,palette:"pine",voxel:.12},0,t*.18+i*t*.24,0);e()<.6&&n.cyl(.05,.3,.12,0,t*.8,0,"#f4f8fc",{seg:8})},bush(n,e){ft(n,{seed:Math.floor(e()*9999),rx:.35+e()*.15,ry:.28,palette:$n(e,["green","lime","olive"]),voxel:.1,flowers:e()<.4?$n(e,["#f4f1ff","#e8492c","#f2c94c"]):null},0,0,0)},tree(n,e){let t=.9+e()*.4;n.cyl(.06,.09,t*.55,0,0,0,pc,{seg:8}),ft(n,{seed:Math.floor(e()*9999),rx:.5,ry:.42,palette:$n(e,["green","lime","autumn"]),voxel:.14},0,t*.5,0)},sakura(n,e){n.cyl(.06,.09,.6,0,0,0,"#4a3428",{seg:8}),n.cbox(.05,.4,.05,.12,.6,0,"#4a3428",{rz:-.6}),ft(n,{seed:Math.floor(e()*9999),rx:.55,ry:.36,palette:"blossom",voxel:.12},.1,.62,0)},bonsai(n,e){n.box(.4,.12,.26,0,0,0,"#2f5a6e"),n.cbox(.05,.3,.05,0,.26,0,"#4a3428",{rz:.5}),ft(n,{seed:Math.floor(e()*9999),rx:.24,ry:.12,palette:"dark",voxel:.06},.1,.32,0)},cypress(n,e){n.cyl(.05,.06,.2,0,0,0,pc,{seg:6}),ft(n,{seed:Math.floor(e()*9999),rx:.2,ry:.65,palette:"dark",voxel:.1},0,.1,0)},topiary(n,e){n.cyl(.18,.14,.24,0,0,0,"#c9b8a0",{seg:12}),n.cyl(.03,.03,.35,0,.22,0,pc,{seg:6}),ft(n,{seed:Math.floor(e()*9999),rx:.26,ry:.24,palette:"green",voxel:.08},0,.5,0)},rosebush(n,e){ft(n,{seed:Math.floor(e()*9999),rx:.36,ry:.26,palette:"dark",voxel:.09,flowers:$n(e,["#e8492c","#f4bfd3","#f4f1ff"])},0,0,0)},fern(n,e){for(let t=0;t<9;t++){let i=t/9*Math.PI*2+e()*.4;n.cbox(.09,.015,.5,Math.cos(i)*.2,.14,Math.sin(i)*.2,["#2f6a2e","#3f8a3a","#5aa04a"][t%3],{ry:-i+Math.PI/2,rx:.6,flat:!0})}},kelp(n,e){for(let t=0;t<4;t++){let i=(e()-.5)*.3,s=(e()-.5)*.3,r=5+Math.floor(e()*4);for(let a=0;a<r;a++)n.cbox(.08,.2,.015,i+Math.sin(a*.9+t)*.05,.1+a*.16,s,["#3f6a32","#5a8a3a","#7aa84a"][a%3],{rz:Math.sin(a+t)*.4,ry:t})}},coralTree(n,e){let t=$n(e,["#f08a7e","#f0a8c4","#b56ad8","#e8743a"]);n.cyl(.06,.09,.3,0,0,0,t,{seg:8});for(let i=0;i<7;i++){let s=e()*6.28,r=.3+e()*.5;n.cbox(.06,.35+e()*.2,.06,Math.cos(s)*.12,.35+r*.2,Math.sin(s)*.12,t,{rz:Math.cos(s)*r,rx:-Math.sin(s)*r,round:.025}),n.sphere(.05,Math.cos(s)*.25,.6+r*.2,Math.sin(s)*.25,t,{seg:8})}},bamboo(n,e){for(let t=0;t<5;t++){let i=(e()-.5)*.35,s=(e()-.5)*.35,r=.8+e()*.6;for(let a=0;a<4;a++)n.cyl(.035,.035,r/4-.015,i,a*r/4,s,a%2?"#7aa84a":"#6a9a3e",{seg:8});n.cbox(.06,.012,.22,i+.08,r*.85,s,"#5a9440",{ry:e()*3,rx:.4,flat:!0})}},cactus(n,e){let t=.6+e()*.4,i="#5a8a4a";n.cyl(.11,.12,t,0,0,0,i,{seg:10}),n.sphere(.11,0,t,0,i,{seg:10});for(let s of[-1,1]){if(e()<.3)continue;let r=t*(.35+e()*.25);n.cbox(.2,.08,.08,s*.16,r,0,i,{round:.04}),n.cyl(.07,.07,.25,s*.25,r,0,i,{seg:8}),n.sphere(.07,s*.25,r+.25,0,i,{seg:8})}e()<.5&&n.sphere(.04,0,t+.1,0,"#e8492c",{seg:6})},dryBush(n,e){ft(n,{seed:Math.floor(e()*9999),rx:.3,ry:.18,palette:"dry",voxel:.08},0,0,0)},deadTree(n,e){n.cyl(.05,.09,.9,0,0,0,"#3a3036",{seg:7});for(let t=0;t<5;t++){let i=e()*6.28,s=.4+e()*.45;n.cbox(.035,.4,.035,Math.cos(i)*.12,s+.12,Math.sin(i)*.12,"#3a3036",{rz:Math.cos(i)*.9,rx:-Math.sin(i)*.9})}},flowers(n,e){for(let t=0;t<7;t++){let i=(e()-.5)*.45,s=(e()-.5)*.45,r=.12+e()*.12;n.cyl(.01,.01,r,i,0,s,"#3f7a35",{seg:4}),n.sphere(.04,i,r,s,$n(e,["#e8492c","#f2c94c","#f4f1ff","#c46aa8","#5a8adf"]),{seg:6})}},tuft(n,e){for(let t=0;t<7;t++){let i=e()*6.28;n.cbox(.03,.2+e()*.12,.012,Math.cos(i)*.04,.1,Math.sin(i)*.04,$n(e,["#5a9440","#7cae4f","#a9c96c"]),{rz:Math.cos(i)*.5,rx:Math.sin(i)*.5,ry:i,flat:!0})}}},za={lamp(n){n.cyl(.1,.12,.08,0,0,0,"#2a2523",{seg:10}),n.cyl(.03,.035,1.2,0,.08,0,"#2a2523",{seg:8}),n.box(.16,.2,.16,0,1.25,0,"#ffd27a",{emissive:"#ffb340",ei:1.2}),n.cyl(0,.14,.1,0,1.45,0,"#2a2523",{seg:4})},lanternStone(n){n.cyl(.14,.18,.1,0,0,0,"#9a968c",{seg:8}),n.cyl(.05,.06,.35,0,.1,0,"#9a968c",{seg:8}),n.box(.24,.18,.24,0,.45,0,"#9a968c"),n.box(.12,.1,.26,0,.49,0,"#ffd27a",{emissive:"#ffb340",ei:.8}),n.cyl(0,.24,.14,0,.63,0,"#8a867c",{seg:4})},obelisk(n){n.box(.3,.1,.3,0,0,0,"#c9a456"),n.cyl(.07,.12,1.1,0,.1,0,"#e0c088",{seg:4}),n.cyl(0,.07,.12,0,1.2,0,"#e0b23a",{seg:4,metalness:.7})},tomb(n,e){n.box(.34,.5,.1,0,0,0,"#8a8690",{round:.08,rz:(e()-.5)*.3}),n.box(.2,.04,.12,0,.32,.01,"#6e6a74"),n.box(.04,.2,.12,0,.22,.01,"#6e6a74")},column(n){n.box(.32,.08,.32,0,0,0,"#e6dfd0"),n.cyl(.11,.12,.9,0,.08,0,"#f2ede2",{seg:12}),n.box(.3,.07,.3,0,.98,0,"#e6dfd0")},banner(n,e){n.cyl(.025,.025,1.3,0,0,0,"#5a3b26",{seg:6});let t=$n(e,["#c0283a","#2f5d8a","#d9a441"]);n.box(.32,.45,.02,.17,.8,0,t),n.box(.12,.12,.025,.17,1,0,"#f2c94c")},antenna(n){n.box(.26,.08,.26,0,0,0,"#5a6474"),n.cyl(.02,.03,1.2,0,.08,0,"#9aa6b4",{seg:6,metalness:.6}),n.sphere(.04,0,1.3,0,"#ff4a4a",{emissive:"#ff2020",ei:1.5,seg:8});for(let e of[.5,.8])n.box(.3,.015,.015,0,e,0,"#9aa6b4")},dish(n){n.box(.22,.2,.22,0,0,0,"#5a6474"),n.sphere(.32,0,.5,0,"#c9d1db",{sy:.35,seg:14,rx:.8,metalness:.4}),n.cyl(.015,.015,.3,0,.45,.1,"#9aa6b4",{rx:.8,seg:6})},snowman(n){n.sphere(.2,0,.18,0,"#f6f9fc",{seg:12}),n.sphere(.15,0,.47,0,"#f6f9fc",{seg:12}),n.sphere(.11,0,.7,0,"#f6f9fc",{seg:12}),n.cbox(.03,.03,.12,0,.7,.14,"#e8743a",{round:.01}),n.cyl(.13,.13,.02,0,.78,0,"#2a2523",{seg:12}),n.cyl(.08,.08,.14,0,.79,0,"#2a2523",{seg:12}),n.box(.32,.05,.08,0,.58,0,"#c0283a")},toadstool(n,e){let t=.45+e()*.2,i=.28+e()*.08;n.cyl(.07,.09,t,0,0,0,"#f2ead8",{seg:10}),n.sphere(i,0,t,0,$n(e,["#c0392b","#d9601a","#b3202c"]),{sy:.55,seg:16});for(let s=0;s<6;s++){let r=s*1.05+e()*.3,a=i*(s%2?.45:.75);n.sphere(.035,Math.cos(r)*a,t+i*.55*Math.sqrt(1-(a/i)**2)-.005,Math.sin(r)*a,"#fbf6ea",{sy:.45,seg:8})}},heart(n,e){let t=$n(e,["#e5384f","#ff7f99","#c0283a"]);n.cyl(.025,.03,.75,0,0,0,"#f6f2ea",{seg:6});for(let i of[-1,1])n.sphere(.1,i*.071,.891,0,t,{seg:14});n.cbox(.2,.2,.1,0,.82,0,t,{rz:Math.PI/4})},fountainSmall(n){n.cyl(.38,.4,.18,0,0,0,"#d8ccb2",{seg:18}),n.cyl(.32,.32,.01,0,.15,0,"#5fa5b5",{seg:18,roughness:.1}),n.cyl(.05,.07,.4,0,.15,0,"#d8ccb2",{seg:10}),n.sphere(.08,0,.58,0,"#d8ccb2",{seg:10})},balloons(n,e){for(let t=0;t<4;t++){let i=(e()-.5)*.3,s=(e()-.5)*.3,r=.8+e()*.4;n.cyl(.004,.004,r,i*.3,0,s*.3,"#f6f2ea",{seg:3}),n.sphere(.12,i,r+.1,s,$n(e,["#e8492c","#2f6f7e","#f2c94c","#c46aa8","#3f7a4a"]),{sy:1.2,seg:12,roughness:.3})}},bench(n){for(let e of[-1,1])n.box(.05,.3,.3,e*.4,0,0,"#2a2523");for(let e=0;e<3;e++)n.box(.95,.03,.08,0,.3,-.1+e*.1,"#5a8a5a");n.cbox(.95,.12,.03,0,.45,-.17,"#5a8a5a",{rx:-.2})}};var fe={metalness:.8,roughness:.3},we="#d9b44a",Jn=["#8a5a36","#a8703f","#6b4a34","#b98552"],ot=(n,e)=>e[Math.floor(n()*e.length)],Ue=(n,e)=>new Re(n).offsetHSL(0,0,e).getStyle(),be=(n,e=1.2)=>({emissive:n,ei:e,shadow:!1});function yt(n,e,t,i,s,r,a=4){let o=new li(e,t,a,1.6);o.position.set(i,s,r),n.add(o)}function Ei(n,e,t,i,s,r=.05,a=0,o={}){for(let c of[-1,1])for(let l of[-1,1])n.box(r,i,r,c*(e/2-r/2),a,l*(t/2-r/2),s,o)}function mi(n,e,t,i,s,r=.035,a={}){for(let o of[-1,1])for(let c of[-1,1])n.cyl(r*.7,r,i,o*(e/2-r),0,c*(t/2-r),s,{seg:8,...a})}function qe(n,e,t,i={},s=0,r=0,a=0){let o=new un(e.map(([c,l])=>new oe(c,l)),i.seg??20);return o.translate(s,r,a),n.geo(o,t,{tess:!1,...i})}function mn(n,e,t,i,s=0,r={}){let a=new Hn;e.forEach(([c,l],h)=>h?a.lineTo(c,-l):a.moveTo(c,-l)),a.closePath();let o=new Gn(a,{depth:t,bevelEnabled:!!r.bevel,bevelSize:r.bevel??0,bevelThickness:r.bevel??0,bevelSegments:2,curveSegments:16});return o.rotateX(-Math.PI/2),o.translate(0,s,0),n.geo(o,i,{tess:!1,...r})}function ji(n,e=28){let t=[];for(let i=0;i<e;i++){let s=i/e*Math.PI*2,r=16*Math.sin(s)**3,a=13*Math.cos(s)-5*Math.cos(2*s)-2*Math.cos(3*s)-Math.cos(4*s);t.push([r/34*n,-a/34*n])}return t}function Va(n,e,t,i,s,r,a,o,c=["#a33b2b","#2f5d8a","#d9b44a","#3f7a4a","#7a3f7a","#e4dccb","#c56b2c","#1f2c3c"]){let l=t-e/2+.02;for(;l<t+e/2-.06;){let h=.03+a()*.05,f=o*(.6+a()*.38);if(a()<.08){l+=h*2;continue}n.box(h,f,r*(.7+a()*.2),l+h/2,i,s,c[Math.floor(a()*c.length)]),l+=h+.004}}function gs(n,e,t,i="leafy",s="#b8673f",r="green",a=null,o=0,c=0,l=0){let h=Me(t);if(n.cyl(e/2,e*.38,e*.8,o,c,l,s,{seg:14}),n.cyl(e/2+.02,e/2+.02,e*.1,o,c+e*.72,l,s,{seg:14}),n.cyl(e/2-.02,e/2-.02,.01,o,c+e*.8,l,"#3a2a1e",{seg:14}),i==="palm"){let f=["#2f5e2c","#3f7a35","#5a9440","#7cae4f","#a9c96c"];for(let u=0;u<11;u++){let d=u/11*Math.PI*2+h(),p=e*(1.4+h()*1),_=.5+h()*.6;n.cbox(.16*e,p,.02,o+Math.cos(d)*p*.3,c+e*.8+p*.38,l+Math.sin(d)*p*.3,f[1+u%4],{rz:-Math.cos(d)*_,rx:Math.sin(d)*_,flat:!0})}}else{let f=e*.72;ft(n,{seed:t,rx:f,ry:e*.75,palette:r,voxel:Math.max(.06,e*.17),flowers:a,flowerRate:.2},o,c+e*.7,l)}}function Ql(n,e,t,i,s=0,r=0,a=0){let o=ms[e]??za[e];if(!o)return;let c=n.constructor?new n.constructor:null;if(o(c,Me(i)),t!==1)for(let l of c.buckets.values())for(let h of l.gs)h.scale(t,t,t);for(let l of[...c.group.children])l.position.multiplyScalar(t),l.position.add(new L(s,r,a)),n.add(l);n.merge(c,0,s,r,a)}function Ru(n,e,t,i,s,r,a,o,c){for(let l=0;l<e;l++)n.cbox(t,.05,i,s+(c()-.5)*.04,r+.025+l*.05,a,o[l%o.length],{ry:(c()-.5)*.5})}function Ha(n,e,t,i,s,r={}){n.box(e-.06,.2,t-.06,0,i,0,r.mattress??"#f2f0ea",{round:.07}),n.box(e+.02,.09,t*.62,0,i+.15,t*.19,s,{round:.04,...r.quilt?{material:r.quilt}:{}}),n.box(e+.03,.1,.16,0,i+.15,t*.19-t*.31+.08,r.band??"#f6f2ea",{round:.04});for(let a of[-1,1])n.box(e*.38,.14,.34,a*e*.22,i+.18,-t/2+.3,r.pillow??"#eef0f4",{round:.06})}var Cu={fourPoster(n,e){let s=e.wood??"#5a3420",r=e.curtain??"#7a1f2a",a=e.trim??we;n.box(1.4,.32,2,0,.05,0,s),Ha(n,1.4,2,.37,e.sheet??r,{band:e.band});for(let o of[-1,1])for(let c of[-1,1])n.cyl(.05,.06,2,o*(1.4/2),0,c*(2/2),s,{seg:10}),n.sphere(.07,o*(1.4/2),2.05,c*(2/2),a,fe),n.cbox(.16,1.6,.14,o*(1.4/2-.1),1,c*(2/2-.09),r,{round:.06});for(let o of[-1,1])n.box(1.4+.1,.16,.05,0,1.86,o*(2/2),r);for(let o of[-1,1])n.box(.05,.16,2+.1,o*(1.4/2),1.86,0,r);for(let o of[-1,1])n.box(1.4+.12,.03,.06,0,1.84,o*(2/2),a);return n.box(1.4,.9,.08,0,.3,-2/2+.02,s),{w:1.4+.15,d:2+.15,h:2.1,seat:.6,wall:!0}},ironBed(n,e){let s=e.iron??"#2a2a2e";n.box(1.3,.08,1.95,0,.3,0,s),mi(n,1.3,1.95,.32,s,.03),Ha(n,1.3,1.95,.38,e.sheet??"#e9d9e8");for(let[r,a]of[[-1.95/2,1.15],[1.95/2,.8]]){for(let o of[-1,1])n.cyl(.03,.03,a,o*1.3/2,0,r,s,{seg:8}),n.sphere(.05,o*1.3/2,a,r,we,fe);n.cyl(.02,.02,1.3,0,a-.08,r,s,{rz:Math.PI/2,center:!0,seg:6});for(let o=1;o<7;o++)n.cyl(.012,.012,a-.45,-1.3/2+o*1.3/7,.4,r,s,{seg:5})}return{w:1.3,d:1.95,h:1.15,seat:.6,wall:!0}},futon(n,e){return n.box(1.15,.1,2,0,0,0,e.c??"#f2ede0",{round:.04}),n.box(1.15+.02,.06,2*.6,0,.09,2*.2,e.c2??"#2c3e6a",{round:.03,material:mt("checker",e.c2??"#2c3e6a","#e8e2d2",3,6)}),n.box(.6,.1,.28,0,.1,-2/2+.25,"#e6dcc4",{round:.05}),{w:1.15,d:2,h:.2,seat:.16,wall:!0}},hammock(n,e){let i=e.c??"#d9c08a",s=e.post??"#7a5434";for(let a of[-1,1])n.cyl(.06,.07,1.2,a*2.2/2,0,0,s,{seg:8}),n.cyl(.07,.07,.04,a*2.2/2,1.2,0,Ue(s,-.1),{seg:8});let r=10;for(let a=0;a<r;a++){let o=(a+.5)/r,c=(o-.5)*(2.2-.4),l=.55+4*.42*(o-.5)**2,h=8*.42*(o-.5);n.cbox((2.2-.4)/r+.02,.03,.85,c,l,0,a%2?i:Ue(i,-.06),{rz:Math.atan(h/(2.2-.4))*2.2,jitter:0})}for(let a of[-1,1])n.cbox(.3,.02,.02,a*(2.2/2-.12),1,0,"#d8c8a8",{rz:a*.9});return n.box(.4,.08,.3,-.55,.58,0,"#f2ede0",{round:.03}),{w:2.2,d:.9,h:1.25,seat:.58,up:1.2}},cot(n,e){let s=e.wood??"#6b4a34";for(let r of[-1,1])for(let a of[.6,-.6])n.cbox(.04,.6,.04,0,.25,r*(1.9/2-.15),s,{rz:a});for(let r of[-1,1])n.box(.05,.05,1.9,r*.9/2,.45,0,s);return n.box(.9,.04,1.9-.1,0,.45,0,"#b8a37a"),n.box(.9-.05,.08,1.9*.55,0,.49,1.9*.2,e.c??"#8a2f2a",{round:.03,material:mt("checker",e.c??"#8a2f2a","#2a2a2e",2,4)}),n.box(.5,.1,.28,0,.49,-1.9/2+.25,"#e8dcc0",{round:.04}),{w:.9,d:1.9,h:.6,seat:.53,wall:!0}},bunk(n,e){let s=e.wood??"#f2c94c";for(let r of[-1,1])for(let a of[-1,1])n.box(.08,1.75,.08,r*(1.2/2),0,a*(1.95/2),s);n.box(1.2,.1,1.95,0,.2,0,s),Ha(n,1.2,1.95,.3,"#5aa9e6"),n.box(1.2,.1,1.95,0,1.25,0,s),Ha(n,1.2,1.95,1.35,e.c??"#ff7a8a");for(let r of[-1,1])n.box(1.2,.08,.05,0,1.68,r*1.95/2,s);for(let r=0;r<5;r++)n.box(.05,.04,.3,1.2/2+.06,.25+r*.27,1.95/2-.25,"#e8492c");return{w:1.2+.15,d:1.95,h:1.75,seat:1.57,wall:!0,up:1.1}},clamBed(n,e){let t=e.c??"#f4d9e4",i=1;qe(n,[[.25,0],[.75,.08],[i,.35],[i*.98,.42],[0,.3]],t,{seg:24});let s=new un([[0,0],[i*.95,.05],[i,.12],[0,.4]].map(([r,a])=>new oe(r,a)),24);s.rotateX(-1.25),s.translate(0,.45,-i*.75),n.geo(s,Ue(t,-.05),{tess:!1});for(let r=0;r<9;r++)n.cbox(.04,.03,i*.9,Math.sin((r-4)*.3)*.5,.45,0,Ue(t,-.12),{ry:(r-4)*.3,jitter:0});return n.box(1.2,.12,1.2,0,.3,.05,"#f6eef6",{round:.06}),n.sphere(.12,.45,.48,-.35,"#fbf6ff",{roughness:.15,metalness:.3}),{w:2*i,d:2*i,h:1.2,seat:.45}},coffin(n,e){let t=e.wood??"#3a2a30",i=[[-.28,-1],[.28,-1],[.45,-.45],[.32,1],[-.32,1],[-.45,-.45]];return mn(n,i,.42,t,.06,{bevel:.02}),mn(n,i.map(([s,r])=>[s*.82,r*.9]),.02,e.c??"#7a1f2a",.47),n.box(.5,.06,.3,0,.46,-.7,"#e8dcd8",{round:.03}),mn(n,i.map(([s,r])=>[s+.62,r]),.05,Ue(t,.05),0),n.cbox(.06,.4,.04,.62,.06,-.1,we,fe),n.cbox(.2,.06,.04,.62,.06,-.2,we,fe),{w:1.6,d:2.05,h:.5,seat:.5}},leafBed(n,e){let t=Me(e.seed);for(let i=0;i<9;i++){let s=i/9*Math.PI*2;n.sphere(.16,Math.cos(s)*.62,.08,Math.sin(s)*.95,e.edge??"#8a7a68",{sy:.7,seg:8})}ft(n,{seed:e.seed,rx:.6,ry:.12,rz:.92,palette:e.palette??"autumn",voxel:.09,sparse:.05},0,0,0);for(let i=0;i<6;i++)n.cbox(.3,.015,.12,(t()-.5)*.8,.26,(t()-.5)*1.3,ot(t,["#a2531f","#c9762a","#5a9440"]),{ry:t()*3,flat:!0});return{w:1.5,d:2.1,h:.3,seat:.27}},heartBed(n,e){let t=e.c??"#e5384f",i=ji(2);mn(n,i,.35,Ue(t,-.15),.02,{bevel:.03}),mn(n,ji(1.85),.18,"#fbe8ee",.37,{bevel:.04}),mn(n,ji(1.5).map(([o,c])=>[o,c+.15]),.08,t,.55,{bevel:.03});for(let o of[-1,1])n.box(.45,.14,.3,o*.3,.55,-.55,"#ffffff",{round:.06});let s=ji(1.1).map(([o,c])=>[o,-c]),r=new Hn;s.forEach(([o,c],l)=>l?r.lineTo(o,c):r.moveTo(o,c));let a=new Gn(r,{depth:.08,bevelEnabled:!1});return a.translate(0,1,-.95),n.geo(a,t,{tess:!1}),{w:2,d:2,h:1.55,seat:.66,wall:!0}},kline(n,e){let s=e.wood??"#6b4a34",r=e.c??"#a33b2b";n.box(2,.1,.85,0,.42,0,s);for(let a of[-1,1])for(let o of[-1,1])qe(n,[[.05,0],[.07,.1],[.035,.22],[.06,.32],[.04,.42]],e.legs??s,{seg:10},a*(2/2-.1),0,o*(.85/2-.08));return n.box(2-.05,.14,.85-.05,0,.52,0,r,{round:.06}),n.cbox(.16,.5,.85,-2/2+.1,.72,0,s,{rz:.35,round:.04}),n.cyl(.13,.13,.85-.1,-2/2+.3,.72,0,e.c2??we,{rx:Math.PI/2,center:!0,seg:12}),n.box(.5,.1,.4,.4,.66,0,e.c2??we,{round:.04}),{w:2,d:.85,h:1,seat:.66,wall:!0}},sleepPod(n,e){let t=e.c??"#e8eef4",i=e.glass??"#9fe8ff";n.box(1.2,.45,2,0,0,0,t,{round:.18}),n.box(1,.12,1.8,0,.42,0,"#5a6a80",{round:.05}),n.box(.95,.06,1,0,.52,.35,e.c2??"#3fb6d9",{round:.03}),n.sphere(.6,0,.45,-.6,i,{sy:.7,seg:18,opacity:.35,roughness:.05});for(let s of[-1,1])n.box(.04,.03,1.6,s*.58,.45,0,i,be(i,1.5));return{w:1.25,d:2.05,h:.9,seat:.58,wall:!0}},logBed(n,e){let s=e.wood??"#8a5a36";n.box(1.35,.3,1.95,0,.05,0,s),Ha(n,1.35,1.95,.36,e.c??"#b3202c",{quilt:mt("checker",e.c??"#b3202c",e.c2??"#f2e8d8",3,4)});for(let r of[-1,1])for(let[a,o]of[[-1.95/2,1.2],[1.95/2,.75]])n.cyl(.08,.09,o,r*(1.35/2),0,a,s,{seg:8});for(let[r,a]of[[-1.95/2,1],[-1.95/2,.7],[1.95/2,.6]])n.cyl(.06,.06,1.35,0,a,r,Ue(s,-.05),{rz:Math.PI/2,center:!0,seg:8});return{w:1.35+.2,d:1.95+.2,h:1.25,seat:.6,wall:!0}},chaiseLongue(n,e){let s=e.c??"#d9a3b8",r=e.wood??we;n.box(1.8,.18,.75,0,.22,0,s,{round:.07}),n.cbox(.25,.6,.75,-1.8/2+.15,.55,0,s,{rz:-.25,round:.1}),n.cyl(.13,.13,.75+.02,-1.8/2+.05,.85,0,s,{rx:Math.PI/2,center:!0,seg:14}),n.box(1.8*.55,.38,.14,-1.8*.2,.38,-.75/2+.07,s,{round:.06}),n.box(1.8,.04,.75+.04,0,.18,0,r,e.wood?{}:fe);for(let a of[-1,1])for(let o of[-1,1])n.cbox(.05,.2,.05,a*(1.8/2-.08),.1,o*(.75/2-.06),r,{rz:a*.25,...e.wood?{}:fe});for(let a=0;a<6;a++)n.sphere(.02,-.3+a*.22,.41,0,Ue(s,-.15),{seg:6});return n.box(.35,.12,.3,-.55,.42,.05,e.c2??"#f6eef0",{round:.05}),{w:1.8,d:.75,h:1,seat:.42,wall:!0}},lacquerBench(n,e){let s=e.wood??"#1d1716",r=e.c??"#b3202c";n.box(1.7,.08,.7,0,.32,0,s,{roughness:.25});for(let a of[-1,1])n.box(.08,.32,.7-.1,a*(1.7/2-.1),0,0,s,{roughness:.25});n.box(1.7-.1,.07,.7-.1,0,.4,0,r,{round:.03}),n.box(1.7,.5,.07,0,.4,-.7/2+.04,s,{roughness:.25});for(let a=0;a<4;a++)n.box(.32,.36,.02,-.6+a*.4,.46,-.7/2+.085,e.c2??we,fe);return{w:1.7,d:.7,h:.95,seat:.47,wall:!0}},throne(n,e){let t=e.c??"#a33b2b",i=e.frame??we,s=e.frame?{}:fe,r=.9,a=.85;n.box(r,.42,a,0,0,0,i,s),n.box(r-.12,.1,a-.12,0,.42,.04,t,{round:.04}),n.box(r,1.5,.12,0,.42,-a/2+.06,i,s),n.box(r-.24,1.15,.03,0,.6,-a/2+.13,t);for(let o of[-1,1])n.box(.1,.32,a,o*(r/2-.05),.42,0,i,s),n.sphere(.08,o*(r/2-.05),.8,a/2-.05,i,s),n.cyl(0,.07,.2,o*(r/2-.08),1.92,-a/2+.06,i,{seg:8,...s});return e.crest==="shell"?qe(n,[[0,0],[.35,.05],[.42,.25],[0,.3]],"#f6eef6",{seg:12},0,1.75,-a/2+.05):n.sphere(.13,0,2,-a/2+.06,e.gem??"#2f6fb3",{roughness:.1,metalness:.4}),n.box(r+.2,.08,a+.25,0,0,.1,e.step??"#7a1f2a"),{w:r+.2,d:a+.25,h:2.1,seat:.52,up:1.3}},rootThrone(n,e){let t="#6b4a34";n.cyl(.45,.55,.45,0,0,0,t,{seg:10}),n.cyl(.42,.42,.03,0,.45,0,"#c9a477",{seg:16});for(let i=0;i<6;i++){let s=Math.PI+(i-2.5)*.35;n.cbox(.12,1.3-Math.abs(i-2.5)*.18,.12,Math.sin(s)*.38,.9-Math.abs(i-2.5)*.08,Math.cos(s)*.38,Ue(t,i%2*.05),{rz:Math.sin(s)*.15,rx:-.15})}for(let i=0;i<5;i++)n.cbox(.1,.08,.5,Math.cos(i*1.3)*.5,.04,Math.sin(i*1.3)*.5,t,{ry:-i*1.3});return ft(n,{seed:e.seed,rx:.4,ry:.15,palette:"lime",voxel:.08,flowers:"#f2c94c",flowerRate:.1},0,1.45,-.38),n.box(.6,.06,.6,0,.46,.04,"#5a9440",{round:.03}),{w:1.1,d:1.1,h:1.65,seat:.5,up:1.2}},sailPile(n,e){let t=Me(e.seed);for(let i=0;i<6;i++)n.cbox(1.4-i*.12,.12,.9-i*.05,(t()-.5)*.15,.06+i*.1,(t()-.5)*.1,i%2?"#efe4c8":"#e3d6b4",{ry:(t()-.5)*.4,round:.05});for(let i=0;i<4;i++)n.cyl(.25-i*.04,.25-i*.04,.05,.6,i*.05,.35,"#b89a6a",{seg:14});return{w:1.5,d:1,h:.7,seat:.66}},hidePile(n,e){let t=e.c??"#6b4a2e";for(let i=0;i<4;i++)n.cbox(1.5-i*.2,.15,1-i*.1,0,.08+i*.12,-i*.05,i%2?t:Ue(t,.08),{round:.07,ry:(i-1.5)*.15});n.cbox(1.4,.4,.3,0,.3,-.45,Ue(t,-.05),{round:.15});for(let i of[-1,1])n.cbox(.06,.06,.5,i*.55,.12,.45,"#efe6d0",{ry:i*.4,rx:.3});return{w:1.5,d:1.1,h:.6,seat:.5,wall:!0}},bleacher(n,e){let i=e.c??"#c0283a",s="#a8703f";for(let r=0;r<3;r++)n.box(1.7,.25,.32,0,r*.25,.3-r*.3,r%2?"#f6f2ea":i),n.box(1.7,.05,.34,0,(r+1)*.25,.3-r*.3,s);return n.box(1.7,.75,.32,0,0,-.6,i),{w:1.7,d:1.2,h:.8,seat:.55}},loungePod(n,e){let t=e.c??"#eef2f6";return qe(n,[[.2,0],[.8,.1],[.9,.45],[.75,.5],[0,.4]],t,{seg:26}),n.cyl(.7,.7,.08,0,.42,0,e.c2??"#3fb6d9",{seg:24}),n.cbox(1.5,.5,.18,0,.7,-.55,t,{round:.1,rx:-.2}),n.cyl(.85,.85,.02,0,.02,0,"#3fb6d9",be("#3fb6d9",1.2)),{w:1.8,d:1.7,h:1,seat:.5}},deckchair(n,e){let t=e.c??"#e8492c",i="#c9a477";for(let s of[-1,1])n.cbox(.05,.05,1.3,s*.3,.45,0,i,{rx:.55}),n.cbox(.05,.05,.8,s*.3,.25,.3,i,{rx:-.6});return n.cbox(.6,.02,1.2,0,.48,-.02,t,{rx:.55,material:mt("stripes",t,"#f6f2ea",3,1)}),n.box(.6,.05,.45,0,.32,.3,t),{w:.75,d:1.2,h:.95,seat:.36,up:1.5}},beanbag(n,e){return n.sphere(.75,0,.35,0,e.c??"#ff4d8d",{sy:.5,seg:20}),n.sphere(.45,0,.6,-.35,Ue(e.c??"#ff4d8d",-.05),{sy:.7,seg:16}),{w:1.5,d:1.5,h:.75,seat:.66}},log(n,e){let t=Me(e.seed),i=1.9,s=.28,r=e.c??"#5e4230";n.cyl(s,s*1.05,i,0,s,0,r,{rz:Math.PI/2,center:!0,seg:12});for(let a of[-1,1])n.cyl(s*.85,s*.85,.02,a*i/2,s,0,"#c9a477",{rz:Math.PI/2,center:!0,seg:12});n.box(i*.7,.04,.3,0,s*1.9,0,"#c9a477"),ft(n,{seed:e.seed,rx:.3,ry:.08,palette:"lime",voxel:.06},-.6,s*1.8,-.05);for(let a=0;a<3;a++){let o=.3+t()*.5;n.cyl(.015,.02,.07,o,s*1.7,s*.6,"#efe6d0",{seg:5}),n.sphere(.05,o,s*1.7+.08,s*.6,"#c0392b",{sy:.5,seg:8})}return{w:i,d:.65,h:.65,seat:s*1.95}},coralBench(n,e){let t=Me(e.seed);n.cbox(1.6,.35,.7,0,.2,0,"#8ea29e",{round:.15}),n.box(1.4,.06,.55,0,.36,0,e.c??"#f6b0b8",{round:.03});for(let i of[-1,1])for(let s=0;s<5;s++){let r=t()*6.28;n.cbox(.06,.4+t()*.3,.06,i*.75+Math.cos(r)*.08,.5+t()*.2,Math.sin(r)*.15,ot(t,["#f08a7e","#e8743a","#b56ad8"]),{rz:Math.cos(r)*.5,rx:Math.sin(r)*.5})}return{w:1.8,d:.75,h:.9,seat:.42}},pew(n,e){let i=e.wood??"#8a5a36";n.box(1.7,.08,.5,0,.42,0,i),n.box(1.7,.75,.08,0,.42,-.22,i);for(let s of[-1,1])n.box(.08,.95,.55,s*(1.7/2-.04),0,0,Ue(i,-.08));return e.c&&n.box(1.7-.2,.06,.42,0,.5,.03,e.c,{round:.03}),{w:1.7,d:.6,h:1.2,seat:.52,wall:!0}},wingback(n,e){let t=e.c??"#2f5a46",i=e.wood??"#4a2e1e";n.box(.85,.38,.8,0,.1,0,t,{round:.06}),n.box(.8,.85,.16,0,.45,-.32,t,{round:.07});for(let s of[-1,1])n.cbox(.12,.6,.45,s*.38,.85,-.18,t,{round:.05,ry:s*.25}),n.box(.14,.25,.75,s*.36,.48,.02,t,{round:.06});return n.box(.58,.1,.55,0,.48,.1,Ue(t,.06),{round:.04}),mi(n,.75,.7,.12,i,.03),{w:.9,d:.85,h:1.3,seat:.56,up:1.5}},bergere(n,e){let t=e.c??"#f2c6d6",i=e.wood??we,s=e.wood?{}:fe;n.box(.8,.12,.75,0,.3,0,i,s),n.box(.72,.12,.68,0,.42,.02,t,{round:.05}),n.cyl(.4,.4,.7,0,.42,-.25,i,{seg:18,t0:Math.PI*.75,tl:Math.PI*.5,...s}),n.cbox(.62,.55,.06,0,.75,-.3,t,{round:.05});for(let r of[-1,1])n.box(.06,.25,.6,r*.37,.42,0,i,s),n.cbox(.05,.32,.05,r*.34,.16,.3,i,{rx:-.25,...s}),n.cbox(.05,.32,.05,r*.34,.16,-.3,i,{rx:.25,...s});return n.sphere(.06,0,1.12,-.3,i,s),{w:.85,d:.8,h:1.2,seat:.54,up:1.55}},zabuton(n,e){n.box(.85,.1,.85,0,0,0,e.c??"#7a2a3a",{round:.05}),n.sphere(.04,0,.1,0,e.c2??we,{seg:6}),n.box(.6,.08,.14,0,.3,-.4,"#1d1716",{roughness:.3});for(let t of[-1,1])n.box(.06,.3,.1,t*.25,0,-.4,"#1d1716");return{w:.9,d:.95,h:.4,seat:.12,up:1.7}},rockSeat(n,e){let t=e.c??"#8e8a82";return n.sphere(.5,0,.18,0,t,{sy:.55,seg:10,flat:!0}),n.cyl(.38,.4,.06,0,.36,0,Ue(t,.05),{seg:9}),e.moss&&ft(n,{seed:e.seed,rx:.3,ry:.06,palette:"kelp",voxel:.06},.15,.36,-.15),{w:1,d:1,h:.45,seat:.42,up:1.6}},woodArmchair(n,e){let t=e.wood??"#7a5434",i=e.c??"#a33b2b";n.box(.75,.06,.7,0,.42,0,t),Ei(n,.72,.66,.42,t,.06),n.box(.72,.07,.05,0,1,-.32,t);for(let s=0;s<5;s++)n.box(.04,.52,.03,-.24+s*.12,.48,-.32,t);for(let s of[-1,1])n.box(.08,.05,.72,s*.36,.7,0,t),n.box(.04,.24,.04,s*.36,.46,.3,t);return n.box(.6,.07,.55,0,.48,.03,i,{round:.03}),{w:.8,d:.75,h:1.05,seat:.55,up:1.6}},rockingChair(n,e){let t=e.wood??"#8a5a36";for(let i of[-1,1])n.cyl(.6,.6,.05,i*.3,.6,.05,t,{rz:Math.PI/2,center:!0,seg:20,t0:Math.PI*.82,tl:Math.PI*.36}),n.box(.04,.4,.04,i*.3,.04,.22,t),n.cbox(.04,.85,.04,i*.3,.75,-.3,t,{rx:-.2}),n.box(.05,.04,.55,i*.3,.68,0,t);n.box(.62,.05,.55,0,.42,0,t);for(let i=0;i<5;i++)n.cbox(.04,.6,.02,-.2+i*.1,.8,-.32,t,{rx:-.2});return n.box(.5,.05,.45,0,.47,.02,e.c??"#a33b2b",{material:mt("checker",e.c??"#a33b2b","#efe6d0",2,2)}),{w:.7,d:.9,h:1.2,seat:.52,up:1.5}},pilotSeat(n,e){let t=e.c??"#33405a";n.cyl(.25,.32,.08,0,0,0,"#9aa6b4",{seg:14,metalness:.6}),n.cyl(.06,.06,.35,0,.08,0,"#9aa6b4",{metalness:.6}),n.box(.7,.14,.65,0,.42,0,t,{round:.06}),n.cbox(.65,.85,.14,0,.95,-.3,t,{round:.07,rx:-.12});for(let i of[-1,1])n.box(.1,.08,.5,i*.38,.65,.05,"#cfd6de",{round:.03}),n.box(.04,.6,.02,i*.18,.6,-.23,"#ff9a3a",{rx:-.12});return n.box(.12,.06,.12,.38,.73,.25,"#ff4a4a",be("#ff4a4a",1)),{w:.85,d:.75,h:1.4,seat:.56,up:1.5}},planeSeat(n,e){let t=e.c??"#2f5d8a";n.box(.6,.14,.55,0,.38,0,t,{round:.05}),n.cbox(.58,.85,.14,0,.9,-.28,t,{round:.06,rx:-.15}),n.box(.45,.2,.1,0,1.25,-.36,"#f6f2ea",{round:.04});for(let i of[-1,1])n.box(.06,.06,.5,i*.33,.6,0,"#9aa6b4",{metalness:.4});return Ei(n,.5,.45,.38,"#6a7480",.04),{w:.7,d:.65,h:1.4,seat:.52,up:1.6}},curule(n,e){let t=e.c??we;for(let i of[-1,1])for(let s of[.7,-.7])n.cbox(.05,.6,.05,0,.25,i*.25,t,{rz:s,...fe});n.box(.7,.06,.55,0,.45,0,t,fe),n.box(.62,.08,.5,0,.5,0,e.c2??"#7a1f2a",{round:.03});for(let i of[-1,1])n.sphere(.05,i*.35,.5,0,t,fe);return{w:.75,d:.6,h:.6,seat:.58,up:1.7}},stool(n,e){let t=e.c??"#a8703f",i=e.leg??Ue(t,-.12),s=e.h??.45;if(e.kind==="drum")qe(n,[[.2,0],[.26,.1],[.28,s*.5],[.26,s-.08],[.2,s],[0,s]],t,{seg:18}),n.cyl(.27,.27,.05,0,s*.45,0,e.c2??"#2f5d8a",{seg:18});else if(e.kind==="three"){n.cyl(.24,.24,.07,0,s-.07,0,t,{seg:14});for(let r=0;r<3;r++){let a=r/3*Math.PI*2;n.cbox(.05,s,.05,Math.cos(a)*.14,s/2-.02,Math.sin(a)*.14,i,{rz:Math.cos(a)*.2,rx:-Math.sin(a)*.2})}}else e.kind==="bar"?(n.cyl(.22,.22,.08,0,s-.08,0,t,{seg:16}),n.cyl(.04,.05,s-.08,0,0,0,i,{seg:8,metalness:.5}),n.cyl(.2,.2,.03,0,s*.35,0,i,{seg:14,metalness:.5}),n.cyl(.22,.24,.04,0,0,0,i,{seg:14,metalness:.5})):(n.box(.45,.07,.45,0,s-.07,0,t),Ei(n,.4,.4,s-.07,i,.05));return e.cushion&&n.box(.36,.06,.36,0,s,0,e.cushion,{round:.03}),{w:.55,d:.55,h:s,seat:s+(e.cushion?.05:0),up:1.9}},barrel(n,e){let t=e.h??.75,i=e.r??.32,s=e.c??"#8a5a36";qe(n,[[i*.85,0],[i,t*.25],[i*1.08,t*.5],[i,t*.75],[i*.85,t],[0,t]],s,{seg:16});for(let r of[.12,.3,.7,.88])n.cyl(i*(r>.2&&r<.8?1.08:.92),i*(r>.2&&r<.8?1.08:.92),.04,0,t*r-.02,0,"#3a3a3e",{seg:16,metalness:.5});return e.liquid&&n.cyl(i*.8,i*.8,.01,0,t-.02,0,e.liquid,{seg:16,roughness:.1}),{w:i*2.2,d:i*2.2,h:t,seat:t,up:1.8}},bistro(n,e){let t=e.c??"#2a2523";n.cyl(.22,.22,.04,0,.45,0,e.seat??"#c9a477",{seg:16});for(let i=0;i<4;i++){let s=i/4*Math.PI*2+.78;n.cbox(.03,.47,.03,Math.cos(s)*.16,.22,Math.sin(s)*.16,t,{rz:Math.cos(s)*.12,rx:-Math.sin(s)*.12})}n.cyl(.2,.2,.03,0,.75,-.08,t,{seg:14,t0:Math.PI*.6,tl:Math.PI*.8});for(let i of[-1,1])n.cbox(.03,.45,.03,i*.15,.7,-.17,t,{rx:-.1});return n.cyl(.16,.16,.025,0,.18,0,t,{seg:14}),{w:.5,d:.5,h:.95,seat:.5,up:1.9}},gildedChair(n,e){let t=we,i=e.c??"#f2c6d6";n.box(.5,.06,.48,0,.42,0,t,fe),n.box(.44,.06,.42,0,.48,.02,i,{round:.03});for(let s of[-1,1])for(let r of[-1,1])n.cbox(.04,.44,.04,s*.21,.2,r*.2,t,{rx:r*.12,...fe});n.cyl(.2,.2,.04,0,.88,-.22,t,{rx:Math.PI/2,center:!0,seg:18,...fe}),n.cyl(.16,.16,.05,0,.88,-.22,i,{rx:Math.PI/2,center:!0,seg:18});for(let s of[-1,1])n.box(.04,.3,.04,s*.12,.48,-.22,t,fe);return{w:.55,d:.52,h:1.1,seat:.53,up:1.8}},stump(n,e){let t=e.r??.32,i=e.h??.45;n.cyl(t,t*1.15,i,0,0,0,"#6b4a34",{seg:11}),n.cyl(t*.95,t*.95,.02,0,i,0,"#d9b47a",{seg:14}),n.cyl(t*.5,t*.5,.021,0,i,0,"#c49a62",{seg:14});for(let s=0;s<4;s++)n.cbox(.08,.06,.28,Math.cos(s*1.6)*t,.03,Math.sin(s*1.6)*t,"#5e4230",{ry:-s*1.6});return e.moss&&ft(n,{seed:e.seed,rx:t*.6,ry:.06,palette:"lime",voxel:.05},-t*.4,i,t*.2),{w:t*2.4,d:t*2.4,h:i,seat:i+.01,up:1.9}},toadstoolSeat(n,e){n.cyl(.13,.18,.32,0,0,0,"#f2ead8",{seg:10}),qe(n,[[0,0],[.38,0],[.4,.06],[.3,.14],[0,.17]],e.c??"#c0392b",{seg:18},0,.3,0);for(let t=0;t<6;t++)n.sphere(.035,Math.cos(t)*.24,.42,Math.sin(t)*.24,"#fbf6ea",{sy:.4,seg:6});return{w:.8,d:.8,h:.47,seat:.46,up:1.9}},magStool(n,e){return n.cyl(.25,.25,.06,0,0,0,"#5a6474",{seg:18,metalness:.5}),n.cyl(.24,.24,.02,0,.06,0,"#3fb6d9",be("#3fb6d9",1.4)),n.cyl(.22,.22,.1,0,.32,0,e.c??"#eef2f6",{seg:18}),n.cyl(.04,.04,.26,0,.06,0,"#9aa6b4",{metalness:.7}),{w:.55,d:.55,h:.42,seat:.43,up:1.9}},pouf(n,e){n.cyl(.32,.34,.35,0,0,0,e.c??"#a8703f",{seg:16}),n.cyl(.3,.3,.03,0,.35,0,Ue(e.c??"#a8703f",.1),{seg:16});for(let t=0;t<8;t++)n.box(.02,.3,.01,Math.cos(t/8*6.28)*.335,.03,Math.sin(t/8*6.28)*.335,e.c2??"#f2c94c",{ry:-(t/8)*6.28});return{w:.7,d:.7,h:.38,seat:.38,up:1.9}},stoneBench(n,e){let t=e.c??"#a9a296",i=1.6;n.box(i,.12,.5,0,.36,0,t);for(let s of[-1,1])n.box(.3,.36,.42,s*(i/2-.25),0,0,Ue(t,-.08));return e.moss&&ft(n,{seed:e.seed,rx:.25,ry:.05,palette:"lime",voxel:.05},i/2-.3,.48,-.1),{w:i,d:.55,h:.5,seat:.48}},ray(n,e){let t=e.c??"#7a8a96";mn(n,[[0,-.75],[.8,0],[0,.55],[-.8,0]],.12,t,.08,{bevel:.05}),n.cbox(.05,.03,.9,0,.12,.95,Ue(t,-.1),{rx:.05});for(let i of[-1,1])n.sphere(.04,i*.15,.25,-.3,"#1d1b1c",{seg:6});return n.box(.6,.03,.4,0,.25,0,Ue(t,.12),{round:.01}),{w:1.7,d:1.6,h:.3,seat:.28}},rowBench(n,e){let t="#8a5a36";n.box(1.6,.07,.4,0,.42,0,t);for(let i of[-1,1])n.box(.1,.42,.35,i*.65,0,0,Ue(t,-.1));for(let i of[-1,1])n.cbox(.05,.05,1.5,i*.35,.47,.25,"#c9a477",{ry:i*.25}),n.cbox(.14,.03,.35,i*.35+i*.18,.47,.95,"#c9a477",{ry:i*.25});return{w:1.7,d:1.4,h:.55,seat:.5}},hayBale(n,e){let t=e.c??"#e2c26a";n.box(1.3,.5,.7,0,0,0,t,{round:.05,material:mt("straw",t,Ue(t,-.15),1,1)});for(let i of[-.35,.35])n.box(.03,.52,.72,i,0,0,"#8a6a3a");return{w:1.3,d:.7,h:.5,seat:.52}},sleigh(n,e){let t=e.c??"#b3202c",i=e.runner??we,s=1.7;for(let r of[-1,1])n.box(.06,.04,s,r*.4,0,0,i,fe),n.cyl(.18,.18,.04,r*.4,.18,s/2,i,{rz:Math.PI/2,center:!0,seg:14,t0:0,tl:Math.PI,...fe});if(n.box(.9,.35,s-.3,0,.12,-.1,t,{round:.08}),n.box(.9,.55,.15,0,.3,-s/2+.15,t,{round:.06}),n.box(.75,.08,1,0,.47,0,e.c2??"#2f5a3a",{round:.04}),e.gifts)for(let r=0;r<3;r++)n.box(.25,.22,.25,-.25+r*.25,.47,-.55,["#2f6f7e","#f2c94c","#3f7a4a"][r],{ry:r*.3});return{w:.95,d:s,h:.85,seat:.55,up:1.3}},gymBench(n,e){n.box(.4,.12,1.5,0,.4,0,e.c??"#33405a",{round:.05});for(let t of[-1,1])n.box(.3,.4,.08,0,0,t*.6,"#9aa6b4",{metalness:.6});for(let t of[-1,1])n.box(.05,.9,.05,t*.45,0,-.65,"#9aa6b4",{metalness:.6}),n.cyl(.18,.18,.06,t*.62,.9,-.65,"#2a2e36",{rz:Math.PI/2,center:!0,seg:16});return n.cyl(.02,.02,1.4,0,.9,-.65,"#cfd6de",{rz:Math.PI/2,center:!0,metalness:.8}),{w:1.4,d:1.6,h:1,seat:.52}},cushionPile(n,e){let t=Me(e.seed),i=["#ff4d8d","#5aa9e6","#f2c94c","#7cc66a","#b06ad8"];for(let s=0;s<7;s++)n.cbox(.6,.15,.6,(t()-.5)*.8,.08+Math.floor(s/3)*.14,(t()-.5)*.5,i[s%i.length],{round:.07,ry:t()*3});return{w:1.3,d:1,h:.45,seat:.42}},tatami(n,e){for(let[t,i,s,r]of[[-.45,-.45,.9,.9],[.45,-.45,.9,.9],[0,.45,1.8,.9]]){n.box(s-.02,.025,r-.02,t,0,i,e.c??"#d8cf98",{jitter:0,material:mt("lines",e.c??"#d8cf98",Ue(e.c??"#d8cf98",-.06),1,4)});for(let a of[-1,1])n.box(s-.02,.03,.05,t,0,i+a*(r/2-.035),e.c2??"#2f3a2a",{jitter:0})}return{w:1.8,d:1.8,h:.03,seat:.03,up:1}},net(n,e){let t=e.c??"#8a7a5a";for(let i=0;i<9;i++)n.box(1.7,.01,.02,0,0,-.8+i*.2,t,{jitter:0,shadow:!1,ry:i%2*.03}),n.box(.02,.012,1.7,-.8+i*.2,0,0,t,{jitter:0,shadow:!1,ry:i%2*.03});for(let i=0;i<4;i++)n.sphere(.07,-.75+i*.5,.05,.85,i%2?"#e8743a":"#f6f2ea",{seg:8});return{w:1.8,d:1.8,h:.04,seat:.03,up:1}},pelt(n,e){let t=e.c??"#8a6a4a",i=[[0,-.95],[.25,-.75],[.6,-.85],[.5,-.4],[.62,.1],[.45,.55],[.65,.85],[.2,.7],[0,.9],[-.2,.7],[-.65,.85],[-.45,.55],[-.62,.1],[-.5,-.4],[-.6,-.85],[-.25,-.75]];if(mn(n,i,.03,t,0,{bevel:.015}),mn(n,i.map(([s,r])=>[s*.55,r*.6]),.02,Ue(t,.1),.03),e.head){n.sphere(.22,0,.12,-1.05,t,{sy:.6,seg:12}),n.sphere(.1,0,.1,-1.25,Ue(t,.15),{seg:8});for(let s of[-1,1])n.sphere(.06,s*.15,.2,-.95,t,{seg:6})}return{w:1.4,d:2,h:.05,seat:.04,up:1}},mosaic(n,e){let t=e.cols??["#efe6d0","#8a2a2a","#2f5e8c","#d9b45a"];n.box(1.75,.02,1.75,0,0,0,t[0],{jitter:0});for(let i=0;i<7;i++)for(let s=0;s<7;s++){let r=Math.max(Math.abs(i-3),Math.abs(s-3));n.box(.2,.025,.2,(i-3)*.23,0,(s-3)*.23,t[1+r%3],{jitter:0,shadow:!1})}return{w:1.75,d:1.75,h:.03,seat:.03,up:1}},reedMat(n,e){let t=e.c??"#d9c48a";n.box(1.6,.02,1.2,0,0,0,t,{jitter:0,material:mt("lines",t,Ue(t,-.1),6,1)});for(let i of[-1,1])n.box(1.62,.025,.08,0,0,i*.6,e.c2??"#2f5e8c",{jitter:0});return{w:1.6,d:1.25,h:.03,seat:.03,up:1}},lightPanel(n,e){let t=e.c??"#3fb6d9";n.box(1.6,.03,1.6,0,0,0,"#2a2e36",{jitter:0});for(let i=0;i<4;i++)for(let s=0;s<4;s++)n.box(.34,.035,.34,(i-1.5)*.38,0,(s-1.5)*.38,(i+s)%2?t:Ue(t,-.15),{...be(t,(i+s)%2?1.2:.4),jitter:0});return{w:1.6,d:1.6,h:.04,seat:.04,up:1}},seaweedMat(n,e){let t=Me(e.seed);n.box(1.6,.02,1.6,0,0,0,"#3f6a32",{jitter:0});for(let i=0;i<26;i++)n.cbox(.06,.02,.5+t()*.4,(t()-.5)*1.5,.02,(t()-.5)*1.4,ot(t,["#5a8a3a","#7aa84a","#2a4a2a"]),{ry:t()*3,jitter:0,shadow:!1});return{w:1.6,d:1.6,h:.04,seat:.04,up:1}},mossRug(n,e){return n.cyl(.85,.88,.03,0,0,0,"#5a8a3a",{seg:14,jitter:0}),ft(n,{seed:e.seed,rx:.75,ry:.04,palette:"lime",voxel:.07,flowers:"#f4f1ff",flowerRate:.08},0,.02,0),{w:1.75,d:1.75,h:.08,seat:.07,up:1}},playMat(n,e){let t=e.cols??["#ff4d8d","#5aa9e6","#f2c94c","#7cc66a"];for(let i=0;i<4;i++)for(let s=0;s<4;s++)n.box(.42,.04,.42,(i-1.5)*.43,0,(s-1.5)*.43,t[(i+s*2)%t.length],{jitter:0,round:.01});return{w:1.75,d:1.75,h:.04,seat:.04,up:1}},roundRug(n,e){let t=e.cols??["#f6f2ea","#f2c94c","#7cc66a"];for(let i=0;i<3;i++)n.cyl(.85-i*.25,.85-i*.25,.015+i*.006,0,0,0,t[i],{seg:28,jitter:0,shadow:!1});if(e.petals)for(let i=0;i<10;i++)n.cbox(.22,.03,.09,Math.cos(i*.628)*.48,.006,Math.sin(i*.628)*.48,e.petals,{ry:-i*.628,jitter:0,shadow:!1});return{w:1.7,d:1.7,h:.03,seat:.03,up:1}}};var sy=["#e8492c","#e0a94a","#7cae4f","#f2c94c","#8e3b7a"];function Ga(n,e,t,i,s){switch(e){case"tea":qe(n,[[0,0],[.07,.01],[.09,.08],[.06,.13],[.02,.16],[0,.17]],"#f6f2ea",{seg:12},0,t,0),n.cbox(.1,.02,.02,.1,t+.1,0,"#f6f2ea",{rz:.6});for(let r=0;r<3;r++){let a=r*2.1+.4;n.cyl(.06,.04,.06,Math.cos(a)*i*.6,t,Math.sin(a)*i*.6,"#f6f2ea",{seg:10})}n.cyl(.13,.13,.03,-i*.4,t,i*.3,we,fe);for(let r=0;r<4;r++)n.sphere(.035,-i*.4+Math.cos(r*1.6)*.06,t+.05,i*.3+Math.sin(r*1.6)*.06,"#e0b47e",{sy:.6,seg:6});break;case"feast":n.sphere(.2,0,t+.06,0,"#b8662a",{sy:.6,seg:14}),n.cyl(.25,.22,.03,0,t,0,"#e8e2d2",{seg:16});for(let r=-2;r<=2;r++)r&&(n.cyl(.11,.09,.02,r*i*.35,t,i*.55,"#f6f2ea",{seg:12}),n.cyl(.11,.09,.02,r*i*.35,t,-i*.55,"#f6f2ea",{seg:12}),n.cyl(.03,.025,.12,r*i*.35+.12,t,i*.35,"#c9a24a",fe));for(let r of[-1,1])n.cyl(.04,.05,.08,r*i*.8,t,0,we,fe),n.cyl(.018,.018,.2,r*i*.8,t+.08,0,"#f6f2ea",{seg:6}),n.sphere(.03,r*i*.8,t+.31,0,"#ffcf7a",be("#ffb340",1.5));break;case"fruit":n.sphere(.2,0,t+.04,0,"#efe6c8",{sy:.45,seg:16});for(let r=0;r<5;r++)n.sphere(.065,Math.cos(r*1.3)*.08,t+.1+r%2*.03,Math.sin(r*1.3)*.08,sy[r],{seg:8});for(let r=0;r<3;r++)n.sphere(.03,.3+r%2*.04,t+.03,.1+r*.04,"#5a2a6a",{seg:6});break;case"cake":n.cyl(.22,.22,.02,0,t,0,"#f6f2ea",{seg:18}),n.cyl(.17,.17,.14,0,t+.02,0,"#f6d3e0",{seg:18}),n.cyl(.11,.11,.1,0,t+.16,0,"#f6f2ea",{seg:18});for(let r=0;r<5;r++){let a=r*1.256;n.cyl(.008,.008,.08,Math.cos(a)*.07,t+.26,Math.sin(a)*.07,["#5aa9e6","#ff4d8d","#f2c94c"][r%3],{seg:4}),n.sphere(.014,Math.cos(a)*.07,t+.35,Math.sin(a)*.07,"#ffcf7a",be("#ffb340",1.6))}break;case"candle":n.cyl(.05,.06,.06,0,t,0,we,fe),n.cyl(.02,.02,.18,0,t+.06,0,"#f6f2ea",{seg:6}),n.sphere(.028,0,t+.27,0,"#ffcf7a",be("#ffb340",1.6));for(let r of[-1,1])n.cyl(.09,.08,.015,r*i*.5,t,0,"#f6f2ea",{seg:12});qe(n,[[0,0],[.03,0],[.035,.1],[.05,.12],[0,.12]],"#e8eef4",{seg:10,opacity:.6},i*.3,t,i*.35);for(let r=0;r<3;r++)n.sphere(.035,-i*.35+r*.05,t+.04,-i*.3,"#c0283a",{seg:6});break;case"cards":for(let r=0;r<6;r++)n.cbox(.06,.004,.09,(s()-.5)*i,t+.002,(s()-.5)*i,"#f6f2ea",{ry:s()*3,jitter:0});for(let r=0;r<5;r++)for(let a=0;a<3;a++)n.cyl(.025,.025,.012,i*.4+r%2*.06,t+a*.012,-i*.3+r*.06,["#c0283a","#2f5d8a","#f6f2ea","#1d1b1c"][(r+a)%4],{seg:8});n.cyl(.04,.035,.12,-i*.4,t,i*.3,"#8a5a2a",{seg:8,opacity:.7});break;case"sweets":for(let r=0;r<8;r++)n.sphere(.04,(s()-.5)*i*1.2,t+.03,(s()-.5)*i*1.2,ot(s,["#ff4d8d","#f2c94c","#7cc66a","#5aa9e6","#ff7a1a"]),{seg:6});n.cyl(.2,.16,.06,0,t,0,"#ff7518",{seg:12});break;case"fondue":n.cyl(.13,.1,.12,0,t+.08,0,"#b3202c",{seg:14}),n.cyl(.11,.11,.01,0,t+.2,0,"#f2d46a",{seg:14}),n.cyl(.08,.1,.08,0,t,0,"#3a3a3e",{seg:10});for(let r=0;r<5;r++){let a=r*1.256;n.cbox(.01,.01,.3,Math.cos(a)*.15,t+.25,Math.sin(a)*.15,"#9aa6b4",{ry:-a+Math.PI/2,rx:-.6})}for(let r=0;r<6;r++)n.box(.04,.04,.04,(s()-.5)*i,t,i*.5+(s()-.5)*.1,"#e0b47e");break;case"dumplings":for(let r=0;r<3;r++)for(let a=0;a<2;a++)if(n.cyl(.13,.13,.08,(r-1)*.3,t+a*.08,0,"#c9a477",{seg:14}),a)for(let o=0;o<4;o++)n.sphere(.035,(r-1)*.3+Math.cos(o*1.6)*.06,t+.17,Math.sin(o*1.6)*.06,"#f6efe0",{seg:6});break;case"party":Ga(n,"cake",t,i,s);for(let r=0;r<6;r++){let a=r*1.05;n.cyl(.04,.03,.08,Math.cos(a)*i*.75,t,Math.sin(a)*i*.75,ot(s,["#ff4d8d","#5aa9e6","#f2c94c"]),{seg:8})}for(let r=0;r<2;r++)n.cyl(0,.06,.15,(r?1:-1)*i*.5,t,i*.4,["#7cc66a","#b06ad8"][r],{seg:10});break;default:}}var Pu={roundTable(n,e){let t=e.r??.6,i=e.h??.72,s=e.c??"#8a5a36",r=Me(e.seed);return n.cyl(t,t,.05,0,i-.05,0,s,{seg:26,...e.marble?{roughness:.25}:{}}),e.cloth&&n.cyl(t+.04,t+.08,.28,0,i-.3,0,e.cloth,{seg:26}),e.legs===4?mi(n,t*1.3,t*1.3,i-.05,e.leg??Ue(s,-.1),.04):(n.cyl(.05,.07,i-.05,0,0,0,e.leg??Ue(s,-.1),{seg:10}),n.cyl(t*.45,t*.5,.04,0,0,0,e.leg??Ue(s,-.1),{seg:16})),Ga(n,e.items,i,t,r),{w:t*2.1,d:t*2.1,h:i+.3,up:e.up??1.3,spots:[[t*.55,i,0],[-t*.55,i,0]]}},longTable(n,e){let r=e.c??"#5a3420",a=Me(e.seed);n.box(1.9,.07,.9,0,.75-.07,0,r),e.cloth&&n.box(1.9*.95,.01,.9+.06,0,.75,0,e.cloth);for(let o of[-1,1])n.box(.08,.75-.07,.9-.2,o*(1.9/2-.2),0,0,Ue(r,-.1)),n.box(.3,.06,.9-.15,o*(1.9/2-.2),0,0,Ue(r,-.1));return Ga(n,e.items??"feast",.75+.01,1.9/2,a),{w:1.9,d:.9,h:.75+.35,up:1.2}},lowTable(n,e){let r=e.c??"#1d1716";n.box(1.3,.06,.85,0,.35-.06,0,r,{roughness:.25}),Ei(n,1.3-.06,.85-.06,.35-.06,r,.07),n.box(1.3-.1,.005,.85-.1,0,.35,0,Ue(r,.05),{roughness:.2}),n.box(.4,.02,.25,.25,.35,.1,"#7a5434"),qe(n,[[0,0],[.09,.02],[.1,.08],[.06,.13],[0,.14]],"#3a3a3e",{seg:12},-.3,.35,0);for(let a=0;a<3;a++)n.cyl(.035,.03,.06,.15+a*.1,.35+.02,.1,"#e8e2d2",{seg:10});return n.cyl(.12,.1,.03,-.3,.35,.25,"#b3202c",{seg:14}),{w:1.3,d:.85,h:.35+.15,up:1.5,spots:[[.3,.35,-.2]]}},lazySusan(n,e){let s=e.c??"#7a1018";n.cyl(.6,.6,.06,0,.72-.06,0,s,{seg:26,roughness:.3}),n.cyl(.6*.45,.6*.45,.04,0,.72,0,we,{seg:22,...fe}),mi(n,.6*1.2,.6*1.2,.72-.06,"#1d1716",.04);for(let r=0;r<5;r++){let a=r*1.256;n.cyl(.1,.08,.04,Math.cos(a)*.17,.72+.04,Math.sin(a)*.17,"#f6f2ea",{seg:12}),n.sphere(.05,Math.cos(a)*.17,.72+.09,Math.sin(a)*.17,ot(Me(e.seed+r),["#e0a94a","#7cae4f","#c0602a"]),{sy:.6,seg:8})}n.cyl(.07,.06,.14,0,.72+.04,0,"#f6f2ea",{seg:12});for(let r=0;r<6;r++){let a=r*1.05+.5;n.cyl(.08,.06,.03,Math.cos(a)*.6*.75,.72,Math.sin(a)*.6*.75,"#f6f2ea",{seg:10})}return{w:.6*2.1,d:.6*2.1,h:.72+.2,up:1.3}},altar(n,e){let t=e.c??"#d9c48a";n.box(1.3,.75,.7,0,0,0,t),n.box(1.4,.08,.8,0,.75,0,Ue(t,.08));for(let i=0;i<4;i++)n.box(.22,.4,.01,-.45+i*.3,.2,.355,["#2f5e8c","#b8862b","#a33b2b","#3f7a4a"][i]);Ga(n,"fruit",.83,.5,Me(e.seed));for(let i of[-1,1])qe(n,[[0,0],[.06,0],[.09,.15],[.05,.28],[.06,.32],[0,.32]],"#b8862b",{seg:10},i*.5,.83,-.15);return{w:1.4,d:.8,h:1.2,up:1.3,wall:!0}},mapTable(n,e){let r="#6b4a34";n.box(1.4,.07,.9,0,.75-.07,0,r);for(let a of[-1,1])n.cbox(.1,.75,.1,a*(1.4/2-.15),.75/2-.05,0,r,{rz:a*.15});return n.box(1.1,.008,.7,0,.75,0,"#e8d8a8",{material:mt("plain","#e8d8a8","#c9a477",1,1)}),n.cbox(.06,.012,.06,.15,.75+.01,.05,"#c0283a",{ry:.78}),n.cbox(.6,.008,.01,0,.75+.01,.05,"#c0283a",{ry:.4}),n.cyl(.08,.08,.03,-.38,.75,-.2,we,fe),n.cyl(.03,.035,.4,.42,.75,-.2,"#c9a24a",{rz:Math.PI/2,center:!0,...fe}),n.cyl(.05,.06,.08,.45,.75,.25,"#3a3a3e",{seg:8}),n.cyl(.02,.02,.15,.45,.75+.08,.25,"#f6f2ea"),{w:1.4,d:.9,h:.75+.25,up:1.25,spots:[[-.4,.75,.25]]}},pokerTable(n,e){if(n.cyl(.65,.65,.08,0,.72-.08,0,"#6b4a34",{seg:8}),n.cyl(.65-.08,.65-.08,.01,0,.72,0,e.felt??"#2f6a3a",{seg:8}),n.cyl(.06,.08,.72-.08,0,0,0,"#4a2e1e",{seg:8}),n.cyl(.35,.4,.05,0,0,0,"#4a2e1e",{seg:8}),e.wheel){n.cyl(.22,.22,.06,0,.72,0,"#2a2220",{seg:24});for(let s=0;s<12;s++)n.cbox(.16,.012,.04,Math.cos(s*.52)*.12,.72+.065,Math.sin(s*.52)*.12,s%2?"#c0283a":"#1d1b1c",{ry:-s*.52,jitter:0});n.cyl(.03,.03,.06,0,.72+.06,0,we,fe)}return Ga(n,"cards",.72+.01,.65,Me(e.seed)),{w:.65*2,d:.65*2,h:.72+.15,up:1.3}},grindStone(n,e){n.sphere(.65,0,.12,0,"#8e8a82",{sy:.45,seg:10,flat:!0}),n.cyl(.5,.55,.05,0,.38,0,"#a09682",{seg:9}),n.sphere(.12,.15,.48,.05,"#6e665a",{sy:.6,seg:8});for(let t=0;t<12;t++)n.sphere(.02,-.15+t%4*.05,.43,-.1+Math.floor(t/4)*.05,"#e8d8a8",{seg:4});return{w:1.3,d:1.3,h:.55,up:1.4}},holoConsole(n,e){let t=e.c??"#3fb6d9";n.cyl(.55,.65,.75,0,0,0,"#cfd6de",{seg:20,metalness:.4}),n.cyl(.5,.5,.02,0,.75,0,"#1b2230",{seg:20}),n.cyl(.4,.4,.01,0,.77,0,t,be(t,1.4)),n.sphere(.22,0,1.15,0,t,{...be(t,1.1),opacity:.55}),n.cyl(.36,.36,.01,0,1.15,0,t,{...be(t,1.4),seg:24,rx:.4,opacity:.6});for(let i=0;i<3;i++)n.cyl(.6,.6,.01,0,.78,0,"#ff9a3a",{seg:20,t0:i*2.1,tl:.6,...be("#ff9a3a",1)});return yt(n,t,1.2,0,1.1,0,3),{w:1.3,d:1.3,h:1.4,up:1.2}},coralTable(n,e){let t=Me(e.seed);for(let i=0;i<5;i++){let s=t()*6.28;n.cbox(.08,.7,.08,Math.cos(s)*.12,.35,Math.sin(s)*.12,ot(t,["#f08a7e","#e8743a","#b56ad8"]),{rz:Math.cos(s)*.25,rx:-Math.sin(s)*.25})}qe(n,[[0,0],[.62,0],[.66,.05],[.6,.08],[0,.07]],"#f6eef6",{seg:22},0,.7,0);for(let i=0;i<9;i++)n.cbox(.03,.02,.6,0,.78,0,"#e8d8e8",{ry:i*.35,jitter:0});return n.sphere(.07,.25,.83,.1,"#fbf6ff",{roughness:.15,metalness:.3}),{w:1.35,d:1.35,h:1,up:1.3}},stumpTable(n,e){n.cyl(.55,.65,.7,0,0,0,"#6b4a34",{seg:12}),n.cyl(.55,.55,.02,0,.7,0,"#d9b47a",{seg:16});for(let t=0;t<3;t++)n.cyl(.15+t*.15,.15+t*.15,.021,0,.7,0,t%2?"#c49a62":"#d9b47a",{seg:16});for(let t=0;t<5;t++)n.cbox(.1,.08,.45,Math.cos(t*1.3)*.62,.04,Math.sin(t*1.3)*.62,"#5e4230",{ry:-t*1.3});for(let t=0;t<4;t++)n.sphere(.06,-.2+t*.12,.76,.15,"#a8703f",{sy:1.2,seg:8});return n.cyl(.08,.06,.1,.25,.71,-.2,"#efe6c8",{seg:10}),{w:1.4,d:1.4,h:.85,up:1.3,spots:[[-.25,.71,-.2]]}},lowDesk(n,e){let r=e.c??"#3a2a22",a=Me(e.seed);n.box(1.2,.05,.55,0,.32-.05,0,r,{roughness:.3});for(let o of[-1,1])n.box(.06,.32-.05,.55,o*(1.2/2-.04),0,0,r);n.box(.5,.005,.35,-.15,.32,.02,"#f6f2ea");for(let o=0;o<4;o++)n.cbox(.012,.012,.12,-.1+(a()-.5)*.3,.32+.01,(a()-.5)*.2,"#1d1b1c",{ry:a()*3});if(n.box(.12,.03,.08,.35,.32,.05,"#1d1b1c"),n.cyl(.015,.015,.22,.35,.32+.05,-.12,"#7a5434",{rz:1.2,center:!0}),e.scrolls)for(let o=0;o<3;o++)n.cyl(.04,.04,.4,.3,.32+.04+o*.07,-.1,"#e8d8a8",{rz:Math.PI/2,center:!0,seg:10});return{w:1.2,d:.55,h:.32+.2,wall:!0,up:1.6}},lectern(n,e){let t=e.c??"#5a3420",i=e.book??"#7a1f2a";n.cyl(.25,.3,.08,0,0,0,t,{seg:10}),n.cyl(.06,.08,.95,0,.08,0,t,{seg:8}),n.cbox(.6,.04,.45,0,1.08,0,t,{rx:.45});for(let s of[-1,1])n.cbox(.26,.04,.36,s*.14,1.12,.01,"#efe6d0",{rx:.45,rz:s*.06});return n.cbox(.56,.02,.4,0,1.1,.01,i,{rx:.45}),e.candle&&(n.cyl(.03,.03,.18,.32,1,-.15,"#f6f2ea",{seg:6}),n.sphere(.03,.32,1.22,-.15,"#ffcf7a",be("#ffb340",1.6)),yt(n,"#ffb860",.8,.32,1.3,-.15,2.5)),e.glow&&n.sphere(.08,0,1.3,.05,e.glow,{...be(e.glow,1.6),opacity:.7}),{w:.7,d:.6,h:1.35,up:1.4}},bureau(n,e){let t=e.c??"#7a4a2a",i=1.1,s=.55,r=Me(e.seed);n.box(i,.75,s,0,0,0,t);for(let a=0;a<3;a++)n.frame(i-.12,.18,.02,0,.06+a*.22,s/2+.005,Ue(t,-.1),.02);for(let a=0;a<3;a++)n.sphere(.025,0,.15+a*.22,s/2+.03,we,fe);n.box(i,.35,.25,0,.75,-s/2+.125,t);for(let a=0;a<4;a++)n.box(.01,.3,.2,-i/2+.22*(a+1),.77,-s/2+.13,Ue(t,-.15));n.box(i,.04,.4,0,.73,.1,e.leather??"#2f5a46");for(let a=0;a<3;a++)n.cbox(.18,.006,.24,-.2+a*.12,.77+a*.004,.12,"#f6f2ea",{ry:(r()-.5)*.6});return n.cyl(.03,.035,.06,.38,.77,.1,"#1d1b1c",{seg:8}),n.cbox(.01,.2,.01,.39,.86,.1,"#f6f2ea",{rz:.4}),mi(n,i-.04,s-.04,.08,we,.03,fe),{w:i,d:s+.1,h:1.15,wall:!0,up:1.4,spots:[[.3,1.1,-.15]]}},easel(n,e){let t="#a8703f",i=Me(e.seed);for(let s of[-1,1])n.cbox(.04,1.8,.04,s*.32,.88,.05,t,{rz:s*.12,rx:-.1});n.cbox(.04,1.7,.04,0,.82,-.35,t,{rx:.35}),n.box(.8,.05,.1,0,.6,.08,t),n.cbox(.75,.6,.03,0,1,.04,"#f6f2ea",{rx:-.1});for(let s=0;s<7;s++)n.cbox(.12+i()*.2,.1+i()*.15,.01,(i()-.5)*.5,.85+i()*.3,.065,ot(i,["#2f5d8a","#e8492c","#f2c94c","#7cae4f","#c46aa8"]),{rx:-.1});n.cyl(.22,.22,.015,.55,0,.3,"#c9a477",{seg:14});for(let s=0;s<4;s++)n.sphere(.03,.5+s*.05,.02,.25,["#e8492c","#2f5d8a","#f2c94c","#f6f2ea"][s],{seg:6});return{w:.9,d:.9,h:1.85,up:1.2}},booth(n,e){let t=e.c??"#c0283a";n.box(1,1,.8,0,0,0,t,{material:mt("stripes",t,"#f6f2ea",2,1)}),n.box(1.1,.06,.9,0,1,0,we,fe),n.box(.6,.4,.04,0,1.06,.3,"#2a2220"),n.cyl(.7,.75,.35,0,1.5,0,t,{seg:8}),n.cyl(0,.75,.35,0,1.85,0,"#f6f2ea",{seg:8}),n.sphere(.07,0,2.2,0,we,fe);for(let i=0;i<4;i++)n.box(.18,.08,.003,-.25+i*.17,.75,.405,"#f2c94c");return{w:1.2,d:1,h:2.3,wall:!0,up:1}},checkin(n,e){n.box(1.6,.95,.6,0,0,0,"#eef2f6",{round:.04}),n.box(1.6,.05,.65,0,.95,0,"#2f5d8a"),n.cbox(.4,.28,.03,-.35,1.15,-.1,"#1b2230",{rx:-.2}),n.cbox(.36,.24,.01,-.35,1.15,-.08,"#5aa9e6",{...be("#5aa9e6",.8),rx:-.2}),n.box(.7,.3,.5,.6,0,.55,"#3a3a3e");for(let t=0;t<2;t++)n.box(.42,.28,.3,.6,.3,.55,["#e8492c","#f2c94c"][t],{round:.04,ry:t*.2});return{w:1.7,d:1.2,h:1.4,wall:!0,up:1.1}},commandDesk(n,e){let t=e.c??"#3fb6d9";n.box(1.6,.75,.7,0,0,0,"#cfd6de",{round:.05,metalness:.3}),n.cbox(1.6,.06,.55,0,.82,.05,"#2a2e36",{rx:.2});for(let i=0;i<12;i++)n.box(.08,.02,.06,-.6+i%6*.24,.85,-.05+Math.floor(i/6)*.15,["#ff4a4a","#7cff8a","#ffcf3a",t][i%4],be(["#ff4a4a","#7cff8a","#ffcf3a",t][i%4],1.2));for(let i of[-1,0,1])n.cbox(.48,.32,.03,i*.52,1.15,-.28,"#1b2230",{ry:-i*.3}),n.cbox(.44,.28,.01,i*.52,1.15,-.26,t,{...be(t,.9),ry:-i*.3});return{w:1.6,d:.8,h:1.35,wall:!0,up:1.1}},shelf(n,e){let i=e.h??1.5,s=.42,r=e.c??"#6b4a34",a=Me(e.seed),o=4,c=i/o;n.box(1.4,i,.03,0,0,-s/2+.015,Ue(r,-.1));for(let l of[-1,1])n.box(.05,i,s,l*(1.4/2-.025),0,0,r);for(let l=0;l<=o;l++)n.box(1.4,.04,s,0,Math.min(l*c,i-.04),0,r);for(let l=0;l<o;l++){let h=l*c+.04,f=e.items??"books";if(f==="books")Va(n,1.4-.1,0,h,0,s,a,c-.08,e.cols);else for(let u=-1.4/2+.15;u<1.4/2-.1;u+=.2+a()*.06){let d=ot(a,e.cols??["#7cc66a","#b56ad8","#5aa9e6","#e8492c","#f2c94c"]);if(f==="potions")qe(n,[[0,0],[.06,0],[.07,.08],[.03,.14],[.025,.2],[0,.2]],d,{seg:10,...be(d,.4),opacity:.85},u,h,0),n.cyl(.018,.018,.04,u,h+.2,0,"#8a5a36",{seg:6});else if(f==="scrolls")for(let p=0;p<3;p++)n.cyl(.035,.035,s*.8,u+p%2*.04,h+.035+p*.06,0,ot(a,["#e8d8a8","#d9c48a","#efe6d0"]),{rx:Math.PI/2,center:!0,seg:8});else f==="eggs"?n.sphere(.07,u,h+.08,0,d,{sy:1.3,seg:10}):f==="shells"?qe(n,[[0,0],[.08,.01],[.06,.06],[0,.12]],ot(a,["#f6d3c9","#f8f4ff","#f0a8c4","#e8d8a8"]),{seg:9},u,h,0):f==="toys"?a()<.5?n.box(.13,.13,.13,u,h,0,d,{ry:a()}):(n.cyl(.06,.07,.14,u,h,0,d,{seg:8}),n.sphere(.05,u,h+.19,0,"#f2d2b6",{seg:8})):f==="games"?(n.box(.17,c*.7,.3,u,h,0,d),n.box(.172,.05,.302,u,h+c*.35,0,"#f6f2ea")):f==="jars"&&qe(n,[[0,0],[.07,0],[.08,.12],[.05,.16],[0,.16]],d,{seg:10},u,h,0)}}return e.top&&Ru(n,2,.3,.2,-.35,i,0,["#a33b2b","#d9b44a"],a),{w:1.4,d:s,h:i+.15,wall:!0,up:1.15}},rack(n,e){let t=e.kind??"sword",i=e.c??(t==="katana"?"#1d1716":"#6b4a34");n.box(1.3,1.5,.08,0,0,-.18,i,t==="katana"?{roughness:.25}:{}),n.box(1.3,.12,.35,0,0,0,i);for(let s=0;s<4;s++){let r=-.45+s*.3;if(t==="katana")for(let a=0;a<2;a++)n.cbox(1,.05,.05,0,.55+a*.4+s*0,-.1,a?"#1d1716":"#7a1f2a",{rz:.05*(s%2?1:-1)}),s===0&&n.cbox(.06,.06,.06,.3,.55+a*.4,-.1,we,fe);else if(t==="rifle")n.cbox(.05,1.1,.06,r,.7,-.08,"#3a3a3e",{metalness:.5}),n.cbox(.09,.4,.08,r,.3,-.08,"#7a4a2a",{rz:.08});else{let a=t==="cutlass"?.08:.06;n.cbox(a,.95,.015,r,.75,-.1,"#cfd6de",{metalness:.8,roughness:.25,rz:t==="cutlass"?.1:0}),n.cbox(.24,.04,.05,r,.27,-.1,we,fe),n.cbox(.04,.18,.04,r,.16,-.1,"#4a2e1e")}}if(t==="katana")for(let s=0;s<2;s++)n.cbox(.05,.3,.05,(s?1:-1)*.5,.4,-.12,"#1d1716");return t==="sword"&&(n.cbox(.5,.6,.04,0,1.15,-.12,"#2f5d8a"),n.cbox(.3,.06,.045,0,1.15,-.1,we,fe),n.cbox(.06,.3,.045,0,1.15,-.1,we,fe)),{w:1.3,d:.4,h:1.55,wall:!0,up:1.15}},bonePile(n,e){let t=Me(e.seed);for(let i=0;i<14;i++){let s=(t()-.5)*1,r=(t()-.5)*.5,a=.05+t()*.4,o=t()*3;n.cbox(.45,.06,.06,s,a,r,"#efe6d0",{ry:o,rz:(t()-.5)*.6});for(let c of[-1,1])n.sphere(.05,s+Math.cos(o)*c*.22,a,r-Math.sin(o)*c*.22,"#e6dcc4",{seg:6})}n.sphere(.2,.2,.6,0,"#efe6d0",{seg:10,sy:.9});for(let i of[-1,1])n.sphere(.05,.2+i*.08,.62,.17,"#2a1d18",{seg:6});return n.cbox(.06,.6,.06,-.4,.75,-.1,"#efe6d0",{rz:.5}),{w:1.2,d:.7,h:.9,wall:!0,up:1.4}},maskWall(n,e){let t=Me(e.seed);n.box(1.4,1.5,.08,0,0,-.15,e.c??"#6a1f6e"),n.box(1.4,.1,.3,0,0,0,"#2a1838");for(let i=0;i<3;i++)for(let s=0;s<3;s++){let r=-.42+i*.42,a=.35+s*.4,o=ot(t,["#f6f2ea",we,"#c0283a","#2f6f9a","#1d1b1c"]);n.cbox(.32,.15,.06,r,a,-.08,o,{round:.05});for(let c of[-1,1])n.cbox(.08,.05,.02,r+c*.07,a+.01,-.045,"#1d1b1c");t()<.5&&n.cbox(.03,.25,.02,r+.12,a+.18,-.07,ot(t,["#c0283a","#f2c94c","#2f6f9a"]),{rz:-.4})}return{w:1.4,d:.4,h:1.55,wall:!0,up:1.15}},luggageRack(n,e){let t=we;for(let s of[-1,1])n.cyl(.025,.025,1.4,s*.6,0,-.1,t,{seg:8,...fe});for(let s of[.5,1])n.box(1.3,.03,.4,0,s,-.05,"#5a3420");let i=["#7a3f2a","#33405a","#a8703f","#2f5a46"];for(let s=0;s<3;s++)n.box(.35,.25+s*.05,.32,-.4+s*.4,.53,-.05,i[s],{round:.03});for(let s=0;s<2;s++)n.cyl(.14,.14,.2,-.2+s*.4,1.03,-.05,i[3-s],{seg:14});n.box(.55,.35,.42,0,0,0,"#7a3f2a",{round:.03});for(let s of[-1,1])n.box(.04,.37,.43,s*.15,0,0,"#c9a477");return{w:1.4,d:.5,h:1.45,wall:!0,up:1.15}},skiRack(n,e){n.box(1.3,1.6,.08,0,0,-.15,"#8a5a36"),n.box(1.3,.08,.25,0,.3,-.05,"#6b4a34");let t=["#c0392b","#2f5d8a","#f2c94c","#3f7a4a"];for(let i=0;i<4;i++)for(let s of[-1,1])n.cbox(.08,1.55,.03,-.45+i*.3+s*.05,.85,-.08,t[i],{rz:.04});for(let i=0;i<2;i++)n.cyl(.012,.012,1.3,.55+i*.06,0,-.05,"#9aa6b4",{seg:5,metalness:.6});return{w:1.35,d:.35,h:1.65,wall:!0,up:1.15}},postcards(n,e){let t=Me(e.seed);n.cyl(.04,.04,1.6,0,0,0,"#cfd6de",{seg:8,metalness:.5}),n.cyl(.3,.32,.05,0,0,0,"#cfd6de",{seg:14,metalness:.5});for(let i=0;i<4;i++)for(let s=0;s<4;s++){let r=s/4*Math.PI*2+i*.4,a=.45+i*.3;n.cbox(.2,.14,.01,Math.cos(r)*.18,a,Math.sin(r)*.18,ot(t,["#5aa9e6","#f2c94c","#e8492c","#7cae4f","#f6f2ea"]),{ry:-r+Math.PI/2})}return{w:.7,d:.7,h:1.65,up:1.4}},bookBox(n,e){let t=e.c??"#2f5a46";n.box(1.3,.75,.55,0,.35,0,t),n.cbox(1.3,.04,.6,0,1.3,-.45,t,{rx:-1.2}),Ei(n,1.2,.5,.35,"#2a2523",.05);let i=Me(e.seed);Va(n,1.15,0,1.1,0,.4,i,.18);for(let s=0;s<4;s++)n.cbox(.22,.008,.3,-.4+s*.26,1.11,.12,ot(i,["#e8d8a8","#f6f2ea","#c9a477"]),{ry:(i()-.5)*.4});return{w:1.35,d:.7,h:1.6,wall:!0,up:1.15}},serverRack(n,e){n.box(1.2,1.7,.6,0,0,0,"#2a2e36",{metalness:.4});for(let t=0;t<9;t++){n.box(1.05,.12,.02,0,.12+t*.17,.3,"#1b2230");for(let i=0;i<6;i++)n.box(.03,.03,.02,-.4+i*.08,.17+t*.17,.315,["#7cff8a","#3fb6d9","#ffcf3a"][(t+i)%3],be(["#7cff8a","#3fb6d9","#ffcf3a"][(t+i)%3],1.4))}return n.box(1.2,.04,.6,0,1.7,0,"#9aa6b4",{metalness:.5}),{w:1.2,d:.65,h:1.75,wall:!0,up:1.1}},harp(n,e){let t=e.s??1,i=e.c??we,s=e.c?{}:fe;n.box(.4*t,.12,.5*t,0,0,0,i,s),n.cyl(.05*t,.06*t,1.75*t,-.12*t,.1,0,i,{seg:10,...s}),n.cyl(.04*t,.04*t,.95*t,.25*t,1.55*t,0,i,{rz:1.1,center:!0,seg:10,...s}),n.cbox(.12*t,1.55*t,.14*t,.33*t,.85*t,0,e.board??Ue(i,-.2),{rz:-.32});for(let r=0;r<9;r++){let a=(r+1)/10,o=-.12*t+a*.06,c=.08*t+a*.48*t,l=.15+a*1.4*t,h=1.2*t+a*.55*t;n.cbox(.006,Math.abs(h-l)+.2,.006,(o+c)/2+.1*t*a,(l+h)/2,0,"#f6f2ea",{shadow:!1,jitter:0})}return e.leaves&&ft(n,{seed:e.seed,rx:.2,ry:.15,palette:"lime",voxel:.05,flowers:"#f4f1ff",flowerRate:.2},0,1.85*t,0),{w:.9*t,d:.6*t,h:1.95*t,up:1.25}},koto(n,e){let i=e.c??"#a8703f";n.box(1.8,.1,.35,0,.32,0,i,{round:.04});for(let s of[-1,1])n.box(.08,.32,.3,s*(1.8/2-.15),0,0,Ue(i,-.15));for(let s=0;s<13;s++)n.box(1.8-.2,.006,.006,0,.43,-.15+s*.025,"#f6f2ea",{shadow:!1,jitter:0}),n.cbox(.03,.05,.02,-.5+s%5*.22+s*.04,.45,-.15+s*.025,"#f6f2ea");return n.box(.6,.08,.6,0,0,.55,e.cushion??"#7a2a3a",{round:.04}),{w:1.8,d:1,h:.55,up:1.3}},organ(n,e){let t=e.kind??"pipe",i=e.c??"#3a2420";if(t==="barrel"){n.box(.8,.7,.55,0,.35,0,i,{round:.03});for(let a of[-1,1])n.cyl(.3,.3,.05,a*.45,.3,0,"#5a3420",{rz:Math.PI/2,center:!0,seg:14});for(let a=0;a<6;a++)n.cyl(.04,.04,.35,-.25+a*.1,1.05,.1,we,{seg:8,...fe});return n.cbox(.05,.3,.05,.45,.75,.15,"#2a2220",{rz:1.2}),n.box(.6,.5,.02,0,.45,.28,e.c2??"#c0283a"),{w:1.1,d:.7,h:1.45,up:1.4}}let s=t==="fair";n.box(1.5,.85,.6,0,0,0,s?"#c0283a":i),n.box(1.3,.05,.25,0,.75,.3,"#1d1716"),n.box(1.2,.03,.15,0,.8,.32,"#f6f2ea");let r=s?9:11;for(let a=0;a<r;a++){let o=-.65+a*1.3/(r-1),c=.6+(1-Math.abs(a-(r-1)/2)/((r-1)/2))*.8;n.cyl(.05,.05,c,o,.85,-.15,s?ot(Me(a+1),[we,"#f6f2ea","#2f6f9a"]):"#c9b48a",{seg:10,...fe})}if(s){n.box(1.5,.15,.62,0,1.75,-.05,we,fe);for(let a=0;a<6;a++)n.sphere(.05,-.6+a*.24,1.82,.27,"#fff2c8",be("#ffd36a",1.4))}return t==="harmonium"&&(n.box(1.5,.35,.4,0,.85,-.1,i),n.box(1.2,.04,.02,0,.3,.31,we,fe)),{w:1.5,d:.7,h:s?1.9:1.75,wall:!0,up:1.15}},upright(n,e){let t=e.c??"#4a2e1e";n.box(1.45,1.25,.55,0,0,-.05,t),n.box(1.35,.06,.28,0,.72,.3,t),n.box(1.25,.03,.18,0,.78,.32,"#f6f2ea");for(let i=0;i<30;i++)[1,3,6,8,10].includes(i%12)&&n.box(.022,.02,.09,-.58+i*.04,.81,.29,"#111");n.box(.5,.3,.02,0,.88,.23,"#efe6d0",{rx:-.2});for(let i of[-1,1])n.cyl(.04,.05,.1,i*.55,1.25,0,we,fe),n.cyl(.015,.015,.12,i*.55,1.35,0,"#f6f2ea");return e.glass&&(n.cyl(.04,.035,.12,.25,1.25,.05,"#c9a24a",{opacity:.6,seg:8}),n.cyl(.03,.03,.2,-.2,1.25,.05,"#3f7a4a",{seg:8})),n.box(.8,.07,.35,0,.45,.7,t),Ei(n,.75,.3,.45,Ue(t,-.1),.05,0,{}),{w:1.45,d:1.1,h:1.5,wall:!0,up:1.15}},drum(n,e){qe(n,[[.3,0],[.42,.3],[.4,.62],[0,.62]],e.c??"#8a5a36",{seg:16}),n.cyl(.42,.42,.02,0,.62,0,"#d9c49a",{seg:16});for(let t=0;t<8;t++)n.cbox(.015,.62,.015,Math.cos(t*.785)*.38,.31,Math.sin(t*.785)*.38,"#3a2a1e",{rz:Math.cos(t*.785)*.18,rx:-Math.sin(t*.785)*.18});n.cyl(.25,.3,.4,.6,0,.2,Ue(e.c??"#8a5a36",.08),{seg:14}),n.cyl(.3,.3,.02,.6,.4,.2,"#d9c49a",{seg:14});for(let t of[-1,1])n.cbox(.03,.03,.4,t*.1,.66,.1,"#efe6d0",{ry:t*.4}),n.sphere(.045,t*.18,.66,.28,"#efe6d0",{seg:6});return{w:1.3,d:.9,h:.7,up:1.5}},synth(n,e){let t=e.c??"#3fb6d9";n.box(1.5,.12,.5,0,.78,0,"#2a2e36",{round:.03}),n.box(1.2,.03,.18,0,.9,.12,"#eef2f6");for(let i=0;i<26;i++)[1,3,6,8,10].includes(i%12)&&n.box(.022,.02,.09,-.55+i*.045,.93,.09,"#111");for(let i=0;i<10;i++)n.cyl(.025,.025,.03,-.6+i*.13,.9,-.12,["#ff4a4a",t,"#ffcf3a"][i%3],{seg:8,...be(["#ff4a4a",t,"#ffcf3a"][i%3],1)});for(let i of[-1,1])n.cbox(.05,.8,.05,i*.4,.4,0,"#9aa6b4",{rz:i*.4,metalness:.6});return n.box(.3,.2,.03,.5,.92,-.18,"#1b2230"),n.box(.26,.16,.01,.5,.94,-.165,t,be(t,1)),{w:1.5,d:.6,h:1.15,up:1.3}},alphorn(n,e){let t="#b98552";n.cyl(.03,.06,2.2,.1,.5,0,t,{rz:Math.PI/2-.2,center:!0,seg:10}),qe(n,[[.06,0],[.08,.15],[.16,.3],[.2,.35],[.15,.36]],t,{seg:14},0,0,0),n.cbox(.2,.3,.12,-.95,.15,0,"#6b4a34");for(let i=0;i<4;i++)n.cyl(.07-i*.005,.07-i*.005,.04,-.4+i*.35,.33+i*.08,0,"#2f5d8a",{rz:Math.PI/2-.2,center:!0,seg:10});return{w:2.3,d:.5,h:.75,up:1.3}},karaoke(n,e){n.box(.8,.9,.55,0,0,0,"#2a2240",{round:.04});for(let t=0;t<2;t++)n.cyl(.18,.18,.02,(t?1:-1)*.2,.45,.28,"#1b1b1e",{rx:Math.PI/2,center:!0,seg:16}),n.cyl(.08,.08,.025,(t?1:-1)*.2,.45,.285,"#5a5a6a",{rx:Math.PI/2,center:!0,seg:12});n.cbox(.6,.38,.04,0,1.12,-.1,"#1b1b1e",{rx:-.15}),n.cbox(.55,.33,.01,0,1.12,-.07,"#ff4d8d",{...be("#ff4d8d",.9),rx:-.15}),n.cyl(.02,.025,1.3,.65,0,.3,"#9aa6b4",{seg:8,metalness:.6}),n.sphere(.06,.65,1.36,.3,"#3a3a3e",{seg:10});for(let t=0;t<6;t++)n.box(.05,.05,.02,-.3+t*.12,.85,.28,["#ff4d8d","#5aa9e6","#f2c94c"][t%3],be(["#ff4d8d","#5aa9e6","#f2c94c"][t%3],1.4));return{w:1.1,d:.7,h:1.45,wall:!0,up:1.3}},clawBath(n,e){let t=e.c??"#f6f2ea",i=e.feet??we,s=e.metal?{metalness:.7,roughness:.3}:{};n.box(1.6,.5,.75,0,.14,0,t,{round:.2,...s}),n.box(1.4,.05,.55,0,.6,0,e.water??"#a9cfd8",{roughness:.1});for(let r=0;r<5;r++)n.sphere(.06+r%2*.02,-.3+r*.12,.64,(r%3-1)*.1,e.foam??"#ffffff",{seg:8});for(let r of[-.65,.65])for(let a of[-.27,.27])n.sphere(.06,r,.08,a,i,fe);if(n.cyl(.02,.02,.35,-.72,.6,0,i,{metalness:.8}),n.box(.08,.03,.2,-.66,.92,0,i,fe),e.petals)for(let r=0;r<10;r++)n.cbox(.05,.01,.03,(Me(e.seed+r)()-.5)*1.1,.66,(Me(e.seed+r*3)()-.5)*.4,e.petals,{ry:r,jitter:0});return{w:1.7,d:.8,h:.95,wall:!0,up:1}},tub(n,e){let t=e.r??.65,i=e.h??.65,s=e.c??"#c9a477";n.cyl(t,t*.95,i,0,0,0,s,{seg:e.square?4:18,...e.square?{ry:Math.PI/4}:{}});for(let r of[.2,.8])n.cyl(t*1.02,t*1.02,.04,0,i*r,0,e.band??"#5a4a3a",{seg:e.square?4:18,...e.square?{ry:Math.PI/4}:{}});if(n.cyl(t*.9,t*.9,.02,0,i-.08,0,e.water??"#9fd0d4",{seg:e.square?4:18,roughness:.1,...e.square?{ry:Math.PI/4}:{}}),e.steam)for(let r=0;r<4;r++)n.sphere(.12+r*.03,(r%2-.5)*.3,i+.1+r*.12,(r%3-1)*.15,"#ffffff",{opacity:.35,seg:8,shadow:!1});return e.bucket&&(n.cyl(.13,.11,.18,t+.25,0,.2,s,{seg:12}),n.box(.35,.25,.3,-t-.15,0,.3,Ue(s,-.08))),{w:t*2+.5,d:t*2+.2,h:i+.2,up:1.3}},pond(n,e){let t=e.r??.8,i=e.edge??"#8e8a82",s=e.water??"#4f9fb5",r=Me(e.seed);for(let a=0;a<12;a++){let o=a/12*Math.PI*2;n.sphere(.16+r()*.05,Math.cos(o)*t,.08,Math.sin(o)*t*.85,Ue(i,(r()-.5)*.1),{sy:.6,seg:8,flat:!0})}n.cyl(t,t,.04,0,.02,0,s,{seg:22,roughness:.08,metalness:.2}),n.cyl(t*.6,t*.6,.041,0,.02,0,Ue(s,-.1),{seg:22,roughness:.08});for(let a=0;a<(e.fish??0);a++)n.cbox(.16,.03,.06,Math.cos(a*2.3)*t*.45,.07,Math.sin(a*2.3)*t*.4,ot(r,["#ff7a1a","#f6f2ea","#e8492c"]),{ry:a*2.3,round:.02});for(let a=0;a<(e.pads??0);a++)n.cyl(.11,.11,.012,Math.cos(a*2.1+1)*t*.6,.065,Math.sin(a*2.1+1)*t*.5,"#5a9440",{seg:10,t0:.3,tl:Math.PI*1.8});for(let a=0;a<(e.ducks??0);a++){let o=-.3+a*.4,c=a%2*.2;n.sphere(.1,o,.13,c,"#f2d46a",{sy:.7,seg:10}),n.sphere(.06,o+.08,.24,c,"#f2d46a",{seg:8}),n.cbox(.05,.02,.03,o+.14,.24,c,"#ff7a1a")}if(e.reeds)for(let a=0;a<8;a++)n.cbox(.02,.5+r()*.3,.02,t*.8+(r()-.5)*.2,.3,-t*.4+(r()-.5)*.3,"#5a8a3a",{rz:(r()-.5)*.3});return e.seal&&(n.sphere(.2,.2,.18,0,"#4a5058",{sy:.7,seg:12}),n.sphere(.11,.38,.3,0,"#4a5058",{seg:10}),n.sphere(.08,.38,.48,0,"#e8492c",{seg:8})),{w:t*2.3,d:t*2,h:.3,up:1.1}},ballPit(n,e){let t=Me(e.seed);n.box(1.6,.4,1,0,0,0,"#5aa9e6",{round:.12}),n.box(1.4,.35,.8,0,.06,0,"#2a4a6a");for(let i=0;i<60;i++)n.sphere(.06,(t()-.5)*1.35,.38+t()*.06,(t()-.5)*.75,ot(t,["#ff4d8d","#f2c94c","#7cc66a","#5aa9e6","#ff7a1a"]),{seg:6});return{w:1.6,d:1,h:.5,wall:!0,up:1.1}},cryoTank(n,e){let t=e.c??"#9fe8ff";n.box(1.6,.35,.8,0,0,0,"#cfd6de",{round:.08,metalness:.3}),n.box(1.5,.28,.7,0,.35,0,t,{round:.12,opacity:.45,roughness:.05}),n.box(1.4,.02,.6,0,.36,0,t,be(t,1.4));for(let i of[-1,1])n.box(.08,.5,.82,i*.8,0,0,"#9aa6b4",{metalness:.5});return n.box(.2,.12,.02,.5,.15,.41,"#1b2230"),n.box(.06,.04,.01,.45,.19,.42,"#7cff8a",be("#7cff8a",1.5)),{w:1.7,d:.85,h:.7,wall:!0,up:1.05}},cauldron(n,e){let t=e.c??"#7cff5a";qe(n,[[.2,0],[.42,.12],[.5,.35],[.46,.58],[.4,.62],[.38,.6],[0,.55]],"#2a2a2e",{seg:18,metalness:.4},0,.12,0),n.cyl(.38,.38,.02,0,.68,0,t,{seg:18,...be(t,.9)});for(let i=0;i<3;i++)n.cbox(.06,.18,.06,Math.cos(i*2.1)*.3,.06,Math.sin(i*2.1)*.3,"#2a2a2e");for(let i=0;i<4;i++)n.sphere(.06+i*.015,(i%2-.5)*.15,.8+i*.12,(i%3-1)*.1,t,{opacity:.4,seg:8,shadow:!1});if(e.fire)for(let i=0;i<5;i++)n.cbox(.25,.06,.06,0,.03,0,"#5a3420",{ry:i*.6});return yt(n,t,.9,0,.9,0,2.5),{w:1.1,d:1.1,h:1,up:1.4}},basin(n,e){let t=e.c??"#a9a296",i=e.h??.75;if(e.pedestal!==!1&&qe(n,[[.18,0],[.12,.08],[.08,i*.5],[.12,i-.1],[0,i-.1]],t,{seg:14}),qe(n,[[0,0],[.3,.02],[.38,.15],[.36,.18],[.28,.08],[0,.07]],t,{seg:18},0,i-.12,0),n.cyl(.3,.3,.01,0,i,0,e.water??"#9fd0d4",{seg:18,roughness:.08}),e.ladle&&n.cbox(.02,.02,.45,.1,i+.06,0,"#a8703f",{ry:.6}),e.flowers)for(let s=0;s<6;s++)n.sphere(.045,Math.cos(s)*.18,i+.02,Math.sin(s)*.18,e.flowers,{seg:6});return{w:.85,d:.85,h:i+.15,up:1.5}},jar(n,e){let t=e.c??"#b8673f",i=e.h??.9,s=Me(e.seed);if(qe(n,[[.12,0],[.26,.15],[.3,i*.45],[.2,i*.8],[.1,i*.88],[.13,i],[.09,i],[0,i*.9]],t,{seg:16}),e.handles)for(let r of[-1,1])n.cyl(.08,.08,.025,r*.2,i*.82,0,t,{rx:Math.PI/2,center:!0,seg:10,t0:r>0?-1.6:1.6,tl:Math.PI});if(e.band&&n.cyl(.29,.29,.05,0,i*.45,0,e.band,{seg:16}),e.more)for(let r=0;r<2;r++)qe(n,[[.08,0],[.16,.1],[.17,.25],[.08,.42],[0,.4]],Ue(t,(s()-.5)*.1),{seg:12},(r?1:-1)*.4,0,.15);return{w:e.more?1.1:.7,d:.7,h:i,up:1.5}},bucket(n,e){let t=e.c??"#8a5a36";qe(n,[[.22,0],[.28,.42],[.26,.42],[0,.4]],t,{seg:14});for(let i of[.08,.34])n.cyl(.24+i*.12,.24+i*.12,.03,0,i,0,"#3a3a3e",{seg:14,metalness:.5});if(n.cyl(.25,.25,.01,0,.4,0,e.fill??"#5fa5b5",{seg:14,roughness:.1}),e.items){let i=Me(e.seed);for(let s=0;s<6;s++)n.sphere(.06,(i()-.5)*.25,.44,(i()-.5)*.25,e.items,{seg:8})}return n.cyl(.26,.26,.015,0,.42,0,"#3a3a3e",{rz:Math.PI/2,center:!0,seg:14,t0:0,tl:Math.PI}),e.mop&&n.cbox(.03,1.1,.03,.25,.55,0,"#a8703f",{rz:-.25}),{w:.7,d:.7,h:.6,up:1.8}},trough(n,e){return n.box(1.6,.5,.55,0,.1,0,"#8a5a36"),n.box(1.5,.02,.45,0,.55,0,"#5f8fa5",{roughness:.1}),Ei(n,1.5,.5,.12,"#5a3a22",.08),n.cyl(.04,.04,1,-.7,0,-.35,"#3a3a3e",{seg:8,metalness:.5}),n.cbox(.35,.05,.05,-.55,.95,-.35,"#3a3a3e",{metalness:.5}),n.cbox(.05,.4,.05,-.72,.85,-.2,"#3a3a3e",{rz:.6}),{w:1.6,d:.7,h:1.05,wall:!0,up:1.05}},vanity(n,e){let t=e.c??"#f2e8ea",i=we;n.box(1.1,.06,.5,0,.72,0,t),mi(n,1,.45,.72,i,.03,fe),n.box(1.1,.12,.5,0,.6,0,t),n.cyl(.38,.38,.04,0,1.2,-.2,i,{rx:Math.PI/2,center:!0,seg:20,...fe}),n.cyl(.33,.33,.045,0,1.2,-.2,"#c9dde3",{rx:Math.PI/2,center:!0,seg:20,metalness:.9,roughness:.05});for(let s=0;s<4;s++)qe(n,[[0,0],[.04,0],[.04,.08],[.015,.12],[0,.13]],["#f2a6c0","#c8a0e0","#9ad0e0",we][s],{seg:8},-.4+s*.12,.78,.05);return n.cyl(.08,.07,.04,.35,.78,.08,"#f6f2ea",{seg:12}),{w:1.1,d:.55,h:1.6,wall:!0,up:1.2}},dispenser(n,e){let t=e.c??"#f2d46a";n.box(.8,.75,.55,0,0,0,"#f6f2ea"),n.cyl(.25,.25,.6,0,.75,0,t,{seg:18,opacity:.7,roughness:.05});for(let i=0;i<4;i++)n.cyl(.04,.04,.02,(i-1.5)*.08,1+i%2*.15,.2,"#f6e090",{rx:Math.PI/2,center:!0,seg:10});n.cyl(.26,.26,.05,0,1.35,0,"#d8d8d4",{seg:18}),n.box(.08,.06,.08,0,.8,.25,"#9aa6b4",{metalness:.6});for(let i=0;i<4;i++)n.cyl(.04,.035,.1,-.3+i*.2,.75,.15,["#ff4d8d","#5aa9e6","#f2c94c","#7cc66a"][i],{seg:8});return{w:.85,d:.6,h:1.4,wall:!0,up:1.3}},recycler(n,e){n.box(.9,1.3,.5,0,0,0,"#cfd6de",{round:.04,metalness:.3}),n.cyl(.18,.18,.9,-.15,.25,.3,"#5fc6e8",{seg:14,opacity:.5,roughness:.05});for(let t=0;t<5;t++)n.sphere(.03,-.15+t%2*.05,.35+t*.15,.32,"#e8fbff",{seg:6,shadow:!1});return n.box(.25,.2,.02,.22,.85,.26,"#1b2230"),n.box(.21,.16,.01,.22,.87,.27,"#3fb6d9",be("#3fb6d9",1)),n.box(.3,.05,.25,.2,.5,.3,"#9aa6b4",{metalness:.6}),{w:.95,d:.8,h:1.35,wall:!0,up:1.3}},vent(n,e){let t=Me(e.seed);for(let i=0;i<4;i++)n.cyl(.3-i*.06,.38-i*.06,.25,(t()-.5)*.1,i*.22,(t()-.5)*.1,"#5e5a66",{seg:9});n.cyl(.1,.1,.02,0,.88,0,"#ff9a3a",be("#ff7a1a",1.6));for(let i=0;i<6;i++)n.sphere(.05+i*.015,(t()-.5)*.2,1+i*.12,(t()-.5)*.2,"#e8fbff",{opacity:.45,seg:8,shadow:!1});return yt(n,"#ff9a3a",1,0,1,0,2.5),{w:.8,d:.8,h:1.6,up:1.4}}};function fr(n,e,t,i,s=1,r="#ff9a3a",a=1.6){n.sphere(.12*s,e,t+.1*s,i,r,{...be("#ff7a1a",1.8),sy:1.4}),n.sphere(.07*s,e,t+.22*s,i,"#ffe08a",{...be("#ffcf5a",2),sy:1.5}),a&&yt(n,"#ff9a3c",a,e,t+.3*s,i,3.5)}var Iu={screen(n,e){let t=e.c??"#f2ead8",i=e.frame??"#1d1716",s=Me(e.seed);for(let r=0;r<4;r++){let a=-.6+r*.4,o=r%2?.35:-.35;n.cbox(.4,1.5,.03,a,.8,0,i,{ry:o}),n.cbox(.34,1.35,.035,a,.82,0,t,{ry:o}),e.art==="crane"?n.cbox(.2,.1,.04,a,1.1-r%2*.3,0,"#f6f2ea",{ry:o,rz:.4}):n.cbox(.25,.3,.04,a+(s()-.5)*.05,.5+s()*.6,0,ot(s,e.cols??["#c0283a","#2f5a3a","#e0a3b0"]),{ry:o,round:.05})}return{w:1.7,d:.5,h:1.6,wall:!0,up:1.1}},fresco(n,e){let t=Me(e.seed),i=e.cols??["#e8d4a0","#b8862b","#2f5e8c","#a33b2b","#3f7a4a","#1d1b1c"];n.box(1.5,1.4,.15,0,0,-.1,e.wall??"#d9c48a"),n.box(1.35,1.1,.02,0,.18,-.02,i[0]);for(let s=0;s<3;s++){let r=-.4+s*.4;n.box(.12,.45,.02,r,.45,0,ot(t,i.slice(1))),n.sphere(.07,r,.98,0,i[i.length-1],{seg:8})}for(let s=0;s<8;s++)n.box(.08,.08,.02,-.55+s*.16,1.12,0,ot(t,i.slice(1)));if(e.hands)for(let s=0;s<5;s++)n.cbox(.12,.14,.02,(t()-.5)*1.1,.3+t()*.8,0,ot(t,["#a33b2b","#efe6d0","#1d1b1c"]),{rz:t()});return{w:1.5,d:.3,h:1.4,wall:!0,up:1.1}},portrait(n,e){let t=e.w??.9,i=e.h??1.1,s=e.cols??["#3a2a30","#d9b49a","#7a1f2a","#2a1d18"];for(let a of[-1,1])n.cbox(.05,1.7,.05,a*.3,.85,.05,"#5a3420",{rz:a*.08,rx:-.12});n.cbox(.05,1.6,.05,0,.8,-.3,"#5a3420",{rx:.3});let r=.55;if(e.frame!==!1&&n.cbox(t+.14,i+.14,.05,0,r+i/2,0,e.frame??we,{rx:-.12,...(e.frame??we)===we?fe:{}}),n.cbox(t,i,.06,0,r+i/2,.01,s[0],{rx:-.12}),e.kind==="poster")n.cbox(t*.8,i*.18,.07,0,r+i*.82,.02,s[2],{rx:-.12}),n.cbox(t*.5,i*.45,.07,0,r+i*.45,.02,s[1],{rx:-.12,round:.05}),n.cbox(t*.7,i*.1,.07,0,r+i*.12,.02,s[3],{rx:-.12});else if(n.cbox(t*.6,i*.35,.07,0,r+i*.2,.02,s[2],{rx:-.12,round:.08}),n.sphere(t*.17,0,r+i*.58,.07,s[1],{seg:10,sy:1.15}),n.sphere(t*.18,0,r+i*.66,.05,s[3],{seg:10,sy:.7}),e.eyes)for(let a of[-1,1])n.sphere(.025,a*.05,r+i*.6,.12,e.eyes,be(e.eyes,2));return{w:t+.2,d:.6,h:r+i+.15,wall:!0,up:1.1}},mirror(n,e){let t=e.c??we,i=t===we?fe:{};n.box(.7,.08,.35,0,0,0,t,i);for(let a of[-1,1])n.box(.06,1,.06,a*.36,.08,0,t,i);let s=new Wr(.42,28);s.scale(.85,1.25,1),s.translate(0,1.2,.025),n.geo(s,"#c9dde3",{tess:!1,metalness:.9,roughness:.05,...e.glow?be(e.glow,.6):{}});let r=new wi(.42,.04,8,28);return r.scale(.85,1.25,1),r.translate(0,1.2,.02),n.geo(r,t,{tess:!1,...i}),e.crest==="heart"?mn(n,ji(.3).map(([a,o])=>[a,o]),.04,"#e5384f",1.75):n.sphere(.08,0,1.78,.02,t,i),e.glow&&yt(n,e.glow,.8,0,1.2,.3,2.5),{w:.9,d:.4,h:1.9,wall:!0,up:1.15}},tapestry(n,e){let t=e.c??"#7a1f2a";n.cyl(.03,.03,1.5,0,1.75,-.1,"#5a3420",{rz:Math.PI/2,center:!0,seg:8});for(let i of[-1,1])n.cyl(.03,.03,1.75,i*.7,0,-.15,"#5a3420",{seg:8});n.box(1.3,1.45,.03,0,.28,-.1,t),n.box(1.1,1.2,.035,0,.4,-.1,Ue(t,.12)),n.box(.5,.6,.04,0,.7,-.1,"#d9b45a"),n.box(.08,.6,.045,0,.7,-.1,t),n.box(.5,.08,.045,0,1.1,-.1,t);for(let i=0;i<6;i++)n.box(.06,.12,.03,-.55+i*.22,.17,-.1,"#d9b45a");return{w:1.5,d:.3,h:1.8,wall:!0,up:1.1}},porthole(n,e){n.box(1.3,1.5,.2,0,0,-.1,"#cfd6de",{metalness:.4}),n.cyl(.5,.5,.08,0,.85,.02,"#9aa6b4",{rx:Math.PI/2,center:!0,seg:28,metalness:.7}),n.cyl(.42,.42,.09,0,.85,.02,"#0b1530",{rx:Math.PI/2,center:!0,seg:28});let t=Me(e.seed);for(let i=0;i<14;i++){let s=t()*6.28,r=t()*.38;n.sphere(.012,Math.cos(s)*r,.85+Math.sin(s)*r,.08,"#ffffff",be("#ffffff",2))}n.sphere(.12,.15,.95,.07,"#ff9a5a",{seg:12,sy:.3});for(let i=0;i<8;i++)n.sphere(.03,Math.cos(i*.785)*.47,.85+Math.sin(i*.785)*.47,.07,"#5a6474",{seg:6,metalness:.6});return{w:1.3,d:.3,h:1.5,wall:!0,up:1.1}},frostWindow(n,e){n.box(1.3,1.5,.12,0,0,-.1,"#5a3420"),n.box(1,.9,.02,0,.45,-.03,"#dcecf6",{opacity:.8,roughness:.15}),n.box(.05,.9,.04,0,.45,-.02,"#5a3420"),n.box(1,.05,.04,0,.9,-.02,"#5a3420");for(let t=0;t<12;t++)n.cbox(.12,.01,.01,-.4+t%4*.27,.5+Math.floor(t/4)*.25,-.01,"#ffffff",{rz:t,shadow:!1});n.box(1.1,.08,.25,0,.42,.05,"#5a3420");for(let t of[-1,1])n.box(.25,1.1,.06,t*.55,.35,0,"#7a1f2a");return{w:1.3,d:.35,h:1.5,wall:!0,up:1.1}},stagHead(n,e){n.box(.5,.7,.08,0,.8,-.15,"#6b4a34",{round:.03}),n.sphere(.18,0,1.1,0,"#8a5a36",{seg:12,sy:1.1}),n.cbox(.14,.12,.3,0,1,.18,"#8a5a36",{round:.05}),n.sphere(.04,0,1,.33,"#1d1b1c",{seg:6});for(let t of[-1,1]){n.cbox(.04,.5,.04,t*.2,1.42,0,"#e8dcc0",{rz:-t*.5});for(let i=0;i<3;i++)n.cbox(.03,.2,.03,t*(.25+i*.07),1.45+i*.1,0,"#e8dcc0",{rz:t*.4});n.cbox(.06,.14,.03,t*.17,1.22,.02,"#8a5a36",{rz:t*.9})}return n.box(.8,.6,.4,0,0,0,"#7a5434"),n.box(.82,.03,.42,0,.6,0,"#5a3a22"),{w:.9,d:.45,h:1.8,wall:!0,up:1.1}},board(n,e){let t=Me(e.seed);for(let i of[-1,1])n.box(.08,1.6,.08,i*.65,0,0,"#3a3a3e");n.box(1.5,.75,.1,0,.85,0,"#1b1b1e");for(let i=0;i<5;i++)n.box(.5,.08,.01,-.4,.95+i*.12,.055,"#f2c94c",be("#f2c94c",.8)),n.box(.25,.08,.01,.15,.95+i*.12,.055,"#f6f2ea",be("#ffffff",.6)),n.box(.2,.08,.01,.5,.95+i*.12,.055,ot(t,["#7cff8a","#ff4a4a"]),be("#ffffff",.4));return{w:1.5,d:.2,h:1.65,wall:!0,up:1.1}},cuckoo(n,e){n.box(.6,.9,.25,0,0,-.1,"#7a5434"),n.box(.55,.55,.25,0,.95,-.05,"#8a5a36");for(let t of[-1,1])n.cbox(.45,.04,.32,t*.2,1.62,-.05,"#5a3a22",{rz:-t*.6});n.cyl(.17,.17,.02,0,1.2,.08,"#f6f2ea",{rx:Math.PI/2,center:!0,seg:16}),n.cbox(.012,.13,.01,0,1.24,.1,"#1d1b1c",{rz:.4}),n.box(.12,.1,.02,0,1.45,.08,"#2a1d18"),n.sphere(.04,0,1.47,.14,"#f2c94c",{seg:8});for(let t=0;t<4;t++)n.cbox(.06,.08,.01,-.18+t*.12,1.55,.09,"#5a9440",{rz:.6});for(let t of[-1,1])n.cyl(.01,.01,.4,t*.08,.5,0,"#c9a24a",{seg:4}),n.cyl(.04,.04,.12,t*.08,.38,0,"#5a3a22",{seg:6});return{w:.65,d:.35,h:1.75,wall:!0,up:1.1}},snowGlobe(n,e){n.cyl(.4,.48,.3,0,0,0,"#b3202c",{seg:18}),n.cyl(.42,.42,.05,0,.28,0,we,{seg:18,...fe}),n.sphere(.6,0,.82,0,"#e8f4ff",{seg:22,opacity:.3,roughness:.02}),n.cyl(.42,.42,.04,0,.32,0,"#f6f9fc",{seg:18}),Ql(n,"pine",.5,e.seed,-.12,.35,0),n.box(.2,.18,.18,.18,.35,.05,"#c46a3a");let t=Me(e.seed);for(let i=0;i<18;i++)n.sphere(.018,(t()-.5)*.7,.45+t()*.7,(t()-.5)*.7,"#ffffff",{seg:4,shadow:!1});return{w:1.2,d:1.2,h:1.45,up:1.2}},irori(n,e){n.box(1.2,.08,1.2,0,0,0,"#3a2a22"),n.box(.9,.1,.9,0,0,0,"#cfc6b0"),n.box(.8,.02,.8,0,.09,0,"#6e665a");for(let t=0;t<4;t++)n.cbox(.4,.06,.06,0,.13,0,"#5a3420",{ry:t*.8});return fr(n,0,.12,0,1,"#ff9a3a",1.6),n.cyl(.02,.02,1.4,0,.5,0,"#1d1716",{seg:6}),n.cbox(.4,.06,.1,0,1.3,0,"#5a3420"),qe(n,[[0,0],[.15,.03],[.17,.12],[.1,.2],[0,.21]],"#2a2a2e",{seg:14,metalness:.3},0,.42,0),{w:1.2,d:1.2,h:1.5,up:1.3}},brazier(n,e){let t=e.c??"#b8862b";for(let i=0;i<3;i++)n.cbox(.05,.85,.05,Math.cos(i*2.1)*.22,.42,Math.sin(i*2.1)*.22,t,{rz:Math.cos(i*2.1)*.25,rx:-Math.sin(i*2.1)*.25,...fe});qe(n,[[.1,0],[.35,.1],[.42,.22],[.38,.24],[0,.18]],t,{seg:16,...fe},0,.75,0);for(let i=0;i<5;i++)n.sphere(.07,Math.cos(i*1.25)*.15,.95,Math.sin(i*1.25)*.15,"#3a1a10",{seg:6,...be("#ff5a1a",.6)});return fr(n,0,.92,0,1.4,"#ff9a3a",2),{w:.95,d:.95,h:1.4,up:1.3}},cannon(n,e){let t=e.c??"#2a2a2e",i=e.cart??"#6b4a34";n.box(.7,.3,1.2,0,.15,0,i);for(let r of[-1,1])for(let a of[-1,1])n.cyl(.2,.2,.08,r*.4,.2,a*.4,Ue(i,-.1),{rz:Math.PI/2,center:!0,seg:14});let s=qe(n,[[.2,0],[.22,.2],[.17,1.2],[.2,1.25],[.12,1.3],[0,1.3]],t,{seg:16,metalness:.5,roughness:.4});if(s.rotateX(Math.PI/2-.25),s.translate(0,.55,-.45),e.stripes)for(let r=0;r<3;r++)n.cyl(.215,.215,.08,0,.6+r*.12,-.2+r*.3,"#f2c94c",{rx:Math.PI/2-.25,center:!0,seg:16});for(let r=0;r<4;r++)n.sphere(.1,.55+r%2*.1,.1+Math.floor(r/2)*.12,.5,"#1d1b1c",{seg:10});return{w:1,d:1.5,h:1,wall:!0,up:1.2}},potStove(n,e){let t=e.c??"#2a2a2e";qe(n,[[.25,0],[.32,.15],[.36,.55],[.3,.85],[.2,.9],[0,.9]],t,{seg:18,metalness:.4},0,.1,0);for(let i=0;i<4;i++)n.cbox(.05,.14,.05,Math.cos(i*1.57+.78)*.25,.05,Math.sin(i*1.57+.78)*.25,t);if(n.box(.2,.18,.02,0,.35,.34,"#ff7a1a",be("#ff5a1a",1.4)),n.cyl(.08,.08,1.2,0,1,-.05,t,{seg:12,metalness:.4}),qe(n,[[0,0],[.1,.02],[.12,.16],[.06,.24],[0,.25]],"#c27a4a",{seg:12,metalness:.5},.15,1,.1),yt(n,"#ff8a3a",1.4,0,.45,.5,3),e.coal){n.cyl(.15,.13,.25,.5,0,.2,"#3a3a3e",{seg:10});for(let i=0;i<5;i++)n.sphere(.05,.5+i%2*.05,.25,.18+i*.02,"#1d1b1c",{seg:5})}return{w:1,d:.8,h:2.2,wall:!0,up:1.1}},volcano(n,e){qe(n,[[.7,0],[.6,.3],[.35,.8],[.2,.95],[.12,.85],[0,.82]],"#4a3a40",{seg:12,flat:!0}),n.cyl(.13,.13,.02,0,.87,0,"#ff5a1a",be("#ff5a1a",2));for(let t=0;t<3;t++)n.cbox(.06,.4,.04,Math.cos(t*2)*.35,.55,Math.sin(t*2)*.35,"#ff7a1a",{...be("#ff5a1a",1.4),rz:Math.cos(t*2)*.6,rx:-Math.sin(t*2)*.6});for(let t=0;t<5;t++)n.sphere(.08+t*.02,(t%2-.5)*.15,1.05+t*.13,0,"#e8e8f0",{opacity:.4,seg:8,shadow:!1});return yt(n,"#ff6a2a",2,0,1.1,0,3.5),{w:1.4,d:1.4,h:1.2,up:1.3}},hearth(n,e){let t=e.c??"#8e8a82";n.box(1.6,1.4,.5,0,0,-.1,t,{material:mt("stone",t,Ue(t,-.2),2,2)}),n.box(1,.9,.3,0,0,.05,"#1a1412"),n.box(1.8,.1,.6,0,1.4,-.1,"#5a3420");for(let i=0;i<3;i++)n.cbox(.6,.1,.1,0,.06,.1,"#5a3420",{ry:i*.6});fr(n,0,.1,.1,1.5,"#ff9a3a",2.4),n.cbox(.03,.6,.03,0,.75,.1,"#2a2a2e"),qe(n,[[0,0],[.15,.03],[.18,.18],[.15,.24],[0,.22]],"#2a2a2e",{seg:14,metalness:.3},0,.4,.1);for(let i=0;i<3;i++)n.sphere(.05,-.45+i*.1,1.55,-.1,"#e8dcc0",{seg:6});return{w:1.8,d:.7,h:1.6,wall:!0,up:1.1}},firePit(n,e){let t=Me(e.seed);for(let i=0;i<10;i++){let s=i/10*Math.PI*2;n.sphere(.13,Math.cos(s)*.45,.07,Math.sin(s)*.45,Ue("#8e8a82",(t()-.5)*.15),{sy:.7,seg:7,flat:!0})}for(let i=0;i<4;i++)n.cbox(.55,.08,.08,0,.1+i*.03,0,"#5a3420",{ry:i*.8,rz:.15});if(fr(n,0,.12,0,1.6,"#ff9a3a",2.2),e.spit){for(let i of[-1,1])n.cbox(.04,.8,.04,i*.55,.4,0,"#5a3420");n.cyl(.02,.02,1.2,0,.75,0,"#3a2a1e",{rz:Math.PI/2,center:!0,seg:6}),n.sphere(.15,0,.75,0,"#a8562a",{sy:.7,seg:10})}if(e.logs)for(let i=0;i<2;i++)n.cyl(.12,.12,.8,(i?1:-1)*.75,.12,0,"#6b4a34",{rx:Math.PI/2,center:!0,seg:10});return{w:e.logs?1.8:1.2,d:1.2,h:1,up:1.3}},reactor(n,e){let t=e.c??"#3fe0ff";n.cyl(.6,.65,.3,0,0,0,"#5a6474",{seg:8,metalness:.5}),n.cyl(.32,.32,1.1,0,.3,0,t,{seg:18,opacity:.55,...be(t,1.6)});for(let i=0;i<4;i++)n.cyl(.36,.36,.06,0,.4+i*.25,0,"#9aa6b4",{seg:18,metalness:.7});n.cyl(.45,.4,.2,0,1.4,0,"#5a6474",{seg:8,metalness:.5});for(let i=0;i<4;i++)n.cbox(.08,1.2,.08,Math.cos(i*1.57)*.5,.75,Math.sin(i*1.57)*.5,"#ffcf3a",{metalness:.4});return yt(n,t,2,0,.9,0,4),{w:1.3,d:1.3,h:1.6,up:1.2}},breadOven(n,e){let t=e.c??"#c27a4a";n.box(1.3,.6,1,0,0,0,"#a09682",{material:mt("stone","#a09682","#7a7266",2,1)}),qe(n,[[.6,0],[.55,.3],[.35,.55],[0,.65]],t,{seg:18},0,.6,-.05),n.cyl(.25,.25,.1,0,.75,.45,"#1a1412",{rx:Math.PI/2,center:!0,seg:14,t0:-Math.PI/2,tl:Math.PI}),n.sphere(.1,0,.7,.4,"#ff8a3a",be("#ff5a1a",1.6)),n.cyl(.08,.08,.5,.3,1,-.25,t,{seg:10});for(let i=0;i<3;i++)n.sphere(.1,-.4+i*.18,.66,.38,"#d9a066",{sy:.55,seg:10});return n.cbox(.05,.05,1,.55,.65,.5,"#a8703f",{rx:-.6}),yt(n,"#ff8a3a",1.2,0,.8,.7,3),{w:1.3,d:1.1,h:1.5,wall:!0,up:1.1}},photoBooth(n,e){n.box(1,1.9,1,0,0,-.05,"#ff4d8d",{round:.04}),n.box(.7,1.4,.02,-.08,.3,.46,"#2a2240"),n.box(.6,1.4,.04,.12,.3,.48,"#b06ad8",{material:mt("stripes","#b06ad8","#f2c94c",2,1)});for(let t=0;t<4;t++)n.box(.18,.16,.02,.38,.2+t*.2,.47,"#f6f2ea");n.box(.8,.25,.04,0,1.6,.47,"#f2c94c",be("#f2c94c",.6));for(let t=0;t<8;t++)n.sphere(.035,-.4+t*.115,1.9,.47,"#fff2c8",be("#ffd36a",1.8));return{w:1,d:1.05,h:1.95,wall:!0,up:1}},kamado(n,e){n.box(1.5,.75,.7,0,0,0,"#d8cbb0",{material:mt("plain","#d8cbb0","#b8a888",1,1)}),n.box(1.55,.06,.75,0,.75,0,"#5a3420");for(let t of[-1,1])n.cyl(.18,.18,.2,t*.4,.3,.33,"#1a1412",{rx:Math.PI/2,center:!0,seg:14,t0:-Math.PI/2,tl:Math.PI}),n.sphere(.07,t*.4,.28,.32,"#ff8a3a",be("#ff5a1a",1.5)),qe(n,[[0,0],[.2,0],[.22,.14],[.18,.2],[0,.18]],"#2a2a2e",{seg:14,metalness:.3},t*.4,.81,0),n.cyl(.21,.21,.04,t*.4,1.01,0,"#8a5a36",{seg:14});return yt(n,"#ff8a3a",1,0,.4,.6,3),{w:1.55,d:.75,h:1.1,wall:!0,up:1.05}},bar(n,e){let t=e.c??"#6b3a22",i=e.top??"#4a2a18",s=Me(e.seed);n.box(1.8,1,.6,0,0,0,t);for(let r=0;r<4;r++)n.frame(.38,.65,.025,-.65+r*.43,.15,.305,Ue(t,-.12),.02);n.box(1.9,.06,.7,0,1,0,i,e.zinc?{metalness:.7,roughness:.3}:{}),n.cyl(.025,.025,1.85,0,.12,.36,we,{rz:Math.PI/2,center:!0,...fe});for(let r=0;r<5;r++){let a=-.7+r*.35,o=ot(s,["#3f7a4a","#7a2a2a","#c9a24a","#2f5d8a"]);qe(n,[[0,0],[.05,0],[.05,.18],[.02,.25],[.015,.32],[0,.32]],o,{seg:10,opacity:.85},a,1.06,-.15)}for(let r=0;r<3;r++)n.cyl(.04,.035,.12,-.3+r*.3,1.06,.15,"#d8e8ee",{seg:10,opacity:.6});return{w:1.9,d:.75,h:1.4,wall:!0,up:1.05,spots:[[.6,1.06,.15]]}},steamers(n,e){n.box(1.6,.85,.6,0,0,0,"#7a1018"),n.box(1.65,.05,.65,0,.85,0,"#1d1716",{roughness:.3}),ry(n,.9);for(let t=0;t<3;t++)n.cbox(.25,.25,.02,-.55+t*.55,.45,.305,we,{...fe,ry:.78,rx:0});return{w:1.65,d:.65,h:1.3,wall:!0,up:1.05}},oysterBank(n,e){let t=Me(e.seed);n.cbox(1.6,.6,.7,0,.3,0,"#8ea29e",{round:.2});for(let i=0;i<12;i++){let s=(t()-.5)*1.3,r=(t()-.5)*.5;qe(n,[[0,0],[.11,.01],[.12,.04],[0,.05]],ot(t,["#c8bfb8","#a8a098","#e8e0d8"]),{seg:9},s,.6,r),i%4===0&&n.sphere(.03,s,.66,r,"#fbf6ff",{roughness:.1,metalness:.3,seg:8})}return{w:1.6,d:.75,h:.75,wall:!0,up:1.1}},alembic(n,e){n.box(1.6,.85,.6,0,0,0,"#3a2a30"),n.box(1.65,.05,.65,0,.85,0,"#2a1d20"),qe(n,[[0,0],[.18,.02],[.22,.2],[.12,.34],[.05,.4],[.05,.5],[0,.5]],"#c27a4a",{seg:14,metalness:.6,roughness:.3},-.4,.9,0),n.cyl(.02,.02,.8,0,1.35,0,"#c27a4a",{rz:1.2,center:!0,metalness:.6}),qe(n,[[0,0],[.12,.02],[.13,.12],[.04,.22],[.03,.3],[0,.3]],"#7cff5a",{seg:12,opacity:.7,...be("#7cff5a",.6)},.4,.9,0),n.cyl(.1,.12,.08,-.4,.88,0,"#ff7a1a",be("#ff5a1a",1.4));for(let t=0;t<4;t++)qe(n,[[0,0],[.04,0],[.04,.1],[.015,.14],[0,.14]],["#b56ad8","#5aa9e6","#e8492c","#f2c94c"][t],{seg:8,opacity:.8},.1+t*.12,.9,.2);return yt(n,"#7cff5a",.9,.4,1.2,.2,2.5),{w:1.65,d:.65,h:1.45,wall:!0,up:1.05}},anvil(n,e){return n.cyl(.3,.35,.45,0,0,0,"#6b4a34",{seg:12}),n.box(.25,.2,.3,0,.45,0,"#3a3a3e",{metalness:.5}),n.box(.7,.15,.3,.05,.65,0,"#3a3a3e",{metalness:.5,roughness:.35}),n.cyl(0,.13,.35,.55,.72,0,"#3a3a3e",{rz:Math.PI/2,center:!0,seg:10,metalness:.5}),n.cbox(.05,.4,.05,-.15,.85,.1,"#6b4a34",{rz:1.2}),n.box(.2,.08,.14,-.35,.8,.1,"#5a5a62",{metalness:.6}),n.box(.8,.6,.6,-.2,0,-.6,"#8e8a82",{material:mt("stone","#8e8a82","#5e5a52",1,1)}),n.box(.6,.05,.45,-.2,.6,-.6,"#3a1a10",be("#ff5a1a",.9)),yt(n,"#ff7a3a",1.2,-.2,.9,-.6,3),{w:1.2,d:1.3,h:1,wall:!0,up:1.2}},stonePile(n,e){let t=Me(e.seed);for(let i=0;i<12;i++)n.cbox(.2+t()*.15,.08,.15+t()*.1,(t()-.5)*1,.05+t()*.15,(t()-.5)*.5,ot(t,["#5a5a62","#3a3a42","#7a7a82"]),{ry:t()*3,rz:(t()-.5)*.6,flat:!0});n.sphere(.35,.3,.2,-.2,"#8e8a82",{sy:.6,seg:8,flat:!0});for(let i=0;i<3;i++)n.cbox(.08,.3,.03,-.4+i*.12,.25,.25,"#3a3a42",{rz:.3,flat:!0});return{w:1.2,d:.8,h:.45,wall:!0,up:1.3}},popcorn(n,e){n.box(1,.9,.7,0,0,0,"#c0283a",{material:mt("stripes","#c0283a","#f6f2ea",2,1)}),n.box(.9,.7,.6,0,.9,0,"#e8f4ff",{opacity:.4,roughness:.05});let t=Me(e.seed);for(let i=0;i<40;i++)n.sphere(.04,(t()-.5)*.8,.95+t()*.3,(t()-.5)*.5,"#fff2c8",{seg:5});n.box(1,.1,.7,0,1.6,0,"#c0283a");for(let i=0;i<4;i++){let s=-.3+i*.2;n.cyl(.07,.05,.18,s,.9,.45,"#f6f2ea",{seg:8})}for(let i of[-1,1])n.cyl(.2,.2,.05,i*.5,.2,0,"#2a2523",{rz:Math.PI/2,center:!0,seg:12});return{w:1.1,d:.8,h:1.7,wall:!0,up:1.05}},dispenserWall(n,e){n.box(1.6,1.5,.55,0,0,0,"#cfd6de",{round:.04,metalness:.3});for(let t=0;t<3;t++){n.box(.4,.4,.02,-.5+t*.5,.85,.28,"#1b2230");for(let i=0;i<4;i++)n.box(.08,.08,.1,-.62+t*.5+i%2*.24,.9+Math.floor(i/2)*.15,.24,["#f2c94c","#7cc66a","#e8492c","#b06ad8"][i]);n.box(.3,.06,.25,-.5+t*.5,.45,.35,"#9aa6b4",{metalness:.5}),n.box(.1,.06,.01,-.5+t*.5,.7,.285,"#3fb6d9",be("#3fb6d9",1.4))}return{w:1.6,d:.7,h:1.5,wall:!0,up:1.05}},stall(n,e){let t=e.c??"#e8492c";n.box(1.6,.85,.7,0,0,0,"#a8703f");for(let i of[-1,1])n.cyl(.03,.03,1.9,i*.78,0,.3,"#5a3420",{seg:6});n.cbox(1.8,.04,.95,0,1.95,.2,t,{rx:.25,material:mt("stripes",t,"#f6f2ea",3,1)});for(let i=0;i<3;i++){n.cyl(.22,.2,.08,-.5+i*.5,.85,0,"#3a3a3e",{seg:14,metalness:.4});for(let s=0;s<4;s++)n.sphere(.05,-.5+i*.5+Math.cos(s*1.6)*.1,.96,Math.sin(s*1.6)*.1,["#e0a94a","#a8562a","#7cae4f"][i],{sy:.6,seg:6})}for(let i=0;i<5;i++)n.sphere(.06,-.6+i*.3,1.75,.55,["#e8492c","#f2c94c","#5aa9e6"][i%3],be(["#e8492c","#f2c94c","#5aa9e6"][i%3],1));return yt(n,"#ffcf8a",1,0,1.6,.3,3),{w:1.8,d:1,h:2.1,wall:!0,up:1}},chocFountain(n,e){n.cyl(.45,.5,.65,0,0,0,"#f6f2ea",{seg:16});for(let t=0;t<3;t++){let i=.38-t*.1,s=.7+t*.28;n.cyl(i,i*.7,.08,0,s,0,"#d9d4cc",{seg:18,metalness:.6,roughness:.25}),n.cyl(i+.01,i+.01,.2,0,s-.2,0,"#5a2e1a",{seg:18,opacity:.85})}n.cyl(.04,.04,.95,0,.7,0,"#d9d4cc",{seg:8,metalness:.6}),n.sphere(.08,0,1.6,0,"#5a2e1a",{seg:10});for(let t=0;t<8;t++){let i=t*.785;n.sphere(.05,Math.cos(i)*.45,.7,Math.sin(i)*.45,["#e8492c","#f2d46a","#f6f2ea"][t%3],{seg:6})}return{w:1,d:1,h:1.7,up:1.3}},trunk(n,e){let t=e.w??1.1,i=e.c??"#7a4a2a",s=e.band??"#3a3a3e",r=Me(e.seed);n.box(t,.5,.6,0,0,0,i,{round:.02}),e.lid==="round"?n.cyl(.3,.3,t,0,.5,0,Ue(i,.05),{rz:Math.PI/2,center:!0,seg:16,t0:0,tl:Math.PI}):n.box(t+.02,.12,.62,0,.5,0,Ue(i,.05),{round:.02});for(let a of[-.35,.35])n.box(.06,.66,.64,a*t,0,0,s,s===we?fe:{metalness:.4});if(n.box(.12,.14,.04,0,.4,.31,we,fe),e.open){n.cbox(t,.06,.6,0,.85,-.3,Ue(i,.05),{rx:-1.2});for(let a=0;a<25;a++)n.cyl(.05,.05,.015,(r()-.5)*t*.8,.5+r()*.1,(r()-.5)*.4,we,{seg:10,...fe});for(let a=0;a<4;a++)n.sphere(.05,(r()-.5)*.6,.6,(r()-.5)*.3,ot(r,["#c0283a","#2f6fb3","#3f9a5a","#fbf6ff"]),{roughness:.1,metalness:.3,seg:8});for(let a=0;a<8;a++)n.cyl(.05,.05,.015,(r()-.5)*1.2,0,.45+r()*.2,we,{seg:10,...fe})}if(e.stickers)for(let a=0;a<4;a++)n.box(.15,.12,.01,-t/2+.2+a*.25,.15+a%2*.15,.305,ot(r,["#e8492c","#f2c94c","#5aa9e6","#f6f2ea"]),{rz:(r()-.5)*.4});if(e.top)for(let a=0;a<3;a++)n.sphere(.07,-.2+a*.2,.68,0,e.top,{sy:1.2,seg:8});return{w:t+.05,d:.65,h:.7,wall:!0,up:1.2}},sarcophagus(n,e){let t="#d9b44a";mn(n,[[-.3,-1],[.3,-1],[.38,-.4],[.3,1],[-.3,1],[-.38,-.4]],.5,t,0,{bevel:.03,metalness:.6,roughness:.35}),n.sphere(.25,0,.55,-.65,t,{sy:.5,seg:12,metalness:.6,roughness:.35});for(let s=0;s<6;s++)n.box(.55-Math.abs(s-2.5)*.04,.02,.06,0,.52,-.3+s*.18,s%2?"#2f5e8c":"#a33b2b");n.cbox(.4,.04,.12,0,.6,-.5,"#2f5e8c");for(let s of[-1,1])n.sphere(.03,s*.08,.66,-.7,"#1d1b1c",{seg:6});return{w:.8,d:2,h:.75,wall:!0,up:1.1}},safe(n,e){return n.box(.85,1.1,.7,0,.1,0,"#2a3a2e",{round:.03,metalness:.3}),mi(n,.75,.6,.1,we,.04,fe),n.box(.6,.8,.02,0,.25,.35,"#1d2a22"),n.frame(.55,.75,.02,0,.27,.36,we,.02,fe),n.cyl(.08,.08,.04,0,.75,.37,"#cfd6de",{rx:Math.PI/2,center:!0,seg:14,metalness:.8}),n.cbox(.2,.025,.04,.15,.55,.38,we,fe),n.box(.8,.12,.5,0,1.2,0,"#7a4a2a"),{w:.9,d:.75,h:1.35,wall:!0,up:1.2}},locker(n,e){let t=e.c??"#9aa6b4",i=3;for(let s=0;s<i;s++){n.box(.42,1.7,.5,-.44+s*.44,0,0,s%2?Ue(t,-.05):t,{metalness:.35});for(let r=0;r<4;r++)n.box(.25,.02,.01,-.44+s*.44,1.3+r*.06,.255,Ue(t,-.2));n.box(.04,.12,.03,-.3+s*.44,.85,.26,"#5a6474",{metalness:.6})}if(e.light)for(let s=0;s<i;s++)n.box(.06,.03,.01,-.44+s*.44,1.05,.26,s%2?"#7cff8a":"#3fb6d9",be(s%2?"#7cff8a":"#3fb6d9",1.5));if(e.skis)for(let s=0;s<2;s++)n.cbox(.07,1.6,.03,.75+s*.08,.85,.1,s?"#c0392b":"#2f5d8a",{rz:-.1});return{w:1.4,d:.55,h:1.7,wall:!0,up:1.1}},armor(n,e){n.box(.6,.15,.6,0,0,0,"#5a5a62");let t={metalness:.75,roughness:.3};for(let i of[-1,1])n.cyl(.08,.1,.65,i*.12,.15,0,"#9aa6b4",t),n.sphere(.12,i*.26,1.22,0,"#9aa6b4",{...t,sy:.8}),n.cyl(.06,.07,.5,i*.3,.75,0,"#9aa6b4",t);return qe(n,[[.15,0],[.24,.1],[.27,.35],[.22,.5],[.1,.55],[0,.55]],"#9aa6b4",{seg:14,...t},0,.8,0),n.sphere(.17,0,1.55,0,"#9aa6b4",{...t,sy:1.2}),n.box(.2,.03,.05,0,1.55,.15,"#1d1b1c"),n.cyl(0,.04,.2,0,1.75,0,e.plume??"#7a1f2a",{seg:8}),n.cbox(.06,1.6,.03,.42,.85,.05,"#cfd6de",{metalness:.8}),n.cbox(.22,.04,.05,.42,.25,.05,we,fe),n.cbox(.4,.5,.05,-.35,.95,.18,e.shield??"#2f5d8a",{round:.05}),{w:1,d:.65,h:1.85,wall:!0,up:1.1}},woodpile(n,e){let t=Me(e.seed);for(let i=0;i<4;i++)for(let s=0;s<6-i;s++)n.cyl(.11,.11,.7,-.55+s*.22+i*.11,.11+i*.19,0,Ue("#8a5a36",(t()-.5)*.15),{rx:Math.PI/2,center:!0,seg:9});return n.cbox(.05,.6,.05,.55,.3,.3,"#6b4a34",{rz:-.3}),n.cbox(.2,.15,.04,.68,.62,.3,"#8e8a82",{rz:-.3,flat:!0}),{w:1.3,d:.75,h:.85,wall:!0,up:1.2}},basket(n,e){qe(n,[[.4,0],[.55,.2],[.6,.55],[.55,.58],[0,.5]],e.c??"#c9a46a",{seg:18,material:mt("straw",e.c??"#c9a46a","#a8803e",2,1)}),n.cyl(.6,.6,.06,0,1.15,0,"#a8803e",{rz:Math.PI/2,center:!0,seg:20,t0:0,tl:Math.PI}),n.cyl(.55,.55,.02,0,.5,0,"#7cc66a",{seg:18});let t=Me(e.seed);for(let i=0;i<8;i++)n.sphere(.1,(t()-.5)*.7,.62,(t()-.5)*.7,ot(t,["#f2a6c0","#9ad0e0","#f6e08a","#b7d98a","#c8a0e0"]),{sy:1.3,seg:10});return n.cbox(.4,.1,.02,.4,.4,.45,"#f2a6c0",{ry:.6,round:.02}),{w:1.2,d:1.2,h:1.25,wall:!0,up:1.2}},wardrobe(n,e){let t=e.c??"#6a1f6e",i=we;n.box(1.2,1.8,.55,0,0,0,t),n.box(1.3,.12,.6,0,1.8,0,i,fe);for(let s of[-1,1])n.frame(.5,1.5,.03,s*.29,.15,.28,i,.02,fe),n.sphere(.03,s*.05,.9,.3,i,fe);return n.cbox(.55,1.6,.04,.85,.85,.35,t,{ry:-1}),n.cbox(.4,.9,.12,.35,.6,.35,"#c0283a",{round:.05}),n.cbox(.25,.12,.05,.35,1.1,.42,"#f6f2ea",{round:.03}),{w:1.5,d:.75,h:1.95,wall:!0,up:1.1}},sack(n,e){n.sphere(.5,0,.45,0,e.c??"#b3202c",{sy:.9,seg:16}),qe(n,[[.12,0],[.2,.15],[.12,.2],[0,.18]],e.c??"#b3202c",{seg:12},0,.85,0),n.cyl(.13,.13,.05,0,.88,0,we,{seg:12,...fe});let t=Me(e.seed);for(let i=0;i<4;i++)n.box(.25,.22,.25,.35+i%2*.25,Math.floor(i/2)*.22,.35-i%2*.3,ot(t,["#2f6f7e","#f2c94c","#3f7a4a","#c46aa8"]),{ry:t()});return{w:1.4,d:1.2,h:1.1,wall:!0,up:1.2}},andon(n,e){n.box(.35,.05,.35,0,0,0,"#1d1716");for(let t of[-1,1])for(let i of[-1,1])n.box(.03,.85,.03,t*.16,.05,i*.16,"#1d1716");return n.box(.3,.6,.3,0,.25,0,e.c??"#fff4dc",be(e.c??"#ffe8b0",1)),n.box(.36,.03,.36,0,.88,0,"#1d1716"),yt(n,"#ffd8a0",1.8,0,.6,0,4),{w:.4,d:.4,h:.95,up:1.6}},lanternPost(n,e){let t=e.c??"#d8263f",i=e.post??"#2a2523";n.cyl(.18,.22,.06,0,0,0,i,{seg:12}),n.cyl(.025,.03,1.5,0,.06,0,i,{seg:8}),n.cbox(.5,.03,.03,.22,1.52,0,i),n.cyl(.006,.006,.15,.4,1.38,0,i,{seg:4}),qe(n,[[.04,0],[.18,.06],[.22,.2],[.18,.34],[.04,.4],[0,.4]],t,{seg:16,...be(t,.9)},.4,.98,0);for(let s of[.98,1.38])n.cyl(.06,.06,.03,.4,s-.01,0,e.cap??"#1d1716",{seg:10});return e.tassel&&n.cyl(.015,.03,.18,.4,.8,0,e.tassel,{seg:6}),yt(n,"#ffb880",1.6,.4,1.15,0,4),{w:.75,d:.5,h:1.6,up:1.4}},candelabra(n,e){let t=e.c??we,i=e.arms??5,s=t===we?fe:{metalness:.6,roughness:.35};n.cyl(.18,.24,.06,0,0,0,t,{seg:12,...s}),qe(n,[[.06,0],[.04,.4],[.07,.5],[.035,.9],[.06,1],[.03,1.35],[0,1.35]],t,{seg:10,...s});for(let r=0;r<i;r++){let a=r/i*Math.PI*2,o=.3;n.cbox(o,.025,.025,Math.cos(a)*o/2,1.3,Math.sin(a)*o/2,t,{ry:-a,...s}),n.cyl(.04,.03,.05,Math.cos(a)*o,1.3,Math.sin(a)*o,t,{seg:8,...s}),n.cyl(.018,.018,.16,Math.cos(a)*o,1.35,Math.sin(a)*o,e.wax??"#f6f2ea",{seg:6}),n.sphere(.022,Math.cos(a)*o,1.54,Math.sin(a)*o,"#ffcf7a",be("#ffb340",1.8))}if(e.drops)for(let r=0;r<8;r++)n.sphere(.03,Math.cos(r*.785)*.2,1.15,Math.sin(r*.785)*.2,"#e8f4ff",{roughness:.05,metalness:.3,seg:6});return e.web&&n.cbox(.4,.3,.005,.15,1.1,0,"#e8e8f0",{opacity:.35,rz:.5,shadow:!1}),yt(n,"#ffb860",1.8,0,1.6,0,4),{w:.7,d:.7,h:1.6,up:1.5}},oilLamp(n,e){let t=e.c??"#b8862b";n.cyl(.18,.22,.05,0,0,0,t,{seg:10,...fe});for(let i=0;i<3;i++)n.cbox(.03,.4,.03,Math.cos(i*2.1)*.08,.2,Math.sin(i*2.1)*.08,t,{rz:Math.cos(i*2.1)*.3,rx:-Math.sin(i*2.1)*.3,...fe});n.cyl(.025,.03,.9,0,.35,0,t,{seg:8,...fe}),n.cyl(.15,.1,.05,0,1.25,0,t,{seg:12,...fe});for(let i=0;i<3;i++){let s=i*2.1;qe(n,[[0,0],[.06,.01],[.07,.04],[.03,.07],[0,.06]],e.clay??"#c27a4a",{seg:10},Math.cos(s)*.12,1.3,Math.sin(s)*.12),n.sphere(.025,Math.cos(s)*.19,1.38,Math.sin(s)*.19,"#ffcf7a",be("#ffb340",1.8))}return yt(n,"#ffb860",1.6,0,1.45,0,4),{w:.5,d:.5,h:1.45,up:1.6}},shipLantern(n,e){let t=e.post??"#5a3420",i=e.c??"#2a2a2e";n.cyl(.05,.06,1.3,0,0,0,t,{seg:8}),n.box(.35,.05,.35,0,0,0,t),n.cbox(.4,.05,.05,.18,1.28,0,t);let s=.33;n.cyl(.13,.13,.04,s,.85,0,i,{seg:8,metalness:.5}),n.cyl(.11,.11,.26,s,.89,0,"#fff0c0",{seg:8,...be("#ffcf7a",1.2),opacity:.85});for(let r=0;r<4;r++)n.cbox(.015,.28,.015,s+Math.cos(r*1.57)*.11,1.02,Math.sin(r*1.57)*.11,i,{metalness:.5});return n.cyl(0,.14,.12,s,1.15,0,i,{seg:8,metalness:.5}),n.cyl(.03,.03,.1,s,1.25,0,i,{rz:Math.PI/2,center:!0,seg:8,t0:0,tl:Math.PI}),yt(n,"#ffc070",1.6,s,1,0,4),{w:.6,d:.4,h:1.35,up:1.6}},streetLamp(n,e){let t=e.c??"#2a3a2e";return n.cyl(.18,.24,.3,0,0,0,t,{seg:10,metalness:.4}),qe(n,[[.06,0],[.04,1.2],[.07,1.3],[.035,2.1],[0,2.1]],t,{seg:10,metalness:.4},0,.3,0),n.cyl(.16,.1,.35,0,2.3,0,"#fff0c0",{seg:6,...be("#ffcf7a",1.2),opacity:.85}),n.cyl(0,.22,.15,0,2.65,0,t,{seg:6,metalness:.4}),n.sphere(.04,0,2.82,0,t,{seg:6}),yt(n,"#ffc070",2,0,2.4,0,5),{w:.6,d:.6,h:2.85,up:1}},neon(n,e){let t=e.c??"#ff3ec8";n.box(.4,.06,.4,0,0,0,"#2a2e36",{metalness:.5}),n.cyl(.04,.04,1.6,0,.06,0,"#cfd6de",{seg:8,metalness:.6});for(let i=0;i<3;i++)n.cyl(.03,.03,.9,(i-1)*.12,.5+i*.25,0,[t,"#3fe0ff","#7cff8a"][i],{seg:8,...be([t,"#3fe0ff","#7cff8a"][i],2.2),rz:.3*(i-1)});return yt(n,t,1.6,0,1.2,0,4),{w:.6,d:.45,h:1.7,up:1.5}},torch(n,e){return n.cyl(.18,.22,.12,0,0,0,"#5a5a62",{seg:9}),n.cyl(.04,.05,1.3,0,.1,0,e.c??"#5a3420",{seg:8}),qe(n,[[.05,0],[.11,.15],[.12,.2],[0,.18]],"#3a3a3e",{seg:10,metalness:.4},0,1.35,0),fr(n,0,1.52,0,1,"#ff9a3a",2),{w:.45,d:.45,h:1.85,up:1.6}},spotlight(n,e){for(let t=0;t<3;t++)n.cbox(.04,1.3,.04,Math.cos(t*2.1)*.22,.6,Math.sin(t*2.1)*.22,"#2a2523",{rz:Math.cos(t*2.1)*.2,rx:-Math.sin(t*2.1)*.2});return n.cyl(.22,.16,.45,0,1.25,.05,"#c0283a",{rx:1.1,center:!0,seg:14,metalness:.4}),n.cyl(.2,.2,.02,0,1.15,.25,"#fff4c8",{rx:1.1,center:!0,seg:14,...be("#fff4c8",2.4)}),yt(n,"#fff0d0",2.2,0,1.2,.5,5),{w:.7,d:.7,h:1.5,up:1.5}},jackLantern(n,e){n.sphere(.4,0,.35,0,"#ff7518",{sy:.85,seg:16});for(let t=0;t<8;t++)n.sphere(.28,Math.cos(t*.785)*.18,.35,Math.sin(t*.785)*.18,Ue("#ff7518",t%2*-.05),{sy:1.15,seg:10});n.cyl(.04,.06,.15,0,.68,0,"#3f6a32",{seg:6}),n.cbox(.3,.07,.04,0,.27,.42,"#ffcf3a",be("#ffb340",2));for(let t of[-1,1])n.cbox(.1,.1,.04,t*.13,.45,.4,"#ffcf3a",{...be("#ffb340",2),rz:.78});return yt(n,"#ff9a3a",1.6,0,.5,.5,3.5),{w:.95,d:.95,h:.85,up:1.6}},lightString(n,e){for(let i of[-1,1])n.cyl(.03,.04,1.5,i*.6,0,0,"#5a3420",{seg:8});let t=e.cols??["#ff4a4a","#ffcf3a","#3fe0ff","#7cff8a","#ff3ec8"];for(let i=0;i<11;i++){let s=i/10,r=-.6+s*1.2,a=1.45-Math.sin(s*Math.PI)*.35;n.sphere(.04,r,a,0,t[i%t.length],be(t[i%t.length],2))}for(let i=0;i<10;i++){let s=(i+.5)/10;n.cbox(.13,.008,.008,-.6+s*1.2,1.47-Math.sin(s*Math.PI)*.35,0,"#2a3a2a",{rz:Math.cos(s*Math.PI)*.8,shadow:!1})}return yt(n,"#ffd890",1.4,0,1.2,.3,4),{w:1.35,d:.3,h:1.55,up:1.3}},discoBall(n,e){for(let t=0;t<3;t++)n.cbox(.04,1.5,.04,Math.cos(t*2.1)*.2,.7,Math.sin(t*2.1)*.2,"#9aa6b4",{rz:Math.cos(t*2.1)*.15,rx:-Math.sin(t*2.1)*.15,metalness:.6});n.sphere(.3,0,1.65,0,"#e8eef4",{seg:10,flat:!0,metalness:.9,roughness:.15});for(let t=0;t<6;t++)n.sphere(.04,Math.cos(t)*.6,.02,Math.sin(t)*.6,["#ff4d8d","#3fe0ff","#f2c94c"][t%3],{sy:.2,...be(["#ff4d8d","#3fe0ff","#f2c94c"][t%3],2)});return yt(n,"#ff8ad8",1.6,0,1.6,0,4),{w:1,d:1,h:1.95,up:1.4}},firefly(n,e){n.cyl(.03,.05,1,0,0,0,"#6b4a34",{seg:6,rz:.1});for(let i=0;i<3;i++)n.cbox(.02,.3,.02,.05+i*.05,.75+i*.08,0,"#6b4a34",{rz:-.6});n.sphere(.12,.25,1.1,0,"#3a3a2a",{sy:1.4,seg:10}),n.sphere(.16,.25,.92,0,"#e8ff7a",{sy:1.2,seg:12,...be("#d8ff5a",2.2)});for(let i of[-1,1])n.cbox(.22,.01,.12,.25+i*.15,1.2,0,"#e8f4ff",{opacity:.5,rz:i*.4,shadow:!1});let t=Me(e.seed);for(let i=0;i<6;i++)n.sphere(.03,(t()-.5)*.8,.5+t()*.9,(t()-.5)*.6,"#e8ff7a",be("#d8ff5a",2.4));return yt(n,"#d8ff7a",1.6,.25,1,0,4),{w:.8,d:.6,h:1.4,up:1.5}},jellyfish(n,e){let t=e.c??"#d8a0ff";qe(n,[[0,0],[.32,.02],[.3,.15],[.18,.3],[0,.34]],t,{seg:18,opacity:.7,...be(t,1.4)},0,1.1,0);let i=Me(e.seed);for(let s=0;s<9;s++){let r=s/9*Math.PI*2;n.cbox(.02,.6+i()*.3,.02,Math.cos(r)*.2,.75,Math.sin(r)*.2,t,{opacity:.6,...be(t,1.2),rz:(i()-.5)*.3})}return n.cyl(.25,.3,.12,0,0,0,"#8ea29e",{seg:9,flat:!0}),yt(n,t,1.4,0,1.2,0,4),{w:.7,d:.7,h:1.45,up:1.5}},deco(n,e){return Ql(n,e.name,e.s??1.4,e.seed),e.pot&&n.cyl(.3,.24,.35,0,-.01,0,e.pot,{seg:14}),{w:e.w??1.2,d:e.d??1.2,h:e.h??1.8,up:e.up??1.3}},tree(n,e){let t=Me(e.seed),i=e.h??2.5,s=e.spread??1.75,r=i*.5,a=e.bark??"#6b4a34";n.cyl(.07,.13,r,0,0,0,a);for(let o=0;o<3;o++){let c=t()*Math.PI*2;n.cbox(.06,r*.5,.06,Math.cos(c)*.22,r*.85,Math.sin(c)*.22,a,{rz:Math.cos(c)*.6,rx:-Math.sin(c)*.6})}if(ft(n,{seed:e.seed,rx:s/2,ry:(i-r)*.6,palette:e.palette??"green",voxel:.15,flowers:e.flowers??null,flowerRate:e.rate??.08},0,r*.85,0),e.hang)for(let o=0;o<6;o++){let c=t()*6.28,l=.3+t()*.4;n.cyl(.005,.005,.3,Math.cos(c)*l,r*.85+.1,Math.sin(c)*l,"#f6f2ea",{seg:3,shadow:!1}),e.hang(n,Math.cos(c)*l,r*.85+.05,Math.sin(c)*l,t)}return n.cyl(.42,.45,.05,0,0,0,e.ground??"#8a6a4a",{seg:16}),{w:s,d:s,h:i,up:1}},willow(n,e){let t=Me(e.seed);n.cyl(.08,.15,1.4,0,0,0,"#6b5a44"),ft(n,{seed:e.seed,rx:.7,ry:.45,palette:"lime",voxel:.13},0,1.3,0);for(let i=0;i<22;i++){let s=i/22*Math.PI*2+t()*.2,r=.55+t()*.25;n.cbox(.05,1+t()*.4,.02,Math.cos(s)*r,1,Math.sin(s)*r,ot(t,["#7aa84a","#98bd50","#5a8a3a"]),{ry:-s,flat:!0})}return{w:1.7,d:1.7,h:2.2,up:1}},baobab(n,e){qe(n,[[.45,0],[.42,.4],[.38,1],[.42,1.4],[0,1.4]],"#a08a70",{seg:14});for(let t=0;t<6;t++){let i=t/6*Math.PI*2;n.cbox(.08,.6,.08,Math.cos(i)*.35,1.6,Math.sin(i)*.35,"#a08a70",{rz:Math.cos(i)*.8,rx:-Math.sin(i)*.8}),ft(n,{seed:e.seed+t,rx:.25,ry:.12,palette:"olive",voxel:.1},Math.cos(i)*.6,1.8,Math.sin(i)*.6)}return{w:1.6,d:1.6,h:2,up:1}},growTower(n,e){n.cyl(.25,.3,.1,0,0,0,"#9aa6b4",{seg:12,metalness:.5}),n.cyl(.18,.18,1.9,0,.1,0,"#eef2f6",{seg:12});for(let t=0;t<6;t++){let i=.3+t*.28,s=t*1.1;n.cyl(.08,.08,.1,Math.cos(s)*.2,i,Math.sin(s)*.2,"#cfd6de",{seg:8}),ft(n,{seed:e.seed+t,rx:.14,ry:.1,palette:t%2?"lime":"green",voxel:.05,flowers:t%3?null:"#ff3ec8",flowerRate:.3},Math.cos(s)*.28,i+.05,Math.sin(s)*.28)}return n.cyl(.03,.03,.4,0,2,0,"#3fe0ff",{seg:6,...be("#c08aff",2)}),yt(n,"#d8a0ff",1.2,0,2,0,3),{w:.8,d:.8,h:2.2,up:1.1}},xmasTree(n,e){n.box(.4,.3,.4,0,0,0,"#b3202c"),n.cyl(.06,.08,.4,0,.3,0,"#6b4a34",{seg:8});for(let s=0;s<4;s++)n.cyl(.08,.75-s*.16,.6,0,.5+s*.38,0,["#1f4d3a","#2a6046","#1f4d3a","#2a6046"][s],{seg:12});let t=Me(e.seed),i=["#c0283a","#f2c94c","#3f8adf","#f6f2ea"];for(let s=0;s<20;s++){let r=t(),a=.6+r*1.5,o=(.72-r*.6)*.95,c=t()*6.28;n.sphere(.05,Math.cos(c)*o,a,Math.sin(c)*o,i[s%4],{seg:8,...s%4===1?be("#ffd36a",1.4):{roughness:.2,metalness:.4}})}mn(n,[[0,-.17],[.05,-.05],[.17,-.05],[.07,.03],[.11,.16],[0,.08],[-.11,.16],[-.07,.03],[-.17,-.05],[-.05,-.05]],.05,we,2.25,{...be("#ffd36a",1.4)});for(let s=0;s<4;s++)n.box(.25,.2,.25,Math.cos(s*1.6)*.55,0,Math.sin(s*1.6)*.55,i[s],{ry:s});return yt(n,"#ffd890",1.6,0,1.4,.6,4),{w:1.6,d:1.6,h:2.45,up:1}},scarecrow(n,e){n.cyl(.04,.05,1.9,0,0,0,"#6b4a34",{seg:8}),n.cyl(.035,.035,1.2,0,1.35,0,"#6b4a34",{rz:Math.PI/2,center:!0,seg:8}),n.cbox(.5,.6,.22,0,1.15,0,"#a33b2b",{round:.05,material:mt("checker","#a33b2b","#3a2a22",2,2)});for(let t of[-1,1])n.cbox(.4,.14,.14,t*.4,1.35,0,"#a33b2b",{round:.04});n.sphere(.18,0,1.62,0,"#e8c070",{seg:12}),n.cyl(.3,.3,.03,0,1.75,0,"#c9a46a",{seg:14}),n.cyl(.12,.16,.2,0,1.75,0,"#c9a46a",{seg:12});for(let t of[-1,1])n.cbox(.05,.05,.02,t*.06,1.65,.17,"#1d1b1c",{rz:.78});for(let t=0;t<6;t++)n.cbox(.02,.15,.02,(t-2.5)*.07,.8,.02,"#e8c070",{rz:(t-2.5)*.1});return n.sphere(.07,.5,1.47,0,"#1d1b1c",{seg:8}),n.sphere(.4,.4,.2,.3,"#ff7518",{sy:.8,seg:12}),{w:1.2,d:.9,h:1.9,up:1.1}},tentPole(n,e){n.cyl(.08,.1,2.4,0,0,0,"#c0283a",{seg:10,material:mt("stripes","#c0283a","#f6f2ea",1,3)}),n.cyl(.4,.45,.15,0,0,0,"#5a3420",{seg:12}),n.sphere(.12,0,2.45,0,we,fe);for(let t=0;t<4;t++){let i=t*1.57;n.cbox(.02,.02,1.2,Math.cos(i)*.5,1.9,Math.sin(i)*.5,"#d8c8a8",{ry:-i+Math.PI/2,rx:.8})}return n.cbox(.4,.25,.01,.12,2.25,0,"#f2c94c",{rz:-.1}),{w:1,d:1,h:2.55,up:1}},flowerFloat(n,e){let t=Me(e.seed);n.box(1.5,.35,.9,0,.15,0,"#6a1f6e",{round:.05});for(let i of[-1,1])for(let s of[-1,1])n.cyl(.18,.18,.06,i*.55,.18,s*.45,we,{rz:Math.PI/2,center:!0,seg:14,...fe});for(let i=0;i<9;i++)ft(n,{seed:e.seed+i,rx:.25,ry:.2,palette:"blossom",voxel:.07,flowers:ot(t,["#f2c94c","#e0283a","#f6f2ea"]),flowerRate:.4},-.5+i%3*.5,.55+Math.floor(i/3)*.2,-.25+Math.floor(i/3)*.2);return n.sphere(.3,0,1.3,0,"#f2c94c",{seg:12}),n.cbox(.4,.15,.05,0,1.3,.28,"#f6f2ea",{round:.05}),{w:1.5,d:1,h:1.6,up:1.1}},fountain(n,e){let i=e.c??"#d8ccb2",s=e.water??"#5fa5b5";if(n.cyl(.85,.85+.05,.4,0,0,0,i,{seg:28}),n.cyl(.85-.12,.85-.12,.02,0,.34,0,s,{seg:28,roughness:.1,metalness:.2}),n.cyl(.14,.2,.9,0,.3,0,i,{seg:14}),n.cyl(.45,.25,.15,0,1.1,0,i,{seg:18}),n.cyl(.37,.37,.02,0,1.2,0,s,{seg:18,roughness:.1}),e.top==="swan")n.sphere(.16,0,1.33,0,"#f6f2ea",{sy:.7,seg:12}),n.cyl(.04,.05,.3,0,1.38,.1,"#f6f2ea",{rx:-.3,seg:8}),n.sphere(.06,0,1.68,.18,"#f6f2ea",{seg:8}),n.cbox(.04,.03,.08,0,1.68,.26,"#ff9a3a");else if(e.top==="cupid"){n.sphere(.1,0,1.4,0,"#f2e8e0",{seg:10}),n.sphere(.13,0,1.25,0,"#f2e8e0",{seg:10,sy:1.2});for(let r of[-1,1])n.cbox(.15,.2,.02,r*.15,1.3,-.08,"#f6f2ea",{rz:r*.5,round:.03});mn(n,ji(.3),.04,"#e5384f",1.55)}else if(e.top==="confetti"){let r=Me(e.seed);for(let a=0;a<30;a++)n.cbox(.05,.005,.03,(r()-.5)*1.2,.36+r()*1.2,(r()-.5)*1.2,ot(r,["#e0283a","#f2c94c","#3fa08a","#6a1f6e"]),{ry:r()*3,rz:r()*3,shadow:!1});n.sphere(.12,0,1.33,0,we,fe)}else n.sphere(.1,0,1.33,0,i);for(let r=0;r<3;r++)n.cyl(.09,.09,.012,Math.cos(r*2.2)*.5,.36,Math.sin(r*2.2)*.5,"#5a9440",{seg:10,t0:.3,tl:Math.PI*1.8});return{w:2*.85+.1,d:2*.85+.1,h:1.7,up:1}},well(n,e){let t=e.c??"#8e8a82",i="#6b4a34";n.cyl(.55,.6,.7,0,0,0,t,{seg:14,material:mt("stone",t,Ue(t,-.2),3,1)}),n.cyl(.45,.45,.02,0,.6,0,"#2a4a5a",{seg:14});for(let s of[-1,1])n.box(.08,1.2,.08,s*.5,.6,0,i);n.cyl(.05,.05,1.1,0,1.55,0,i,{rz:Math.PI/2,center:!0,seg:8});for(let s of[-1,1])n.cbox(.8,.05,.75,s*.32,1.9,0,e.roof??"#7a3a2a",{rz:s*.65});return n.cyl(.13,.11,.18,0,1,0,i,{seg:10}),n.cyl(.006,.006,.45,0,1.15,0,"#d8c8a8",{seg:3}),e.flowers&&ft(n,{seed:e.seed,rx:.3,ry:.1,palette:"lime",voxel:.06,flowers:e.flowers,flowerRate:.3},.45,.7,.3),{w:1.25,d:1.25,h:2.1,up:1.1}},waterTank(n,e){n.cyl(.55,.55,1.4,0,.1,0,"#5fc6e8",{seg:18,opacity:.5,roughness:.05});for(let t of[.1,.8,1.5])n.cyl(.58,.58,.08,0,t,0,"#9aa6b4",{seg:18,metalness:.6});for(let t=0;t<8;t++)n.sphere(.04,(t%3-1)*.2,.3+t*.14,(t%2-.5)*.3,"#e8fbff",{seg:6,shadow:!1});return n.box(.3,.15,.04,0,.5,.58,"#1b2230"),n.box(.25,.04,.01,0,.55,.6,"#3fb6d9",be("#3fb6d9",1.4)),{w:1.2,d:1.2,h:1.6,up:1.1}},menhir(n,e){n.cbox(.5,1.9,.35,0,.95,0,"#8e8a82",{round:.12,rz:.05,flat:!0});for(let t=0;t<4;t++)n.cbox(.2,.03,.01,0,.6+t*.3,.18,"#a33b2b",{rz:t%2*.6});for(let t=0;t<3;t++)n.sphere(.15,Math.cos(t*2.1)*.4,.06,Math.sin(t*2.1)*.35,"#7a766e",{sy:.6,seg:7,flat:!0});return ft(n,{seed:e.seed,rx:.25,ry:.06,palette:"lime",voxel:.05},-.1,1.85,0),{w:1,d:1,h:1.95,up:1.1}},carousel(n,e){n.cyl(.8,.85,.2,0,0,0,"#f6f2ea",{seg:16}),n.cyl(.06,.06,1.6,0,.2,0,we,{seg:10,...fe}),n.cyl(.05,.95,.45,0,1.75,0,"#c0283a",{seg:16,material:mt("stripes","#c0283a","#f6f2ea",4,1)}),n.sphere(.1,0,2.25,0,we,fe);for(let t=0;t<4;t++){let i=t*1.57,s=Math.cos(i)*.55,r=Math.sin(i)*.55;n.cyl(.02,.02,1.5,s,.2,r,we,{seg:6,...fe}),n.cbox(.16,.2,.45,s,.7+t%2*.15,r,["#f6f2ea","#f2c94c","#9ad0e0","#f2a6c0"][t],{ry:-i,round:.06}),n.cbox(.1,.25,.12,s+Math.cos(i+1.57)*.2,.9+t%2*.15,r+Math.sin(i+1.57)*.2,["#f6f2ea","#f2c94c","#9ad0e0","#f2a6c0"][t],{ry:-i,round:.04})}for(let t=0;t<12;t++)n.sphere(.035,Math.cos(t*.52)*.95,1.75,Math.sin(t*.52)*.95,"#fff2c8",be("#ffd36a",1.8));return yt(n,"#ffd890",1.4,0,1.6,0,4),{w:1.9,d:1.9,h:2.35,up:1}},newsstand(n,e){n.box(1,1.4,.8,0,0,0,"#2f5a46"),n.cyl(.05,.7,.4,0,1.4,0,"#2f5a46",{seg:8}),n.sphere(.07,0,1.85,0,we,fe);let t=Me(e.seed);for(let i=0;i<6;i++)n.box(.25,.32,.02,-.33+i%3*.33,.35+Math.floor(i/3)*.45,.41,ot(t,["#f6f2ea","#e8d8a8","#f2c94c","#e8492c"]));return n.box(.8,.15,.02,0,1.2,.41,"#f2c94c"),{w:1,d:.85,h:1.95,up:1.1}},statue(n,e){let t=e.c??"#efe9dc";if(n.box(.7,.6,.7,0,0,0,Ue(t,-.08)),n.box(.8,.08,.8,0,.6,0,t),n.cyl(.18,.25,.8,0,.68,0,t,{seg:12}),n.cbox(.4,.4,.22,0,1.6,0,t,{round:.08}),n.sphere(.13,0,1.95,0,t,{seg:12}),n.cbox(.1,.5,.1,.25,1.85,0,t,{rz:-.4}),n.cbox(.1,.45,.1,-.24,1.55,.05,t,{rz:.2}),e.wreath)for(let i=0;i<8;i++)n.cbox(.06,.015,.03,Math.cos(i*.6+3.5)*.14,2.03,Math.sin(i*.6+3.5)*.14,"#7aa84a",{ry:-i*.6});return e.torch&&(n.cyl(.03,.04,.3,.4,2,0,we,fe),fr(n,.4,2.25,0,.6,"#ff9a3a",0)),{w:.85,d:.85,h:2.3,up:1.1}},treasureMound(n,e){let t=Me(e.seed);n.sphere(.8,0,0,0,"#e6cc80",{sy:.4,seg:14}),n.cbox(.6,.1,.1,.1,.32,0,"#c0283a",{ry:.78}),n.cbox(.6,.1,.1,.1,.32,0,"#c0283a",{ry:-.78}),n.cbox(.9,.35,.5,-.35,.25,.25,"#7a4a2a",{rz:.35,ry:.3});for(let i=0;i<12;i++)n.cyl(.05,.05,.015,-.2+(t()-.5)*.6,.3+t()*.1,.4+(t()-.5)*.4,we,{seg:10,...fe});return n.cbox(.05,.9,.12,.55,.5,-.3,"#9aa6b4",{rz:-.4,metalness:.5}),n.cbox(.05,.35,.05,.75,1,-.3,"#6b4a34",{rz:-.4}),{w:1.7,d:1.7,h:1.2,up:1.1}},anchor(n,e){let t="#6a4a3a";n.cbox(.1,1.6,.1,0,.9,0,t,{rz:.25,metalness:.4,roughness:.6}),n.cyl(.6,.6,.1,.18,.55,0,t,{rz:.25,rx:Math.PI/2,center:!0,seg:18,t0:Math.PI*1.1,tl:Math.PI*.8,metalness:.4,roughness:.6}),n.cbox(.7,.08,.08,-.2,1.5,0,t,{rz:.25}),n.cyl(.13,.13,.05,-.27,1.75,0,t,{rx:Math.PI/2,center:!0,seg:12});for(let i=0;i<6;i++)n.cyl(.05,.05,.02,-.4-i*.12,1.6-i*.25,.05,"#7a5a4a",{rx:Math.PI/2,center:!0,seg:8});return ft(n,{seed:e.seed,rx:.3,ry:.15,palette:"kelp",voxel:.06},.3,0,.2),{w:1.4,d:.8,h:1.9,up:1.1}},dragon(n){for(let e=0;e<7;e++){let t=-.75+e*.25,i=.75+Math.sin(e*1.1)*.25;n.sphere(.2-e*.012,t,i,0,e%2?"#b3202c":"#e0b23a",{sy:.9,seg:12}),n.cyl(.015,.02,i-.15,t,0,.18,"#6b4a34",{seg:6})}n.cbox(.4,.3,.3,-.95,.95,0,"#b3202c",{round:.08});for(let e of[-1,1])n.sphere(.05,-1.08,1.05,e*.1,"#f6f2ea",{seg:6}),n.cbox(.04,.25,.04,-.9,1.2,e*.1,we,{rz:.5});n.cbox(.25,.06,.25,-1.15,.85,0,"#e0b23a");for(let e=0;e<5;e++)n.cbox(.06,.15,.02,-.7+e*.3,1.05+Math.sin(e)*.2,0,"#e0b23a",{rz:.3});return{w:2.3,d:.6,h:1.3,up:1}},potted(n,e){return gs(n,e.s??.6,e.seed,e.plant??"leafy",e.pot??"#b8673f",e.palette??"green",e.flowers??null),{w:.95,d:.95,h:1.3,up:1.25}},papyrus(n,e){qe(n,[[.22,0],[.3,.3],[.26,.45],[0,.42]],e.pot??"#b8673f",{seg:14});let t=Me(e.seed);for(let i=0;i<9;i++){let s=t()*6.28,r=1+t()*.6,a=Math.cos(s)*.1,o=Math.sin(s)*.1,c=.15+t()*.15;n.cbox(.02,r,.02,a+Math.cos(s)*r*c*.5,.42+r/2,o+Math.sin(s)*r*c*.5,"#5a8a3a",{rz:-Math.cos(s)*c,rx:Math.sin(s)*c});for(let l=0;l<8;l++)n.cbox(.012,.2,.012,a+Math.cos(s)*r*c,.42+r,o+Math.sin(s)*r*c,"#7aa84a",{rz:Math.cos(l*.785)*.9,rx:Math.sin(l*.785)*.9})}return{w:.9,d:.9,h:2,up:1.2}},parrot(n,e){n.cyl(.25,.3,.05,0,0,0,"#6b4a34",{seg:10}),n.cyl(.03,.03,1.3,0,.05,0,"#6b4a34",{seg:8}),n.cyl(.025,.025,.6,0,1.3,0,"#6b4a34",{rz:Math.PI/2,center:!0,seg:8}),n.sphere(.12,.05,1.45,0,"#e0283a",{sy:1.3,seg:12}),n.sphere(.08,.08,1.62,.02,"#e0283a",{seg:10}),n.cbox(.05,.06,.06,.15,1.6,.02,"#f2c94c",{rz:-.4});for(let t of[-1,1])n.cbox(.05,.2,.12,.05,1.45,t*.1,"#2f8adf",{rx:t*.2});return n.cbox(.08,.35,.04,-.05,1.22,0,"#3f9a45",{rz:.3}),n.cyl(.08,.06,.06,-.25,1.3,0,"#c9a477",{seg:8}),{w:.7,d:.6,h:1.75,up:1.5}},pumpkin(n,e){let t=e.s??1,i=e.c??"#ff7518";for(let s=0;s<8;s++)n.sphere(.4*t,Math.cos(s*.785)*.22*t,.38*t,Math.sin(s*.785)*.22*t,Ue(i,s%2*-.05),{sy:1,seg:12});n.cyl(.05*t,.07*t,.25*t,0,.72*t,0,"#3f6a32",{seg:6,rz:.2});for(let s=0;s<2;s++)n.cbox(.4*t,.02,.2*t,(s?1:-1)*.3*t,.72*t,.1,"#5a8a3a",{ry:s*2,rz:.3,flat:!0});return{w:1*t,d:1*t,h:.95*t,up:1.4}},flytrap(n,e){qe(n,[[.2,0],[.28,.35],[.25,.4],[0,.38]],"#4a3a40",{seg:12});let t=Me(e.seed);for(let i=0;i<4;i++){let s=i/4*Math.PI*2+t(),r=.6+t()*.5,a=Math.cos(s)*.3,o=Math.sin(s)*.3;n.cbox(.04,r,.04,a/2,.4+r/2,o/2,"#5a8a3a",{rz:-Math.cos(s)*.4,rx:Math.sin(s)*.4});for(let c of[-1,1]){n.sphere(.14,a,.4+r,o,"#7aa84a",{sy:.35,seg:10,rx:c*.6});for(let l=0;l<4;l++)n.cbox(.01,.07,.01,a+(l-1.5)*.06,.4+r+c*.06,o,"#f6f2ea")}n.sphere(.1,a,.4+r,o,"#c0283a",{sy:.2,seg:8})}return{w:.95,d:.95,h:1.4,up:1.3}},anemone(n,e){let t=e.c??"#f08a7e",i=Me(e.seed);n.cyl(.3,.35,.3,0,0,0,"#8ea29e",{seg:9,flat:!0}),n.cyl(.25,.3,.25,0,.3,0,t,{seg:14});for(let s=0;s<24;s++){let r=i()*6.28,a=i()*.22;n.cbox(.04,.4+i()*.3,.04,Math.cos(r)*a,.75,Math.sin(r)*a,ot(i,[t,"#f6b0b8","#b56ad8"]),{rz:Math.cos(r)*.4,rx:-Math.sin(r)*.4,round:.015})}return n.cbox(.12,.05,.05,.25,.9,.1,"#ff7a1a",{round:.02}),{w:.85,d:.85,h:1.15,up:1.4}},balloons(n,e){n.cyl(.18,.2,.15,0,0,0,"#f6f2ea",{seg:12});let t=Me(e.seed);for(let i=0;i<6;i++){let s=t()*6.28,r=.12+t()*.2,a=1.1+t()*.5;n.cbox(.006,a-.1,.006,Math.cos(s)*r*.5,a/2,Math.sin(s)*r*.5,"#f6f2ea",{rz:-Math.cos(s)*r*.4,rx:Math.sin(s)*r*.4,shadow:!1}),n.sphere(.16,Math.cos(s)*r,a+.1,Math.sin(s)*r,ot(t,e.cols??["#e8492c","#2f6f7e","#f2c94c","#c46aa8","#3f7a4a"]),{sy:1.2,seg:12,roughness:.3})}return{w:.8,d:.8,h:1.9,up:1.4}},plumes(n,e){qe(n,[[.12,0],[.2,.15],[.15,.45],[.18,.6],[0,.55]],we,{seg:14,...fe});let t=Me(e.seed);for(let i=0;i<9;i++){let s=t()*6.28;n.cbox(.1,.8+t()*.3,.02,Math.cos(s)*.15,1,Math.sin(s)*.15,ot(t,["#e0283a","#f2c94c","#3fa08a","#6a1f6e","#2f6a9a"]),{rz:-Math.cos(s)*.5,rx:Math.sin(s)*.5,ry:s,round:.04,flat:!0})}return{w:.8,d:.8,h:1.6,up:1.4}},holly(n,e){return gs(n,.6,e.seed,"leafy",e.pot??"#b3202c","pine","#e0283a"),n.cbox(.62,.08,.04,0,.35,.3,we,fe),{w:.95,d:.95,h:1.3,up:1.25}}};function ry(n,e){for(let t=0;t<3;t++)for(let i=0;i<2;i++)if(n.cyl(.18,.18,.1,-.5+t*.5,e+i*.1,0,"#c9a477",{seg:14}),i)for(let s=0;s<4;s++)n.sphere(.045,-.5+t*.5+Math.cos(s*1.6)*.08,e+.21,Math.sin(s*1.6)*.08,"#f6efe0",{seg:6});for(let t=0;t<3;t++)n.sphere(.1+t*.03,-.5+t*.5,e+.4,0,"#ffffff",{opacity:.35,seg:8,shadow:!1})}var Lu={...Cu,...Pu,...Iu},ay=["#f2a6c0","#9ad0e0","#f6e08a","#b7d98a","#c8a0e0"],oy={manor:{},mermaids:{bed:"clamBed",sofa:"coralBench",armchair:["throne",{c:"#7fd6c8",frame:"#f6eef6",crest:"shell",step:"#5fc6c9"}],chair:["rockSeat",{c:"#6a8a86",moss:!0}],rug:"seaweedMat",bench:"ray",table:"coralTable",desk:["lectern",{c:"#f6eef6",book:"#5fc6c9",glow:"#bff4ff"}],plant:"anemone",bookshelf:["shelf",{c:"#8ea29e",items:"shells"}],piano:["harp",{c:"#f6eef6",board:"#f0a8c4"}],bath:"vent",sink:"vent",tv:["mirror",{c:"#f6eef6",glow:"#9fe8ff"}],fireplace:"volcano",counter:"oysterBank",cabinet:["trunk",{open:!0,c:"#5c4532",band:"#6a8a86"}],lamp:"jellyfish",tree:["deco",{name:"kelp",s:2.2,h:2.2}],fountain:"anchor"},japan:{bed:"futon",sofa:"lacquerBench",armchair:"zabuton",chair:["stool",{c:"#a8703f",h:.35}],rug:"tatami",bench:["stoneBench",{moss:!0}],table:"lowTable",desk:"lowDesk",plant:["deco",{name:"bonsai",s:2.2,h:1,pot:null}],bookshelf:["rack",{kind:"katana"}],piano:"koto",bath:["tub",{square:!0,steam:!0,bucket:!0}],sink:["basin",{pedestal:!1,h:.3,ladle:!0}],tv:["screen",{art:"crane",c:"#f2ead8"}],fireplace:"irori",counter:"kamado",cabinet:["trunk",{c:"#1d1716",band:"#c9a24a"}],lamp:"andon",tree:["deco",{name:"sakura",s:1.8,h:2.2}],fountain:["pond",{fish:5,pads:3,edge:"#8e8a82"}]},paris:{bed:["ironBed",{sheet:"#f2d3d6"}],sofa:["chaiseLongue",{c:"#2c4a7a"}],armchair:["bergere",{c:"#c0392b"}],chair:"bistro",rug:["rug",{pal:["#24427a","#f3e3c3","#c0392b"]}],table:["roundTable",{r:.42,marble:!0,c:"#f2ede2",leg:"#2a2523",items:"candle"}],desk:"easel",plant:["potted",{pot:"#c46a3a",flowers:"#e0283a",palette:"green"}],bookshelf:"bookBox",piano:"piano",bath:"clawBath",sink:["basin",{c:"#f6f2ea"}],tv:["portrait",{kind:"poster",cols:["#f2d46a","#c0392b","#1d1b1c","#24427a"],frame:!1}],fireplace:"breadOven",counter:["bar",{zinc:!0,top:"#b8bcc0",c:"#24427a"}],cabinet:["cabinet",{c:"#e8d8c0"}],lamp:"streetLamp",tree:["tree",{palette:"green",flowers:"#f4f1ff"}],fountain:"fountain"},regency:{bed:["fourPoster",{wood:"#f2ede2",curtain:"#c9b6e8",sheet:"#f6eef6",trim:"#d9b44a"}],sofa:["chaiseLongue",{c:"#c9b6e8"}],armchair:["wingback",{c:"#9fc4b8",wood:"#d9b44a"}],chair:["gildedChair",{c:"#c9b6e8"}],rug:["rug",{pal:["#7d6bb3","#f2e8d8","#b0507a"]}],bench:["bench",{c:"#f2ede2",wood:"#f2ede2"}],table:["roundTable",{r:.45,c:"#f2ede2",leg:"#d9b44a",items:"tea",cloth:"#f6eef6"}],desk:["bureau",{c:"#f2ede2",leather:"#9fc4b8"}],plant:["potted",{pot:"#f2ede2",flowers:"#e8749a",palette:"green",s:.55}],bookshelf:["shelf",{c:"#f2ede2",cols:["#7d6bb3","#b0507a","#d9b44a","#5a8a7a"]}],piano:["piano",{c:"#7a4a2a"}],bath:["clawBath",{c:"#c27a4a",metal:!0,feet:"#d9b44a",petals:"#e8749a"}],sink:"vanity",tv:["portrait",{cols:["#3a3050","#f2d3b6","#7d6bb3","#5a3b26"]}],fireplace:["fireplace",{marble:!0}],counter:["cabinet",{c:"#f2ede2",w:1.6}],cabinet:["cabinet",{c:"#f2ede2"}],lamp:["candelabra",{drops:!0}],tree:"willow",fountain:["fountain",{top:"swan",c:"#f2ede2"}]},egypt:{bed:["kline",{wood:"#d9b44a",c:"#f2ede2",c2:"#2f5e8c",legs:"#d9b44a"}],sofa:["throne",{c:"#2f5e8c",step:"#b8862b"}],armchair:["throne",{c:"#a33b2b",frame:"#2a2220",step:"#b8862b"}],chair:["stool",{c:"#a8703f",kind:"three"}],rug:"reedMat",bench:["stoneBench",{c:"#d4ac6a"}],table:"altar",desk:["lowDesk",{c:"#a8703f",scrolls:!0}],plant:"papyrus",bookshelf:["shelf",{c:"#d4ac6a",items:"scrolls"}],piano:["harp",{board:"#2f5e8c"}],bath:["tub",{square:!0,c:"#d4ac6a",band:"#b8862b",water:"#f6f2ea"}],sink:["jar",{handles:!0,band:"#2f5e8c"}],tv:"fresco",fireplace:"brazier",counter:["breadOven",{c:"#b8673f"}],cabinet:"sarcophagus",lamp:"oilLamp",tree:["deco",{name:"palm",s:1.7,h:2.4}],fountain:["deco",{name:"obelisk",s:1.6,h:2.2}]},pirates:{bed:["hammock",{c:"#d9c08a"}],sofa:"sailPile",armchair:["woodArmchair",{c:"#7a1f2a",wood:"#5a3420"}],chair:"barrel",rug:"net",bench:"rowBench",table:"mapTable",desk:["desk",{c:"#5a3420"}],plant:"parrot",bookshelf:["rack",{kind:"cutlass"}],piano:["organ",{kind:"barrel"}],bath:["barrel",{h:1,r:.5,liquid:"#7a3a1a"}],sink:["bucket",{mop:!0}],tv:["portrait",{kind:"poster",cols:["#e8d8a8","#1d1b1c","#7a1f2a","#5a3420"],frame:"#5a3420"}],fireplace:"cannon",counter:["bar",{c:"#5a3420"}],cabinet:["trunk",{open:!0,lid:"round"}],lamp:"shipLantern",tree:["deco",{name:"palm",s:1.7,h:2.4}],fountain:"treasureMound"},western:{bed:"cot",sofa:"pew",armchair:"rockingChair",chair:["stool",{kind:"bar",c:"#7a4a2a",leg:"#3a3a3e",h:.7}],rug:["pelt",{c:"#6b4a2e"}],bench:["pew",{wood:"#a8703f"}],table:"pokerTable",desk:["desk",{c:"#7a4a2a"}],plant:["deco",{name:"cactus",s:1.6,h:1.4,pot:"#b8673f"}],bookshelf:["rack",{kind:"rifle"}],piano:["upright",{glass:!0}],bath:["tub",{c:"#b8bcc0",band:"#8a8e92",r:.6,h:.5}],sink:"trough",tv:["portrait",{kind:"poster",cols:["#e8d8a8","#3a2414","#a8321e","#3a2414"],frame:!1,w:.7,h:.9}],fireplace:"potStove",counter:"bar",cabinet:"safe",lamp:["shipLantern",{c:"#3a3a3e"}],tree:["deco",{name:"cactus",s:2.6,h:2.4}],fountain:"well"},space:{bed:"sleepPod",sofa:"loungePod",armchair:"pilotSeat",chair:"magStool",rug:"lightPanel",bench:"gymBench",table:"holoConsole",desk:"commandDesk",plant:["potted",{pot:"#cfd6de",palette:"coral",flowers:"#3fe0ff"}],bookshelf:"serverRack",piano:"synth",bath:"cryoTank",sink:"recycler",tv:"porthole",fireplace:"reactor",counter:"dispenserWall",cabinet:["locker",{light:!0}],lamp:"neon",tree:"growTower",fountain:"waterTank"},haunted:{bed:"coffin",sofa:["sofa",{c:"#4a2a5a"}],armchair:["wingback",{c:"#3a2a40",wood:"#1d1716"}],chair:["chair",{c:"#4a2a5a",wood:"#2a1d20"}],rug:["pelt",{c:"#3a2a22",head:!0}],bench:["stoneBench",{c:"#7a7680",moss:!0}],table:["longTable",{c:"#2a1d20",cloth:"#5a2a3a"}],desk:["lectern",{c:"#2a1d20",candle:!0}],plant:"flytrap",bookshelf:["shelf",{c:"#2a1d20",items:"potions"}],piano:["organ",{kind:"pipe",c:"#2a1d20"}],bath:"cauldron",sink:["basin",{c:"#7a7680",water:"#5a7a3a"}],tv:["portrait",{eyes:"#ff3a2a",cols:["#2a2230","#d9c8b6","#3a2a40","#1d1b1c"]}],fireplace:["fireplace",{c:"#5a5660"}],counter:"alembic",cabinet:"armor",lamp:["candelabra",{c:"#3a3a3e",web:!0}],tree:["deco",{name:"deadTree",s:2.4,h:2.2}],fountain:["deco",{name:"tomb",s:2.2,h:1.6}]},medieval:{bed:["fourPoster",{wood:"#5a3a22",curtain:"#7a1f2a",sheet:"#d9b45a",trim:"#8e8a82"}],sofa:["throne",{c:"#2f4a8a",frame:"#5a3a22",gem:"#d9b45a",step:"#7a1f2a"}],armchair:["throne",{c:"#7a1f2a",frame:"#6b4a34",gem:"#2f4a8a",step:"#5a3a22"}],chair:["stool",{kind:"three",c:"#7a5434"}],rug:["pelt",{c:"#7a766e",head:!0}],bench:["pew",{wood:"#7a5434"}],table:["roundTable",{r:.75,c:"#7a5434",items:"feast",legs:4}],desk:["lectern",{candle:!0}],plant:"hayBale",bookshelf:["rack",{kind:"sword"}],piano:["harp",{c:"#8a5a36"}],bath:["tub",{r:.65,steam:!0}],sink:["jar",{c:"#9aa6b4",h:.6,handles:!0}],tv:"tapestry",fireplace:"hearth",counter:"anvil",cabinet:["trunk",{c:"#6b4a34",band:"#3a3a3e",lid:"round"}],lamp:"torch",tree:["tree",{palette:"olive",h:2.6}],fountain:["well",{roof:"#5a3a22"}]},prehistory:{bed:["leafBed",{palette:"green"}],sofa:"hidePile",armchair:"rockSeat",chair:"stump",rug:["pelt",{c:"#8a6a4a"}],bench:["log",{c:"#6b4a34"}],table:"grindStone",desk:["fresco",{hands:!0,wall:"#8e8a82",cols:["#a09682","#a33b2b","#1d1b1c","#c27a4a","#e8d8a8","#1d1b1c"]}],plant:["deco",{name:"fern",s:2.4,h:1.2}],bookshelf:"bonePile",piano:"drum",bath:["pond",{reeds:!0,r:.7}],sink:["jar",{c:"#c9a46a",h:.7}],tv:["fresco",{hands:!0,wall:"#8e8a82",cols:["#a09682","#a33b2b","#1d1b1c","#c27a4a","#e8d8a8","#1d1b1c"]}],fireplace:["firePit",{spit:!0}],counter:"stonePile",cabinet:"woodpile",lamp:"torch",tree:["tree",{palette:"green",h:2.6}],fountain:"menhir"},circus:{bed:["hammock",{c:"#c0283a",post:"#f2c94c"}],sofa:"bleacher",armchair:["armchair",{c:"#c0283a"}],chair:["stool",{kind:"drum",c:"#c0283a",c2:"#f2c94c",h:.5}],rug:["playMat",{cols:["#c0283a","#f2c94c","#2f6f9a","#f6f2ea"]}],bench:"hayBale",table:["roundTable",{r:.4,c:"#2f6f9a",leg:"#f2c94c",items:"sweets"}],desk:"booth",plant:"balloons",bookshelf:["maskWall",{c:"#2f6f9a"}],piano:["organ",{kind:"fair"}],bath:["pond",{seal:!0,edge:"#c0283a",r:.7}],sink:["bucket",{c:"#c0283a",fill:"#f2c94c",items:"#2f6f9a"}],tv:["portrait",{kind:"poster",cols:["#f2c94c","#c0283a","#1d1b1c","#2f6f9a"]}],fireplace:["cannon",{c:"#c0283a",cart:"#2f6f9a",stripes:!0}],counter:"popcorn",cabinet:["trunk",{c:"#2f6f9a",band:"#f2c94c",stickers:!0}],lamp:"spotlight",tree:"tentPole",fountain:"carousel"},train:{bed:["bed",{wood:"#4a2a1a",sheet:"#2f5a46"}],sofa:["sofa",{c:"#7a1f2a"}],armchair:["wingback",{c:"#6b3a22",wood:"#2a1a12"}],chair:["chair",{c:"#7a1f2a",wood:"#4a2a1a"}],rug:["rug",{pal:["#7a1f2a","#e9d9b8","#2f5a46"]}],table:["roundTable",{r:.5,c:"#4a2a1a",cloth:"#f6f2ea",items:"candle"}],desk:["desk",{c:"#4a2a1a"}],plant:["potted",{plant:"palm",pot:"#c9a24a"}],bookshelf:"luggageRack",piano:["upright",{c:"#2a1a12",glass:!0}],bath:["clawBath",{feet:"#c9a24a"}],sink:["sink",{}],tv:"frostWindow",fireplace:["potStove",{coal:!0}],counter:["bar",{c:"#4a2a1a"}],cabinet:["trunk",{c:"#33405a",band:"#c9a24a",stickers:!0}],lamp:["lamp",{c:"#f2d48a"}],tree:"streetLamp",fountain:"newsstand"},chalet:{bed:["logBed",{c:"#2f5a8a"}],sofa:["sofa",{c:"#7a4a2a"}],armchair:["woodArmchair",{c:"#b3202c"}],chair:["chair",{c:"#b3202c",wood:"#8a5a36"}],rug:["pelt",{c:"#f2ede2"}],bench:["sleigh",{c:"#8a5a36",runner:"#3a3a3e",c2:"#b3202c"}],table:["roundTable",{r:.5,c:"#a8703f",items:"fondue",legs:4}],desk:["desk",{c:"#8a5a36"}],plant:["deco",{name:"pine",s:1.2,h:1.4,pot:"#b3202c"}],bookshelf:"skiRack",piano:"alphorn",bath:["tub",{r:.7,steam:!0,c:"#8a5a36"}],sink:"sink",tv:"stagHead",fireplace:["fireplace",{c:"#8e8a82",stone:!0}],counter:"counter",cabinet:["locker",{c:"#2f5a8a",skis:!0}],lamp:["shipLantern",{post:"#8a5a36"}],tree:["deco",{name:"pine",s:2,h:2.4}],fountain:["deco",{name:"snowman",s:2.2,h:1.8}]},world:{bed:["hammock",{c:"#e8492c",post:"#a8703f"}],sofa:"deckchair",armchair:"planeSeat",chair:"pouf",rug:["rug",{pal:["#b8562a","#efe6c8","#2c4a6a"]}],table:["pokerTable",{wheel:!0}],desk:"checkin",plant:["deco",{name:"bamboo",s:1.6,h:1.8,pot:"#2f6f7e"}],bookshelf:"postcards",piano:"piano",bath:["pond",{edge:"#e8f4f8",water:"#3fb6e0",r:.75}],sink:["basin",{c:"#cfd6de"}],tv:"board",fireplace:"brazier",counter:"stall",cabinet:["trunk",{c:"#2f5d8a",stickers:!0,w:.9}],lamp:["lanternPost",{c:"#f2c94c"}],tree:"baobab",fountain:"statue"},rome:{bed:["kline",{wood:"#5a3420",c:"#8a2a2a",c2:"#d9b45a"}],sofa:["kline",{wood:"#5a3420",c:"#e9d9b0",c2:"#8a2a2a"}],armchair:"curule",chair:["stool",{c:"#efe9dc"}],rug:"mosaic",bench:["stoneBench",{c:"#efe9dc"}],table:["roundTable",{r:.55,marble:!0,c:"#efe9dc",leg:"#d8d0bc",items:"fruit"}],desk:"lectern",plant:["potted",{pot:"#efe9dc",palette:"olive"}],bookshelf:["shelf",{c:"#d8d0bc",items:"scrolls"}],piano:["harp",{s:.6}],bath:["pond",{edge:"#efe9dc",water:"#5fb5c9",r:.8}],sink:["jar",{handles:!0,more:!0}],tv:["fresco",{wall:"#efe9dc",cols:["#c9604a","#efe6d0","#2f5e8c","#d9b45a","#3f7a4a","#1d1b1c"]}],fireplace:"brazier",counter:["bar",{c:"#efe9dc",top:"#d8d0bc"}],cabinet:["trunk",{c:"#7a4a2a",band:"#d9b45a"}],lamp:"oilLamp",tree:["tree",{palette:"olive"}],fountain:["statue",{wreath:!0}]},halloween:{bed:["fourPoster",{wood:"#2a1d20",curtain:"#5a2a6a",sheet:"#ff7518",trim:"#8fd16a"}],sofa:["sofa",{c:"#5a2a6a"}],armchair:["wingback",{c:"#ff7518",wood:"#2a1d20"}],chair:["chair",{c:"#ff7518",wood:"#c9a46a"}],rug:["roundRug",{cols:["#2a1838","#ff7518","#8fd16a"]}],bench:"hayBale",table:["longTable",{c:"#3a2420",items:"sweets",cloth:"#5a2a6a"}],desk:["lectern",{c:"#2a1d20",candle:!0,book:"#5a2a6a"}],plant:["pumpkin",{s:1.2}],bookshelf:["shelf",{c:"#3a2420",items:"potions"}],piano:["upright",{c:"#2a1d20"}],bath:["clawBath",{c:"#e8e2d2",water:"#c9e0a8"}],sink:["bucket",{items:"#c0392b",fill:"#5fa5b5"}],tv:["mirror",{c:"#2a1d20",glow:"#8fd16a"}],fireplace:["fireplace",{c:"#5a3a5a"}],counter:["counter",{c:"#3a2a40"}],cabinet:["trunk",{c:"#5a2a6a",band:"#ff7518"}],lamp:"jackLantern",tree:"scarecrow",fountain:["cauldron",{fire:!0}]},easter:{bed:["bed",{wood:"#c9a46a",sheet:"#f2a6c0"}],sofa:["sofa",{c:"#b7d98a"}],armchair:["armchair",{c:"#9ad0e0"}],chair:["chair",{c:"#f6e08a",wood:"#f6f2ea"}],rug:["roundRug",{cols:["#f6f2ea","#f6e08a","#b7d98a"],petals:"#ffffff"}],bench:["bench",{c:"#f6f2ea",wood:"#b7d98a"}],table:["roundTable",{r:.5,c:"#f6f2ea",cloth:"#f6e08a",items:"cake"}],desk:["desk",{c:"#c9a46a"}],plant:["potted",{pot:"#9ad0e0",flowers:"#f6d23a"}],bookshelf:["shelf",{c:"#f6f2ea",items:"eggs",cols:ay}],piano:["organ",{kind:"harmonium",c:"#a8703f"}],bath:["clawBath",{c:"#f2a6c0"}],sink:"sink",tv:"cuckoo",fireplace:["breadOven",{c:"#f2a6c0"}],counter:"chocFountain",cabinet:"basket",lamp:["lanternPost",{c:"#f2a6c0",post:"#f6f2ea"}],tree:["tree",{palette:"blossom"}],fountain:["pond",{ducks:3,edge:"#b7d98a"}]},carnival:{bed:["fourPoster",{wood:"#2a1838",curtain:"#6a1f6e",sheet:"#f2c94c",trim:"#d9b44a"}],sofa:["chaiseLongue",{c:"#6a1f6e"}],armchair:["bergere",{c:"#e0283a"}],chair:["stool",{kind:"drum",c:"#6a1f6e",c2:"#f2c94c"}],rug:["playMat",{cols:["#e0283a","#f2c94c","#3fa08a","#6a1f6e"]}],bench:["bench",{c:"#2a1838",wood:"#d9b44a"}],table:["roundTable",{r:.5,c:"#6a1f6e",cloth:"#f2c94c",items:"sweets"}],desk:["desk",{c:"#6a1f6e"}],plant:"plumes",bookshelf:"maskWall",piano:["piano",{c:"#c9a46a"}],bath:["clawBath",{c:"#efe4d0"}],sink:["basin",{c:"#efe4d0"}],tv:["mirror",{}],fireplace:["fireplace",{marble:!0}],counter:["cabinet",{c:"#6a1f6e",w:1.6}],cabinet:"wardrobe",lamp:["candelabra",{arms:7,drops:!0}],tree:"flowerFloat",fountain:["fountain",{top:"confetti"}]},lunar:{bed:["fourPoster",{wood:"#1d1716",curtain:"#b3202c",sheet:"#e0b23a",trim:"#e0b23a"}],sofa:["lacquerBench",{wood:"#7a1018",c:"#e0b23a",c2:"#1d1716"}],armchair:["throne",{c:"#e0b23a",frame:"#b3202c",step:"#1d1716",gem:"#3f9a5a"}],chair:["stool",{kind:"drum",c:"#f6f2ea",c2:"#2f5d8a"}],rug:["rug",{pal:["#b3202c","#f2d46a","#1d1716"]}],bench:["stoneBench",{}],table:"lazySusan",desk:["lowDesk",{c:"#7a1018"}],plant:["potted",{pot:"#2f5d8a",flowers:"#ff8a1a",palette:"dark"}],bookshelf:["shelf",{c:"#7a1018",items:"scrolls"}],piano:["koto",{c:"#7a1018",cushion:"#e0b23a"}],bath:["pond",{fish:6,pads:2,edge:"#9aa696"}],sink:["basin",{c:"#5aa07a"}],tv:["screen",{c:"#f2d46a",frame:"#b3202c",cols:["#b3202c","#1d1716","#3f9a5a"]}],fireplace:["brazier",{c:"#e0b23a"}],counter:"steamers",cabinet:["trunk",{c:"#b3202c",band:"#e0b23a"}],lamp:["lanternPost",{c:"#d8263f",tassel:"#e0b23a",cap:"#e0b23a"}],tree:["deco",{name:"sakura",s:1.8,h:2.2}],fountain:"dragon"},forest:{bed:"leafBed",sofa:"log",armchair:"rootThrone",chair:"toadstoolSeat",rug:"mossRug",bench:["stump",{moss:!0,r:.4}],table:"stumpTable",desk:["lectern",{c:"#6b4a34",book:"#3f7a4a",glow:"#d8ff7a"}],plant:["deco",{name:"fern",s:2.4,h:1.2}],bookshelf:["shelf",{c:"#6b4a34",items:"potions"}],piano:["harp",{c:"#8a6a4a",leaves:!0}],bath:["pond",{pads:4,reeds:!0,edge:"#7a766e"}],sink:["basin",{pedestal:!1,h:.35}],tv:["mirror",{c:"#6b4a34",glow:"#bff4ff"}],fireplace:["firePit",{logs:!0}],counter:["shelf",{c:"#6b4a34",items:"jars",h:.9}],cabinet:["trunk",{c:"#8a5a36",band:"#5a8a3a",top:"#a8703f",lid:"round"}],lamp:"firefly",tree:["tree",{h:2.8,spread:2,palette:"green"}],fountain:["well",{flowers:"#f2c94c",roof:"#5a8a3a"}]},xmas:{bed:["logBed",{c:"#b3202c",c2:"#2f5a3a"}],sofa:["sofa",{c:"#2f5a3a"}],armchair:["throne",{c:"#b3202c",step:"#2f5a3a"}],chair:["stool",{c:"#3f7a4a",cushion:"#b3202c"}],rug:["roundRug",{cols:["#b3202c","#f6f2ea","#2f5a3a"]}],bench:["sleigh",{gifts:!0}],table:["longTable",{c:"#7a4a2a",cloth:"#b3202c"}],desk:["lowDesk",{c:"#7a4a2a",scrolls:!0}],plant:"holly",bookshelf:["shelf",{c:"#b3202c",items:"toys"}],piano:["organ",{kind:"pipe",c:"#7a4a2a"}],bath:["clawBath",{c:"#c27a4a",metal:!0}],sink:["bucket",{fill:"#f6f9fc"}],tv:"snowGlobe",fireplace:["fireplace",{stockings:!0}],counter:["breadOven",{c:"#b3202c"}],cabinet:"sack",lamp:"lightString",tree:"xmasTree",fountain:["deco",{name:"snowman",s:2.2,h:1.8}]},birthday:{bed:"bunk",sofa:"beanbag",armchair:["throne",{c:"#ff4d8d",frame:"#5aa9e6",step:"#f2c94c",gem:"#f2c94c"}],chair:["chair",{c:"#ff4d8d",wood:"#5aa9e6"}],rug:"playMat",bench:"cushionPile",table:["roundTable",{r:.6,c:"#f6f2ea",cloth:"#5aa9e6",items:"party"}],desk:["trunk",{c:"#ff4d8d",band:"#f2c94c",w:1.2}],plant:"balloons",bookshelf:["shelf",{c:"#5aa9e6",items:"games"}],piano:"karaoke",bath:"ballPit",sink:"dispenser",tv:["tv",{c:"#ff4d8d"}],fireplace:"photoBooth",counter:["shelf",{c:"#ff4d8d",items:"jars",h:.9}],cabinet:["trunk",{c:"#b06ad8",band:"#f2c94c",stickers:!0}],lamp:"discoBall",tree:["tree",{palette:"lime"}],fountain:"chocFountain"},love:{bed:"heartBed",sofa:["chaiseLongue",{c:"#e5384f"}],armchair:["bergere",{c:"#ffb3c4"}],chair:["gildedChair",{c:"#e5384f"}],rug:["roundRug",{cols:["#ffd6e0","#e5384f","#ffb3c4"],petals:"#c0283a"}],bench:["bench",{c:"#ffb3c4",wood:"#d9b44a"}],table:["roundTable",{r:.42,c:"#f6f2ea",cloth:"#e5384f",items:"candle"}],desk:["bureau",{c:"#f6e6ea",leather:"#e5384f"}],plant:["deco",{name:"rosebush",s:2,h:1.2}],bookshelf:["shelf",{c:"#f6e6ea",cols:["#e5384f","#ffb3c4","#d9b44a","#8e3b5a"]}],piano:["harp",{}],bath:["clawBath",{petals:"#e5384f"}],sink:["basin",{c:"#f6e6ea",flowers:"#e5384f"}],tv:["mirror",{crest:"heart"}],fireplace:["fireplace",{marble:!0}],counter:["counter",{c:"#7a3a2a"}],cabinet:["trunk",{c:"#ffb3c4",band:"#d9b44a",w:.8}],lamp:"candelabra",tree:["tree",{palette:"blossom",flowers:"#e5384f",rate:.2}],fountain:["fountain",{top:"cupid"}]}};function Du(n,e){var i;let t=(i=oy[n])==null?void 0:i[e];return t?Array.isArray(t)?{model:t[0],params:t[1]??{}}:{model:t,params:{}}:null}var Nu=["#c0392b","#2f6f7e","#7a3fa0","#d9a441","#3f7a4a","#d8432e","#33405a","#c46aa8"],eh={bed(n,e){let s=e.wood??Jn[e.k%Jn.length],r=e.sheet??Nu[e.k%Nu.length];n.box(1.3,.3,1.95,0,.05,0,s),n.box(1.3-.06,.2,1.95-.06,0,.35,0,"#f2f0ea",{round:.07}),n.box(1.3+.04,.09,1.95*.62,0,.5,1.95*.19,r,{round:.04}),n.box(1.3+.03,.3,.04,0,.29,1.95/2-.01,r),n.box(1.3+.05,.1,.16,0,.5,1.95*.19-1.95*.31+.08,"#f6f2ea",{round:.04});for(let a of[-1,1])n.box(1.3*.38,.14,.36,a*1.3*.22,.53,-1.95/2+.3,"#e8eef6",{round:.06});return n.box(1.3+.1,1,.1,0,0,-1.95/2-.02,s),{w:1.3+.1,d:1.95+.1,h:1,seat:.58,wall:!0}},sofa(n,e){let s=e.c??["#f1ede2","#86a6bf","#9fb08a","#d9a3a0"][e.k%4],r=Me(e.seed);n.box(1.9,.25,.9,0,.1,0,s,{round:.06}),n.box(1.9,.5,.24,0,.3,-.9/2+.12,s,{round:.09}),n.box(.22,.34,.9,-1.9/2+.11,.3,0,s,{round:.09}),n.box(.22,.34,.9,1.9/2-.11,.3,0,s,{round:.09});let a=2,o=(1.9-.4)/a;for(let l=0;l<a;l++)n.box(o-.03,.12,.9-.26,-1.9/2+.2+o*(l+.5),.35,.1,s,{roughness:.95,round:.06});for(let l of[-1,1])for(let h of[-1,1])n.box(.06,.1,.06,l*(1.9/2-.08),0,h*(.9/2-.08),"#4a3a2a");let c=["#d9c641","#d8432e","#1f4d3d"];for(let l=0;l<3;l++){let h=-.6+(l+.5)*1.2/3;n.cbox(.38,.38,.12,h,.66,-.9/2+.3,c[l],{rx:-.25,rz:(r()-.5)*.35,round:.06})}return{w:1.9,d:.9,h:.8,seat:.47,wall:!0}},armchair(n,e){let t=e.c??["#c0392b","#2f6f7e","#d9a441","#7a3fa0"][e.k%4];n.box(.85,.4,.85,0,.05,0,t,{round:.08}),n.box(.85,.55,.22,0,.4,-.32,t,{round:.09}),n.box(.17,.27,.85,-.34,.42,0,t,{round:.08}),n.box(.17,.27,.85,.34,.42,0,t,{round:.08}),n.box(.55,.12,.6,0,.42,.08,"#f1ede2",{round:.05});for(let i of[-1,1])for(let s of[-1,1])n.box(.05,.06,.05,i*.36,0,s*.36,"#4a3a2a");return{w:.85,d:.85,h:.95,seat:.54,up:1.55}},chair(n,e){let t=e.c??["#c0392b","#3f7a4a","#2f5d8a","#d9a441"][e.k%4],i=e.wood??"#5a3b26";for(let s of[-1,1])for(let r of[-1,1])n.box(.04,.45,.04,s*.2,0,r*.2,i);return n.box(.48,.07,.48,0,.45,0,i),n.box(.42,.04,.42,0,.52,.01,t,{round:.015}),n.box(.46,.5,.06,0,.5,-.22,i),n.box(.36,.3,.065,0,.62,-.22,t),{w:.5,d:.5,h:1,seat:.56,up:1.75}},rug(n,e){let s=[["#8a2f3a","#e9d9b8","#2c3a6a"],["#2c4a6a","#efe6c8","#c9762a"],["#3f6b4a","#f1ead2","#a33b2b"],["#6a3f7a","#efe6c8","#d9a441"]],[r,a,o]=e.pal??s[e.k%s.length];n.box(1.75,.012,1.75,0,0,0,a,{jitter:0}),n.box(1.75-.12,.018,1.75-.12,0,0,0,o,{jitter:0,roughness:1}),n.box(1.75-.26,.022,1.75-.26,0,0,0,r,{jitter:0,roughness:1}),n.cbox(.62,.026,.62,0,.013,0,a,{ry:Math.PI/4,jitter:0}),n.cbox(.36,.03,.36,0,.015,0,o,{ry:Math.PI/4,jitter:0});for(let c of[-1,1])for(let l of[-1,1])n.cbox(.18,.026,.18,c*(1.75/2-.3),.013,l*(1.75/2-.3),a,{ry:Math.PI/4,jitter:0});for(let c of[-1,1])for(let l=0;l<14;l++)n.box(.025,.008,.08,-1.75/2+.08+l*(1.75-.16)/13,0,c*(1.75/2+.03),a,{jitter:0,shadow:!1});return{w:1.75,d:1.75+.1,h:.03,seat:.03,up:1}},bench(n,e){let i=e.room==="garden",s=e.c??(i?"#4f6f5a":"#a8703f"),r=e.wood??(i?"#2a2523":"#6b4a34");for(let a of[-1,1])n.box(.06,.42,.5,a*(1.6/2-.15),0,0,r),n.box(.06,.25,.06,a*(1.6/2-.15),.42,-.2,r);for(let a=0;a<3;a++)n.box(1.6,.04,.12,0,.42,-.14+a*.14,s);for(let a=0;a<2;a++)n.cbox(1.6,.11,.035,0,.62+a*.15,-.25-a*.03,s,{rx:-.2});return!i&&!e.c&&n.box(1.6-.3,.06,.34,0,.46,0,"#c46aa8",{round:.03}),{w:1.6,d:.6,h:.85,seat:.48,up:1.05}},table(n,e){let t=Jn[e.k%Jn.length];if(e.room==="dining"){n.cyl(.62,.62,.05,0,.7,0,t,{seg:28}),n.cyl(.66,.7,.3,0,.45,0,"#f4efe4",{seg:28}),n.cyl(.05,.06,.7,0,0,0,"#5a3b26"),n.cyl(.28,.32,.04,0,0,0,"#5a3b26");for(let i=0;i<4;i++){let s=i/4*Math.PI*2+Math.PI/4;n.cyl(.13,.11,.02,Math.cos(s)*.42,.75,Math.sin(s)*.42,"#ffffff",{seg:18,roughness:.3}),n.cyl(.07,.07,.022,Math.cos(s)*.42,.751,Math.sin(s)*.42,"#2f6f7e",{seg:14,roughness:.3})}return n.cyl(.07,.09,.08,0,.75,0,"#c9a24a",fe),n.cyl(.025,.025,.22,0,.83,0,"#f6f2ea"),n.sphere(.03,0,1.08,0,"#ffcf7a",{emissive:"#ffb340",ei:1.5,shadow:!1}),{w:1.4,d:1.4,h:1.1,spots:[[.4,.77,0],[-.4,.77,0]]}}if(e.room==="living"){let i=Me(e.seed);n.box(1.2,.05,.7,0,.4,0,t,{round:.02});for(let s of[-1,1])for(let r of[-1,1])n.box(.05,.4,.05,s*.54,0,r*.29,"#3a2a22");n.box(1.1,.03,.6,0,.12,0,t);for(let s=0;s<3;s++)n.cbox(.3,.04,.22,-.3,.47+s*.04,.02,["#a33b2b","#2f5d8a","#e4dccb"][s],{ry:(i()-.5)*.5});n.sphere(.16,.28,.45,0,"#2f6f7e",{sy:.45,seg:18});for(let s=0;s<3;s++)n.sphere(.06,.24+s*.05,.52,(s-1)*.06,["#e8492c","#e0a94a","#7cae4f"][s],{seg:8});return{w:1.2,d:.7,h:.6,up:1.25,spots:[[0,.45,.2]]}}n.box(1.4,.05,.85,0,.72,0,t);for(let i of[-1,1])for(let s of[-1,1])n.box(.06,.72,.06,i*.62,0,s*.35,"#5a3b26");n.box(.5,.008,.87,0,.77,0,"#d8263f",{material:mt("checker","#f4efe4","#c0392b",2,3)}),n.sphere(.2,0,.82,0,"#efe6c8",{sy:.45,seg:18});for(let i=0;i<4;i++)n.sphere(.07,Math.cos(i*1.6)*.08,.88,Math.sin(i*1.6)*.08,["#e8492c","#e0a94a","#7cae4f","#e8492c"][i],{seg:8});return n.cyl(.05,.045,.1,.48,.77,.2,"#2f6f7e",{seg:10}),n.cyl(.05,.045,.1,-.5,.77,-.22,"#f4efe4",{seg:10}),{w:1.4,d:.85,h:.95,spots:[[.36,.77,-.2],[-.38,.77,.2]]}},desk(n,e){let t=Me(e.seed),i=e.c??Jn[(e.k+1)%Jn.length],s=1.45,r=.75,a=.75;n.box(s,.05,r,0,a-.05,0,i);for(let o of[-1,1])for(let c of[-1,1])n.box(.06,a-.05,.06,o*(s/2-.06),0,c*(r/2-.06),"#5a3b26");n.box(.45,a-.1,r-.06,s/2-.25,0,0,i);for(let o=0;o<3;o++)n.box(.4,.015,.02,s/2-.25,.12+o*.2,r/2-.02,"#e9e2d2");n.box(.7,.012,.42,-.1,a,.08,"#2f5a46");for(let o=0;o<3;o++)n.cbox(.21,.006,.3,-.2+o*.12,a+.016+o*.006,.08,"#f6f2ea",{ry:(t()-.5)*.6});n.cyl(.08,.1,.02,.5,a,-.2,"#c9a24a",fe),n.cyl(.012,.012,.32,.5,a,-.2,"#c9a24a",fe),n.cyl(.05,.12,.1,.5,a+.3,-.12,"#2f6f4a",{seg:14}),n.cyl(.04,.035,.1,-.58,a,-.22,"#a33b2b",{seg:10});for(let o=0;o<2;o++)n.cbox(.26,.05,.2,.3,a+o*.05,.18,["#2f5d8a","#d9b44a"][o],{ry:.2+o*.3});return{w:s,d:r,h:a+.45,wall:!0,up:1.15,spots:[[-.55,a,.16]]}},plant(n,e){let t=e.k%2===0;return gs(n,.6,e.seed,t?"leafy":"palm",["#b8673f","#efe6c8","#5d7d6a","#2f6f7e"][e.k%4],"green",e.k%3===1?"#f2c94c":null),{w:.95,d:.95,h:1.3,up:1.25}},bookshelf(n,e){let t=Me(e.seed),i=1.5,s=1.6,r=.42,a=e.c??["#7a3fa0","#6b4a34","#2f5a46","#8a5a36"][e.k%4];n.box(i,s,.03,0,0,-r/2+.015,a),n.box(.04,s,r,-i/2+.02,0,0,a),n.box(.04,s,r,i/2-.02,0,0,a);let o=4,c=s/o;for(let l=0;l<=o;l++)n.box(i,.03,r,0,Math.min(l*c,s-.03),0,a);for(let l=0;l<o;l++)Va(n,i-.08,0,l*c+.03,0,r,t,c-.08);for(let l=0;l<3;l++)n.cbox(.3,.05,.22,-.4+l*.05,s+.025+l*.05,0,["#a33b2b","#d9b44a","#2f5d8a"][l],{ry:(t()-.5)*.4});return gs(n,.2,e.seed+3,"leafy","#efe6c8","lime",null,.45,s,0),{w:i,d:r,h:s+.3,wall:!0,up:1.1}},piano(n,e){let t=new Hn;t.moveTo(-.7,.75),t.lineTo(.7,.75),t.lineTo(.7,.1),t.bezierCurveTo(.7,-.5,.25,-.35,.15,-.95),t.bezierCurveTo(.05,-1.05,-.7,-1.05,-.7,-.8),t.closePath();let i=new Gn(t,{depth:.3,bevelEnabled:!0,bevelSize:.02,bevelThickness:.02,bevelSegments:2,curveSegments:24});i.rotateX(Math.PI/2),i.translate(0,.95,.1);let s=e.c??"#1d1716";n.geo(i,s,{roughness:.3,tess:!1});let r=new Gn(t,{depth:.025,bevelEnabled:!1,curveSegments:24});r.rotateX(Math.PI/2),r.translate(.7,0,0),r.rotateZ(.55),r.translate(-.7,.98,.1),n.geo(r,e.c?new Re(s).offsetHSL(0,0,.04).getStyle():"#2a201d",{roughness:.25,tess:!1}),n.cbox(.02,.6,.02,.3,1.25,-.2,"#c9a24a",{rz:.2,...fe});for(let a=0;a<9;a++)n.box(.012,.01,1.2-a*.07,-.55+a*.12,.97,.1-a*.05,"#c9a24a",{...fe,shadow:!1});n.box(1.42,.06,.24,0,.72,.95,"#1d1716",{roughness:.3}),n.box(1.32,.03,.16,0,.78,.96,"#f6f2ea");for(let a=0;a<34;a++)[1,3,6,8,10].includes(a%12)&&n.box(.022,.02,.09,-.63+a*.038,.81,.93,"#111");for(let[a,o]of[[-.62,.8],[.62,.8],[-.4,-.75]])n.cyl(.05,.04,.68,a,0,o,"#1d1716",{seg:8});n.box(.7,.07,.32,0,.45,1.35,"#1d1716",{round:.02}),n.box(.64,.03,.28,0,.52,1.35,"#8a2f3a",{round:.01});for(let a of[-1,1])for(let o of[-1,1])n.box(.04,.45,.04,a*.3,0,1.35+o*.12,"#1d1716");return{w:1.45,d:2.6,h:1.55,cz:.2}},bath(n){let e="#f6f2ea",t="#c9a24a";n.box(1.6,.5,.75,0,.14,0,e,{round:.2}),n.box(1.4,.05,.55,0,.6,0,"#a9cfd8",{roughness:.1});for(let i=0;i<5;i++)n.sphere(.06+i%2*.02,-.3+i*.12,.64,(i%3-1)*.1,"#ffffff",{seg:8});for(let i of[-.65,.65])for(let s of[-.27,.27])n.sphere(.06,i,.08,s,t,fe);return n.cyl(.02,.02,.35,-.72,.6,0,t,{metalness:.8}),n.box(.08,.03,.2,-.66,.92,0,t,fe),n.box(.25,.05,.12,.45,.66,-.3,"#e0a94a",{round:.02}),{w:1.7,d:.8,h:.95,wall:!0,up:1}},sink(n,e){let t=e.room==="kitchen",i=t?"#f3eee4":"#86a6bf";n.box(1,.8,.5,0,.05,-.02,i),n.box(1,.05,.5,0,0,-.04,"#2a2626");for(let s of[-1,1])n.frame(.44,.66,.025,s*.24,.12,.235,"#cfc8ba",.02);n.box(1.08,.05,.56,0,.85,0,t?"#d8d8d4":"#f6f2ea",{roughness:.35}),n.sphere(.24,0,.88,.02,"#ffffff",{sy:.32,seg:22,roughness:.2}),n.cyl(.18,.18,.012,0,.9,.02,"#a9cfd8",{seg:20,roughness:.05}),n.cyl(.02,.02,.26,0,.88,-.2,"#cfd3d6",{metalness:.85,roughness:.2}),n.cbox(.02,.02,.14,0,1.13,-.14,"#cfd3d6",{metalness:.85,roughness:.2});for(let s of[-.12,.12])n.sphere(.03,s,.93,-.2,"#cfd3d6",{metalness:.85});return t?(n.cyl(.07,.06,.18,.4,.88,-.12,"#2f6f7e",{seg:10}),ft(n,{seed:e.seed,rx:.12,ry:.14,palette:"lime",voxel:.05},.4,1.1,-.12)):(n.box(.7,.75,.04,0,1,-.25,"#c9a24a",fe),n.box(.62,.67,.045,0,1.04,-.25,"#c9dde3",{metalness:.9,roughness:.05}),n.cyl(.04,.035,.12,-.38,.88,-.1,"#f2c94c",{seg:10})),{w:1.08,d:.56,h:t?1.2:1.8,wall:!0,up:1.25}},tv(n,e){let t=e.c??Jn[e.k%Jn.length];n.box(1.5,.45,.45,0,.05,0,t);for(let i of[-1,1])for(let s of[-1,1])n.box(.04,.06,.04,i*.68,0,s*.18,"#3a2a22");for(let i of[-1,1])n.frame(.68,.36,.025,i*.36,.09,.226,"#3a2a22",.02);return n.box(.3,.03,.2,0,.5,0,"#1b1b1e"),n.box(.06,.12,.06,0,.5,-.02,"#1b1b1e"),n.box(1.2,.7,.06,0,.62,-.02,"#1b1b1e"),n.box(1.14,.64,.01,0,.65,.015,"#2b4f7a",{roughness:.15,emissive:"#3c6ea8",ei:.35}),gs(n,.18,e.seed,"leafy","#efe6c8","green",null,.6,.5,.05),{w:1.5,d:.5,h:1.35,wall:!0,up:1.1}},fireplace(n,e){let r=e.c??(e.marble?"#efe9dc":"#9a4a3a"),a=1.4*.55,o=1.1*.6,c=(1.4-a)/2,l=e.marble?{roughness:.25}:{material:mt(e.stone?"stone":"brick",r,e.stone?"#6e6a62":"#d9c9b4",2,2)};if(n.box(c,1.1,.5,-1.4/2+c/2,0,0,r,l),n.box(c,1.1,.5,1.4/2-c/2,0,0,r,l),n.box(a,1.1-o,.5,0,o,0,r,l),n.box(a,o,.05,0,0,-.5/2+.025,"#1a1412"),n.box(1.4+.2,.08,.5+.12,0,1.1,.03,e.marble?"#d9b44a":"#c4a27a",e.marble?fe:{}),e.stockings)for(let f=0;f<3;f++)n.box(.14,.3,.06,-.45+f*.45,1.1-.3,.5/2+.06,["#b3202c","#2f5a3a","#f6f2ea"][f]),n.box(.2,.08,.06,-.42+f*.45,1.1-.32,.5/2+.06,["#b3202c","#2f5a3a","#f6f2ea"][f]),n.box(.16,.06,.065,-.45+f*.45,1.1-.06,.5/2+.06,"#f6f2ea");n.box(a+.4,.04,.4,0,0,.5/2+.14,"#2a2220"),ft(n,{seed:7,rx:a*.3,ry:o*.3,rz:.12,voxel:.06,palette:"autumn",sparse:.2},0,.02,0),n.sphere(.12,0,.12,0,"#ff9a3a",{sy:.8,emissive:"#ff7a1a",ei:1.6,shadow:!1}),n.box(a*.6,.06,.15,0,0,0,"#3a2418");for(let f of[-1,1])n.cyl(.04,.05,.12,f*.55,1.1+.08,.02,"#c9a24a",fe),n.cyl(.018,.018,.14,f*.55,1.1+.2,.02,"#f6f2ea");n.box(.26,.22,.1,0,1.1+.08,0,"#c9a24a",fe),n.cyl(.08,.08,.012,0,1.1+.19,.05,"#f6f2ea",{rx:Math.PI/2,center:!0,seg:14});let h=new li("#ff9a3c",2.2,3.5,1.6);return h.position.set(0,o*.4,.45),n.add(h),{w:1.4+.2,d:.5+.3,h:1.1+.3,wall:!0,up:1.1}},counter(n,e){let r=e.c??["#f3eee4","#9fb08a","#86a6bf"][e.k%3];n.box(1.7,.9-.04,.65-.05,0,0,-.025,r),n.box(1.7,.04,.65,0,.9-.04,0,"#d8d8d4",{roughness:.4}),n.box(1.7,.08,.65-.1,0,0,-.07,"#2a2626");let a=3;for(let c=1;c<a;c++)n.box(.012,.9-.2,.01,-1.7/2+c*1.7/a,.1,.65/2-.045,"#bdb6a8");for(let c=0;c<a;c++)n.box(.1,.02,.03,-1.7/2+(c+.5)*1.7/a,.9-.2,.65/2-.03,"#9c9c9c",{metalness:.7});let o=1.7/2-.42;n.box(.6,.012,.5,o,.9,0,"#1d1d1f",{roughness:.25});for(let c of[-.14,.14])for(let l of[-.12,.12])n.cyl(.08,.08,.008,o+c,.9+.012,l,"#3a3a3e",{seg:16});return n.cyl(.12,.11,.16,o-.14,.9+.02,.12,"#c27a4a",{seg:16,metalness:.6,roughness:.35}),n.cbox(.24,.02,.04,o-.36,.9+.15,.12,"#3a2a22"),n.box(.45,.03,.3,-.35,.9,.02,"#c4a27a"),n.sphere(.12,-.38,.9+.06,.02,"#d9a066",{sy:.6,seg:12}),n.box(.08,.3,.08,-.72,.9,-.2,"#efe6c8"),{w:1.7,d:.65,h:.9+.35,wall:!0,up:1.05,spots:[[0,.9,.05]]}},cabinet(n,e){let t=e.w??1.2,i=.5,s=1,r=e.c??["#f3eee4","#86a6bf","#8a5a36","#9fb08a"][e.k%4],a=new Re(r).offsetHSL(0,0,-.08).getStyle();n.box(t,s,i,0,0,0,r),n.box(t+.03,.03,i+.03,0,s,0,r);for(let o=0;o<2;o++){let c=-t/2+(o+.5)*t/2;n.frame(t/2-.08,s-.12,.025,c,.06,i/2+.005,a,.02),n.sphere(.025,c+(o%2?-1:1)*(t/4-.1),s*.55,i/2+.03,"#c9a24a",{...fe,seg:8})}return n.cyl(.08,.1,.25,-.3,s+.03,0,"#2f6f7e",{seg:12,roughness:.3}),ft(n,{seed:e.seed,rx:.18,ry:.16,palette:"green",voxel:.05,flowers:["#e8492c","#f4f1ff","#f2c94c"][e.k%3],flowerRate:.5},-.3,s+.35,0),n.cbox(.26,.2,.03,.25,s+.13,-.05,"#c9a24a",{rx:-.2,...fe}),n.cbox(.2,.15,.035,.25,s+.13,-.045,"#8fc3d6",{rx:-.2}),{w:t+.05,d:i+.05,h:s+.5,wall:!0,up:1.2,spots:[[-.02,s+.03,.05]]}},lamp(n,e){let t="#ffc777",i={emissive:t,ei:1.2};n.cyl(.18,.2,.03,-.12,0,0,"#2a2523"),n.cyl(.015,.015,1.4,-.12,0,0,"#2a2523"),n.cyl(.17,.26,.3,-.12,1.3,0,e.c??"#f3e2b8",i),n.cyl(.22,.22,.03,.3,.5,.15,Jn[e.k%Jn.length],{seg:18}),n.cyl(.025,.025,.5,.3,0,.15,"#3a2a22"),n.cyl(.12,.12,.02,.3,0,.15,"#3a2a22"),n.cyl(.05,.045,.09,.36,.53,.1,"#f4efe4",{seg:10});let s=new li(t,2.2,4.5,1.5);return s.position.set(-.12,1.35,0),n.add(s),{w:.8,d:.6,h:1.6,up:1.3}},tree(n,e){let t=Me(e.seed),i=2.5,s=1.75,r=i*.5;n.cyl(.07,.13,r,0,0,0,"#6b4a34");for(let o=0;o<3;o++){let c=t()*Math.PI*2;n.cbox(.06,r*.5,.06,Math.cos(c)*.22,r*.85,Math.sin(c)*.22,"#6b4a34",{rz:Math.cos(c)*.6,rx:-Math.sin(c)*.6})}let a=["green","lime","olive","blossom"][e.k%4];return ft(n,{seed:e.seed,rx:s/2,ry:(i-r)*.6,palette:a,voxel:.15,flowers:a==="blossom"?null:"#f4f1ff",flowerRate:.04},0,r*.85,0),n.cyl(.42,.45,.05,0,0,0,"#8a6a4a",{seg:16}),{w:s,d:s,h:i,up:1}},fountain(n){let t="#d8ccb2",i="#5fa5b5";n.cyl(.85,.85+.05,.4,0,0,0,t,{seg:28}),n.cyl(.85-.12,.85-.12,.02,0,.34,0,i,{seg:28,roughness:.1,metalness:.2}),n.cyl(.14,.2,.9,0,.3,0,t,{seg:14}),n.cyl(.45,.25,.15,0,1.1,0,t,{seg:18}),n.cyl(.37,.37,.02,0,1.2,0,i,{seg:18,roughness:.1}),n.sphere(.1,0,1.33,0,t);for(let s=0;s<3;s++)n.cyl(.09,.09,.012,Math.cos(s*2.2)*.5,.36,Math.sin(s*2.2)*.5,"#5a9440",{seg:10,t0:.3,tl:Math.PI*1.8});return{w:2*.85+.1,d:2*.85+.1,h:1.45,up:1}}},H3=Object.keys(eh);function Uu(n,{room:e="living",k:t=0,seed:i=1,fit:s=1.7,theme:r=""}={}){let a=Du(r,n),o=a&&(Lu[a.model]??eh[a.model])||eh[n],c=new Dt;if(!o)return{group:c,h:0,seat:0,wall:!1,size:[0,0]};Zn(i*7919);let l=new tn,h=o(l,{room:e,k:t,seed:i,...(a==null?void 0:a.params)??{}})??{},f=l.build(),u=Math.min(h.up??1.4,s/Math.max(h.w,h.d));f.scale.setScalar(u),h.cz&&(f.position.z=-h.cz*u),c.add(f);let d=(h.spots??[]).map(([p,_,g])=>[p*u,_*u,(g-(h.cz??0))*u]);return{group:c,h:h.h*u,seat:h.seat!=null?h.seat*u:null,wall:!!h.wall,size:[h.w*u,h.d*u],spots:d}}var Je=(n,e)=>e[Math.floor(n()*e.length)],Fu=["#e8492c","#e0a94a","#7cae4f","#f2c94c","#8e3b7a","#f08a3c"],Ln=["#c0392b","#2f6f7e","#7a3fa0","#d9a441","#3f7a4a","#c46aa8","#33405a","#e07a5f"],cy=["#3f7a4a","#7a2a2a","#2f5d8a","#c9a24a","#5a3b26"],Wa=["#8a5a36","#a8703f","#6b4a34","#b98552"],ur={plate(n,e){n.cyl(.17,.13,.025,0,0,0,"#f6f2ea",{seg:18,roughness:.3});let t=Je(e,["#c0602a","#e0a94a","#7cae4f","#a33b2b"]);n.sphere(.08,0,.04,0,t,{sy:.5,seg:10}),n.sphere(.04,.07,.04,.03,Je(e,Fu),{seg:8})},fruitBowl(n,e){n.sphere(.16,0,.05,0,Je(e,["#efe6c8","#2f6f7e","#c9a24a"]),{sy:.45,seg:16});for(let t=0;t<5;t++)n.sphere(.055,Math.cos(t*1.3)*.07,.1+t%2*.03,Math.sin(t*1.3)*.07,Je(e,Fu),{seg:8})},cake(n,e){let t=Je(e,["#f6d3e0","#f6f2ea","#c97a4a","#f2e2a0"]);n.cyl(.18,.18,.015,0,0,0,"#f6f2ea",{seg:20}),n.cyl(.13,.13,.1,0,.015,0,"#e0b47e",{seg:20}),n.cyl(.135,.135,.03,0,.1,0,t,{seg:20});for(let i=0;i<5;i++)n.sphere(.02,Math.cos(i*1.256)*.09,.14,Math.sin(i*1.256)*.09,"#c0283a",{seg:6})},teaset(n,e){let t=Je(e,["#f6f2ea","#2f6f7e","#c46aa8","#d9a441"]);n.sphere(.08,0,.08,0,t,{sy:.9,seg:14}),n.cyl(.02,.02,.03,0,.15,0,t),n.cbox(.1,.025,.025,.1,.1,0,t,{rz:.6});for(let[i,s]of[[-.16,.08],[.14,.12]])n.cyl(.06,.06,.012,i,0,s,"#f6f2ea",{seg:12}),n.cyl(.04,.032,.05,i,.012,s,t,{seg:12})},bottles(n,e){let t=2+Math.floor(e()*2);for(let i=0;i<t;i++){let s=(i-(t-1)/2)*.09,r=(e()-.5)*.08,a=.18+e()*.08,o=Je(e,cy);n.cyl(.035,.038,a,s,0,r,o,{seg:10,roughness:.2}),n.cyl(.014,.022,.07,s,a,r,o,{seg:8,roughness:.2}),n.cyl(.016,.016,.02,s,a+.07,r,"#8a5a36",{seg:6})}},candles(n,e){n.cyl(.11,.12,.02,0,0,0,"#c9a24a",{seg:14,metalness:.7,roughness:.3});for(let t=0;t<3;t++){let i=Math.cos(t*2.1)*.05,s=Math.sin(t*2.1)*.05,r=.1+e()*.12;n.cyl(.022,.022,r,i,.02,s,"#f6f2ea",{seg:8}),n.sphere(.014,i,.04+r,s,"#ffcf7a",{emissive:"#ffb340",ei:1.5,shadow:!1,seg:6})}},books(n,e){let t=2+Math.floor(e()*3);for(let i=0;i<t;i++)n.cbox(.26-e()*.05,.045,.19,(e()-.5)*.03,.022+i*.045,0,Je(e,Ln),{ry:(e()-.5)*.7})},papers(n,e){for(let t=0;t<4;t++)n.cbox(.18,.004,.24,(e()-.5)*.18,.003+t*.003,(e()-.5)*.16,t===3?"#efe2b8":"#f6f2ea",{ry:e()*3,shadow:!1})},scroll(n,e){n.cbox(.06,.06,.3,0,.03,0,"#efe2b8",{round:.028,ry:e()*3}),n.cbox(.02,.065,.02,0,.03,0,"#a33b2b",{ry:e()*3})},crate(n,e){let t=.34+e()*.08,i=Je(e,Wa);n.box(t,t,t,0,0,0,i);for(let s of[.04,t-.04])n.box(t+.01,.04,t+.01,0,s-.02,0,"#5a3b26");e()<.5&&n.box(t*.6,t*.5,t*.6,.02,t,.01,Je(e,Wa))},barrel(n,e){n.cyl(.15,.15,.42,0,0,0,Je(e,Wa),{seg:14}),n.cyl(.18,.18,.42*.5,0,.42*.25,0,Je(e,Wa),{seg:14});for(let i of[.06,.42/2-.02,.42-.08])n.cyl(.182,.182,.03,0,i,0,"#3a3433",{seg:14,metalness:.5})},sack(n,e){let t=Je(e,["#c9b27a","#b89a6a","#d8c79a"]);n.sphere(.17,0,.14,0,t,{sy:.85,seg:12}),n.cyl(.05,.08,.1,0,.26,0,t,{seg:10}),n.cyl(.055,.055,.02,0,.3,0,"#7a5a3a",{seg:10})},bread(n,e){n.cyl(.16,.13,.08,0,0,0,"#a8703f",{seg:14}),n.cbox(.3,.07,.08,0,.1,0,"#d9a066",{round:.035,ry:.4}),n.sphere(.06,-.06,.12,.05,"#c98a4a",{seg:10}),e()<.5&&n.cbox(.26,.06,.06,.02,.15,-.04,"#e0b47e",{round:.03,ry:-.5})},cheese(n,e){n.cyl(.14,.14,.09,0,0,0,"#f2d46a",{seg:16,t0:0,tl:Math.PI*1.6}),n.cbox(.08,.06,.06,.16,.03,.08,"#f5dd84",{ry:e()*3})},pumpkin(n,e){let t=.14+e()*.05;for(let i=0;i<6;i++)n.sphere(t*.6,Math.cos(i*1.05)*t*.45,t*.75,Math.sin(i*1.05)*t*.45,"#e07a2a",{sy:1.2,seg:10});n.cyl(.02,.03,.08,0,t*1.4,0,"#4a6a2a",{seg:6})},mushrooms(n,e){for(let t=0;t<3;t++){let i=(e()-.5)*.25,s=(e()-.5)*.25,r=.06+e()*.08;n.cyl(.02,.025,r,i,0,s,"#f6f2ea",{seg:8}),n.sphere(.05+e()*.03,i,r,s,Je(e,["#c0283a","#a8703f","#e0b47e"]),{sy:.55,seg:10})}},rocks(n,e){for(let t=0;t<3;t++)n.sphere(.06+e()*.08,(e()-.5)*.3,.03,(e()-.5)*.3,Je(e,["#8e8a82","#a9a296","#6e6a62"]),{sy:.6,seg:7})},shells(n,e){for(let s=0;s<3;s++)n.sphere(.05+e()*.03,(e()-.5)*.3,.015,(e()-.5)*.3,Je(e,["#f6d3c9","#f2e6d8","#e9b8a8"]),{sy:.4,seg:8,t0:0});let t=(e()-.5)*.2,i=(e()-.5)*.2;for(let s=0;s<5;s++)n.cbox(.16,.025,.045,t+Math.cos(s*1.256)*.07,.013,i+Math.sin(s*1.256)*.07,"#e8743a",{ry:-s*1.256})},pearls(n,e){n.sphere(.13,0,.03,0,"#e9b8a8",{sy:.35,seg:12});for(let t=0;t<5;t++)n.sphere(.03,Math.cos(t*1.3)*.06,.06,Math.sin(t*1.3)*.06,"#f8f4ff",{seg:8,roughness:.15})},coral(n,e){let t=Je(e,["#f08a7e","#f0a8c4","#e8743a","#b56ad8"]);for(let i=0;i<5;i++)n.cbox(.035,.2+e()*.15,.035,(e()-.5)*.12,.12,(e()-.5)*.12,t,{rz:(e()-.5)*.9,rx:(e()-.5)*.9,round:.015})},coins(n,e){for(let t=0;t<9;t++)n.cyl(.04,.04,.012,(e()-.5)*.18,t<5?0:.012*(t-4),(e()-.5)*.18,"#e0b23a",{seg:10,metalness:.8,roughness:.3})},bones(n,e){for(let t=0;t<2;t++){let i=e()*3,s=(e()-.5)*.15,r=(e()-.5)*.15;n.cbox(.26,.03,.03,s,.02,r,"#efe6d0",{ry:i});for(let a of[-1,1])n.sphere(.03,s+Math.cos(i)*.13*a,.025,r-Math.sin(i)*.13*a,"#efe6d0",{seg:6})}e()<.5&&(n.sphere(.08,.1,.07,.08,"#efe6d0",{seg:10}),n.box(.06,.05,.06,.1,0,.13,"#efe6d0"))},hay(n,e){n.cbox(.4,.22,.26,0,.11,0,"#e0c46a",{round:.04,ry:e()*3});for(let t=0;t<6;t++)n.cbox(.012,.012,.18,(e()-.5)*.4,.005,(e()-.5)*.4,"#e9d48a",{ry:e()*3,shadow:!1})},logs(n,e){for(let t=0;t<3;t++)n.cbox(.09,.09,.36,(t-1)*.1,.045+(t===1?.08:0),0,"#7a5a3a",{round:.04,ry:1.57+(e()-.5)*.2})},vase(n,e){let t=Je(e,["#2f6f7e","#efe6c8","#c46aa8","#d9a441"]);n.cyl(.05,.07,.18,0,0,0,t,{seg:12});for(let i=0;i<5;i++)n.sphere(.04,Math.cos(i*1.3)*.05,.24+i%2*.04,Math.sin(i*1.3)*.05,Je(e,["#f2c94c","#e8492c","#f4f1ff","#c46aa8"]),{seg:6})},lantern(n,e){n.box(.12,.02,.12,0,0,0,"#2a2523"),n.box(.09,.14,.09,0,.02,0,"#ffd27a",{emissive:"#ffb340",ei:.9}),n.cyl(0,.08,.06,0,.16,0,"#2a2523",{seg:4})},cushion(n,e){n.cbox(.32,.08,.32,0,.04,0,Je(e,Ln),{round:.035,ry:e()*3})},mat(n,e){let[t,i]=[Je(e,Ln),Je(e,["#efe6c8","#f4efe4","#e9d9b8"])],s=.55+e()*.15,r=.36;n.box(s,.008,r,0,0,0,i,{jitter:0,shadow:!1}),n.box(s-.08,.012,r-.08,0,0,0,t,{jitter:0,shadow:!1}),n.box(s-.22,.016,.06,0,0,0,i,{jitter:0,shadow:!1})},hat(n,e){let t=Je(e,["#2a2523","#7a3f2a","#33405a","#c9a24a"]);n.cyl(.15,.15,.015,0,0,0,t,{seg:16}),n.cyl(.08,.09,.12,0,.015,0,t,{seg:14}),n.cyl(.092,.092,.025,0,.03,0,Je(e,Ln),{seg:14})},suitcase(n,e){let t=Je(e,["#7a3f2a","#33405a","#a8703f","#3f6a4a"]);n.box(.4,.12,.28,0,0,0,t,{round:.02}),n.box(.41,.02,.29,0,.06,0,"#c9a24a",{metalness:.6}),n.box(.1,.03,.02,0,.12,.08,"#2a2523")},bucket(n,e){n.cyl(.12,.09,.18,0,0,0,Je(e,["#8e9aa6","#a8703f"]),{seg:14,metalness:.4}),n.cyl(.105,.105,.01,0,.15,0,"#5fa5b5",{seg:14,roughness:.1})},ball(n,e){n.sphere(.11,0,.11,0,Je(e,Ln),{seg:14}),n.cbox(.225,.03,.03,0,.11,0,"#f6f2ea",{ry:e()*3,round:.012})},jar(n,e){let t=Je(e,["#c9763a","#b5523b","#d9b47a"]);n.sphere(.12,0,.13,0,t,{sy:1.15,seg:12}),n.cyl(.05,.07,.08,0,.24,0,t,{seg:10}),e()<.6&&n.cbox(.1,.03,.04,.1,.22,0,t,{rz:.8})},rope(n){for(let e=0;e<3;e++)n.cyl(.16-e*.04,.16-e*.04,.04,0,e*.04,0,"#c9a46a",{seg:16,roughness:1})},cannonballs(n){let e=[[-.07,0,-.04],[.07,0,-.04],[0,0,.08],[0,.11,0]];for(let[t,i,s]of e)n.sphere(.07,t,i+.07,s,"#2a2523",{seg:10,metalness:.5})},mugs(n,e){for(let[t,i]of[[-.07,0],[.08,.05]]){let s=Je(e,Ln);n.cyl(.045,.045,.1,t,0,i,s,{seg:12}),n.cbox(.03,.06,.012,t+.055,.05,i,s),n.cyl(.04,.04,.01,t,.09,i,"#6b3a1a",{seg:12})}},popcorn(n,e){n.cyl(.08,.06,.18,0,0,0,"#d8263f",{seg:12});for(let t=0;t<7;t++)n.sphere(.03,(e()-.5)*.1,.2+e()*.04,(e()-.5)*.1,"#f8efc8",{seg:6})},canisters(n,e){for(let t=0;t<2;t++){let i=(t-.5)*.14;n.cyl(.06,.06,.26,i,0,0,Je(e,["#c9d1db","#e0a040","#5fb3a8"]),{seg:12,metalness:.6,roughness:.35}),n.cyl(.035,.035,.03,i,.26,0,"#2a2523",{seg:8})}},footprints(n,e){let t=e()*6.28;for(let i=0;i<3;i++)n.cbox(.06,.004,.11,Math.cos(t)*i*.11+i%2*.05,.002,Math.sin(t)*i*.11,"#4a3628",{ry:-t+Math.PI/2,shadow:!1,jitter:0})},puddle(n,e){n.cyl(.14,.14,.004,0,0,0,Je(e,["#7a2a2a","#5fa5b5","#c9a24a"]),{seg:14,roughness:.05,shadow:!1}),n.cbox(.05,.12,.05,.06,.03,.02,"#e8f0f2",{rz:1.57,roughness:.1})},roundMat(n,e){let t=[Je(e,Ln),Je(e,["#efe6c8","#f4efe4"]),Je(e,Ln)];for(let i=0;i<3;i++)n.cyl(.32-i*.09,.32-i*.09,.008+i*.004,0,0,0,t[i],{seg:22,jitter:0,shadow:!1})},runner(n,e){let t=Je(e,Ln);n.box(.3,.008,.85,0,0,0,"#efe6c8",{jitter:0,shadow:!1}),n.box(.22,.012,.77,0,0,0,t,{jitter:0,shadow:!1});for(let i=0;i<3;i++)n.cbox(.08,.016,.08,0,.006,-.25+i*.25,"#efe6c8",{ry:.785,jitter:0,shadow:!1})},stool(n,e){let t=Je(e,Wa);for(let[i,s]of[[-.09,-.09],[.09,-.09],[0,.11]])n.cyl(.018,.022,.26,i,0,s,t,{seg:6});n.cyl(.15,.15,.04,0,.26,0,t,{seg:14})},skis(n,e){let t=Je(e,["#c0283a","#2f5d8a","#f2c94c"]);for(let i of[-.05,.05])n.box(.07,.015,.75,i,0,0,t),n.cbox(.07,.015,.1,i,.03,.4,t,{rx:-.5});n.cyl(.012,.012,.6,.15,.01,0,"#2a2523",{rx:1.57,seg:5})},horseshoe(n){for(let e=0;e<7;e++){let t=Math.PI*(e/6);n.cbox(.05,.02,.035,Math.cos(t)*.08,.01,Math.sin(t)*.08,"#8e8a82",{ry:-t,metalness:.6})}},pins(n,e){for(let t=0;t<3;t++){let i=(t-1)*.08,s=Je(e,Ln);n.cyl(.03,.02,.18,i,0,0,"#f6f2ea",{seg:8}),n.sphere(.035,i,.2,0,s,{seg:8}),n.cyl(.032,.032,.02,i,.1,0,s,{seg:8})}},robot(n,e){let t=Je(e,["#c9d1db","#e0a040","#5fb3a8"]);n.box(.2,.18,.16,0,.06,0,t,{round:.03,metalness:.5}),n.box(.14,.1,.12,0,.25,0,t,{round:.03,metalness:.5});for(let i of[-.035,.035])n.sphere(.018,i,.3,.062,"#5ad8ff",{emissive:"#2ab8ff",ei:1.4,seg:6});for(let i of[-.07,.07])n.cyl(.035,.035,.04,i,0,0,"#2a2f38",{rz:1.57,seg:10});n.cyl(.006,.006,.08,0,.35,0,"#2a2f38",{seg:4}),n.sphere(.018,0,.44,0,"#ff4a4a",{emissive:"#ff2020",ei:1.4,seg:6})},cables(n,e){for(let t=0;t<2;t++){let i=Je(e,["#c0283a","#2f5d8a","#2a2523","#f2c94c"]);for(let s=0;s<9;s++)n.cbox(.06,.02,.02,Math.cos(s*.7+t)*.12,.01,Math.sin(s*.9+t)*.12,i,{ry:s*.7+t,jitter:0})}},sandals(n,e){let t=Je(e,["#c9a46a","#7a5a3a","#c0283a"]);for(let i of[-.06,.06])n.box(.08,.025,.2,i,0,0,t,{round:.01}),n.box(.06,.012,.012,i,.025,.05,"#2a2523")},grapes(n,e){let t=Je(e,["#6a2a6a","#8ab04a"]);n.cyl(.13,.11,.02,0,0,0,"#c9a24a",{seg:14,metalness:.6});for(let i=0;i<12;i++)n.sphere(.025,(e()-.5)*.12,.04+i%3*.025,(e()-.5)*.1,t,{seg:6})},letters(n,e){for(let t=0;t<3;t++)n.cbox(.16,.006,.11,(e()-.5)*.12,.004+t*.006,(e()-.5)*.12,"#f6efdc",{ry:e()*3,shadow:!1});n.cyl(.018,.018,.008,.02,.022,.01,"#a33b2b",{seg:8})},paperLantern(n,e){let t=Je(e,["#e8492c","#f2c94c","#f6efdc"]);n.sphere(.11,0,.13,0,t,{sy:1.25,seg:12,emissive:t,ei:.35}),n.cyl(.05,.05,.02,0,0,0,"#2a2523",{seg:8}),n.cyl(.05,.05,.02,0,.26,0,"#2a2523",{seg:8})},eggs(n,e){n.cyl(.13,.1,.05,0,0,0,"#c9a46a",{seg:12});for(let t=0;t<4;t++)n.sphere(.045,Math.cos(t*1.6+e())*.06,.08,Math.sin(t*1.6+e())*.06,Je(e,["#f2a6c0","#9ad0e0","#f6e08a","#b7d98a","#c8a0e0"]),{sy:1.3,seg:10,roughness:.4})},confetti(n,e){for(let t=0;t<14;t++)n.cbox(.035,.006,.022,(e()-.5)*.36,.003,(e()-.5)*.36,Je(e,Ln),{ry:e()*3.14,jitter:0,shadow:!1})},firecrackers(n,e){for(let t=0;t<5;t++){let i=(t-2)*.042,s=.14+e()*.04;n.cyl(.02,.02,s,i,0,0,"#c0283a",{seg:8}),n.cyl(.021,.021,.02,i,s-.02,0,"#e0b23a",{seg:8,metalness:.6})}},presents(n,e){for(let[t,i,s,r,a]of[[.2,.14,0,0,0],[.13,.1,.02,.14,.01],[.12,.09,-.17,0,.09]]){let o=Je(e,["#c0283a","#2f6f7e","#f2c94c","#3f7a4a","#c46aa8","#f6f2ea"]),c=o==="#f2c94c"?"#c0283a":"#f2c94c",l=e()*.8;n.box(t,i,t,s,r,a,o,{ry:l}),n.box(t+.006,i+.006,.025,s,r,a,c,{ry:l}),n.box(.025,i+.006,t+.006,s,r,a,c,{ry:l})}},hearts(n,e){for(let t=0;t<4;t++){let i=(e()-.5)*.3,s=(e()-.5)*.3,r=e()*6.28,a=.03+e()*.015,o=Je(e,["#e5384f","#ff7f99","#f2a6c0","#c0283a"]),c=Math.cos(r)*a*.7,l=-Math.sin(r)*a*.7;n.sphere(a,i+c,.006,s+l,o,{sy:.2,seg:8}),n.sphere(a,i-c,.006,s-l,o,{sy:.2,seg:8}),n.cbox(a*1.45,.012,a*1.45,i-Math.sin(r)*a*.75,.006,s-Math.cos(r)*a*.75,o,{ry:r+Math.PI/4,jitter:0})}},scarab(n){n.sphere(.07,0,.03,0,"#2f8a6a",{sy:.5,seg:10,metalness:.6,roughness:.3}),n.sphere(.035,0,.025,.08,"#1f5a4a",{seg:8,metalness:.6})},fishbones(n){n.box(.26,.012,.015,0,.005,0,"#efe6d0");for(let e=0;e<6;e++)n.cbox(.012,.012,.09,-.08+e*.03,.005,0,"#efe6d0");n.cbox(.06,.015,.06,.15,.008,0,"#efe6d0",{ry:.785})},birdcage(n){n.cyl(.1,.1,.02,0,0,0,"#c9a24a",{seg:12,metalness:.7});for(let e=0;e<10;e++)n.cyl(.005,.005,.26,Math.cos(e*.628)*.09,.02,Math.sin(e*.628)*.09,"#c9a24a",{seg:4,metalness:.7});n.sphere(.1,0,.27,0,"#c9a24a",{sy:.5,seg:10,metalness:.7}),n.sphere(.035,0,.1,0,"#f2c94c",{seg:8})},umbrella(n,e){let t=Je(e,Ln);n.cyl(.008,.008,.6,0,.02,0,"#2a2523",{rz:1.3,seg:4}),n.cyl(0,.08,.36,-.12,.08,0,t,{rz:1.3,seg:8})}};for(let[n,e]of Object.entries(ms))["fern","flowers","tuft","bush","bonsai","kelp","cactus","dryBush"].includes(n)&&(ur[`plant_${n}`]=e);var ku={living:["books","cushion","mat","roundMat","vase","ball","papers","mugs","stool","birdcage"],kitchen:["sack","bread","crate","bucket","jar","fruitBowl","cheese","stool","runner"],bedroom:["cushion","books","hat","suitcase","mat","roundMat","papers","letters"],bathroom:["bucket","mat","bottles","cushion","roundMat"],office:["papers","books","scroll","crate","mugs","letters","stool"],library:["books","books","scroll","papers","candles","cushion","runner","letters"],dining:["bottles","crate","jar","mat","fruitBowl","runner","stool"],garden:["rocks","mushrooms","ball","hay","logs","plant_flowers","plant_tuft","plant_fern","plant_bush"],hall:["suitcase","hat","mat","footprints","crate","runner","umbrella"],music:["papers","candles","cushion","mat","roundMat","vase"],guest:["suitcase","cushion","books","hat","roundMat"],game:["ball","bottles","cushion","papers","mugs","pins","stool"],veranda:["vase","cushion","rocks","hat","mugs","plant_flowers","birdcage"],laundry:["bucket","sack","crate","mat","runner"]},Ou=["rocks","plant_tuft","plant_flowers","plant_fern","mushrooms","plant_tuft","footprints","plant_bush"],th=["plate","plate","fruitBowl","cake","teaset","bottles","candles","books","cheese","bread","vase","mugs","papers","grapes","letters"],Bu={mermaids:["shells","pearls","coral","shells","coral","plant_kelp","fishbones","coins"],japan:["teaset","lantern","paperLantern","cushion","scroll","sandals","plant_bonsai","roundMat"],paris:["bread","cheese","bottles","papers","books","umbrella","letters","plant_flowers"],regency:["teaset","cake","vase","hat","letters","birdcage","plant_flowers","runner"],egypt:["jar","scroll","coins","jar","scarab","sandals","plant_dryBush","grapes"],pirates:["barrel","crate","coins","rope","cannonballs","bottles","fishbones","birdcage"],western:["hay","barrel","bottles","hat","sack","horseshoe","plant_cactus","stool"],space:["canisters","crate","papers","canisters","robot","cables","robot"],haunted:["pumpkin","candles","bones","books","footprints","birdcage","mushrooms","puddle"],medieval:["barrel","sack","bread","candles","hay","stool","logs"],prehistory:["bones","rocks","mushrooms","logs","hay","plant_fern","fishbones"],circus:["ball","popcorn","hat","cushion","ball","pins","roundMat"],train:["suitcase","papers","bottles","hat","suitcase","letters","umbrella"],chalet:["logs","mugs","books","cushion","skis","roundMat"],world:["suitcase","hat","fruitBowl","coins","letters","umbrella","paperLantern"],rome:["jar","fruitBowl","scroll","coins","grapes","sandals","roundMat"],halloween:["pumpkin","pumpkin","candles","mushrooms","cake","footprints","hay"],easter:["eggs","eggs","cake","plant_flowers","teaset","hay","roundMat"],carnival:["confetti","confetti","hat","cake","bottles","cushion","runner"],lunar:["paperLantern","lantern","teaset","firecrackers","coins","scroll","plant_bonsai"],manor:["books","teaset","candles","vase","puddle","letters","birdcage"],xmas:["presents","presents","cake","candles","mugs","logs","skis","roundMat"],birthday:["presents","confetti","cake","presents","ball","popcorn","hat","confetti"],love:["hearts","letters","vase","plant_flowers","candles","teaset","hearts","runner"],forest:["mushrooms","mushrooms","logs","plant_fern","rocks","footprints","jar","hay"]},ly=new Set([...th,"coins","pearls","shells","scroll","jar","lantern","popcorn","canisters","pumpkin","hat","grapes","letters","scarab","paperLantern","birdcage","eggs","firecrackers","presents"]),zu={none:0,some:.4,lots:.85},hy=1.35;function Vu(n,e){var l,h;let t=zu[e.clutter]??zu.some;if(!t)return null;let i=Me(((n.seed??1)>>>0)*977+13);Zn(((n.seed??1)>>>0)+4242);let s=new tn,r=Bu[n.theme]??Bu.manor,a=(f,u,d,p,_,g=1)=>{Zn(Math.floor(i()*1e9));let m=new tn;if(ur[f](m,i),f.startsWith("plant_")&&(g*=.55),g!==1)for(let M of m.buckets.values())for(let S of M.gs)S.scale(g,g,g);s.merge(m,_,u,d,p)},o=[[-1,-1],[1,-1],[-1,1],[1,1]];for(let f=0;f<e.n;f++)for(let u=0;u<e.n;u++){let d=e.cells[f][u],p=e.cellCenter(e.n,f,u),_=e.roomType(f,u),g=e.spots.get(`${f},${u}`);if(g){for(let[b,P,y]of g)i()<Math.min(.95,t*1.7)&&a(Je(i,i()<.3?r.filter(E=>ly.has(E)).concat(th):th),b,P,y,i()*6.28,.75);continue}if(d.object)continue;let m=i()<t?i()<t*.55?i()<t*.3?3:2:1:0,M=(l=e.plates)==null?void 0:l.has(`${f},${u}`),S=o.filter(([,b])=>!M||b>0).sort(()=>i()-.5),T=((h=e.isOpen)==null?void 0:h.call(e,f,u))?[...Ou,...Ou,...r]:[...ku[_]??ku.living,...r,...r];for(let b=0;b<Math.min(m,S.length);b++){let[P,y]=S[b],E=.56+i()*.06;a(Je(i,T),p.x+P*E,.005,p.z+y*E,i()*6.28,hy)}}let c=s.build();return c.name="clutter",c}var Hu={manor:{border:["parquet","#d9b88a","#a8845a"],side:"#8a6446",rim:"#4a3426",ink:"#3a2c26",wall:"plaster",fence:"picket",open:"hedge",deco:["bush","flowers","lamp","bush","rock"]},mermaids:{border:["water","#4fb3c6","#e6fbff"],side:"#2f6f8a",rim:"#1d4a5e",ink:"#ffffff",wall:"coral",fence:"coral",open:"shells",deco:["coralTree","kelp","shells","pearls","kelp","rock"]},japan:{border:["sand","#ece6d6","#cfc6b0"],side:"#5a3b26",rim:"#2a2523",ink:"#3a2c26",wall:"shoji",fence:"bamboo",open:"pebbles",deco:["sakura","lanternStone","bamboo","rock","bonsai"]},paris:{border:["cobble","#b8b0a2","#7e7668"],side:"#5a5048",rim:"#2e2a26",ink:"#ffffff",wall:"plaster",fence:"iron",open:"pebbles",deco:["lamp","flowers","bush","bench","lamp"]},regency:{border:["grass","#9ccc7a","#6fa456"],side:"#7a8a5a",rim:"#3e4a2e",ink:"#ffffff",wall:"plaster",fence:"hedge",open:"hedge",deco:["topiary","rosebush","topiary","fountainSmall","rosebush"]},egypt:{border:["sand","#ecd08a","#c9a456"],side:"#c4a060",rim:"#7a5a2a",ink:"#5a3a1a",wall:"sandstone",fence:"rocks",open:"rocks",deco:["palm","jar","rock","palm","dryBush","obelisk"]},pirates:{border:["water","#3f9fb8","#dff6fb"],side:"#6b4a2b",rim:"#3a2618",ink:"#ffffff",wall:"planks",fence:"rope",open:"rope",deco:["palm","barrel","crate","rock","palm","cannonballs"]},western:{border:["sand","#d9b27a","#a8804c"],side:"#8a5a32",rim:"#4a2e18",ink:"#4a2e18",wall:"planks",fence:"rail",open:"rail",deco:["cactus","barrel","hay","cactus","rock","dryBush"]},space:{border:["metal","#4a5466","#232833"],side:"#2e343e",rim:"#15181e",ink:"#bfe9ff",wall:"metal",fence:"rail",open:"line",deco:["antenna","canisters","crate","canisters","dish"]},haunted:{border:["cobble","#5a5660","#34303a"],side:"#3a3440",rim:"#1a171e",ink:"#e8dcff",wall:"stone",fence:"iron",open:"pebbles",deco:["deadTree","pumpkin","tomb","candles","deadTree","bones"]},medieval:{border:["grass","#9ac06a","#6f9a48"],side:"#6e6258",rim:"#3a332c",ink:"#ffffff",wall:"stone",fence:"palisade",open:"hedge",deco:["bush","hay","barrel","banner","tree","rock"]},prehistory:{border:["grass","#a8c070","#7f9a50"],side:"#7a6248",rim:"#3e3022",ink:"#3a2a1a",wall:"rock",fence:"rocks",open:"rocks",deco:["fern","rock","bones","fern","logs","tree"]},circus:{border:["straw","#e6cc80","#c09a4a"],side:"#c0283a",rim:"#6e1420",ink:"#6e1420",wall:"canvas",fence:"rail",open:"line",deco:["balloons","popcorn","barrel","ball","balloons"]},train:{border:["cobble","#8a8478","#5e5a52"],side:"#4a3a2e",rim:"#221a14",ink:"#ffffff",wall:"planks",fence:"rail",open:"line",deco:["lamp","suitcase","crate","bush","lamp"]},chalet:{border:["snow","#f4f8fc","#cfdbe8"],side:"#7a5a3a",rim:"#3e2c1c",ink:"#3a2c26",wall:"logs",fence:"snow",open:"snow",deco:["pine","snowman","pine","logs","rock","pine"]},world:{border:["water","#4fb0d8","#e8fbff"],side:"#2f7aa0",rim:"#1a4a66",ink:"#ffffff",wall:"plaster",fence:"rail",open:"line",deco:["palm","suitcase","rock","flowers","palm"]},halloween:{border:["grass","#5f7a52","#3f5a38"],side:"#4a2e5a",rim:"#1b0f26",ink:"#ffd9a8",wall:"planks",fence:"picket",open:"pebbles",deco:["pumpkin","deadTree","candles","pumpkin","tomb","bush"]},easter:{border:["grass","#a8d888","#7ab860"],side:"#c8a0c0",rim:"#7a5a78",ink:"#ffffff",wall:"plaster",fence:"picket",open:"hedge",deco:["flowers","eggs","bush","sakura","flowers","eggs"]},carnival:{border:["marble","#efe4d0","#c9b490"],side:"#6a1f6e",rim:"#3a0f3e",ink:"#ffffff",wall:"plaster",fence:"iron",open:"line",deco:["balloons","lamp","confetti","balloons","column","confetti"]},lunar:{border:["cobble","#c9b8a0","#9a8a72"],side:"#b3202c",rim:"#5a1018",ink:"#f2c14e",wall:"plaster",fence:"bamboo",open:"pebbles",deco:["sakura","lanternStone","paperLantern","bamboo","firecrackers","bonsai"]},xmas:{border:["snow","#f4f8fc","#cfdbe8"],side:"#b3202c",rim:"#5a1018",ink:"#1f4a2e",wall:"logs",fence:"snow",open:"snow",deco:["pine","snowman","pine","presents","lamp","pine"]},birthday:{border:["grass","#a8d888","#7ab860"],side:"#ff7a00",rim:"#a84a00",ink:"#ffffff",wall:"plaster",fence:"picket",open:"line",deco:["balloons","presents","bush","balloons","flowers","presents"]},love:{border:["cobble","#e8d0d6","#c8a8b2"],side:"#e5384f",rim:"#7a1f3a",ink:"#ffffff",wall:"plaster",fence:"iron",open:"hedge",deco:["rosebush","heart","topiary","rosebush","lamp","heart"]},forest:{border:["grass","#7fae5a","#5a8a3a"],side:"#6b4a34",rim:"#3a2a1c",ink:"#ffffff",wall:"logs",fence:"hedge",open:"rocks",deco:["tree","toadstool","fern","tree","bush","toadstool","rock"]},rome:{border:["marble","#efe9dc","#bdb39c"],side:"#c8bea8",rim:"#6e6450",ink:"#5a3a2a",wall:"marble",fence:"rocks",open:"pebbles",deco:["cypress","jar","column","cypress","bush"]}},Gu=n=>Hu[n]??Hu.manor,Wu={stone:["#8e8a82","#a9a296","#76726a"],sandstone:["#d4ac6a","#c49a58","#b8884a"],marble:["#f2ede2","#e6dfd0","#d8d0bc"],rock:["#8a8070","#a09682","#6e665a"],planks:["#a8703f","#8a5a36","#b98552"],logs:["#9a6a3e","#7a5232","#b07a48"],metal:["#9aa6b4","#7a8696","#b8c2ce"],coral:["#f08a7e","#f0a8c4","#b56ad8","#e8743a"],canvas:["#c0283a","#f6f2ea"]};var Xu=1;function fy(n){if(n.userData.silhouette)return n.userData.silhouette;let e=n.image,t=document.createElement("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0),i.globalCompositeOperation="source-in",i.fillStyle="#ffffff",i.fillRect(0,0,t.width,t.height);let s=new Kt(t);return s.anisotropy=n.anisotropy,n.userData.silhouette=s,s}function Xa(n){var i;let e=(i=n.material)==null?void 0:i.map;if(!(e!=null&&e.image))return n;let t=fy(e);return n.userData.textMask=n.isSprite?new Bi({map:t,depthTest:!1,depthWrite:!1,transparent:!0}):new an({map:t,transparent:!0,depthWrite:!1,toneMapped:!1,alphaTest:.02,side:n.material.side}),n.layers.enable(Xu),n}function qu(n){let e=n.userData.textMask;e&&(e.map.dispose(),e.dispose(),n.userData.textMask=null)}var mc=class{constructor(){this.target=new Nt(1,1,{depthBuffer:!0}),this.depthOnly=new an({colorWrite:!1}),this._clear=new Re}setSize(e,t){this.target.setSize(Math.max(1,Math.round(e)),Math.max(1,Math.round(t)))}render(e,t,i,s){let r=[],a=c=>c.traverse(l=>{!l.userData.textMask||!l.visible||(r.push([l,l.material]),l.material=l.userData.textMask)}),o={target:e.getRenderTarget(),alpha:e.getClearAlpha(),bg:i.background,mask:t.layers.mask,autoClear:e.autoClear};e.getClearColor(this._clear),e.setRenderTarget(this.target),e.setClearColor(0,0),e.clear(),e.autoClear=!1,i.background=null,i.overrideMaterial=this.depthOnly,e.render(i,t),i.overrideMaterial=null,a(i),a(s),t.layers.set(Xu),e.render(i,t),e.render(s,t),t.layers.mask=o.mask,e.autoClear=o.autoClear;for(let[c,l]of r)c.material=l;return i.background=o.bg,e.setRenderTarget(o.target),e.setClearColor(this._clear,o.alpha),r.length>0}dispose(){this.target.dispose(),this.depthOnly.dispose()}};var pt=2,xc=.42,dr=.14,Dn=.95,qa=.7,gc=5,nh="#1d1b1c",Yu="#efe6c8",Zu={living:{floor:["parquet","#d9a066","#8a5a36",1.5],wall:"#86a6bf"},kitchen:{floor:["checker","#f1ede4","#b8463a",2],wall:"#e8dcc2"},bedroom:{floor:["carpet","#d9917a","#c4601e",1],wall:"#8a6cc4"},bathroom:{floor:["hex","#d8ecee","#8fb3b9",1.5],wall:"#a9c4d8"},office:{floor:["wood","#b98552","#83552f",1],wall:"#9fb08a"},library:{floor:["carpet","#7f9a6c","#4a6a48",1],wall:"#5d7d6a"},dining:{floor:["wood","#c98f5a","#8c6239",1],wall:"#d9a3a0"},garden:{floor:["grass","#8fbc5a","#5a9440",1],wall:"#cfc2a8"},hall:{floor:["marble","#efe9dc","#b5a88e",1],wall:"#e9e2d2"},music:{floor:["parquet","#e0b47e","#a5703e",1.5],wall:"#c4a27a"},guest:{floor:["carpet","#c9a0c8","#8a5a8a",1],wall:"#e8c8d8"},game:{floor:["carpet","#3f6b5a","#2a4c3f",1],wall:"#c7a96b"},veranda:{floor:["tile","#f1e3c8","#c9a87a",2],wall:"#bfe0c6"},laundry:{floor:["tile","#e6eef0","#a8bcc4",2],wall:"#c8dce4"}},uy=n=>Zu[n]??Zu.living,dy=["wood","tile","carpet","grass","stone","sand","water","snow","marble","tatami","planks","parquet","metal","mosaic","cobble","hex","straw","checker"],py={tile:2,checker:2,hex:1.5,mosaic:1,cobble:1.5,parquet:1.5};function my(n){let e=uy(n==null?void 0:n.type),t=Array.isArray(n==null?void 0:n.floor)?n.floor:null;return{floor:t&&dy.includes(t[0])?[t[0],t[1]||e.floor[1],t[2]||e.floor[2],py[t[0]]??1]:e.floor,wall:typeof(n==null?void 0:n.wall)=="string"?n.wall:e.wall}}function $u(n,e){let t=new Re(n);return t.offsetHSL(0,0,e),"#"+t.getHexString()}function Ai(n,e,t){return new L((t-(n-1)/2)*pt,0,(e-(n-1)/2)*pt)}function gy(n,{size:e=128,font:t='700 96px Georgia, "Times New Roman", serif',color:i="#ffffff",w:s=e,h:r=e}={}){let a=document.createElement("canvas");a.width=s,a.height=r;let o=a.getContext("2d");o.fillStyle=i,o.font=t,o.textAlign="center",o.textBaseline="middle",o.fillText(n,s/2,r/2+r*.04);let c=new Kt(a);return c.colorSpace=Ct,c.anisotropy=8,c}function Ju(n){return String.fromCharCode(65+n)}function Ku(n,{clutter:e="some"}={}){var it;let t=Gu(n.theme),i=n.size,s=i*pt/2,r=(n.seed??1)>>>0,a=Me(r*31+7),o=(I,B)=>{var ee;return I<0||B<0||I>=i||B>=i?-1:((ee=n.cells[I])==null?void 0:ee[B])??-1},c=new Map((n.rooms??[]).map(I=>[I.id,I])),l=I=>{var B;return((B=c.get(I))==null?void 0:B.type)??"living"},h=I=>my(c.get(I)),f=I=>{var B;return I>=0&&(((B=c.get(I))==null?void 0:B.open)??l(I)==="garden")},u=new Dt;u.name="board",Zn(r);let d=new tn,p=i*pt+2*Dn,_={jitter:0,shadow:!1};d.box(p,qa-.1,p,0,-qa,0,t.side,_),d.box(p+.05,.07,p+.05,0,-qa-.01,0,t.rim,_);let[g,m,M]=t.border;d.box(p+.06,.07,p+.06,0,-.1,0,"#ffffff",{..._,material:mt(g,m,M,p/2.4,p/2.4)}),d.box(p+.07,.02,p+.07,0,-.105,0,t.rim,_),d.box(i*pt+.12,.05,i*pt+.12,0,-.06,0,nh,_),u.add(d.build());let S=new Map;for(let I=0;I<i;I++)for(let B=0;B<i;B++){let ee=o(I,B),[ce,re,ge,Ye]=h(ee).floor,K=(ee*37%5-2)*.018,ie=mt(ce,$u(re,K),$u(ge,K),Ye,Ye),ae=new dn(pt,pt,gc,gc).rotateX(-Math.PI/2),he=Ai(i,I,B);ae.translate(he.x,0,he.z),S.has(ie)||S.set(ie,[]),S.get(ie).push(ae)}for(let[I,B]of S){let ee=B.length>1?fc(B,!1):B[0];B.length>1&&B.forEach(re=>re.dispose());let ce=new ht(ee,I);ce.receiveShadow=!0,ce.userData.floor=!0,u.add(ce)}let x=My(i),T=ps(new pn({map:x,transparent:!0,depthWrite:!1,roughness:1})),b=new ht(new dn(i*pt,i*pt,i*gc,i*gc).rotateX(-Math.PI/2),T);b.position.y=.012,b.receiveShadow=!0,b.renderOrder=1,u.add(b),Zn(r+1);let P=new tn,y=(I,B)=>{let ee=f(I),ce=f(B);if(ee&&ce)return{kind:"open",style:t.open};if(ee&&B<0||ce&&I<0)return{kind:"fence",style:t.fence};let re=I<0?Yu:ee?h(B).wall:h(I).wall,ge=B<0?Yu:ce?h(I).wall:h(B).wall;return{kind:"wall",style:t.wall,colA:re,colB:ge}},E=new Map,A=(I,B,ee,ce)=>`${I},${B}|${ee},${ce}`;for(let I=0;I<i;I++)for(let B=0;B<i;B++){let ee=o(I,B);for(let[ce,re]of[[0,1],[1,0]]){let ge=o(I+ce,B+re);if(ge<0||ge===ee)continue;let Ye=ee<ge?`${ee}-${ge}`:`${ge}-${ee}`;E.has(Ye)||E.set(Ye,[]),E.get(Ye).push(A(I,B,I+ce,B+re))}}let R=new Set;for(let[,I]of E)R.add(I[Math.floor(a()*I.length)]);let D=[];for(let I=0;I<i;I++)D.push(Array.from({length:i},()=>({})));for(let I=0;I<=i;I++)for(let B=0;B<i;B++){let ee=o(I-1,B),ce=o(I,B);if(ee===ce)continue;let re=R.has(A(I-1,B,I,B)),ge=(B-(i-1)/2)*pt,Ye=(I-i/2)*pt;ju(P,{x:ge,z:Ye,alongX:!0,...y(ee,ce),door:re&&!(f(ee)&&f(ce)),r:a}),I-1>=0&&(D[I-1][B].s=re?"door":"wall"),I<i&&(D[I][B].n=re?"door":"wall")}for(let I=0;I<=i;I++)for(let B=0;B<i;B++){let ee=o(B,I-1),ce=o(B,I);if(ee===ce)continue;let re=R.has(A(B,I-1,B,I)),ge=(I-i/2)*pt,Ye=(B-(i-1)/2)*pt;ju(P,{x:ge,z:Ye,alongX:!1,...y(ee,ce),door:re&&!(f(ee)&&f(ce)),r:a}),I-1>=0&&(D[B][I-1].e=re?"door":"wall"),I<i&&(D[B][I].w=re?"door":"wall")}u.add(P.build());let F=new Dt;F.name="labels";let N=I=>new an({map:I,transparent:!0,depthWrite:!1,toneMapped:!1,color:"#3a2c26"}),k=Dn*.78;for(let I=0;I<i;I++)for(let[B,ee,ce,re]of[[String(I+1),-s-Dn/2,(I-(i-1)/2)*pt,"left"],[Ju(I),(I-(i-1)/2)*pt,-s-Dn/2,"back"],[Ju(I),(I-(i-1)/2)*pt,s+Dn/2,"front"]]){let ge=new ht(new dn(k,k).rotateX(-Math.PI/2),N(gy(B)));ge.userData.edge=re,ge.position.set(ee,.02,ce),ge.renderOrder=2,F.add(Xa(ge))}u.add(F);for(let I of F.children)I.material.color.set(t.ink);let q=new Dt;q.name="roomLabels";let Y=new Set((n.objects??[]).map(I=>`${I.r},${I.c}`)),ne=new Set;for(let[I,B]of c){let ee=String(((it=n.roomLabels)==null?void 0:it[I])??B.name??"").trim();if(!ee)continue;let ce=null;for(let Le=0;Le<i;Le++)for(let U=0;U<i;U++){if(o(Le,U)!==I)continue;let st=-Le*10-U-(Y.has(`${Le},${U}`)?100:0);(!ce||st>ce.score)&&(ce={rr:Le,cc:U,score:st})}if(!ce)continue;let re=1;for(;ce.cc+re<i&&o(ce.rr,ce.cc+re)===I&&!Y.has(`${ce.rr},${ce.cc+re}`);)re++;for(let Le=0;Le<re;Le++)ne.add(`${ce.rr},${ce.cc+Le}`);let ge=re*pt-.3,Ye=ee.toUpperCase(),K=Le=>{let U=yy(Le),st=U.image.width/U.image.height,Qe=Math.min(ge,.46*Le.length*.92*st);return{tex:U,w:Qe,hh:Qe/st,line:Qe/st/Le.length}},ie=K([Ye]),ae=xy(Ye);if(ie.line<.36&&ae){let Le=K(ae);Le.line>ie.line&&(ie.tex.dispose(),ie=Le)}let{tex:he,w:de,hh:He}=ie,Fe=new ht(new dn(de,He).rotateX(-Math.PI/2),new an({map:he,transparent:!0,depthWrite:!1,toneMapped:!1})),Xe=Ai(i,ce.rr,ce.cc);Fe.position.set(Xe.x-pt/2+.16+de/2,.03,Xe.z-pt/2+.16+He/2),Fe.renderOrder=3,q.add(Xa(Fe))}u.add(q),Zn(r+9);let H=new tn,J=Me(r*7+3),Z=[];for(let I of[-1,1])for(let B of[-1,1])Z.push([I*(s+Dn*.5),B*(s+Dn*.5)]);for(let I=0;I<i;I++)J()<.55&&Z.push([s+Dn*.5,(I-(i-1)/2)*pt+(J()-.5)*.6]);for(let[I,B]of Z){let ee=t.deco[Math.floor(J()*t.deco.length)],ce=new tn;if(ms[ee])ms[ee](ce,J);else if(za[ee])za[ee](ce,J);else if(ur[ee]){ur[ee](ce,J);for(let re of ce.buckets.values())for(let ge of re.gs)ge.scale(1.6,1.6,1.6)}else ee==="rock"&&ur.rocks(ce,J);H.merge(ce,J()*6.28,I,-.03,B)}u.add(H.build());let Ce=[];for(let I=0;I<i;I++)Ce.push(Array.from({length:i},()=>({top:0,seat:0,object:null})));let Ee=new Map,ct=new Map;for(let I of n.objects??[]){if(!(I.r>=0&&I.r<i&&I.c>=0&&I.c<i))continue;let B=o(I.r,I.c),ee=l(B),ce=(Ee.get(I.type)??0)+B;Ee.set(I.type,(Ee.get(I.type)??0)+1);let re=Uu(I.type,{room:ee,k:ce,seed:r+I.r*17+I.c*131+1,fit:pt*.82,theme:n.theme}),ge=Ai(i,I.r,I.c),Ye=0;if(re.wall){let K=D[I.r][I.c],ie=["n","w","e","s"].find(ae=>K[ae]==="wall")??["n","w","e","s"].find(ae=>K[ae]);if(ie){Ye={n:0,w:Math.PI/2,e:-Math.PI/2,s:Math.PI}[ie];let ae=Math.max(0,(pt-re.size[1])/2-dr/2-.05),he={n:[0,-1],s:[0,1],w:[-1,0],e:[1,0]}[ie];ge.x+=he[0]*ae,ge.z+=he[1]*ae}}if(re.group.position.copy(ge),re.group.rotation.y=Ye,re.group.traverse(K=>K.userData.cell=[I.r,I.c]),u.add(re.group),Ce[I.r][I.c]={top:re.h,seat:re.seat??re.h,object:I.type,occupiable:re.seat!=null},re.spots.length){let K=Math.cos(Ye),ie=Math.sin(Ye);ct.set(`${I.r},${I.c}`,re.spots.map(([ae,he,de])=>[ge.x+ae*K+de*ie,he,ge.z-ae*ie+de*K]))}}let Ke=Vu(n,{n:i,cells:Ce,cellCenter:Ai,roomType:(I,B)=>l(o(I,B)),isOpen:(I,B)=>f(o(I,B)),plates:n.roomLabels?ne:new Set,spots:ct,clutter:e});return Ke&&u.add(Ke),u.traverse(I=>{I.matrixAutoUpdate=!1,I.updateMatrix()}),{group:u,labels:F,roomLabels:q,ink:t.ink,labelMats:F.children.map(I=>I.material),cells:Ce,n:i,half:s,grid:T}}function xy(n){let e=n.length/2,t=-1;for(let i=0;i<n.length;i++)n[i]===" "&&(t<0||Math.abs(i-e)<Math.abs(t-e))&&(t=i);return t>0?[n.slice(0,t),n.slice(t+1)]:null}function yy(n){let t='700 54px Georgia, "Times New Roman", serif',i=document.createElement("canvas"),s=i.getContext("2d");s.font=t;let r=96+(n.length-1)*64,a=Math.ceil(Math.max(...n.map(h=>s.measureText(h).width))+96*.9);i.width=a,i.height=r;let o=i.getContext("2d"),c=Math.min(r,96)/2-6;o.beginPath(),o.moveTo(6+c,6),o.arcTo(a-6,6,a-6,r-6,c),o.arcTo(a-6,r-6,6,r-6,c),o.arcTo(6,r-6,6,6,c),o.arcTo(6,6,a-6,6,c),o.closePath(),o.fillStyle="rgba(255, 252, 244, 0.94)",o.fill(),o.lineWidth=5,o.strokeStyle="#2a2220",o.stroke(),o.fillStyle="#2a2220",o.font=t,o.textAlign="center",o.textBaseline="middle",n.forEach((h,f)=>o.fillText(h,a/2,48+f*64+3));let l=new Kt(i);return l.colorSpace=Ct,l.anisotropy=8,l}function Qu(n,e,t,i,s,r,a){let o=i-t,c=(t+i)/2,l=dr,h=xc,f=Wu[e],u=(d=nh)=>n.box(o+.004,.035,l+.012,c,h,0,d);switch(e){case"stone":case"sandstone":case"marble":{let d=e==="marble"?2:3,p=h/d;for(let _=0;_<d;_++){let g=t-(_%2?.18:0);for(;g<i;){let m=Math.min(.3+a()*.2,i-Math.max(g,t)),M=Math.max(g,t);m>.02&&n.box(m-.015,p-.015,l,M+m/2,_*p,0,f[Math.floor(a()*f.length)]),g=M+m}}e==="sandstone"&&n.box(o,.05,l+.02,c,h*.62,0,"#2f6f8a"),u(e==="marble"?"#c8bea8":nh);break}case"rock":for(let d=t+.1;d<i;d+=.2+a()*.06)n.sphere(.14+a()*.05,d,.12,(a()-.5)*.04,f[Math.floor(a()*f.length)],{sy:1.3,seg:7});break;case"planks":{for(let d=t;d<i-.01;d+=.17)n.box(Math.min(.16,i-d),h-.02*(Math.floor(d*7)%2),l*.8,d+Math.min(.16,i-d)/2,0,0,f[Math.floor(a()*f.length)]);n.box(o,.05,l+.03,c,h*.25,0,"#5a3b26"),u("#4a3426");break}case"logs":for(let d=0;d<3;d++)n.cbox(o,.13,.13,c,.07+d*.13,0,f[d%f.length],{round:.06});break;case"metal":n.box(o,h,l,c,0,0,f[0],{metalness:.5,roughness:.4}),n.box(o+.01,.04,l+.02,c,h*.55,0,"#5ad8ff",{emissive:"#2ab8ff",ei:1.2}),n.box(o,.06,l+.03,c,0,0,"#3a404a"),u("#2a2f38");break;case"shoji":{let d=Math.max(1,Math.round(o/.5));for(let p=0;p<=d;p++)n.box(.05,h,l,t+p*o/d,0,0,"#3a2a22");n.box(o,h-.08,l*.4,c,.04,0,"#f6efdc",{roughness:1});for(let p of[.04,h*.5,h-.04])n.box(o,.025,l*.6,c,p,0,"#3a2a22");u("#2a2220");break}case"coral":for(let d=t+.08;d<i;d+=.13){let p=f[Math.floor(a()*f.length)];n.sphere(.1+a()*.04,d,.1,(a()-.5)*.05,p,{sy:1.2,seg:8}),a()<.6&&n.sphere(.07,d+.03,.27+a()*.08,0,p,{seg:8})}break;case"canvas":{let d=0;for(let p=t;p<i-.01;p+=.2,d++)n.box(Math.min(.2,i-p),h,l*.5,p+Math.min(.2,i-p)/2,0,0,f[d%2]);n.box(o,.06,l*.7,c,h,0,"#d9a441");break}default:n.box(o,h,l/2,c,0,-l/4,s),n.box(o,h,l/2,c,0,l/4,r),n.box(o,.06,l+.03,c,0,0,"#f4efe4"),u()}}function _y(n,e,t,i,s){let r=i-t,a=(t+i)/2,o=xc*.85,c=(l,h)=>{let f=Math.max(2,Math.round(r/l));for(let u=0;u<=f;u++)h(t+u*r/f,u)};switch(e){case"hedge":n.box(r-.04,xc*.8,dr*1.4,a,0,0,"#2f5e2c"),ft(n,{seed:Math.floor(s()*1e6),rx:r/2,ry:xc*.5,rz:dr*1.3,palette:"dark",voxel:.08},a,0,0);break;case"coral":Qu(n,"coral",t,i,"","",s);break;case"bamboo":c(.07,(l,h)=>n.cyl(.03,.03,o+h%3*.05,l,0,0,h%2?"#a8b45a":"#8a9a42",{seg:6}));for(let l of[.12,o-.08])n.box(r,.025,.08,a,l,0,"#5a3b26");break;case"iron":c(.1,(l,h)=>{n.box(.02,o,.02,l,0,0,"#2a2523"),h%2&&n.cyl(0,.025,.06,l,o,0,"#c9a24a",{seg:4})});for(let l of[.06,o-.06])n.box(r,.025,.025,a,l,0,"#2a2523");break;case"rocks":for(let l=t+.1;l<i;l+=.22)n.sphere(.1+s()*.05,l,.06,(s()-.5)*.06,["#9a968c","#b0aa9c","#7f7a70"][Math.floor(s()*3)],{sy:.8,seg:7});break;case"rope":c(.6,l=>n.cyl(.05,.06,o,l,0,0,"#7a5a3a",{seg:8}));for(let l=0;l<12;l++){let h=(l+.5)/12,f=t+h*r,u=Math.sin(h*r/.6*Math.PI)**2;n.cbox(r/12+.01,.03,.03,f,o-.1-u*.08,0,"#c9a46a")}break;case"rail":c(.5,l=>n.box(.06,o,.06,l,0,0,"#6b4a34"));for(let l of[o*.4,o-.04])n.box(r,.05,.05,a,l,0,"#8a5a36");break;case"snow":for(let l=t+.12;l<i;l+=.2)n.sphere(.16+s()*.04,l,.04,0,"#f6f9fc",{sy:.6,seg:8});break;case"palisade":c(.12,(l,h)=>{n.cyl(.055,.055,o+.06*(h%2),l,0,0,"#8a6a4a",{seg:7}),n.cyl(0,.055,.1,l,o+.06*(h%2),0,"#8a6a4a",{seg:7})});break;default:c(.16,(l,h)=>n.box(.07,o-.04+h%2*.04,.03,l,0,0,"#f6f2ea"));for(let l of[.1,o-.12])n.box(r,.04,.03,a,l,-.03,"#f1ede4")}}function vy(n,e,t,i,s){let r=i-t,a=(t+i)/2;switch(e){case"hedge":ft(n,{seed:Math.floor(s()*1e6),rx:r/2,ry:.13,rz:.12,palette:"green",voxel:.06},a,-.02,0);break;case"shells":for(let o=t+.07;o<i;o+=.14)n.sphere(.05,o,.015,0,["#f6d3c9","#f2e6d8","#e9b8a8"][Math.floor(s()*3)],{sy:.45,seg:7});break;case"rocks":case"pebbles":for(let o=t+.06;o<i;o+=.12)n.sphere(e==="rocks"?.065:.045,o,.012,(s()-.5)*.03,["#9a968c","#b8b2a4","#7f7a70","#d8d2c4"][Math.floor(s()*4)],{sy:.55,seg:6});break;case"rope":for(let o=t;o<i;o+=.5)n.cyl(.035,.04,.2,o+.25,0,0,"#7a5a3a",{seg:6});n.box(r,.025,.025,a,.16,0,"#c9a46a");break;case"snow":for(let o=t+.1;o<i;o+=.18)n.sphere(.09,o,.01,0,"#f6f9fc",{sy:.5,seg:7});break;default:for(let o=t+.05;o<i-.05;o+=.2)n.box(.12,.012,.05,o+.06,0,0,"#f6f2ea",{jitter:0})}}function ju(n,{x:e,z:t,alongX:i,kind:s,style:r,colA:a,colB:o,door:c,r:l}){let h=pt+(i?dr:0),f=new tn,u=c?pt*.36:0,d=u?[[-h/2,-u/2],[u/2,h/2]]:[[-h/2,h/2]];for(let[p,_]of d)s==="open"?vy(f,r,p,_,l):s==="fence"?_y(f,r,p,_,l):Qu(f,r,p,_,a,o,l);u&&f.box(u+.02,.014,dr+.06,0,0,0,"#d8ccb2",{jitter:0}),n.merge(f,i?0:Math.PI/2,e,0,t)}function My(n){let t=n*128,i=document.createElement("canvas");i.width=i.height=t;let s=i.getContext("2d");s.clearRect(0,0,t,t),s.strokeStyle="rgba(40, 28, 24, 0.55)",s.lineWidth=4,s.setLineDash([16,8]);for(let a=1;a<n;a++)s.beginPath(),s.moveTo(a*128,0),s.lineTo(a*128,t),s.moveTo(0,a*128),s.lineTo(t,a*128),s.stroke();s.setLineDash([]),s.strokeStyle="rgba(40, 28, 24, 0.7)",s.lineWidth=5;for(let a=1;a<n;a++)for(let o=1;o<n;o++)s.beginPath(),s.moveTo(a*128-10,o*128),s.lineTo(a*128+10,o*128),s.moveTo(a*128,o*128-10),s.lineTo(a*128,o*128+10),s.stroke();let r=new Kt(i);return r.colorSpace=Ct,r.anisotropy=8,r}var Nn=n=>n.map(([e,t])=>new oe(e,t)),ed={pawn:Nn([[0,0],[.3,0],[.31,.04],[.27,.1],[.21,.28],[.175,.44],[.215,.54],[.21,.6],[.12,.665],[0,.675]]),gown:Nn([[0,0],[.36,0],[.37,.03],[.32,.12],[.24,.3],[.165,.46],[.2,.55],[.2,.6],[.12,.665],[0,.675]]),robe:Nn([[0,0],[.28,0],[.29,.04],[.25,.18],[.21,.36],[.19,.46],[.215,.55],[.21,.6],[.12,.665],[0,.675]]),suit:Nn([[0,0],[.22,0],[.23,.04],[.19,.12],[.18,.28],[.17,.44],[.215,.55],[.21,.6],[.12,.665],[0,.675]]),tail:Nn([[0,0],[.2,.02],[.13,.12],[.13,.28],[.17,.44],[.215,.55],[.21,.6],[.12,.665],[0,.675]]),bulky:Nn([[0,0],[.27,0],[.28,.04],[.25,.14],[.23,.32],[.22,.46],[.24,.55],[.22,.61],[.13,.665],[0,.675]])},pr=(n,e)=>new Re(n).offsetHSL(0,0,e).getStyle(),bt="#d9b44a",Ft={metalness:.75,roughness:.3},td={manor:{shapes:["suit","gown"],c2:"#2a2220",parts:["vest","bow"],props:["magnifier","teacup","cane"]},mermaids:{shapes:["tail"],c2:"#7fd6c8",parts:["scales","fin","shells"],props:["trident","shell"]},japan:{shapes:["robe"],c2:"#2a2a3a",parts:["obi","kimonoCollar"],props:["fan","katana","fan"]},paris:{shapes:["suit","gown"],c2:"#24427a",parts:["marin","scarf"],props:["baguette","brush","baguette"]},regency:{shapes:["gown","suit"],c2:"#f6f2ea",parts:["empire","tails","lace"],props:["fan","cane","letter"]},egypt:{shapes:["robe"],c2:bt,parts:["broadCollar","kilt"],props:["ankh","staff"]},pirates:{shapes:["suit"],c2:"#7a1f2a",parts:["sash","coat","boots"],props:["cutlass","spyglass","hook"]},western:{shapes:["suit"],c2:"#6b3a22",parts:["vestOpen","bandana","boots"],props:["lasso","star"]},space:{shapes:["bulky"],c2:"#eef2f6",parts:["spacesuit"],props:["tablet","wrench"]},haunted:{shapes:["robe","gown"],c2:"#1d1716",parts:["cape","highCollar"],props:["candle","book"]},medieval:{shapes:["robe","suit"],c2:"#7a1f2a",parts:["tabard","belt","cape"],props:["sword","goblet","shieldArm"]},prehistory:{shapes:["robe"],c2:"#8a6a4a",parts:["fur"],props:["club","bone"]},circus:{shapes:["suit","gown"],c2:"#f2c94c",parts:["stripes","buttons","ruff"],props:["balls","baton","whip"]},train:{shapes:["suit","gown"],c2:"#2a2220",parts:["coat","bow"],props:["suitcase","newspaper"]},chalet:{shapes:["bulky"],c2:"#f6f2ea",parts:["sweater","scarf"],props:["mug","skiPole"]},world:{shapes:["suit"],c2:"#a8703f",parts:["backpack","belt"],props:["camera","map"]},rome:{shapes:["robe"],c2:"#8a2a2a",parts:["toga"],props:["scroll","grapes"]},halloween:{shapes:["robe","gown"],c2:"#1d1716",parts:["cape","highCollar"],props:["candyBucket","wand","candyBucket"]},easter:{shapes:["gown","suit"],c2:"#f6f2ea",parts:["apron","bow"],props:["eggBasket","egg"]},carnival:{shapes:["gown","suit"],c2:bt,parts:["ruff","diamonds"],props:["maskStick","fan"]},lunar:{shapes:["robe"],c2:bt,parts:["mandarinCollar","frogs"],props:["handLantern","fan","orange"]},forest:{shapes:["robe","suit"],c2:"#5a8a3a",parts:["leafCape","belt"],props:["wand","mushroom"]},xmas:{shapes:["bulky"],c2:"#f6f2ea",parts:["sweater","scarf"],props:["present","candyCane"]},birthday:{shapes:["suit","gown"],c2:"#f2c94c",parts:["dots"],props:["balloon","present"]},love:{shapes:["gown","suit"],c2:"#ffb3c4",parts:["empire","bow"],props:["rose","heart"]}};function by(n,e,t,i){n.sphere(.19,0,.84,0,e,{seg:20,roughness:.7});let s=pr(e,-.06);if(n.sphere(.03,0,.82,.185,s,{seg:8,shadow:!1}),i==="dead"){for(let a of[-1,1])for(let o of[.785,-.785])n.cbox(.06,.015,.012,a*.07,.87,.18,"#1d1b1c",{rz:o,jitter:0,shadow:!1});return}for(let a of[-1,1])n.sphere(.036,a*.07,.87,.158,"#fbf8f2",{seg:10,sy:1.15,shadow:!1}),n.sphere(.022,a*.07,.866,.186,"#2a1d18",{seg:8,shadow:!1}),n.sphere(.008,a*.065,.876,.205,"#ffffff",{seg:6,shadow:!1,emissive:"#ffffff",ei:.6}),n.cbox(.055,.013,.014,a*.072,.925,.168,pr(t,-.05),{rz:a*.18,jitter:0,shadow:!1}),n.sphere(.03,a*.115,.805,.15,"#f08a8a",{sy:.55,seg:8,opacity:.55,shadow:!1});let r=new wi(.036,.008,5,10,Math.PI);r.rotateZ(Math.PI),r.translate(0,.785,.178),n.geo(r,"#8a3a2a",{tess:!1,shadow:!1})}function Sy(n,e,t){let i={roughness:.8};switch(n.sphere(.2,0,.9,-.03,e,{seg:18,sy:.72,...i}),n.cbox(.26,.06,.06,0,.98,.12,e,{round:.03,rx:.4,...i}),t){case"bob":n.sphere(.21,0,.82,-.04,e,{seg:16,sy:.85,...i});for(let s of[-1,1])n.cbox(.08,.22,.2,s*.17,.79,0,e,{round:.04,...i});break;case"long":n.cbox(.36,.5,.12,0,.67,-.13,e,{round:.06,...i});for(let s of[-1,1])n.cbox(.08,.36,.14,s*.17,.72,-.02,e,{round:.04,...i});break;case"bun":n.sphere(.1,0,1.06,-.08,e,{seg:12,...i}),n.sphere(.12,0,.82,-.12,e,{seg:12,...i});break;case"ponytail":n.sphere(.12,0,.84,-.13,e,{seg:12,...i}),n.cbox(.1,.32,.1,0,.7,-.24,e,{round:.05,rx:.35,...i}),n.cyl(.05,.05,.04,0,.88,-.2,"#c0283a",{seg:8,rx:.4});break;case"curly":for(let s=0;s<9;s++){let r=s/9*Math.PI*2;n.sphere(.08,Math.cos(r)*.17,.92+Math.sin(s*1.7)*.03,Math.sin(r)*.15-.03,e,{seg:8,...i})}n.sphere(.12,0,1,-.02,e,{seg:10,...i});break;default:n.sphere(.12,0,.82,-.12,e,{seg:12,...i})}}function wy(n,e,t,i){let s=pr(t,-.14);switch(e){case"vest":n.cyl(.19,.18,.2,0,.42,.005,i,{seg:20,t0:-.9,tl:1.8});for(let r=0;r<3;r++)n.sphere(.012,0,.47+r*.05,.19,bt,Ft);break;case"bow":for(let r of[-1,1])n.cbox(.06,.04,.02,r*.035,.63,.13,i,{rz:r*.4,round:.01});break;case"scales":n.geo(new un(Nn([[.2,.02],[.13,.12],[.135,.28],[.17,.44],[0,.44]]),18),i,{material:mt("hex",i,pr(i,-.15),3,2),tess:!1});break;case"fin":for(let r of[-1,1])n.cbox(.22,.03,.14,r*.15,.03,.2,i,{ry:r*.6,round:.02});break;case"shells":for(let r of[-1,1])n.sphere(.06,r*.08,.57,.16,"#f6d3c9",{sy:.6,seg:8});n.cyl(.17,.17,.015,0,.62,0,"#fbf6ff",{seg:16});break;case"obi":n.cyl(.2,.2,.12,0,.4,0,i,{seg:20}),n.cbox(.2,.12,.08,0,.46,-.21,i,{round:.03}),n.cyl(.205,.205,.015,0,.45,0,bt,{seg:20});break;case"kimonoCollar":for(let r of[-1,1])n.cbox(.05,.25,.02,r*.05,.56,.17,"#f6f2ea",{rz:r*.5});break;case"marin":n.geo(new un(Nn([[.18,.4],[.215,.54],[.21,.6],[0,.6]]),20),"#f6f2ea",{material:mt("lines","#f6f2ea",i,1,2),tess:!1});break;case"scarf":n.cyl(.15,.16,.06,0,.62,0,i==="#24427a"?"#c0392b":"#b3202c",{seg:16}),n.cbox(.06,.22,.03,.08,.5,.15,i==="#24427a"?"#c0392b":"#b3202c",{rz:.15});break;case"empire":n.cyl(.2,.2,.04,0,.53,0,i,{seg:20}),n.cbox(.1,.06,.04,0,.53,-.2,i,{round:.02});break;case"tails":n.cbox(.22,.3,.03,0,.3,-.18,s,{rx:.15});break;case"lace":n.cyl(.14,.2,.05,0,.6,0,"#fbf8f2",{seg:20});break;case"broadCollar":for(let r=0;r<3;r++)n.cyl(.13+r*.03,.15+r*.03,.025,0,.62-r*.025,0,[bt,"#2f5e8c","#a33b2b"][r],{seg:20});break;case"kilt":n.cyl(.215,.24,.16,0,.18,0,"#f6f2ea",{seg:20}),n.cyl(.19,.19,.03,0,.42,0,bt,{seg:20});break;case"sash":n.cbox(.06,.45,.02,0,.47,.18,i,{rz:.6}),n.cyl(.19,.19,.05,0,.4,0,i,{seg:20});break;case"coat":n.geo(new un(Nn([[.25,.05],[.22,.25],[.19,.42],[.22,.56],[0,.56]]),20,-2.5,5),s,{tess:!1});for(let r=0;r<3;r++)n.sphere(.014,.07,.38+r*.06,.18,bt,Ft);break;case"boots":for(let r of[-1,1])n.cbox(.1,.1,.16,r*.08,.03,.12,"#2a1d18",{round:.03});break;case"vestOpen":for(let r of[-1,1])n.cbox(.1,.24,.03,r*.1,.5,.165,i,{rz:r*.1});break;case"bandana":n.cyl(.14,.16,.05,0,.62,0,"#b3202c",{seg:16}),n.cbox(.12,.1,.02,0,.58,.15,"#b3202c",{rz:.78});break;case"spacesuit":n.cyl(.235,.235,.05,0,.36,0,"#ff9a3a",{seg:20}),n.cbox(.2,.14,.04,0,.5,.21,"#33405a",{round:.02});for(let r=0;r<3;r++)n.cbox(.03,.03,.02,-.05+r*.05,.52,.235,["#ff4a4a","#7cff8a","#3fb6d9"][r],{emissive:["#ff4a4a","#7cff8a","#3fb6d9"][r],ei:1.2,shadow:!1});n.cbox(.3,.32,.12,0,.42,-.24,"#cfd6de",{round:.04});break;case"cape":n.geo(new un(Nn([[.3,.02],[.27,.2],[.22,.45],[.22,.6],[0,.62]]),20,1.2,3.9),i,{tess:!1}),n.cyl(.21,.21,.04,0,.6,0,"#7a1f2a",{seg:18,t0:1.2,tl:3.9});break;case"highCollar":n.cyl(.24,.16,.16,0,.62,-.03,i,{seg:18,t0:1.6,tl:3.1});break;case"tabard":n.cbox(.24,.42,.03,0,.36,.185,i),n.cbox(.1,.1,.035,0,.45,.19,bt,{ry:0,rz:.785});break;case"belt":n.cyl(.185,.185,.035,0,.42,0,"#3a2a1e",{seg:20}),n.cbox(.05,.04,.02,0,.42,.185,bt,Ft);break;case"fur":n.cyl(.24,.22,.3,0,.15,0,i,{seg:9}),n.cbox(.3,.3,.06,.06,.48,.1,i,{rz:-.5,round:.03});break;case"stripes":for(let r=0;r<4;r++)n.cyl(.21-r*.008,.215-r*.008,.035,0,.12+r*.1,0,i,{seg:20});break;case"buttons":for(let r=0;r<3;r++)n.sphere(.022,0,.36+r*.07,.19,i,{seg:8});break;case"ruff":for(let r=0;r<10;r++){let a=r/10*Math.PI*2;n.sphere(.06,Math.cos(a)*.15,.63,Math.sin(a)*.15,"#fbf8f2",{sy:.6,seg:8})}break;case"sweater":n.geo(new un(Nn([[.25,.28],[.23,.46],[.245,.55],[.22,.61],[0,.61]]),20),t,{material:mt("checker",t,i,4,1),tess:!1});break;case"backpack":n.cbox(.26,.3,.14,0,.45,-.24,i,{round:.05});for(let r of[-1,1])n.cbox(.03,.3,.02,r*.1,.5,.17,i);break;case"toga":n.geo(new un(Nn([[.29,.02],[.25,.2],[.21,.4],[.22,.55],[0,.6]]),20),"#f6f2ea",{tess:!1}),n.cbox(.08,.6,.02,.02,.4,.2,i,{rz:.55}),n.cbox(.08,.3,.2,.17,.5,0,"#f6f2ea",{round:.03});break;case"apron":n.cbox(.24,.3,.02,0,.2,.25,i,{rx:-.25}),n.cbox(.16,.12,.02,0,.48,.18,i),n.cyl(.2,.2,.02,0,.42,0,i,{seg:20});break;case"diamonds":for(let r=0;r<6;r++)n.cbox(.08,.08,.01,Math.cos(r)*.04,.15+r*.07,.235-r*.008,r%2?i:"#1d1b1c",{rz:.785,rx:-.2});break;case"mandarinCollar":n.cyl(.13,.13,.06,0,.62,0,i,{seg:16}),n.cbox(.02,.3,.02,.06,.48,.18,i);break;case"frogs":for(let r=0;r<3;r++)n.cbox(.07,.015,.02,.06,.4+r*.06,.19,i);break;case"leafCape":for(let r=0;r<7;r++){let a=Math.PI+(r-3)*.32;n.cbox(.12,.3,.02,Math.sin(a)*.22,.42,Math.cos(a)*.22,r%2?i:pr(i,.1),{ry:a,rx:.15,round:.04})}break;case"dots":for(let r=0;r<9;r++){let a=r*2.4,o=.12+r%5*.08;n.sphere(.025,Math.sin(a)*(.27-o*.15),o,Math.cos(a)*(.27-o*.15),i,{seg:6,shadow:!1})}break;default:}}function Ty(n,e,t){switch(e){case"magnifier":n.cbox(.02,.16,.02,.3,.26+.06,.1,"#5a3420",{rz:-.4}),n.cyl(.07,.07,.015,.3+.06,.26+.18,.1,bt,{rx:Math.PI/2,center:!0,seg:14,...Ft}),n.cyl(.058,.058,.017,.3+.06,.26+.18,.1,"#cfe8f0",{rx:Math.PI/2,center:!0,seg:14,opacity:.6});break;case"teacup":n.cyl(.05,.035,.05,.3,.26+.03,.1,"#f6f2ea",{seg:10}),n.cyl(.07,.07,.01,.3,.26+.02,.1,"#f6f2ea",{seg:10});break;case"cane":n.cyl(.015,.015,.36,.3+.03,0,.1+.04,"#2a1d18",{seg:6}),n.sphere(.03,.3+.03,.37,.1+.04,bt,Ft);break;case"trident":n.cyl(.012,.012,.85,.3,0,.1,bt,{seg:6,...Ft});for(let a of[-1,0,1])n.cyl(0,.015,.12,.3+a*.04,.85,.1,bt,{seg:5,...Ft});n.cbox(.1,.015,.015,.3,.85,.1,bt,Ft);break;case"shell":n.sphere(.06,.3,.26+.04,.1,"#f6d3c9",{sy:.5,seg:10});break;case"fan":for(let a=0;a<5;a++)n.cbox(.03,.15,.008,.3+Math.sin((a-2)*.3)*.08,.26+.08+Math.cos((a-2)*.3)*.08,.1+.02,a%2?t:"#f6f2ea",{rz:-(a-2)*.3});break;case"katana":n.cbox(.02,.5,.03,.3+.02,.3,.1-.05,"#1d1716",{rz:-.15}),n.cbox(.06,.02,.05,.3-.01,.53,.1-.05,bt,Ft);break;case"baguette":n.cbox(.05,.42,.05,.3,.26+.08,.1,"#d9a066",{rz:-.5,round:.025});break;case"brush":n.cbox(.015,.2,.015,.3,.26+.06,.1,"#a8703f",{rz:-.4}),n.sphere(.02,.3+.07,.26+.15,.1,"#e8492c",{seg:6});break;case"letter":n.cbox(.1,.07,.01,.3,.26+.04,.1+.03,"#f6f2ea",{rx:-.3}),n.sphere(.012,.3,.26+.04,.1+.04,"#b3202c",{seg:6});break;case"ankh":n.cbox(.02,.18,.02,.3,.26+.05,.1,bt,Ft),n.cbox(.1,.02,.02,.3,.26+.12,.1,bt,Ft),n.cyl(.035,.035,.015,.3,.26+.18,.1,bt,{rx:Math.PI/2,center:!0,seg:10,...Ft});break;case"staff":n.cyl(.012,.012,.9,.3,0,.1,bt,{seg:6,...Ft}),n.cbox(.08,.04,.03,.3+.02,.9,.1,"#2f5e8c",{rz:.5});break;case"cutlass":n.cbox(.03,.35,.012,.3+.06,.26+.15,.1,"#cfd6de",{rz:-.5,metalness:.8,roughness:.25}),n.cyl(.04,.04,.02,.3,.26,.1,bt,{seg:8,...Ft});break;case"spyglass":n.cyl(.022,.03,.26,.3+.05,.26,.1,bt,{rz:-.9,center:!0,seg:8,...Ft});break;case"hook":n.cyl(.04,.03,.04,.3,.26-.02,.1,"#2a1d18",{seg:8}),n.cyl(.04,.04,.012,.3,.26-.07,.1,"#cfd6de",{rx:Math.PI/2,center:!0,seg:10,t0:0,tl:Math.PI*1.4,metalness:.8});break;case"lasso":n.cyl(.08,.08,.02,.3,.26-.02,.1,"#c9a477",{rx:Math.PI/2,center:!0,seg:14}),n.cyl(.07,.07,.02,.3,.26-.02,.1+.015,"#c9a477",{rx:Math.PI/2,center:!0,seg:14});break;case"star":n.cyl(.05,.05,.015,.09,.53,.19,bt,{rx:Math.PI/2,center:!0,seg:5,...Ft});break;case"tablet":n.cbox(.13,.17,.015,.3-.02,.26+.08,.1+.05,"#1b2230",{rx:-.5}),n.cbox(.11,.14,.006,.3-.02,.26+.085,.1+.06,"#3fb6d9",{rx:-.5,emissive:"#3fb6d9",ei:1.2,shadow:!1});break;case"wrench":n.cbox(.025,.22,.015,.3,.26+.06,.1,"#9aa6b4",{rz:-.3,metalness:.7}),n.cyl(.035,.035,.015,.3+.04,.26+.17,.1,"#9aa6b4",{rx:Math.PI/2,center:!0,seg:8,t0:.6,tl:5,metalness:.7});break;case"candle":n.cyl(.04,.05,.02,.3,.26,.1,bt,{seg:8,...Ft}),n.cyl(.016,.016,.1,.3,.26+.02,.1,"#f6f2ea",{seg:6}),n.sphere(.02,.3,.26+.14,.1,"#ffcf7a",{emissive:"#ffb340",ei:1.8,shadow:!1});break;case"book":n.cbox(.12,.15,.04,.3,.26+.05,.1,"#5a2a3a",{ry:.3});break;case"sword":n.cbox(.03,.45,.012,.3+.02,.26+.25,.1,"#cfd6de",{metalness:.8,roughness:.25}),n.cbox(.12,.02,.03,.3+.02,.26+.02,.1,bt,Ft);break;case"goblet":n.cyl(.04,.012,.06,.3,.26+.04,.1,bt,{seg:10,...Ft}),n.cyl(.03,.03,.01,.3,.26,.1,bt,{seg:10,...Ft});break;case"shieldArm":n.cbox(.05,.28,.22,-.3,.38,.02,t,{round:.04}),n.cbox(.055,.08,.08,-.3,.4,.02,bt,Ft);break;case"club":n.cyl(.05,.025,.36,.3+.04,.26-.05,.1,"#7a5434",{rz:-.3,seg:8});break;case"bone":n.cbox(.025,.2,.025,.3,.26+.05,.1,"#efe6d0",{rz:-.4});for(let a of[-1,1])n.sphere(.025,.3+a*.04,.26+.05+a*.09,.1,"#efe6d0",{seg:6});break;case"balls":for(let a=0;a<3;a++)n.sphere(.035,.3-.05+a*.05,.75+Math.sin(a*2)*.05,.1,["#e8492c","#f2c94c","#2f6f9a"][a],{seg:8});break;case"baton":n.cyl(.012,.012,.3,.3,.26-.05,.1,"#f6f2ea",{seg:6,rz:-.6}),n.sphere(.03,.3+.13,.26+.06,.1,"#c0283a",{seg:8});break;case"whip":n.cbox(.02,.14,.02,.3,.26,.1,"#3a2a1e",{rz:-.5}),n.cyl(.006,.006,.4,.3+.15,.26-.1,.1,"#3a2a1e",{rz:1.2,seg:4});break;case"suitcase":n.box(.16,.14,.06,.3,.05,.1,"#7a3f2a",{round:.02}),n.cbox(.06,.03,.02,.3,.2,.1,"#3a2a1e");break;case"newspaper":n.cbox(.15,.18,.012,.3-.02,.26+.06,.1+.05,"#efe9dc",{rx:-.3,rz:.1});break;case"mug":n.cyl(.04,.04,.07,.3,.26,.1,"#b3202c",{seg:10}),n.cyl(.035,.035,.005,.3,.26+.065,.1,"#5a2e1a",{seg:10});break;case"skiPole":n.cyl(.01,.01,.75,.3+.03,0,.1,"#9aa6b4",{seg:5,metalness:.6}),n.cyl(.05,.05,.01,.3+.03,.06,.1,"#2a2a2e",{seg:8});break;case"camera":n.box(.12,.08,.05,0,.5,.2,"#2a2a2e",{round:.01}),n.cyl(.03,.03,.04,0,.54,.24,"#5a6474",{rx:Math.PI/2,center:!0,seg:10});break;case"map":n.cbox(.2,.15,.008,.3-.04,.26+.06,.1+.05,"#e8d8a8",{rx:-.3}),n.cbox(.06,.04,.009,.3-.06,.26+.07,.1+.055,"#5aa9e6",{rx:-.3});break;case"scroll":n.cyl(.025,.025,.16,.3,.26+.02,.1,"#e8d8a8",{rz:Math.PI/2-.3,center:!0,seg:8});break;case"grapes":for(let a=0;a<6;a++)n.sphere(.022,.3+a%2*.03,.26-.02-Math.floor(a/2)*.03,.1,"#5a2a6a",{seg:6});break;case"candyBucket":n.cyl(.06,.05,.09,.3,.26-.1,.1,"#ff7518",{seg:10}),n.cyl(.05,.05,.005,.3,.26-.02,.1,"#2a1838",{seg:10});break;case"wand":n.cyl(.008,.01,.25,.3,.26+.02,.1,"#2a1d18",{rz:-.4,seg:5}),n.sphere(.025,.3+.1,.26+.23,.1,"#f2c94c",{seg:8,emissive:"#ffd36a",ei:1.5,shadow:!1});break;case"eggBasket":n.cyl(.07,.06,.06,.3,.26-.1,.1,"#c9a46a",{seg:10});for(let a=0;a<3;a++)n.sphere(.025,.3+(a-1)*.035,.26-.03,.1,["#f2a6c0","#9ad0e0","#f6e08a"][a],{sy:1.3,seg:6});break;case"egg":n.sphere(.045,.3,.26+.04,.1,"#9ad0e0",{sy:1.3,seg:8});break;case"maskStick":n.cyl(.008,.008,.25,.3,.26,.1,bt,{seg:5,...Ft}),n.cbox(.16,.07,.02,.3,.26+.25,.1,t,{round:.02});break;case"handLantern":n.cyl(.006,.006,.1,.3,.26-.05,.1,"#1d1716",{seg:4}),n.sphere(.06,.3,.26-.12,.1,"#d8263f",{sy:1.2,seg:10,emissive:"#ff5a3a",ei:.8});break;case"orange":n.sphere(.045,.3,.26+.03,.1,"#ff8a1a",{seg:8});break;case"mushroom":n.cyl(.015,.02,.07,.3,.26,.1,"#f2ead8",{seg:6}),n.sphere(.045,.3,.26+.07,.1,"#c0392b",{sy:.5,seg:8});break;case"present":n.box(.12,.1,.12,.3-.02,.26-.05,.1+.03,"#2f6f7e"),n.box(.125,.105,.02,.3-.02,.26-.05,.1+.03,"#f2c94c");break;case"candyCane":n.cyl(.012,.012,.22,.3,.26-.04,.1,"#f6f2ea",{seg:6}),n.cyl(.04,.04,.024,.3-.04,.26+.18,.1,"#c0283a",{rx:Math.PI/2,center:!0,seg:10,t0:0,tl:Math.PI});break;case"balloon":n.cyl(.003,.003,.6,.3,.26,.1,"#f6f2ea",{seg:3,shadow:!1}),n.sphere(.11,.3,.26+.7,.1,t==="#ff4d8d"?"#5aa9e6":"#ff4d8d",{sy:1.2,seg:12,roughness:.3});break;case"rose":n.cyl(.006,.006,.2,.3,.26,.1,"#3f7a35",{seg:4,rz:-.2}),n.sphere(.035,.3+.04,.26+.2,.1,"#c0283a",{seg:8});break;case"heart":for(let a of[-1,1])n.sphere(.04,.3+a*.03,.26+.06,.1+.02,"#e5384f",{seg:8});n.cbox(.06,.06,.04,.3,.26+.03,.1+.02,"#e5384f",{rz:.785});break;default:}}var nd=["short","bob","long","bun","ponytail","curly"];function ih(n,{color:e,skin:t,hair:i,pose:s,theme:r,h:a}){let o=td[r]??td.manor,c=o.shapes[a%o.shapes.length],l=pr(e,-.14);n.geo(new un(ed[c]??ed.pawn,22),e,{roughness:.6}),o.parts.some(h=>["obi","empire","toga","spacesuit","sweater","fur","broadCollar"].includes(h))||(n.cyl(.18,.18,.03,0,.43,0,l,{seg:20}),n.cyl(.13,.15,.04,0,.64,0,"#f6f2ea",{seg:18}));for(let h of o.parts)h==="tails"&&c!=="suit"||h==="empire"&&c!=="gown"||h==="lace"&&c!=="gown"||(h==="vest"||h==="bow")&&r==="manor"&&c==="gown"||wy(n,h,e,o.c2);for(let h of[-1,1])n.cbox(.09,.34,.11,h*.22,.43,.01,r==="space"?"#eef2f6":e,{rz:h*.18,round:.04,roughness:.6}),n.sphere(.055,h*.26,.26,.03,r==="space"?"#cfd6de":t,{seg:10});return by(n,t,i,s),Sy(n,i,nd[(a>>>3)%nd.length]),s!=="dead"&&Ty(n,o.props[(a>>>6)%o.props.length],e),c}var id=["#f2d2b6","#e8be9a","#c68e6a","#8d5a3f","#f5dcc6","#b07850"],sd=["#2a1d18","#5a3b26","#8a5a2a","#d9b45a","#9c9c9c","#a33b2b","#1d1b1c"],sh=1.25;function Ey(n){let e=new Re(n);return .2126*e.r+.7152*e.g+.0722*e.b}function od(n){let e=new Re(n),t={};return e.getHSL(t),e.setHSL(t.h,t.s*.3,.42+t.l*.2),"#"+e.getHexString()}var Ay={pirates:["tricorne","bandana","tricorne"],western:["cowboy","cowboy","bandana"],japan:["kasa","topknot","headband"],regency:{gown:["bonnet","flowerCrown"],any:["tophat"]},egypt:["nemes","nemes","headband"],circus:{gown:["partyHat","flowerCrown"],any:["tophat","partyHat"]},chalet:["beanie","beanie","earmuffs"],space:["helmet","helmet","antennae"],haunted:["witch","witch","tophat"],medieval:["crown","helm","hood"],prehistory:["bone","feather","bone"],mermaids:["shellCrown","starfish","shellCrown"],paris:{gown:["cloche","beret"],any:["beret","boater"]},train:{gown:["cloche"],any:["bowler"]},rome:["laurel","laurel","hood"],world:["boater","cap","beanie"],halloween:["witch","devilHorns","witch"],easter:{gown:["bonnet","bunnyEars"],any:["bunnyEars"]},carnival:["mask","partyHat","mask"],lunar:["mandarinCap","topknot","mandarinCap"],xmas:["santa","elf","santa"],birthday:["partyHat","partyHat","crown"],love:{gown:["flowerCrown","bonnet"],any:["tophat"]},forest:["flowerCrown","hood","feather"]};function rd(n,e){let t=Ay[n];return!t||Array.isArray(t)?t:t[e]??t.any}function ad(n,e,t,i){switch(e){case"tricorne":n.cyl(.27,.27,.03,0,.98,-.02,"#2a2220",{seg:3}),n.cyl(.13,.16,.1,0,.98+.02,-.02,"#2a2220",{seg:12}),n.cyl(.272,.272,.012,0,.98+.025,-.02,"#d9b44a",{seg:3});break;case"bandana":n.sphere(.205,0,.9,-.02,t,{sy:.72,seg:16}),n.sphere(.045,.12,.88,-.18,t,{seg:8});for(let r=0;r<5;r++)n.sphere(.02,Math.cos(r*1.2)*.17,.95,Math.sin(r*1.2)*.17-.02,"#f6f2ea",{seg:6});break;case"cowboy":n.cyl(.3,.3,.025,0,.98-.02,0,"#8a5a32",{seg:22,rx:-.12}),n.cyl(.14,.16,.15,0,.98-.01,0,"#8a5a32",{seg:16}),n.cyl(.162,.162,.03,0,.98+.01,0,"#3a2618",{seg:16});break;case"kasa":n.cyl(0,.34,.16,0,.98-.04,0,"#d8c08a",{seg:20});break;case"topknot":n.sphere(.07,0,.98+.04,-.06,"#1d1b1c",{seg:10,sy:1.1});break;case"headband":n.cyl(.196,.196,.05,0,.88,0,t,{seg:18}),n.sphere(.04,0,.9,.19,"#d9b44a",{seg:8});break;case"tophat":n.cyl(.24,.24,.02,0,.98,0,"#1d1b1c",{seg:20}),n.cyl(.13,.14,.28,0,.98,0,"#1d1b1c",{seg:18}),n.cyl(.141,.141,.04,0,.98+.03,0,t,{seg:18});break;case"bonnet":n.sphere(.23,0,.9,-.05,"#f4e2c8",{sy:.8,seg:16}),n.cyl(.24,.24,.03,0,.92,.03,t,{seg:18,rx:1.2});break;case"nemes":n.sphere(.215,0,.88,-.02,"#e0b23a",{sy:.8,seg:16});for(let r=0;r<4;r++)n.cyl(.217,.217,.02,0,.8+r*.05,-.02,"#2f5e8c",{seg:16,t0:Math.PI*.75,tl:Math.PI*1.5});for(let r of[-1,1])n.box(.08,.22,.05,r*.18,.62,.03,"#e0b23a");break;case"partyHat":n.cyl(0,.12,.3,0,.98-.02,0,t,{seg:14,rz:(i()-.5)*.4}),n.sphere(.04,0,.98+.3,0,"#f2c94c",{seg:8});break;case"beanie":n.sphere(.205,0,.92,-.01,t,{sy:.78,seg:16}),n.cyl(.205,.205,.05,0,.86,-.01,"#f6f2ea",{seg:16}),n.sphere(.06,0,.98+.1,0,"#f6f2ea",{seg:10});break;case"earmuffs":n.cyl(.21,.21,.02,0,.84,0,"#c9c9c9",{rz:1.57,seg:16,t0:0,tl:Math.PI});for(let r of[-1,1])n.sphere(.065,r*.2,.84,0,t,{seg:10});break;case"helmet":n.sphere(.27,0,.84,0,"#dff4ff",{seg:20,roughness:.05,opacity:.35}),n.cyl(.27,.27,.05,0,.6,0,"#c9d1db",{seg:20,metalness:.5});break;case"antennae":for(let r of[-1,1])n.cbox(.015,.2,.015,r*.08,.98+.06,0,"#2a2523",{rz:-r*.3}),n.sphere(.035,r*.12,.98+.17,0,t,{seg:8,emissive:t,ei:.6});break;case"witch":n.cyl(.28,.28,.02,0,.98-.02,0,"#2a2236",{seg:20}),n.cyl(0,.15,.38,0,.98-.02,0,"#2a2236",{seg:14,rx:-.2}),n.cyl(.152,.152,.035,0,.98,0,t,{seg:14});break;case"devilHorns":for(let r of[-1,1])n.cyl(0,.035,.12,r*.09,.98-.02,.02,"#c0283a",{seg:8,rz:-r*.35});break;case"bunnyEars":for(let r of[-1,1])n.sphere(.05,r*.08,.98+.14,-.02,"#f6f2ea",{sy:3,seg:10,rz:-r*.15}),n.sphere(.028,r*.08,.98+.14,.022,"#f2a6c0",{sy:2.8,seg:8,rz:-r*.15});break;case"mask":n.cbox(.3,.075,.04,0,.87,.175,t,{round:.02}),n.sphere(.035,.13,.98+.04,.08,"#f2c94c",{sy:3,seg:8,rz:-.5});break;case"mandarinCap":n.sphere(.205,0,.92,-.01,"#1d1b1c",{sy:.62,seg:16}),n.sphere(.035,0,.98+.05,0,"#c0283a",{seg:8});break;case"crown":n.cyl(.15,.15,.08,0,.98-.02,0,"#e0b23a",{seg:18,metalness:.7,roughness:.3});for(let r=0;r<6;r++)n.cyl(0,.03,.07,Math.cos(r*1.047)*.14,.98+.06,Math.sin(r*1.047)*.14,"#e0b23a",{seg:4,metalness:.7});n.sphere(.025,0,.98+.02,.15,"#c0283a",{seg:8});break;case"helm":n.sphere(.22,0,.88,0,"#9aa6b4",{sy:.9,seg:16,metalness:.6,roughness:.35}),n.box(.04,.2,.04,0,.74,.2,"#9aa6b4",{metalness:.6});break;case"hood":n.sphere(.23,0,.87,-.04,t,{sy:.95,seg:16});break;case"bone":n.cbox(.26,.035,.035,0,.98+.01,0,"#efe6d0",{rz:.3});for(let r of[-1,1])n.sphere(.035,r*.125,.98+.01+r*.04,0,"#efe6d0",{seg:6});break;case"feather":n.cyl(.196,.196,.04,0,.9,0,"#8a5a32",{seg:16}),n.cbox(.05,.28,.015,.06,.98+.08,-.12,t,{rz:-.3,round:.012});break;case"shellCrown":for(let r=0;r<5;r++)n.sphere(.05,Math.cos(r*.6-1.2)*.17,.98-.01,Math.sin(r*.6-1.2)*.17+.04,["#f6d3c9","#f8f4ff","#f0a8c4"][r%3],{sy:1.3,seg:8});break;case"starfish":for(let r=0;r<5;r++)n.cbox(.1,.02,.035,.1+Math.cos(r*1.256)*.04,.95,.08+Math.sin(r*1.256)*.04,"#e8743a",{ry:-r*1.256,rz:.6});break;case"beret":n.cyl(.2,.2,.05,.03,.98-.03,0,t,{seg:18,rz:.25}),n.cyl(.01,.01,.04,.05,.98+.01,0,t,{seg:4});break;case"boater":n.cyl(.27,.27,.02,0,.98-.01,0,"#e8d49a",{seg:20}),n.cyl(.15,.15,.09,0,.98-.01,0,"#e8d49a",{seg:18}),n.cyl(.152,.152,.03,0,.98+.01,0,t,{seg:18});break;case"bowler":n.cyl(.22,.22,.02,0,.98-.01,0,"#2a2220",{seg:20}),n.sphere(.15,0,.98,0,"#2a2220",{sy:.8,seg:16});break;case"cloche":n.sphere(.215,0,.9,0,t,{sy:.8,seg:16}),n.cyl(.24,.24,.02,0,.84,0,t,{seg:18});break;case"cap":n.sphere(.2,0,.92,0,t,{sy:.7,seg:16}),n.box(.24,.02,.16,0,.9,.2,t);break;case"santa":n.cyl(.215,.215,.06,0,.86,0,"#f6f2ea",{seg:18}),n.cyl(.02,.19,.32,0,.9,-.02,"#c0283a",{seg:14,rx:-.45}),n.sphere(.055,0,1.12,-.16,"#f6f2ea",{seg:10});break;case"elf":n.cyl(0,.17,.34,0,.98-.06,0,"#3f7a4a",{seg:14,rz:.35}),n.cyl(.175,.175,.04,0,.98-.07,0,"#c0283a",{seg:14}),n.sphere(.03,-.12,.98+.24,0,"#f2c94c",{seg:8});break;case"flowerCrown":for(let r=0;r<9;r++){let a=r/9*Math.PI*2;n.sphere(.04,Math.cos(a)*.18,.96,Math.sin(a)*.18,r%3?t:"#f6f2ea",{seg:8,sy:.8}),r%3===1&&n.sphere(.028,Math.cos(a+.35)*.19,.94,Math.sin(a+.35)*.19,"#5a9a4a",{seg:6,sy:.6})}break;case"laurel":for(let r=0;r<12;r++){let a=Math.PI*.15+r/11*Math.PI*.7+Math.PI;n.cbox(.07,.015,.035,Math.cos(a)*.19,.95,-Math.sin(a)*.19,"#7aa84a",{ry:a,rz:.4})}break}}function cd(n,{victim:e=!1,selected:t=!1,theme:i=""}={}){let s=$l(n.id??n.name??"p"),r=id[s%id.length],a=sd[(s>>>4)%sd.length],o=e?od(n.color??"#888888"):n.color??"#888888";Zn(s%9973);let c=new Dt,l=new tn;if(e){let h=new tn,f=ih(h,{color:o,skin:r,hair:a,pose:"dead",theme:i,h:s}),u=rd(i,f);u&&ad(h,u[(s>>>8)%u.length],o,()=>(s>>>12)%100/100),l.merge(h);let d=l.build();d.rotation.set(-Math.PI/2,0,0),d.scale.setScalar(1.15),d.position.set(0,.3,.6);let p=new Dt;p.add(d),p.rotation.y=Math.PI/2+.35,c.add(p)}else{let h=new Re(o).offsetHSL(0,0,-.18).getStyle();l.cyl(.4,.42,.06,0,0,0,h,{seg:28,roughness:.5}),l.cyl(.41,.41,.012,0,.06,0,"#f6f2ea",{seg:28,roughness:.5}),l.cyl(.36,.36,.014,0,.062,0,h,{seg:28,roughness:.5});let f=new tn,u=ih(f,{color:o,skin:r,hair:a,pose:"stand",theme:i,h:s}),d=rd(i,u);d&&ad(f,d[(s>>>8)%d.length],new Re(o).offsetHSL(0,0,-.08).getStyle(),()=>(s>>>12)%100/100),l.merge(f,0,0,.07,0);let p=l.build();p.scale.setScalar(1.12),c.add(p)}if(t){let h=new ht(new wi(.56,.05,10,40).rotateX(Math.PI/2),new pn({color:"#ffd36a",emissive:"#ffb020",emissiveIntensity:1.6}));h.position.y=.06,c.add(h),c.traverse(f=>{f.isMesh&&f.material&&!f.material.userData.glowClone&&f!==h&&(f.material=ps(f.material.clone()),f.material.userData={glowClone:!0},f.material.emissive=new Re("#ffcf7a"),f.material.emissiveIntensity=.22)})}return c.traverse(h=>{h.castShadow=h.isMesh,h.receiveShadow=h.isMesh}),c}function ld(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d");t.strokeStyle="rgba(255,255,255,0.92)",t.lineWidth=7,t.lineCap=t.lineJoin="round";let i=[[62,102],[40,108],[36,128],[40,148],[62,154],[78,150],[96,168],[120,176],[118,158],[104,150],[150,154],[196,176],[222,172],[204,150],[166,136],[204,120],[222,92],[198,86],[150,106],[104,108],[118,98],[122,78],[98,86],[78,106],[62,102]];t.beginPath(),i.forEach(([a,o],c)=>{let l=a+Math.sin(c*7.1)*1.5,h=o+Math.cos(c*5.3)*1.5;c===0?t.moveTo(l,h):t.lineTo(l,h)}),t.closePath(),t.stroke();let s=new Kt(e);s.colorSpace=Ct,s.anisotropy=8;let r=new ht(new dn(1.9,1.9).rotateX(-Math.PI/2),new pn({map:s,transparent:!0,depthWrite:!1,roughness:1}));return r.renderOrder=2,r}function hd(n,{victim:e=!1,selected:t=!1,name:i=!1}={}){let s=e?od(n.color??"#888"):n.color??"#888",r=256,a=18,o=i?120:0,c=i?512:r+2*a,l=r+2*a+o,h=document.createElement("canvas");h.width=c,h.height=l;let f=h.getContext("2d"),u=c/2,d=a+r/2,p=r/2-6;if(t){let x=f.createRadialGradient(u,d,p*.8,u,d,p+a);x.addColorStop(0,"rgba(255,208,106,0.95)"),x.addColorStop(1,"rgba(255,208,106,0)"),f.fillStyle=x,f.beginPath(),f.arc(u,d,p+a,0,Math.PI*2),f.fill()}f.fillStyle="#2a1f1c",f.beginPath(),f.moveTo(u-26,d+p-14),f.lineTo(u+26,d+p-14),f.lineTo(u,d+p+16),f.closePath(),f.fill(),f.beginPath(),f.arc(u,d,p,0,Math.PI*2),f.fillStyle="#2a1f1c",f.fill(),f.beginPath(),f.arc(u,d,p-12,0,Math.PI*2),f.fillStyle=e?"#efe6dc":"#fbf6ea",f.fill(),f.beginPath(),f.arc(u,d,p-26,0,Math.PI*2),f.fillStyle=s,f.fill(),e&&(f.strokeStyle="#a3242b",f.lineWidth=10,f.beginPath(),f.arc(u,d,p-6,0,Math.PI*2),f.stroke());let _=(n.name??n.id??"?").trim().charAt(0).toUpperCase();if(f.fillStyle=Ey(s)>.55?"#2a1f1c":"#ffffff",f.font='700 150px Georgia, "Times New Roman", serif',f.textAlign="center",f.textBaseline="middle",f.fillText(_,u,d+10),i){let x=n.name??"";f.font='600 78px Georgia, "Times New Roman", serif';let T=Math.min(c-20,f.measureText(x).width+44),b=l-o+6;f.fillStyle="rgba(42,31,28,0.9)",Ry(f,u-T/2,b,T,o-12,26),f.fill(),f.fillStyle="#fbf6ea",f.fillText(x,u,b+(o-12)/2+3,c-40)}let g=new Kt(h);g.colorSpace=Ct,g.anisotropy=4;let m=new Bi({map:g,depthTest:!1,depthWrite:!1,transparent:!0}),M=new Br(m),S=.7/r;return M.scale.set(c*S,l*S,1),M.center.set(.5,1-(d+p+16)/l),M.renderOrder=10,Xa(M)}function Ry(n,e,t,i,s,r){n.beginPath(),n.moveTo(e+r,t),n.arcTo(e+i,t,e+i,t+s,r),n.arcTo(e+i,t+s,e,t+s,r),n.arcTo(e,t+s,e,t,r),n.arcTo(e,t,e+i,t,r),n.closePath()}var Ri={iso:{az:0,el:84,fov:20,skew:.07,lean:-.02},top:{az:0,el:89,ortho:!0}},Cy=.92,Py={look:"print",mood:"day",camera:"iso",labels:!0,roomLabels:!0,names:!1,clutter:"some",interactive:!0,ao:!0,padding:.04,maxPixelRatio:2,background:null},Ya=new L,jn=en.degToRad,yc=[.6,4],mr=[12,89],rh=()=>({az:0,el:0,zoom:1,pan:new L}),$a=class{constructor(e,t={}){this.container=e,this.opts={...Py,...t},this.onCell=null,this.onCamera=null,this.user=rh(),this.state={show:"blank"},this.cache=new Map,this.owned=new Set;let i=this.renderer=new ec({antialias:!1,alpha:!0,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio||1,this.opts.maxPixelRatio)),i.shadowMap.enabled=!0,i.shadowMap.type=Gi,i.shadowMap.autoUpdate=!1,i.toneMapping=cs,i.debug.checkShaderErrors=!1;let s=i.domElement;s.style.display="block",s.style.width="100%",s.style.height="100%",s.style.touchAction=this.opts.interactive?"pan-y":"manipulation",s.setAttribute("aria-hidden","true"),e.appendChild(s),this.scene=new ki,this.overlay=new ki,this.hemi=new ra("#e7eefc","#8a7a64",1.1),this.sun=new as("#fff3e0",2.6),this.sun.castShadow=!0,this.sun.shadow.mapSize.setScalar(2048),this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.03,this.sun.shadow.radius=5,this.sun.shadow.blurSamples=12,this.bounce=new as("#ffd9a8",.4),this.rim=new as("#c9dcff",.5),this.bounce.target=this.rim.target=this.sun.target,this.scene.add(this.hemi,this.sun,this.sun.target,this.bounce,this.rim);let r=new rr(i);this.envRT=r.fromScene(new hc,.04),this.scene.environment=this.envRT.texture,r.dispose(),this.world=new Dt,this.dyn=new Dt,this.scene.add(this.world,this.dyn),this.marks=new Dt,this.overlay.add(this.marks),this.persp=new ic(20,1,.1,1e3),this.ortho=new sc(-1,1,1,-1,.1,1e3),this.makeHelpers(),this.size={w:1,h:1},this.textMask=new mc,this.setupComposer(),this.applyLook(),this.applyMood(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.opts.interactive&&this.bindEvents(),this.resize()}get camera(){var e;return(e=Ri[this.opts.camera])!=null&&e.ortho?this.ortho:this.persp}setupComposer(){let e=this.camera;if(this.composer&&this.composerCam===e)return;this.disposeComposer(),this.composerCam=e;let t=new Nt(1,1,{samples:4,type:$t});this.composer=new ac(this.renderer,t),this.renderPass=new Da(this.scene,e),this.composer.addPass(this.renderPass),this.aoPass=new Oa(this.scene,e,1,1),this.aoPass.blendIntensity=.8,this.aoPass.updateGtaoMaterial({radius:.55,distanceExponent:1.5,thickness:1,scale:1.1}),this.aoPass.enabled=!!this.opts.ao,this.composer.addPass(this.aoPass),this.overlayPass=new Da(this.overlay,e),this.overlayPass.clear=!1,this.composer.addPass(this.overlayPass),this.composer.addPass(new oc),this.stylePass=new cr(uu),this.stylePass.uniforms.tText.value=this.textMask.target.texture,this.composer.addPass(this.stylePass),this.look&&this.resize()}disposeComposer(){var e;if(this.composer){for(let t of this.composer.passes)(e=t.dispose)==null||e.call(t);this.composer.renderTarget1.dispose(),this.composer.renderTarget2.dispose(),this.composer=null}}makeHelpers(){let e=new dn(pt*.96,pt*.96).rotateX(-Math.PI/2);this.hover=new ht(e,new an({color:"#fffaf0",transparent:!0,opacity:.32,depthWrite:!1,toneMapped:!1})),this.hover.visible=!1,this.hover.renderOrder=3,this.scene.add(this.hover);let t=this.highlight=new Dt,i=new an({color:"#ffb52e",toneMapped:!1}),s=new ht(e,new an({color:"#ffd36a",transparent:!0,opacity:.3,depthWrite:!1,toneMapped:!1}));s.renderOrder=3,t.add(s);let r=.09,a=pt-.16;for(let[f,u,d,p]of[[a,r,0,-a/2],[a,r,0,a/2],[r,a,-a/2,0],[r,a,a/2,0]]){let _=new ht(new gn(f+(f>u?r:0),.03,u),i);_.position.set(d,.02,p),t.add(_)}t.visible=!1,this.scene.add(t);let o=256,c=document.createElement("canvas");c.width=c.height=o;let l=c.getContext("2d");l.lineCap="round";for(let[f,u]of[[44,"rgba(255,250,240,0.85)"],[26,"rgba(160,30,36,0.92)"]])l.strokeStyle=u,l.lineWidth=f,l.beginPath(),l.moveTo(58,62),l.quadraticCurveTo(130,126,196,198),l.moveTo(198,58),l.quadraticCurveTo(122,132,60,196),l.stroke();let h=new Kt(c);h.colorSpace=Ct,h.anisotropy=8,this.xMat=new an({map:h,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.xGeo=new dn(pt*.62,pt*.62).rotateX(-Math.PI/2),this.owned.add(h)}setOptions(e={}){let t={...this.opts};Object.assign(this.opts,e),this.opts.camera!==t.camera&&(this.setupComposer(),this.resetCamera(!1)),e.ao!==void 0&&this.aoPass&&(this.aoPass.enabled=!!e.ao),this.opts.look!==t.look&&this.applyLook(),(this.opts.mood!==t.mood||e.background!==void 0)&&this.applyMood(),this.syncLabels(),this.opts.names!==t.names&&this.refresh(),this.opts.clutter!==t.clutter&&this.puzzle&&this.setPuzzle(this.puzzle,this.state),this.fit(),this.invalidate(!0)}syncLabels(){this.board&&(this.board.labels.visible=!!this.opts.labels,this.board.roomLabels&&(this.board.roomLabels.visible=this.opts.roomLabels!==!1),this.orientLabels())}orientLabels({az:e}=this.angles()){var r;if(!this.board)return;let t=Math.cos(jn(e))>=0?"front":"back",i=Math.round(e/90)*(Math.PI/2);for(let a of this.board.labels.children)a.visible=a.userData.edge==="left"||a.userData.edge===t,a.rotation.y=i;let s=Math.cos(jn(e))<0?Math.PI:0;for(let a of((r=this.board.roomLabels)==null?void 0:r.children)??[])a.rotation.y=s}faceCamera(e=this.angles().az){for(let t of this.dyn.children)!t.userData.faces||Math.abs(t.rotation.y-jn(e))<1e-4||(t.rotation.y=jn(e),this.shadowDirty=!0)}angles(){let e=Ri[this.opts.camera]??Ri.iso;return{az:e.az+this.user.az,el:en.clamp(e.el+this.user.el,mr[0],mr[1])}}get cameraMoved(){let e=this.user;return Math.abs(e.az)>.5||Math.abs(e.el)>.5||Math.abs(e.zoom-1)>.01||e.pan.lengthSq()>1e-4}moveCamera({az:e=0,el:t=0,zoom:i=1,pan:s=null}={}){var c,l;let r=this.user,a=Ri[this.opts.camera]??Ri.iso;r.az+=e,r.el=en.clamp(a.el+r.el+t,mr[0],mr[1])-a.el,r.zoom=en.clamp(r.zoom*i,yc[0],yc[1]),s&&r.pan.add(s);let o=(((c=this.board)==null?void 0:c.n)??6)*pt/2+Dn;r.pan.x=en.clamp(r.pan.x,-o,o),r.pan.z=en.clamp(r.pan.z,-o,o),this.fit(),(l=this.onCamera)==null||l.call(this,this.cameraMoved)}animateCamera(e,t=260){cancelAnimationFrame(this.camRaf);let i={az:this.user.az,el:this.user.el,zoom:this.user.zoom,pan:this.user.pan.clone()},s=performance.now(),r=()=>{var c;let a=Math.min(1,(performance.now()-s)/t),o=a<.5?2*a*a:1-(-2*a+2)**2/2;this.user.az=i.az+(e.az-i.az)*o,this.user.el=i.el+(e.el-i.el)*o,this.user.zoom=i.zoom*(e.zoom/i.zoom)**o,this.user.pan.lerpVectors(i.pan,e.pan,o),this.fit(),a<1&&!this.disposed?this.camRaf=requestAnimationFrame(r):(c=this.onCamera)==null||c.call(this,this.cameraMoved)};r()}nudgeCamera({az:e=0,el:t=0,zoom:i=1}={}){let s=this.user,r=Ri[this.opts.camera]??Ri.iso;this.animateCamera({az:s.az+e,el:en.clamp(r.el+s.el+t,mr[0],mr[1])-r.el,zoom:en.clamp(s.zoom*i,yc[0],yc[1]),pan:s.pan.clone()})}resetCamera(e=!0){var i;let t=this.user.az-Math.round(this.user.az/360)*360;this.user.az=t,e?this.animateCamera(rh()):(cancelAnimationFrame(this.camRaf),this.user=rh(),(i=this.onCamera)==null||i.call(this,!1))}applyLook(){let e=Pa[this.opts.look]??Pa.print;this.look=e,this.syncStyleUniforms()}syncStyleUniforms(e=1){let t=this.look;if(!t||!this.stylePass)return;let i=this.stylePass.uniforms;for(let s of["posterize","halftone","misreg","grain","saturation","lens","chroma","mist","tilt","vignette","warmth","fade","ink","wash","hatch","shadowTint"])i[s].value=t[s]??0;i.pixel.value=Math.max(1,Math.round((t.pixel??1)*e)),i.dotSize.value=(t.dot??3)*e,i.paper.value.set(t.paper??"#f6eedb")}applyMood(){var i;let e=this.mood=Ia[this.opts.mood]??Ia.day;this.hemi.color.set(e.sky),this.hemi.groundColor.set(e.ground),this.hemi.intensity=e.hemi,this.sun.color.set(e.sun),this.sun.intensity=e.sunI,this.bounce.color.set(e.bounce),this.bounce.intensity=e.bounceI,this.rim.color.set(e.rim),this.rim.intensity=e.rimI,this.scene.environmentIntensity=e.env,this.renderer.toneMappingExposure=e.exposure,this.scene.background=new Re(this.opts.background??e.backdrop);let t=this.opts.mood==="night";for(let s of((i=this.board)==null?void 0:i.labelMats)??[])s.color.set(t?"#f3e7cf":this.board.ink??"#3a2c26");this.scaleLamps(),this.placeSun()}scaleLamps(){var t;let e=((t=this.mood)==null?void 0:t.lampScale)??1;this.world.traverse(i=>{i.isPointLight&&(i.userData.base===void 0&&(i.userData.base=i.intensity),i.intensity=i.userData.base*e)})}placeSun(){var o;let e=this.mood,i=(((o=this.board)==null?void 0:o.n)??6)*pt/2+Dn+1.5,s=en.degToRad(e.sunAz),r=en.degToRad(e.sunEl);this.sun.target.position.set(0,0,0),this.sun.position.set(Math.sin(s)*Math.cos(r)*i*2,Math.sin(r)*i*2,Math.cos(s)*Math.cos(r)*i*2),this.bounce.position.set(-Math.sin(s)*i,i*.25,-Math.cos(s)*i),this.rim.position.set(-Math.sin(s+1.2)*i,i*.6,-Math.cos(s+1.2)*i);let a=this.sun.shadow.camera;a.left=a.bottom=-i,a.right=a.top=i,a.near=.1,a.far=i*4,a.updateProjectionMatrix(),this.sun.target.updateMatrixWorld()}setPuzzle(e,t={}){if(!e||!e.size||!e.cells)throw new Error("murdoku3d: invalid puzzle");let i=JSON.stringify([e.size,e.seed,e.rooms,e.cells,e.objects,e.theme,e.roomLabels,this.opts.clutter]);i!==this.sig&&(this.sig=i,this.clearBoard(),this.board=Ku(e,{clutter:this.opts.clutter}),this.world.add(this.board.group),this.syncLabels(),this.pickables=[],this.board.group.traverse(s=>s.isMesh&&s.userData.cell&&this.pickables.push(s)),this.applyMood(),this.fit()),this.puzzle=e,this.state={show:"blank",placements:null,crosses:[],selected:null,highlight:null,...t},this.refresh()}clearBoard(){this.board&&(this.board.group.removeFromParent(),Za(this.board.group),this.board=null)}refresh(){var o;if(!this.board||!this.puzzle)return;let{n:e,cells:t}=this.board,i=this.state;this.dyn.clear(),this.marks.clear();let s=new Set,r=this.puzzle.people??[];for(let c of r){let l=null;if(i.show==="solution"?l={r:c.r,c:c.c}:i.show==="play"&&(l=((o=i.placements)==null?void 0:o[c.id])??null),!l||!(l.r>=0&&l.r<e&&l.c>=0&&l.c<e))continue;let h=c.role==="victim",f=i.selected!=null&&i.selected===c.id,u=t[l.r][l.c],d=u.object?u.occupiable?u.seat:u.top:0,p=Ai(e,l.r,l.c),_=this.puzzle.theme??"",g=`f|${c.id}|${c.color}|${h}|${f}|${_}`,m=this.cached(g,()=>cd(c,{victim:h,selected:f,theme:_}));if(m.position.set(p.x,d,p.z),m.userData.faces=!h,m.traverse(x=>x.userData.cell=[l.r,l.c]),this.dyn.add(m),s.add(g),h&&(!u.object||u.object==="rug")){let x=`chalk|${c.id}`,T=this.cached(x,()=>ld());T.position.set(p.x,d+.02,p.z),T.rotation.y=.35,this.dyn.add(T),s.add(x)}let M=`b|${c.id}|${c.name}|${c.color}|${h}|${f}|${!!this.opts.names}`,S=this.cached(M,()=>hd(c,{victim:h,selected:f,name:!!this.opts.names}));S.position.set(p.x,d+(h?.72:sh*1.12+.16),p.z),this.marks.add(S),s.add(M)}for(let c of i.crosses??[]){let[l,h]=String(c).split(",").map(Number);if(!(l>=0&&l<e&&h>=0&&h<e))continue;let f=new ht(this.xGeo,this.xMat),u=Ai(e,l,h);f.position.set(u.x,.05,u.z),f.renderOrder=5,this.marks.add(f)}let a=i.highlight;this.highlight.visible=!!(a&&a.r>=0&&a.r<e&&a.c>=0&&a.c<e),this.highlight.visible&&this.highlight.position.copy(Ai(e,a.r,a.c));for(let[c,l]of this.cache)s.has(c)?l.age=0:++l.age>40&&(Za(l.obj),this.cache.delete(c));this.faceCamera(),this.invalidate(!0)}cached(e,t){let i=this.cache.get(e);return i||this.cache.set(e,i={obj:t(),age:0}),i.obj}fit(e,t=!0){var R;let i=this.size.w,s=this.size.h;e=e??i/Math.max(1,s);let r=Ri[this.opts.camera]??Ri.iso,a=this.camera,c=(((R=this.board)==null?void 0:R.n)??6)*pt/2,l=c+Dn,h=[];for(let D of[-l,l])for(let F of[-l,l])h.push(new L(D,-qa,F),new L(D,0,F));for(let D of[-c,c])for(let F of[-c,c])h.push(new L(D*.85,1.7,F*.85));let f=c-pt/2,u=sh*1.12+1;for(let D of[-f,f])for(let F of[-f,f])h.push(new L(D,u,F));let d=t?this.angles():r,p=jn(d.az),_=jn(d.el),g=new L(Math.sin(p)*Math.cos(_),Math.sin(_),Math.cos(p)*Math.cos(_)),m=new L(0,0,0),M=1-2*(this.opts.padding??.04),S=60,x=l*1.2;r.ortho||(a.fov=r.fov,a.oblique=r.skew??0,a.lean=r.lean??0,a.aspect=e,S=l/Math.tan(jn(r.fov)/2)*1.3);let T=Math.tan(jn(mu(d.el))),b=new tt().set(1,-Math.sin(p)*T,0,0,0,1,0,0,0,-Math.cos(p)*T,1,0,0,0,0,1),P=null,y=()=>{r.ortho?(a.left=-x*e,a.right=x*e,a.top=x,a.bottom=-x,a.near=.1,a.far=200,a.position.copy(m).addScaledVector(g,60)):(a.position.copy(m).addScaledVector(g,S),a.focus=S,a.near=Math.max(.1,S*.2),a.far=S*3+50),a.up.set(0,1,0),a.lookAt(m),a.updateMatrixWorld(),P=T?new tt().multiplyMatrices(a.matrixWorldInverse,b).multiply(a.matrixWorld):null,a.standUp=P,a.updateProjectionMatrix()},E=new L,A=new L;for(let D=0;D<6;D++){y();let F=1/0,N=-1/0,k=1/0,q=-1/0;for(let Z of h)Ya.copy(Z).project(a),F=Math.min(F,Ya.x),N=Math.max(N,Ya.x),k=Math.min(k,Ya.y),q=Math.max(q,Ya.y);let Y=(F+N)/2,ne=(k+q)/2,H=Math.max((N-F)/2,(q-k)/2)/M;E.setFromMatrixColumn(a.matrixWorld,0),A.setFromMatrixColumn(a.matrixWorld,1);let J=r.ortho?x:S*Math.tan(jn(a.fov)/2);m.addScaledVector(E,Y*J*e).addScaledVector(A,ne*J),r.ortho?x*=H:S*=H}t&&(r.ortho?x/=this.user.zoom:S/=this.user.zoom,m.add(this.user.pan)),this.orientLabels(d),this.faceCamera(d.az),y(),this.unitsPerPx=2*(r.ortho?x:S*Math.tan(jn(a.fov)/2))/Math.max(1,this.size.h),this.invalidate()}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.size={w:e,h:t};let i=Math.min(window.devicePixelRatio||1,this.opts.maxPixelRatio);i!==this.renderer.getPixelRatio()&&(this.renderer.setPixelRatio(i),this.composer.setPixelRatio(i)),this.renderer.setSize(e,t,!1),this.composer.setSize(e,t),this.textMask.setSize(e*i,t*i),this.stylePass.uniforms.resolution.value.set(e*i,t*i),this.syncStyleUniforms(1),this.fit(),this.render()}invalidate(e=!1){e&&(this.shadowDirty=!0),!(this.raf||this.disposed)&&(this.raf=requestAnimationFrame(()=>{this.raf=0,this.render()}))}render(){var t;if(this.disposed)return;Jl.value=((t=this.look)==null?void 0:t.wobble)??1;let e=this.textMask.render(this.renderer,this.camera,this.scene,this.overlay);this.stylePass.uniforms.textKeep.value=e?Cy:0,this.shadowDirty!==!1&&(this.renderer.shadowMap.needsUpdate=!0,this.shadowDirty=!1),this.renderPass.camera=this.overlayPass.camera=this.camera,this.composer.render()}bindEvents(){let e=this.renderer.domElement,t=new Map,i=null,s=null,r=null,a=new L,o=new L,c=(h,f)=>{a.setFromMatrixColumn(this.camera.matrixWorld,0).setY(0).normalize(),o.set(a.z,0,-a.x);let u=this.unitsPerPx??.01,d=Math.max(.35,Math.sin(jn(this.angles().el)));this.moveCamera({pan:a.multiplyScalar(-h*u).addScaledVector(o,f*u/d)})},l=()=>{let[h,f]=[...t.values()];return{d:Math.hypot(f.x-h.x,f.y-h.y),a:Math.atan2(f.y-h.y,f.x-h.x),x:(h.x+f.x)/2,y:(h.y+f.y)/2}};this.handlers={pointerdown:h=>{var f;t.set(h.pointerId,{x:h.clientX,y:h.clientY}),(f=e.setPointerCapture)==null||f.call(e,h.pointerId),cancelAnimationFrame(this.camRaf),t.size===1?(i={x:h.clientX,y:h.clientY,id:h.pointerId,pan:h.button===1||h.button===2||h.shiftKey||h.ctrlKey||h.metaKey||h.altKey},s=null):(i=null,s="pinch",r=l())},pointermove:h=>{let f=t.get(h.pointerId);if(!f){if(h.pointerType!=="mouse"||(this.lastMove=h,this.moveRaf))return;this.moveRaf=requestAnimationFrame(()=>{this.moveRaf=0,this.setHover(this.pickCell(this.lastMove))});return}let u=h.clientX-f.x,d=h.clientY-f.y;if(f.x=h.clientX,f.y=h.clientY,s==="pinch"&&t.size>=2){let p=l(),_=(p.a-r.a)*180/Math.PI;_-=Math.round(_/360)*360,this.moveCamera({zoom:r.d>0?p.d/r.d:1,az:-_}),c(p.x-r.x,p.y-r.y),r=p;return}!s&&i&&Math.hypot(h.clientX-i.x,h.clientY-i.y)>6&&(s=i.pan?"pan":"orbit",this.setHover(null),e.style.cursor=s==="pan"?"move":"grabbing"),s==="orbit"?this.moveCamera({az:-u*.35,el:d*.25}):s==="pan"&&c(u,d)},pointerup:h=>this.handlers.pointercancel(h,!0),pointercancel:(h,f=!1)=>{if(!t.delete(h.pointerId))return;let u=f&&(i==null?void 0:i.id)===h.pointerId&&!s&&!i.pan&&Math.hypot(h.clientX-i.x,h.clientY-i.y)<=12;if(t.size?s="done":(s=null,i=null,e.style.cursor=""),!u)return;let d=this.pickCell(h);d&&this.onCell&&this.onCell(d.r,d.c,h)},pointerleave:()=>this.setHover(null),wheel:h=>{h.preventDefault(),cancelAnimationFrame(this.camRaf),this.moveCamera({zoom:Math.exp(-h.deltaY*(h.deltaMode?.05:.0015))})},contextmenu:h=>h.preventDefault()};for(let[h,f]of Object.entries(this.handlers))e.addEventListener(h,f,h==="wheel"?{passive:!1}:void 0)}setHover(e){let t=e?`${e.r},${e.c}`:"";t!==this.hoverKey&&(this.hoverKey=t,this.renderer.domElement.style.cursor=e?"pointer":"",this.hover.visible=!!e&&!!this.board,this.hover.visible&&this.hover.position.copy(Ai(this.board.n,e.r,e.c)).setY(.02),this.invalidate())}pickCell(e){var d;if(!this.board)return null;let t=this.renderer.domElement.getBoundingClientRect(),i=du({x:(e.clientX-t.left)/t.width,y:1-(e.clientY-t.top)/t.height},((d=this.look)==null?void 0:d.lens)??0,t.width/t.height),s=new la,r=this.camera;r.updateMatrixWorld();let a=new L(i.x*2-1,i.y*2-1,-1).unproject(r),o=new L(i.x*2-1,i.y*2-1,1).unproject(r);s.set(a,o.sub(a).normalize()),s.camera=r;let c=s.intersectObjects([...this.pickables,...this.dyn.children],!0);for(let p of c)if(p.object.userData.cell)return{r:p.object.userData.cell[0],c:p.object.userData.cell[1]};let l=new L;if(!s.ray.intersectPlane(new vn(new L(0,1,0),0),l))return null;let h=this.board.n,f=Math.floor(l.x/pt+h/2),u=Math.floor(l.z/pt+h/2);return u>=0&&u<h&&f>=0&&f<h?{r:u,c:f}:null}async toCanvas({width:e=1600,height:t,transparent:i=!1,current:s=!1}={}){let{w:r,h:a}=this.size;e=Math.round(e),t=Math.round(t??e*a/Math.max(1,r));let o=this.renderer.getContext(),c=Math.min(o.getParameter(o.MAX_RENDERBUFFER_SIZE),o.getParameter(o.MAX_TEXTURE_SIZE),...o.getParameter(o.MAX_VIEWPORT_DIMS)),l=Math.min(1,c/Math.max(e,t)),h=Math.floor(e*l),f=Math.floor(t*l),u=this.renderer.getPixelRatio(),d=this.hover.visible;this.hover.visible=!1,this.renderer.setPixelRatio(1),this.composer.setPixelRatio(1),this.renderer.setSize(h,f,!1),this.composer.setSize(h,f),this.textMask.setSize(h,f),this.stylePass.uniforms.resolution.value.set(h,f),this.syncStyleUniforms(Math.max(1,Math.min(h,f)/900)),this.fit(h/f,s);let p=this.scene.background;i&&(this.scene.background=null,this.renderer.setClearColor(0,0),this.stylePass.uniforms.alphaOut.value=1),this.shadowDirty=!0,this.render();let _=document.createElement("canvas");return _.width=h,_.height=f,_.getContext("2d").drawImage(this.renderer.domElement,0,0),this.scene.background=p,this.stylePass.uniforms.alphaOut.value=0,this.hover.visible=d,this.renderer.setPixelRatio(u),this.composer.setPixelRatio(u),this.resize(),_}dispose(){if(this.disposed)return;this.disposed=!0,this.raf&&cancelAnimationFrame(this.raf),this.moveRaf&&cancelAnimationFrame(this.moveRaf),cancelAnimationFrame(this.camRaf),this.ro.disconnect();let e=this.renderer.domElement;for(let[t,i]of Object.entries(this.handlers??{}))e.removeEventListener(t,i);this.clearBoard();for(let{obj:t}of this.cache.values())Za(t);this.cache.clear(),Za(this.scene),Za(this.overlay),this.xGeo.dispose(),this.xMat.dispose();for(let t of this.owned)t.dispose();this.envRT.dispose(),this.textMask.dispose(),this.disposeComposer(),this.renderer.dispose(),this.renderer.forceContextLoss(),e.remove()}};function Za(n){n.traverse(e=>{var i,s;qu(e),e.geometry&&!e.isSprite&&e.geometry.dispose();let t=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(let r of t)(i=r.userData)!=null&&i.shared||(r.map&&!((s=r.map.userData)!=null&&s.shared)&&!r.map.isRenderTargetTexture&&r.map.dispose(),r.dispose())})}var Ja=null;function Sb(){var n;if(Ja!==null)return Ja;try{let e=document.createElement("canvas"),t=e.getContext("webgl2")||e.getContext("webgl");Ja=!!t,(n=t==null?void 0:t.getExtension("WEBGL_lose_context"))==null||n.loseContext()}catch{Ja=!1}return Ja}var wb=Object.entries(Pa).map(([n,e])=>({id:n,label:e.label})),Tb=Object.keys(Ia);async function Eb(n,e={}){if(!n)throw new Error("murdoku3d: container required");return new $a(n,e)}async function Ab(n,{show:e="blank",placements:t,crosses:i,selected:s,highlight:r,look:a,mood:o,camera:c,labels:l,roomLabels:h,names:f,clutter:u,width:d=1600,height:p,transparent:_=!1}={}){p=p??d;let g=document.createElement("div");g.style.cssText=`position:fixed;left:-20000px;top:0;width:${Math.min(d,1200)}px;height:${Math.round(Math.min(d,1200)*p/d)}px;pointer-events:none;`,document.body.appendChild(g);let m={interactive:!1};for(let[S,x]of Object.entries({look:a,mood:o,camera:c,labels:l,roomLabels:h,names:f,clutter:u}))x!==void 0&&(m[S]=x);let M=new $a(g,m);try{return M.setPuzzle(n,{show:e,placements:t,crosses:i,selected:s,highlight:r}),await M.toCanvas({width:d,height:p,transparent:_})}finally{M.dispose(),g.remove()}}export{wb as LOOKS,Tb as MOODS,Eb as createView,Ab as renderImage,Sb as supported};

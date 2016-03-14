function BigMirror(json){
	this.oS = document.getElementById(json.sName);
	this.oB = document.getElementById(json.bName);
	this.oM = document.getElementById(json.mName);
	this.oImg=this.oB.getElementsByTagName('img')[0];
	this.init();
}
BigMirror.prototype={
	init:function(){
		var a=this;
		this.oS.onmouseover=function(){
			a.mouseover();
		};
		this.oS.onmouseout=function(ev){
			var oEvent = ev||event;
			a.mouseout(oEvent);
		};
		this.oS.onmousemove=function(ev){
			var oEvent = ev||event;
			a.mousemove(oEvent);
		};
		
	},
	mouseover:function(){
		this.oB.style.display='block';
		this.oM.style.display='block';
	},
	mouseout:function(ev){
		var oTo = ev.toElement||ev.relatedTarget;
		if(this.isChild(this.oS,oTo))return;
		this.oB.style.display='none';
		this.oM.style.display='none';
	},
	mousemove:function(ev){
		var l = ev.clientX-this.oS.offsetLeft-this.oM.offsetWidth/2;
		var t = ev.clientY-this.oS.offsetTop-this.oM.offsetHeight/2;
		if(l<0){
			l=0;
		}else if(l>=this.oS.offsetWidth-this.oM.offsetWidth){
			l=this.oS.offsetWidth-this.oM.offsetWidth;
		}
		if(t<0){
			t=0;
		}else if(t>=this.oS.offsetHeight-this.oM.offsetHeight){
			t=this.oS.offsetHeight-this.oM.offsetHeight;
		}
		this.oM.style.left=l+'px';
		this.oM.style.top=t+'px';
		this.oImg.style.left=-l/(this.oS.offsetWidth-this.oM.offsetWidth)*(this.oImg.offsetWidth-this.oB.offsetWidth)+'px';
		this.oImg.style.top=-t/(this.oS.offsetHeight-this.oM.offsetHeight)*(this.oImg.offsetHeight-this.oB.offsetHeight)+'px';
	},
	isChild:function(obj,oTo){
		while(oTo){
			if(obj==oTo)return true;
			oTo = oTo.parentNode;
		}
		return false;
	}
}
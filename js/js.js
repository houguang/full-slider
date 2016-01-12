// JavaScript Document
window.onload = function() {

	var oh = document.querySelectorAll(".join h3");

	var obtn = document.querySelectorAll(".main-menu-inner ul li span");
	var obtn2 = document.querySelectorAll(".map");
	var odiv = document.querySelector(".list-nav");
	var oclose = document.querySelectorAll(".close");
	var wxx = document.querySelectorAll(".wx");
	var ma = document.querySelector(".erwm");
	var curr = document.querySelectorAll(".current");
	var currdiv = document.querySelectorAll(".current .nav_ll2");

	var onav = document.querySelectorAll(".menu-item ul");
	var indexbtn = document.getElementById("index");
	var logos = document.querySelectorAll(".logos");




	for (var i = 0; i < onav.length; i++) {
		onav[i].onmouseover = function() {
			curr[i].style.opacity = "0";
		}
		onav[i].onmouseout = function() {
			curr[i].style.opacity = "1";
		}

	}

	for (var i = 0; i < curr.length; i++) {
		curr[i].onmouseover = function() {

			currdiv[i].style.display = "block";
		}

		curr[i].onmouseout = function() {
			currdiv[i].style.display = "none";
		}
	}

	for (var i = 0; i < wxx.length; i++) {
		wxx[i].onclick = function() {
			ma.style.display = "block";
		}
	}
	for (var i = 0; i < obtn.length; i++) {
		obtn[i].onclick = function() {

			odiv.style.left = "0";
			odiv.style.opacity = "1";
			odiv.style.opacity = "1";
			odiv.style.borderRadius = "0";
			odiv.style.transform = "scale(1.0)";
			odiv.style.WebkitTransform = "scale(1.0)";
			odiv.style.MozTransform = "scale(1.0)";
			odiv.style.zIndex = "9999";
		}
	}

	for (var i = 0; i < obtn2.length; i++) {
		obtn2[i].onclick = function() {
			odiv.style.left = "0";
			odiv.style.opacity = "1";
			odiv.style.opacity = "1";
			odiv.style.borderRadius = "0";
			odiv.style.transform = "scale(1.0)";
			odiv.style.WebkitTransform = "scale(1.0)";
			odiv.style.MozTransform = "scale(1.0)";
			odiv.style.zIndex = "9999";
		}
	}

	for (var i = 0; i < oclose.length; i++) {
		oclose[i].onclick = function() {

			odiv.style.WebkitTransform = "scale(0.0)";
			odiv.style.MozTransform = "scale(0.0)";
			odiv.style.Transform = "scale(0.0)";
			odiv.style.borderRadius = "500px";
			odiv.style.opacity = "0";
			odiv.style.zIndex = "1";
			ma.style.display = "none";
		}
	}
	for (var j = 0; j < oh.length; j++) {
		oh[1].style.borderTop = "10px solid #9ecd1d";
		oh[2].style.borderTop = "10px solid #7ED0E8";

		oh[3].style.borderTop = "10px solid #ffd200";
		oh[4].style.borderTop = "10px solid #9ecd1d";
		oh[5].style.borderTop = "10px solid #7ED0E8";
		oh[6].style.borderTop = "10px solid #ffd200";
		oh[7].style.borderTop = "10px solid #9ecd1d";
		oh[8].style.borderTop = "10px solid #7ED0E8";
		oh[9].style.borderTop = "10px solid #ffd200";
		oh[10].style.borderTop = "10px solid #9ecd1d";
		oh[11].style.borderTop = "10px solid #7ED0E8";
	}
	var oDiv = document.querySelector('.box');
	//画刻度
	var N = 32;
	for (var i = 0; i < N; i++) {
		var oSpan = document.createElement('span');

		oSpan.className = 'scale';

		oSpan.style.transform = 'rotate(' + i * 11.25 + 'deg)';
		oSpan.style.WebkitTransform = 'rotate(' + i * 11.25 + 'deg)';
		oSpan.style.MozTransform = 'rotate(' + i * 11.25 + 'deg)';
		oSpan.style.msTransform = 'rotate(' + i * 11.25 + 'deg)';
		oSpan.style.OTransform = 'rotate(' + i * 11.25 + 'deg)';
		oDiv.appendChild(oSpan);
	}
	var oDiv3 = document.querySelector('.box3');
	//画刻度
	var T = 80;
	for (var i = 0; i < T; i++) {
		var oSpan3 = document.createElement('span');

		oSpan3.className = 'scale3';

		oSpan3.style.transform = 'rotate(' + i * 6 + 'deg)';
		oSpan3.style.WebkitTransform = 'rotate(' + i * 6 + 'deg)';
		oSpan3.style.msTransform = 'rotate(' + i * 6 + 'deg)';
		oSpan3.style.MozTransform = 'rotate(' + i * 6 + 'deg)';
		oSpan3.style.OTransform = 'rotate(' + i * 6 + 'deg)';
		oDiv3.appendChild(oSpan3);
	}


	//window.onscroll = function(){ 
	//var t = document.documentElement.scrollTop || document.body.scrollTop; 
	//if (t>=400) 
	//document.getElementById("top").className="head1 dis_none"; 
	//else 
	//document.getElementById("top").className="head1";
	//} 
	var N = 11;
	var y = 0;
	var x = 0;

	function keyControl() {
		open();
		document.onkeydown = function(ev) {
			switch (ev.keyCode) {
			case 37:
				y -= 360 / N;
				setRotate(y);
				break;
			case 39:
				y += 360 / N;
				setRotate(y);
				break;
			case 38:
				x += 10;
				oBox.style.transform = 'perspective(800px) rotateX(' + x + 'deg)';
				break;
			case 40:
				x -= 10;
				oBox.style.transform = 'perspective(800px) rotateX(' + x + 'deg)';
				break;
			}
		};
	}

	function setRotate(y) {
		for (var i = 0; i < aSpan.length; i++) {
			aSpan[i].style.transform = 'rotateY(' + (360 / N * i + y) + 'deg) translateZ(380px)';

			var s = Math.max(Math.abs(Math.abs((360 / N * i + y) % 360) - 180) / 180, 0.2);


			aSpan[i].style.opacity = s;
		}
	}

}

window.onscroll = function() {
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	if (t >= 400) document.getElementById("top").className = "head1 zin";
	else document.getElementById("top").className = "head1";
}
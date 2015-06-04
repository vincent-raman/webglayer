
function HeatMapDimension(manager){
	this.manager = manager;
	Dimension.call(this, manager);
	

	this.setup = function() {
		
		//gl.useProgram(this.glProgram);
		/** add specific buffer and uniforms */
		gl.useProgram(this.glProgram);
		
		
		
		manager.bindMapMatrix(this.glProgram);
		manager.enableBufferForName(this.glProgram, "wPoint", "wPoint");
		manager.enableBufferForName(this.glProgram,  "index", "index");	
		manager.bindRasterMatrix(this.glProgram);	
		
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);	
		gl.viewport(0, 0, manager.width, manager.height);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
		gl.disable(gl.DEPTH_TEST);
		gl.enable(gl.BLEND);
	//	gl.disable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
		if (this.glProgram.loc == null ){
			this.glProgram.loc = gl.getUniformLocation(this.glProgram, "zoom");
			if (!this.glProgram.loc instanceof WebGLUniformLocation) {				
				console.error("Uniform set failed, uniform: " + u_name
						+ " value " + value);
				return;
			}
		}
		
		manager.enableFilterTexture(this.glProgram);		
				
	}	
	this.render = function(num) {

		this.setup();		
	
		//gl.useProgram(this.glProgram);	
		if (this.glProgram.drawselect == null){
			this.glProgram.drawselect = gl.getUniformLocation(this.glProgram, "drawselect");
			if (!this.glProgram.drawselect instanceof WebGLUniformLocation) {
				console.error("Uniform set failed, uniform");
				return;
			}
		}
		gl.uniform1f(this.glProgram.drawselect, 0);
		gl.drawArrays(gl.POINTS, 0, num);	
		
		gl.uniform1f(this.glProgram.drawselect, 1);		
		gl.drawArrays(gl.POINTS, 0, num);	
	    gl.useProgram(null);
	   
		
	}
	
	this.tearDown = function(){
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.useProgram(null);
	}
	

	this.setMatrix = function(matrix){
		manager.matrices.push(matrix);	
		manager.mapMatrix=matrix;
	}

	this.readPixels = function() {
		
		//gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		var readout = new Uint8Array(4);
	//	console.time("reading_pix");
		gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
	//	console.timeEnd("reading_pix");
	//	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		var sum = 0;
		for (i = 0; i < readout.length; i++) {
			sum = sum + readout[i];
		}
		console.log(sum);
		console.log(readout);
		
	}
	
}

HeatMapDimension.prototype.filter = function(raster) {
	/*rendertriangel*/
	
	/*use result as uniform*/	
}


HeatMapDimension.prototype = Object.create(Dimension.prototype);

HeatMapDimension.prototype.constructor = Dimension;
	
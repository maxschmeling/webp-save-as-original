( async function () {
	async function canUseWebP() {
		if (!self.createImageBitmap) return false;
		
		const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
		const blob = await fetch(webpData).then(r => r.blob());

		return createImageBitmap(blob).then(() => true, () => false);
	}

	function getConvertedDataUrl( img ) {
		const canvas = document.createElement("canvas");

		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;

		ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		
		if ( img.src.includes( '.jpg' ) || img.src.includes( '.jpeg' ) ) {
			return canvas.toDataURL("image/jpeg");
		}

		return canvas.toDataURL("image/png");
	}

	function swap( img ) {
		if ( img.naturalWidth === 0 ) {
			img.onload = function () {
				if ( img.naturalWidth === 0 ) return;

				img.src = getConvertedDataUrl( img );
			}
		} else {
			img.src = getConvertedDataUrl( img );
		}
	}

	try {
		var images = document.querySelectorAll( 'img.webp-save-as-original' );

		if ( !! images.length && await canUseWebP() ) {
			images.forEach( function ( img ) {
				if ( img.src.includes( '.png' ) || img.src.includes( '.jpg' ) || img.src.includes( '.jpeg' ) ) {
					swap( img );
				}
			} );
		}
	} catch ( err ) {
		console.error( err );
	}
} )( );

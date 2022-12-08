function canUseWebP() {
	var elem = document.createElement('canvas');
	if (!!(elem.getContext && elem.getContext('2d'))) {
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}
	
	return false;
}

function getPngDataUrl( img ) {
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

try {
	var images = document.querySelectorAll( 'img.webp-save-as-original' );

	if ( !! images.length && canUseWebP() ) {
		images.forEach( function ( img ) {
			if ( img.src.includes( '.png' ) || img.src.includes( '.jpg' ) || img.src.includes( '.jpeg' ) ) {
				img.src = getPngDataUrl( img );
			}
		} );
	}
} catch ( err ) {
	console.error( err );
}
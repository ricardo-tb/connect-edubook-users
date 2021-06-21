

import fetch from 'node-fetch';

// https://css-tricks.com/using-fetch/

function miFetch(url, options){
    return new Promise((resolve, reject) => {

		fetch(url, options)
			.then(handleResponse)
			.then(data => resolve(data))
			.catch(error => reject(error))


		function handleResponse (response) {
			let contentType = response.headers.get('content-type')
			if (contentType.includes('application/json')) {
				return handleJSONResponse(response)
			} else if (contentType.includes('application/text')) {
				return handleTextResponse(response)
			} else if (contentType.includes('text/html')) {
				return handleTextResponse(response)
			} else {
				// Other response types as necessary. I haven't found a need for them yet though.
				throw new Error(`Sorry, content-type ${contentType} not supported`)
			}
		}

		function handleJSONResponse (response) {
		  	return response.json()
		    .then(json => {
		      	if (response.ok) {
		        	return json
		      	} else {
		        	// return Promise.reject(Object.assign({}, json, {
		        	//   status: response.status,
		        	//   statusText: response.statusText
		        	// }))
		        	response.errorCode = json;
		        	return Promise.reject(response);
		        	// return Promise.reject(json);
		      	}
		    })
		}

		function handleTextResponse (response) {
		  	return response.text()
	    	.then(text => {
	      		if (response.ok) {
	        		return text
	      		} else {
	        		return Promise.reject({
	          			status: response.status,
	          			statusText: response.statusText,
	          			err: text
	        		})
	      		}
	    	})
		}
    });
}

export default miFetch;


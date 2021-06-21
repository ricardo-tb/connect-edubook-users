

import config from './../config.js';
import assert from 'assert';
import {connect_api, connect_token} from './../functions/connect.js';


describe("test",function(){

	var _token;

    before(done =>{
        _token = false;
        done();
    });


	it('should connect api', (done) => {
		// objeto para consulta
		let res = {
			// access_token: '0c8c0cf4-74d7-4b59-b28f-0b115dbd2c3d',
			token_type: 'bearer',
			// expires_in: 28070,
			scope: 'public user:read',
			// expiration: 1624303230195
		}

		let user = config.user.username;
		let pass = config.user.password;
		//
		connect_api(user,pass).then((doc) => {

			console.log('+++++', doc)

			_token = doc.access_token;

			let t = {
				token_type : doc.token_type,
				scope : doc.scope
			}
			assert.deepEqual(res, t);
			done()
    	}, (error) => {
            console.error("[ERROR] connect_api: ", error);
        });
	});

	it('should connect token', (done) => {

		// objeto para consulta
		let res = {
			id: '9c9d4a73-1005-46a8-8c77-9a666c6b9bc4',
			name: 'Infantil',
			surnames: 'Teacher',
			role: 'TEACHER',
			username: null,
			email: 'infantil-teacher@example.com',
			country: 'ES',
			language: 'es',
			status: 'PENDING_VERIFY',
			password: null,
			initials: 'IT',
			color: '#B8AFBC',
			nin: null,
			avatar: null,
			userFlags: {
				ACCEPT_ADVERTISING: 'false',
				WELCOME_NEW_SCHOOL_YEAR: 'false',
				FORCE_RESET_PASSWORD: 'false',
				FIRST_STEPS: 'true'
			},
			verifyHash: '224dca4bbefc56367fa7d2ed7a330417e3ba28a8',
			verifyPasswordHash: '0801d44494fddf5eb9dcc905417d7037b77dd3b6',
			legalConditionsAccepted: false,
			roleValidated: true,
			creator: null,
			teacherEducationalProfiles: []
		}

		connect_token(_token).then((doc) => {

			console.log('+++++', doc)

      			assert.deepEqual(res, doc);
    			done()
    		}, (error) => {
            		console.error("[ERROR] connect_token: ", error);
        	});
	});

});




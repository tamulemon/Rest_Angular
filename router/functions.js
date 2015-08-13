module.exports = helperFunctions =  {

	errorHandler: function (error) {
									console.log(error);
									return function(statusCode, message){
										return ({status: statusCode, msg: "Server error. Couldn't " + message});
									}
								},
	
	fetchAll: function (model, res){
							model.find()
								.exec(function(err, data) {
								if (err) {
									res.json(helperFunctions.errorHandler(err)(500, 'query' + model + 's'));
								}
								else if(!data) {
									res.json(helperFunctions.errorHandler(err)(200, 'find' + model + 's'));
								}
								else {
//									console.log('fetchAll is working');
									res.json(data);
								}
							});
						},
	
	fetch: function (model, id, callback){
					model.findOne({_id:id})
						.populate('friends')
						.populate('enemies')
						.exec(function(err, data) {
						if (err) {
							callback(err);
						}
						else if(!data) {
							callback(null, false);
						}
						else {
							callback(null, data);
						}
					});
				},
	
	updateRel: function(model1, id1, relationship, model2, id2, callback) {
							helperFunctions.fetch(model1, id1, function(err, data1) {
								console.log('update Relationship helper function envoked');
									if (err) {
										callback(err);
									}
									else if(!data1) {
										callback(null, false);
									} else {
//										console.log(data1);
//										console.log('update Rel2 envoked');
										helperFunctions.fetch(model2, id2, function(err, data2) {
											if (err) {
												callback(err);
											}
											else if(!data2) {
												callback(null, false);
											} else {
//												console.log('data2 solved');
												data1[relationship].push({Id: data2._id, name: data2.name});
												data1.save(function(err, data) {	
													if(err) {
														callback(err);
													} else {
//														console.log('save updated relatioship');
//														console.log('data in helper function', data);
														callback(null, data);
													}
												});
											};
									});
								};
							}); 
						}
	};
	


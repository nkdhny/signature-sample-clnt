
/*
 * GET home page.
 */

function randomInt(maxint) {
	return Math.floor((Math.random()*maxint)+1);
}

function randomArray(size) {
	var arr = []
	for(var i=0;i<size;i++) {
		var newOne = randomInt(10*size);
		while(arr.indexOf(newOne)>0){
			newOne = randomInt(10*size);		
		}		
		arr.push(newOne)
	}
	return arr;
}

exports.index = function(req, res){
  res.render('index', { rnd: randomArray(10) });
};

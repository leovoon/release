const chineseList = [
	'性无能',
	'鸡白',
	'笨',
	'王八蛋',
	'你妈',
	'王八',
	'死',
	'去死',
	'fuck',
	'bitch',
	'boob',
	'b00b',
	'tits',
	'booby',
	'die',
	'婊子',
	'婊'
]
const placeHolder = '*'

export const replaceWord = (string: string, target: string) => {
	let t = ''
	for (let i = 0; i < target.length; i++) {
		t += placeHolder
	}
	return string.replace(new RegExp(target, 'g'), t)
}

export const clean = function (string: string) {
	for (let i = 0; i < chineseList.length; i++) {
		if (string.indexOf(chineseList[i]) > -1) {
			string = replaceWord(string, chineseList[i])
		}
	}
	return string
}

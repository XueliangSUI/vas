window.onload = function() {
	// 初始化输入框容器
	initInputWrap()

}


/**
 * 初始化输入框容器
 */
function initInputWrap(){
	let inputWraps = document.getElementsByClassName('control-input-wrap')
	console.log(inputWraps)
	for (let inputWrap of inputWraps) {
		// console.log(inputWrap.firstElementChild, inputWrap.lastElementChild)
		inputWrap.firstElementChild.onfocus = function() {
			inputWrap.firstElementChild.classList.add('control-input-wrap-input-focus')
			inputWrap.lastElementChild.classList.add('control-input-wrap-div-focus')
			// inputWrap.firstElementChild.classList.remove('control-input-wrap-input')
			// inputWrap.lastElementChild.classList.remove('control-input-wrap-div')
			// console.log(inputWrap.firstElementChild, inputWrap.lastElementChild)
		}
		inputWrap.firstElementChild.onblur = function() {
			// inputWrap.firstElementChild.classList.add('control-input-wrap-input')
			// inputWrap.lastElementChild.classList.add('control-input-wrap-div')
			if (inputWrap.firstElementChild.value == '') {
				inputWrap.lastElementChild.classList.remove('control-input-wrap-div-focus')
			}
			
			inputWrap.firstElementChild.classList.remove('control-input-wrap-input-focus')
			// console.log(inputWrap.firstElementChild, inputWrap.lastElementChild)
		}
	}
}

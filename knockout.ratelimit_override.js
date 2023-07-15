/**
 * allow rateLimit observables to give functions immediately notify subscribers
 * retains the rateLimit extender functionality while adding .force() and .forceVal() functions
 * to the rateLimited observable to immediately notify value changes
 */
ko.extenders.rateLimit = (function (originalFunc) {
	return function (target, options) {
		var value = ko.utils.unwrapObservable(target());
		target.notifyImmediately = target.notifySubscribers;
		target.old_value = typeof value == 'object' ? ko.toJSON(value): value;
		target.notifySubscribers = function() {
			var value =  ko.utils.unwrapObservable(target());
			var compare_value = typeof value == 'object' ? ko.toJSON(value): value;
			if(target.disableRateLimit || (target.old_value != compare_value &&  value != undefined)) {
				target.notifyImmediately( value );
				target.old_value = typeof value == 'object' ? ko.toJSON(value): value;
			}
		}

		/**
		 * immediately notify changes
		 */
		target.force = function() {
			var value =  ko.utils.unwrapObservable(target());
			target.clear();
			if(target.old_value != value &&  value != undefined) {
				target.notifyImmediately( value );
				target.old_value = typeof value == 'object' ? ko.toJSON(value) : value;
			}
		}

		/**
		 * load value and immediately notify changes
		 * @param {any} val  value to be immediately loaded into observable and notified
		 */
		target.forceValue = function(val) {
			target(val);
			target.clear();
			target.notifyImmediately( val );
			target.old_value = typeof val == 'object' ? ko.toJSON(val) : val;
		}

		return originalFunc(target, options);
	}
})(ko.extenders.rateLimit);

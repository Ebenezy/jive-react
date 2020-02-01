const Storage = {
	instance: "",
	init: function() {
		Storage.instance = this;
	},
	storageEngine: "",
	currentStorageEngine: "",
	expires: 10,
	CookieStorage: function() {
		Storage.storageEngine = document.cookie = "";
		Storage.currentStorageEngine = "cookie";
	},
	cookie: {
		set: function(key, value) {
			var expiration = new Date();
			var stringifiedValue = value;
			expiration.setTime(
				expiration.getTime() + Storage.expires * 24 * 60 * 60 * 1000
			);
			var expires = "expires=" + expiration.toUTCString();
			document.cookie = key + "=" + stringifiedValue + "; " + expires;
		},
		get: function(key) {
			var value = document.cookie.replace(
				new RegExp(
					"(?:^|.*;\\s*)" +
						key.replace(/[\\]/g, "\\$&") +
						"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
				),
				"$1"
			);
			if (value) {
				return decodeURIComponent(value);
			} else {
				return null;
			}
		},
		check: function(key) {
			return Storage.cookie.get(key) !== null;
		},
		remove: function(key) {
			var name = key + "=";
			var splitCookies = Storage.storageEngine.split(";");
			for (var i = 0; i < splitCookies.length; i++) {
				var cookie = splitCookies[i];
				while (cookie.charAt(0) === " ") {
					cookie = cookie.substring(1);
				}
				if (cookie.indexOf(name) === 0) {
					var cookieIndex = Storage.storageEngine.indexOf(cookie);
					Storage.storageEngine = Storage.storageEngine.slice(
						cookieIndex,
						cookieIndex + cookie.length
					);
				}
			}
			return "";
		},
		removeAll: function() {
			var cookies = Storage.storageEngine.split(";");

			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
		}
	},
	InMemoryStorage: function() {
		Storage.storageEngine = {};
		Storage.currentStorageEngine = "memory";
	},
	memory: {
		set: function(key, value) {
			Storage.storageEngine[key] = value;
		},
		get: function(key) {
			if (Storage.storageEngine[key]) return Storage.storageEngine[key];
			else return null;
		},
		check: function(key) {
			return Storage.memory.get(key) !== null;
		},
		remove: function(key) {
			delete Storage.storageEngine[key];
		},
		removeAll: function() {
			Storage.storageEngine = {};
		}
	},
	LocalStorage: function() {
		Storage.storageEngine = window.localStorage;
		Storage.currentStorageEngine = "local";
	},
	local: {
		set: function(key, value) {
			Storage.storageEngine.setItem(key, value);
		},
		get: function(key) {
			return Storage.storageEngine.getItem(key);
		},
		check: function(key) {
			return Storage.local.get(key) !== null;
		},
		remove: function(key) {
			Storage.storageEngine.removeItem(key);
		},
		removeAll: function() {
			Storage.storageEngine.clear();
		}
	},
	setStorage: function(type) {
		switch (type) {
			case "Local":
				Storage.LocalStorage();
				break;
			case "Memory":
				Storage.InMemoryStorage();
				break;
			case "Cookie":
				Storage.CookieStorage();
				break;
			default:
				Storage.LocalStorage();
				break;
		}
		return Storage.instance;
	},
	save: function(key, value) {
		Storage.instance[Storage.currentStorageEngine].set(key, value);
	},
	delete: function(key) {
		Storage.instance[Storage.currentStorageEngine].remove(key);
	},
	fetch: function(key) {
		return Storage.instance[Storage.currentStorageEngine].get(key);
	},
	deleteAll: function() {
		Storage.instance[Storage.currentStorageEngine].removeAll();
	},
	check: function(key) {
		return Storage.instance[Storage.currentStorageEngine].check(key);
	}
};

Storage.init();

module.exports = Storage;

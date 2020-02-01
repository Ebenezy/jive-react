import storage from "./Storage";
// import config from "./Config";

const Library = {
	storage: storage.setStorage("Local"),
	setData: (key, value) => {
		Library.storage.save(key, value);
	},
	checkData: key => {
		return Library.storage.check(key) !== null;
	},
	getData: key => {
		return Library.storage.fetch(key);
	},
	setMultipleData: (data, loadPattern) => {
		var lazy = loadPattern || false;

		if (typeof data !== "object")
			throw new Error("Please only valid arrays are allowed");

		for (var i = 0; i < data.length; i++) {
			let key = Object.keys(data[i])[0];

			if (lazy === true) {
				if (
					Library.checkData(key) &&
					Library.getData(key) === data[i][key] &&
					Library.getData(key) !== null &&
					Library.getData(key).length > 0
				) {
					continue;
				}
			}

			if (data[i].hasOwnProperty(key)) Library.setData(key, data[i][key]);
		}

		return Promise.resolve("done");
	},
	deleteData: key => {
		Library.storage.delete(key);
	},
	wipeAll: () => {
		Library.storage.deleteAll();
	},

	extractStatus: res => {
		if (typeof res === "object") {
			let response = JSON.parse(res.response);
			response.statusCode = res.status;
			return response;
		} else return res.response;
	},

	formatDate: (date, format = 0) => {
		let new_date = date.split("/");
		switch (format) {
			case 1:
				new_date = new_date[2] + "-" + new_date[1] + "-" + new_date[0];
				break;
			default:
				new_date = new_date[2] + "-" + new_date[0] + "-" + new_date[1];
				break;
		}
		return new_date;
	},
	todaysDate: () => {
		let date = new Date();
		return date.toLocaleDateString();
	},
	generateFutureDate: (daysfromnow = 1) => {
		if (daysfromnow < 1)
			throw new Error("Days from now cannot be less than one");

		let date = new Date(Date.now() + 86400 * 1000 * daysfromnow);
		return date.toLocaleDateString();
	},
	generateAmPmTime: time => {
		time = new Date(time).toLocaleString("en-GB", {
			hour: "2-digit",
			minute: "2-digit"
		});
		let H = +time.substr(0, 2);
		let h = H % 12 || 12;
		let ampm = H < 12 ? "AM" : "PM";
		time = h + time.substr(2, 3) + ampm;
		return time;
	},
	generateDateMonth: time => {
		time = new Date(time).toLocaleString("en-GB", {
			day: "numeric",
			month: "long"
		});
		return time;
	},
	getPathname: () => {
		let urlString = window.location.pathname;
		let url = urlString.substring(urlString.lastIndexOf("/") + 1);

		url = url.replace(/\b\w/g, l => l.toUpperCase());
		return url.split("-").join(" ");
	}
};

export default Library;

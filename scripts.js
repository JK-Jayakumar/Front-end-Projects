var P, R, N, JJ,pie, line;
var loan_amt_slider = document.getElementById("loan-amount");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("loan-period");
var old_rent_slider = document.getElementById("rent-old");

// update loan amount
loan_amt_slider.addEventListener("input", (self) => {
	document.querySelector("#loan-amt-text").innerText =
		parseInt(self.target.value).toLocaleString("en-US") + "₹";
	P = parseFloat(self.target.value);
	displayDetails();
});

// update Rate of Interest
int_rate_slider.addEventListener("input", (self) => {
	document.querySelector("#interest-rate-text").innerText =
		self.target.value + "%";
	R = parseFloat(self.target.value);
	displayDetails();
});

// update Rate of Interest
old_rent_slider.addEventListener("input", (self) => {
	document.querySelector("#rent-rate-text").innerText =
		self.target.value + "₹";
	JJ = parseFloat(self.target.value);
	displayDetails();
});

// update loan period
loan_period_slider.addEventListener("input", (self) => {
	document.querySelector("#loan-period-text").innerText =
		self.target.value + " years";
	N = parseFloat(self.target.value);
	displayDetails();
});

// calculate total Interest payable
function calculateLoanDetails(p, r, emi) {
	/*
		p: principal
		r: rate of interest
		emi: monthly emi
	*/
	let totalInterest = 0;
	let yearlyInterest = [];
	let yearPrincipal = [];
	let years = [];
    let year = 1;
	let [counter, principal, interes] = [0, 0, 0];
	while (p > 0) {
		let interest = parseFloat(p) * parseFloat(r);
		p = parseFloat(p) - (parseFloat(emi) - interest);
		totalInterest +=  (parseInt(Math.round(interest, 2)));
		principal += parseFloat(emi) - interest;
		interes += interest;
		let rent_value = JJ;
		let rent_plot = [];
		for (let month = 1, duration = 21; month < duration; month += 1) {
			if (month === 1) {
				rent_plot.push(parseInt(Math.round(rent_value, 2)));
			} else {
				rent_value = rent_value + (rent_value * 0.1);
				rent_plot.push(parseInt(Math.round(rent_value, 2)));
		  }
		}
		line.data.datasets[0].data = rent_plot;
		if (++counter == 12) {
			years.push(year++);
			yearlyInterest.push(parseInt(Math.round(interes, 2)));
			yearPrincipal.push(parseInt(Math.round(principal, 2)));
			counter = 0;
		}
	}
	line.data.labels = years;
	return totalInterest;
}
/* rent_graph
function rent_raise(JJ) {
    let rent_value = JJ;
    let rent_plot = [];
    for (let month = 1, duration = 21; month < duration; month += 1) {
        if (month === 1) {
            rent_plot.push(parseInt(Math.round(rent_value, 2)));
        } else {
            rent_value = rent_value + (rent_value * 0.1);
            rent_plot.push(parseInt(Math.round(rent_value, 2)));
      }
    }
	line.data.datasets[0].data = rent_plot;
}*/

// calculate details
function displayDetails() {
	let r = parseFloat(R) / 1200;
	let n = parseFloat(N) * 12;
    

	let num = parseFloat(P) * r * Math.pow(1 + r, n);
	let denom = Math.pow(1 + r, n) - 1;
	let emi = parseFloat(num) / parseFloat(denom);

	let payabaleInterest = calculateLoanDetails(P, r, emi);

	let opts = '{style: "decimal", currency: "INR"}';

	document.querySelector("#cp").innerText = "₹ " +
		parseFloat(P).toLocaleString("en-US", opts) ;

	document.querySelector("#ci").innerText = "₹ " +
		parseFloat(payabaleInterest).toLocaleString("en-US", opts);

	document.querySelector("#ct").innerText = "₹ " +
		parseFloat(parseFloat(P) + parseFloat(Math.round(payabaleInterest, 2))).toLocaleString(
			"en-US",
			opts
		);

	document.querySelector("#price").innerText = "₹ " +
		parseFloat(Math.round(emi)).toLocaleString("en-US", opts);

	numbers = [(Math.round(emi))];
    numbersCopy = []; 
    for (i = 0; i < 20; i++) {
      numbersCopy.push(numbers[0]);
    }
	line.data.datasets[1].data = numbersCopy;
	

  
  

	pie.data.datasets[0].data[0] = P;
	pie.data.datasets[0].data[1] = payabaleInterest;
	pie.update();
	line.update();
}

// interest_graph
function interest_rate() {
    numbers = [55496];
    numbersCopy = []; 
    for (i = 0; i < 20; i++) {
      numbersCopy.push(numbers[0]);
    }
    console.log(numbersCopy);
  }
  
interest_rate()


// Initialize everything
function initialize() {
	document.querySelector("#loan-amt-text").innerText =
		parseInt(loan_amt_slider.value).toLocaleString("en-US") + "₹";
	P = parseFloat(document.getElementById("loan-amount").value);

	document.querySelector("#interest-rate-text").innerText =
		int_rate_slider.value + "%";
	R = parseFloat(document.getElementById("interest-rate").value);

	document.querySelector("#loan-period-text").innerText =
		loan_period_slider.value + " years";
	N = parseFloat(document.getElementById("loan-period").value);

    document.querySelector("#rent-rate-text").innerText =
        old_rent_slider.value + " ₹";
    JJ = parseFloat(document.getElementById("rent-old").value);

	line = new Chart(document.getElementById("lineChart"), {
		data: {
			datasets: [
				{
					type: "line",
					label: "Yearly Current Rent",
					borderColor: "rgb(14, 162, 235)",
					data: []
				},
				{
					type: "line",
					label: "Yearly Interest paid",
					borderColor: "rgb(255, 99, 132)",
					data: []
				}
			],
			labels: []
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: "Yearly Payment Breakdown"
				}
			},
			scales: {
				x: {
					title: {
						color: "grey",
						display: true,
						text: "No of Years"
					}
				},
				y: {
					title: {
						color: "grey",
						display: true,
						text: "Rent Money."
					}
				}
			}
		}
	});

	pie = new Chart(document.getElementById("pieChart"), {
		type: "doughnut",
		data: {
			labels: ["Principal", "Interest"],
			datasets: [
				{
					label: "Home Loan Details",
					data: [0, 0],
					backgroundColor: ["rgb(46,153,230)", "rgb(24, 69, 190)"],
					hoverOffset: 4
				}
			]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: "Payment Breakup"
				}
			}
		}
	});
	displayDetails();
}
initialize();

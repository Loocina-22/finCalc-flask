from flask import Flask, render_template, request
import math

app = Flask(__name__) # Intializes App Instance (useful in locating static files and templates)

# Home route
@app.route('/') # Signifies the landing page of the application
def index():
    return render_template('index.html')

# Compound Interest Calculator
@app.route('/compound_interest', methods=['GET', 'POST']) # GET method fetches data, POST method send back data
def compound_interest():
    result = None
    if request.method == 'POST':
        try:
            principal = float(request.form['principal']) # request form retrieves data
            rate = float(request.form['rate']) / 100
            time = float(request.form['time'])
            compounds_per_year = int(request.form['compounds_per_year'])
            if principal >= 0 and rate >= 0 and time >= 0 and compounds_per_year > 0:
                # A = P(1 + r/n)^(nt)
                amount = principal * (1 + rate / compounds_per_year) ** (compounds_per_year * time)
                result = f"Future Value: ₹{amount:,.2f}"
            else:
                result = "Please enter valid positive numbers."
        except ValueError:
            result = "Invalid input. Please enter numeric values."
    return render_template('compound_interest.html', result=result)

# Loan Payment Calculator
@app.route('/loan_payment', methods=['GET', 'POST'])
def loan_payment():
    result = None
    if request.method == 'POST':
        try:
            principal = float(request.form['principal'])
            annual_rate = float(request.form['annual_rate']) / 100
            years = int(request.form['years'])
            if principal >= 0 and annual_rate >= 0 and years > 0:
                # Monthly payment: P * (r(1+r)^n) / ((1+r)^n - 1)
                monthly_rate = annual_rate / 12
                months = years * 12
                monthly_payment = principal * (monthly_rate * (1 + monthly_rate) ** months) / ((1 + monthly_rate) ** months - 1)
                result = f"Monthly Payment: ₹{monthly_payment:,.2f}"
            else:
                result = "Please enter valid positive numbers."
        except ValueError:
            result = "Invalid input. Please enter numeric values."
    return render_template('loan_payment.html', result=result)

# Savings Goal Planner
@app.route('/savings_goal', methods=['GET', 'POST'])
def savings_goal():
    result = None
    if request.method == 'POST':
        try:
            goal = float(request.form['goal'])
            years = float(request.form['years'])
            annual_rate = float(request.form['annual_rate']) / 100
            if goal >= 0 and years > 0 and annual_rate >= 0:
                # Monthly savings: FV * r / ((1+r)^n - 1)
                monthly_rate = annual_rate / 12
                months = years * 12
                monthly_savings = goal * monthly_rate / ((1 + monthly_rate) ** months - 1)
                result = f"Monthly Savings Needed: ₹{monthly_savings:,.2f}"
            else:
                result = "Please enter valid positive numbers."
        except ValueError:
            result = "Invalid input. Please enter numeric values."
    return render_template('savings_goal.html', result=result)

# Simple Interest Calculator
@app.route('/simple_interest', methods=['GET', 'POST'])
def simple_interest():
    result = None
    if request.method == 'POST':
        try:
            principal = float(request.form['principal'])
            rate = float(request.form['rate']) / 100
            time = float(request.form['time'])
            if principal >= 0 and rate >= 0 and time >= 0:
                # Simple Interest: I = PRT, Total = P + I
                interest = principal * rate * time
                total = principal + interest
                result = f"Interest: ₹{interest:,.2f}, Total Amount: ₹{total:,.2f}"
            else:
                result = "Please enter valid positive numbers."
        except ValueError:
            result = "Invalid input. Please enter numeric values."
    return render_template('simple_interest.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
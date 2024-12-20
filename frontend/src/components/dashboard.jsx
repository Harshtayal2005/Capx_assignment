import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor'; 

const apiurl = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [totalProfit, setTotalProfit] = useState(0);
  const [topStock, setTopStock] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function calculateStockMetrics() {
      try {
        const response = await fetch(`${apiurl}/stocks/getallstocks`, {
          credentials: 'include',
        });

        const { stock } = await response.json();

        let total_profit = 0;
        let top_stock = '';
        let max_profit = 0;
        let stockLabels = [];
        let stockPrices = [];
        let stockColors = [];

        for (let i = 0; i < stock.length; i++) {
          const currentProfit = stock[i].quantity * stock[i].price;
          total_profit += currentProfit;

          if (currentProfit > max_profit) {
            max_profit = currentProfit;
            top_stock = stock[i].stockname; 
          }

          stockLabels.push(stock[i].stockname);
          stockPrices.push(currentProfit);

          const color = randomColor(); 
          stockColors.push(color);
        }

        setTotalProfit(total_profit);
        setTopStock(top_stock);
        setChartData({
          labels: stockLabels,
          datasets: [
            {
              label: 'Stock Profit', 
              data: stockPrices, 
              backgroundColor: stockColors,
              borderRadius: 30,
              maxBarThickness: 200,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching stocks:', error);
        setTotalProfit(0);
        setTopStock('N/A');
      }
    }

    calculateStockMetrics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50">
      <h2
        className="text-2xl font-bold text-center text-white py-4 mb-6 rounded-lg"
        style={{
          backgroundColor: 'orangered',
          backgroundImage: 'linear-gradient(90deg, #FF4500 0%, #ff7f50 100%)',
        }}
      >
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Top Stock</h3>
          <p className="text-2xl font-bold text-gray-900 mt-4">
            {topStock || 'N/A'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Total Profit</h3>
          <p className="text-2xl font-bold text-gray-900 mt-4">${totalProfit}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Pie Chart - Stock Profit</h3>
          <div className="h-64 md:h-80">
            <Pie data={chartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Bar Chart - Stock Profit</h3>
          <div className="h-64 md:h-80">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

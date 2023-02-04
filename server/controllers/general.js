import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getDashboard = async (req, res) => {
    try {
        const currentMonth = "November"
        const currentYear = "2021"
        const currentDay = '2021-11-15'


        // recent transactions

        const transactions = await Transaction.find().sort({createdAt: -1}).limit(50);
        // const transactions = await Transaction.find().limit(5);

        console.log(transactions, 'transactions')


        // overall stats

        const overallStats = await OverallStat.find({
            // month: currentMont,
            year: currentYear
        });

        const {totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory} = overallStats[0];

        const thisMonthStats = overallStats[0]?.monthlyData.find(({month}) => {
            return month === currentMonth
        })

        const todayStats = overallStats[0]?.dailyData.find(({date}) => {
            return date === currentDay
        })
        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

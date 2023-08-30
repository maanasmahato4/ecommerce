import { useStatsApi } from "../api/statistics.api";
import { Card } from "@mantine/core";
import { useState, useEffect } from "react";
import { useOrderApi } from "../api/order.api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

function Stats() {
  const [productCount, setproductCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [orders, setOrders] = useState<Array<any>>([]);
  const { getProductCount, getOrderCount, getTotalRevenue } = useStatsApi();
  const { getAllOrders } = useOrderApi();

  const fetchAllData = async () => {
    const productCountData = getProductCount();
    const orderCountData = getOrderCount("");
    const revenueData = getTotalRevenue();
    const orders = getAllOrders();

    const [productCountResut, orderCountResult, revenueResult, ordersResult] = await Promise.all([productCountData, orderCountData, revenueData, orders]);
    setproductCount(productCountResut);
    setOrderCount(orderCountResult);
    setRevenue(revenueResult);
    setOrders(ordersResult);
  }

  useEffect(() => {
    fetchAllData();
  }, [])


  const aggregatedData: any = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (aggregatedData[date]) {
      aggregatedData[date] += 1;
    } else {
      aggregatedData[date] = 1;
    }
  });

  const chartData = Object.keys(aggregatedData).map(date => ({
    date,
    orderCount: aggregatedData[date],
  }));

  if (!productCount || !orderCount || !revenue || !orders || !chartData) {
    return <h1>loading...</h1>
  }


  return (
    <section>
      <Card style={{ marginBlock: "0.5rem" }} shadow="lg">
        No. of products: {productCount}
      </Card>
      <Card style={{ marginBlock: "0.5rem" }} shadow="lg">
        No. of orders: {orderCount}
      </Card>
      <Card style={{ marginBlock: "0.5rem" }} shadow="lg">
        Total Revenue: USD ${revenue}
      </Card>
      <Card style={{ height: "300px", marginBlock: "0.5rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date"><Label offset={-2} position="insideBottom">Orders per day</Label></XAxis>
            <YAxis label={{ value: 'order count', angle: -90, position: 'insideLeft' }}/>
            <Tooltip />
            <Line type="monotone" dataKey="orderCount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </section>
  )
}

export default Stats;
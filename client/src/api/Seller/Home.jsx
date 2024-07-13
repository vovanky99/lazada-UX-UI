import axios from '../axios';

export async function getTodoList() {
  try {
    const res = await axios.get(`/api/seller/home/todo-list`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getSalesAnalysis() {
  try {
    const res = await axios.get(`/api/seller/home/sales-analysis`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

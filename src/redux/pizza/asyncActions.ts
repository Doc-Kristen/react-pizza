import { createAsyncThunk } from "@reduxjs/toolkit";
import { FethchPizzasArgs, PizzaItem } from "./types";
import axios from "axios";
import {URL} from "../../const/const";

export const fetchPizzas = createAsyncThunk<PizzaItem[], FethchPizzasArgs>('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const { sortBy, order, category, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `${URL}/items?&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    if (data.length === 0) {
      return thunkAPI.rejectWithValue(data);
    } else {
      return data;
    }
  });
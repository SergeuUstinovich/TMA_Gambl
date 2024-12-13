import { useQuery } from "@tanstack/react-query";
import { createEmptySlots } from "../../helpers/createEmptySlotsInventory";
import style from "./ItemsProfile.module.scss";
import { queryClient } from "../../api/queryClient";
import { inventoryUser } from "../../api/userInfo";
import { useTelegram } from "../../providers/telegram/telegram";
import { useEffect, useState } from "react";
import { InventoryType } from "../../types/InventoryType";

const ITEMS_COUNT = 12;
const MIN_EMPTY_SLOTS = 3;



function ItemsProfile() {
  const { tg_id } = useTelegram();
  const [data, setData] = useState()

  const inventoryQuery = useQuery(
    {
      queryFn: () => inventoryUser(tg_id),
      queryKey: ["inventory"],
    },
    queryClient
  );

  useEffect(() => {
    if(inventoryQuery.data) {
        setData(inventoryQuery.data)
    }
  }, [inventoryQuery.data])
    const inventoryItems: InventoryType[] = data ? createEmptySlots(data, ITEMS_COUNT, MIN_EMPTY_SLOTS) : [];

  return (
    <div className={style.box}>
      <h2 className={style.title}>Items</h2>
      <ul>
        {inventoryItems.map((item) => (
            <li key={item.id}>
                
                <img src={`https://api.zerkalogm.online${item.image}`} alt="" />
            </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsProfile;

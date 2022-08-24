// STYLES
import { useMediaQuery } from "react-responsive";
// HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// SERVICES
import { getAllTransactions } from "../../services/transaction.services";
// COMPONENTS
import SimpleBackdrop from "../SimpleBackdrop";
import DeskPurchaseHistory from "./DeskPurchaseHistory";
import MobPurchaseHistory from "./MobPurchaseHistory";

export default function PurchaseHistory() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const fetchAllTransactions = async () => {
    try {
      const response = await getAllTransactions();
      
      setTransactions(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <SimpleBackdrop />;
  }

  return (
    <div>
      {isDesktop ? (
        <DeskPurchaseHistory transactions={transactions} />
      ) : (
        <MobPurchaseHistory transactions={transactions} />
      )}
    </div>
  );
}

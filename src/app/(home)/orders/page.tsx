import { getOrdersByEvent } from "@/server/actions/order.action";
import { SearchParamProps } from "@/types/actionTypes";
import { IOrderItem } from "@/server/database/models/order.model";
import { formatDateTime, formatPrice } from "@/utils";
import Search from "../_sections/Search";
import BackArrow from "@/components/BackArrow";

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <div className="max-w-max">
        <BackArrow />
      </div>

      <section className="py-5 md:py-10">
        <h3 className="max-sm:text-center">Orders</h3>
      </section>

      <section className="my-8">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="border-b text-gray">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="border-b"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 font-medium">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;

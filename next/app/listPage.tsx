"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface category {
  category: string;
  detail: boolean;
  plus: boolean;
  data: SaleType[] | PostType[] | NoticeType[];
}

interface SaleType {
  Uuid: string;
  CustomerName: string;
  Product: string;
  PostNum: string;
  Addr: string;
  Phone: string;
  Price: string;
  Amount: string;
  Status: string;
  Date: string;
}

interface PostType {
  Uuid: string;
  Title: string;
  Price: string;
  Sale: number;
  Description: string;
  Category: string;
  Size: string[];
  Color: string[];
  MainImage: string;
  DetailImages: string[];
}

interface NoticeType {
  Uuid: string;
  Title: string;
  Description: string;
  Date: string;
  Images: string[];
}

const isSaleType = (arg: any): arg is SaleType => {
  return "CustomerName" in arg;
};

const isPostType = (arg: any): arg is PostType => {
  return "Price" in arg && "Sale" in arg;
};

const isNoticeType = (arg: any): arg is NoticeType => {
  return "Images" in arg && !("Sale" in arg);
};

const ListPage = ({ args, i }: { args: category; i: number }) => {
  return (
    <>
      <div className="flex-col justify-start items-start flex gap-4">
        <div className="text-black text-4xl font-bold">{args.category}</div>
        <ScrollArea className="h-[500px] px-4 py-[30px] bg-zinc-300 flex-col justify-start items-start flex">
          {Array.isArray(args.data) &&
            args.data.map((arg, j) => (
              <div
                className={cn(
                  "w-[440px] h-[71px] bg-white flex items-center justify-between gap-1 mb-5",
                  j == args.data.length - 1 && "mb-0"
                )}
                key={j}
              >
                <div className="text-black text-[27px] font-semibold ml-3 text-nowrap text-ellipsis overflow-hidden flex-1">
                  {isSaleType(arg)
                    ? "주문자: " + arg.CustomerName
                    : isPostType(arg)
                    ? "제목: " + arg.Title
                    : isNoticeType(arg)
                    ? "제목: " + arg.Title
                    : null}
                </div>
                <div className="flex justify-between items-center mr-4 gap-2">
                  {i == 0 ? (
                    <>
                      <Link
                        href={"/detail/" + arg.Uuid}
                        className="text-center text-black text-2xl font-semibold bg-zinc-300 p-1"
                      >
                        상세
                      </Link>
                    </>
                  ) : (
                    <>
                      <div
                        // onClick={}
                        className="text-center text-black text-2xl font-semibold bg-zinc-300 p-1"
                      >
                        삭제
                      </div>
                      <div className="text-center text-black text-2xl font-semibold bg-zinc-300 p-1">
                        수정
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </ScrollArea>
      </div>
    </>
  );
};

export default ListPage;

import React from 'react'

type Props = {} 

const TopProducts = (props: Props) => {
  return (
    <div>
        <div className="w-full max-w-screen-lg mx-auto">
      <h3 className="text-lg font-bold mb-4">Top 5 Best Selling Products</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 border-b">
            <th className="py-3 px-4 text-left">Top</th>
            <th className="py-3 px-4 text-left">Tên sản phẩm</th>
            <th className="py-3 px-4 text-left">Giá thành</th>
            <th className="py-3 px-4 text-left">Lượt bán</th>
          </tr>
        </thead>
        <tbody>
            <tr className="border-b">
                <td>1</td>
              <td className="py-2 px-4">Giày thể thao nam</td>
              <td className="py-2 px-4">452000Đ</td>
              <td className="py-2 px-4">3002</td>
            </tr>
            <tr className="border-b">
            <td>2</td>
              <td className="py-2 px-4">Giày thể thao nam</td>
              <td className="py-2 px-4">452000Đ</td>
              <td className="py-2 px-4">3002</td>
            </tr>
            <tr className="border-b">
            <td>3</td>
              <td className="py-2 px-4">Giày thể thao nam</td>
              <td className="py-2 px-4">452000Đ</td>
              <td className="py-2 px-4">3002</td>
            </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default TopProducts
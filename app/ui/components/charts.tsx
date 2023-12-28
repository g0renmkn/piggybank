'use client';
import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';


const colsPalette = {
    fill: "#cff2b5",
    stroke: "#4aa306",
    active_fill: "#a2f464"
}


/**
 * renderActiveShape()
 * 
 * Function to render the selected portion of the pie
 * 
 * @param props 
 * @returns 
 */
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={colsPalette.active_fill} className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={colsPalette.active_fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={colsPalette.active_fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={colsPalette.active_fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={colsPalette.active_fill} stroke="none" />
      
      <text className="text-xs" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">
        {value.toLocaleString("de-DE", {style: "currency", currency: "EUR"})}</text>

      <text className="text-xs" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


/**
 * 
 * @param param0 
 * @returns 
 */
export function Chart({data}:{data?: object[]}) {
    const [activeIndex, setActiveIndex] = useState(0);


    function onPieEnter(_: any, index:any) {
        setActiveIndex(index);   
    }

    return (
      <ResponsiveContainer aspect={1.5}>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={"50%"}
            outerRadius={"70%"}
            fill={colsPalette.fill}
            stroke={colsPalette.stroke}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
}

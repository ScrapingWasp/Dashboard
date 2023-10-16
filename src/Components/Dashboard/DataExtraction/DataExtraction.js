import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { CORAL_RED, GRAY_2, GREEN, SECONDARY } from "../../Utility/Colors";
import DADescription from "./DADescription";

const DataExtraction = () => {
  const [showDescription, setShowDescription] = useState(false);

  const getColumns = () => {
    const columns = [
      {
        title: "Job name",
        dataIndex: "job_name",
        key: "job_name",
      },
      {
        title: "Url",
        dataIndex: "url",
        key: "url",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <span>
            {[0].map((tag) => {
              let color;
              let textColor = "white";

              if (status === "In Progress") {
                color = GRAY_2;
              } else if (status === "Completed") {
                color = GREEN;
              } else if (status === "Pending") {
                color = SECONDARY;
                textColor = "black";
              } else if (status === "Failed") {
                color = CORAL_RED;
              } else {
                color = GRAY_2;
              }

              return (
                <Tag color={color} style={{ color: textColor }} key={status}>
                  {status}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
      },
    ];

    return columns;
  };

  const getDataToShow = () => {
    const dataSource = [
      {
        key: "1",
        job_name: "Data Analysis",
        url: "http://example.com/data-analysis",
        status: "In Progress",
        created_at: "2023-10-01 12:30:00",
      },
      {
        key: "2",
        job_name: "Web Scraping",
        url: "http://example.com/web-scraping",
        status: "Completed",
        created_at: "2023-09-15 08:20:00",
      },
      {
        key: "3",
        job_name: "API Development",
        url: "http://example.com/api-development",
        status: "Pending",
        created_at: "2023-10-05 10:00:00",
      },
      {
        key: "4",
        job_name: "Machine Learning",
        url: "http://example.com/machine-learning",
        status: "In Progress",
        created_at: "2023-09-20 14:45:00",
      },
      {
        key: "5",
        job_name: "Database Migration",
        url: "http://example.com/database-migration",
        status: "Failed",
        created_at: "2023-10-10 16:15:00",
      },
    ];

    return dataSource;
  };

  const onRowClick = (record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log("Row clicked:", record, rowIndex);
        setShowDescription(true);
      },
      style: { cursor: "pointer" },
    };
  };

  useEffect(() => {
    document.title = "Data Extraction";
  }, []);

  return (
    <div
      style={{
        textAlign: "left",
      }}>
      {showDescription ? (
        <DADescription setShowDescription={setShowDescription} />
      ) : (
        <Table
          dataSource={getDataToShow()}
          columns={getColumns()}
          onRow={onRowClick}
        />
      )}
    </div>
  );
};

export default DataExtraction;

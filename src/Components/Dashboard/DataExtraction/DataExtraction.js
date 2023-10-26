import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag } from "antd";
import {
  CORAL_RED,
  GRAY_2,
  GREEN,
  PRIMARY,
  SECONDARY,
} from "../../Utility/Colors";
import DADescription from "./DADescription";
import axios from "axios";
import toast from "react-hot-toast";
import {
  capitalize,
  ellipseStringAt,
  formatDateGeneric,
} from "../../Utility/Utils";
import { Tooltip } from "antd";
import Loader from "../../Utility/Loader/Loader";

const DataExtraction = ({
  selectedDataExtracted,
  setSelectedDataExtracted,
}) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state?.signup?.loginData);
  const [descriptionDataLoaded, setDescriptionDataLoaded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [scrapes, setScrapes] = useState([]);

  useEffect(() => {
    if (profileData?.token) {
      (async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND}/api/v1/profile/scraping`,
            {
              headers: {
                Authorization: `Bearer ${profileData?.token}`,
              },
            }
          );

          if (response?.data?.status === "success") {
            setScrapes(response?.data?.data?.scrapes);
          } else {
            setScrapes([]);
            toast.error("Unable to retrieve your scraping jobs", {
              duration: 4000,
            });
          }
        } catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.message);
        }
      })();
    }
  }, [profileData]);

  const getColumns = () => {
    const columns = [
      {
        width: 180,
        title: "Job name",
        dataIndex: "job_name",
        key: "job_name",
        render: (name) => (
          <Tooltip title={name}>
            <span style={{ color: PRIMARY, fontWeight: 500 }}>
              {ellipseStringAt(name, 20)}
            </span>
          </Tooltip>
        ),
      },
      {
        title: "Url",
        dataIndex: "url",
        key: "url",
        render: (url) => (
          <Tooltip title={url}>
            <span>{ellipseStringAt(url, 55)}</span>
          </Tooltip>
        ),
      },
      {
        width: 180,
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          status = capitalize(status).replace("_", " ");
          return (
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
          );
        },
      },
      {
        width: 200,
        title: "Created at",
        dataIndex: "createdAt",
        key: "created_at",
        render: (date) => formatDateGeneric(date),
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

  const handleGetDescription = async (id, format) => {
    if (isLoading) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/v1/profile/scraping/${id}/${format}`,
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.status === "success") {
        setDescriptionDataLoaded(response?.data?.data?.scrapes[0]);
        setShowDescription(true);
        setIsLoading(false);
      } else {
        toast.error("Unable to retrieve the job's description", {
          duration: 4000,
        });
        setShowDescription(false);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Unable to retrieve the job's description", {
        duration: 4000,
      });
      setShowDescription(false);
      setIsLoading(false);
    }
  };

  const onRowClick = (record, rowIndex) => {
    return {
      onClick: (event) => {
        console.log("Row clicked:", record, rowIndex);
        setSelectedDataExtracted(record);
        setIsLoading(true);
        handleGetDescription(record?.id, "structured");
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
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 350,
          }}>
          <Loader />
        </div>
      ) : showDescription && descriptionDataLoaded ? (
        <DADescription
          setShowDescription={setShowDescription}
          descriptionDataLoaded={descriptionDataLoaded}
        />
      ) : (
        <Table
          tableLayout="fixed"
          dataSource={scrapes}
          columns={getColumns()}
          onRow={onRowClick}
        />
      )}
    </div>
  );
};

export default DataExtraction;

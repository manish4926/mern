
class Transformer {
    constructor(req, isPaginate) {
        if(isPaginate) {
            //show pagination data
        }
        // TODO
    }

    paginate = (array, page_size, page_number) => {
        --page_number; // Adjust page number to start from 0
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }
    
}

//No need to create export as it will only be called as inheritance or dependancy injection


/*
Sample pagination json
{
  "data": [
    {
      "id": 884,
      "branch_id": "18",
      "branch_name": "GUWAHATI",
      "sales_executive_id": "235",
      "sales_executive_code": "6235",
      "sales_executive_name": "asnvvhsa",
      "emplify_employee_id": null,
      "role": "SALES_EXECUTIVE",
      "target_type_code": "PLAN_REDEMPTION_PLUS_SALE_COUNT",
      "target_name": "Plan Redemption Plus Sale Count",
      "message": "Achieve this target before due date",
      "services": [
        
      ],
      "service_code": null,
      "service_name": null,
      "target_value": "5",
      "achieved_value": "0",
      "achieved_percent": 0,
      "start_date_time": "2023-12-01 00:00:00",
      "end_date_time": "2023-12-31 00:00:00",
      "days_left": 12,
      "created_by_user_id": "6129",
      "approved_by_user_id": null,
      "updated_by_user_id": null,
      "status": "PENDING",
      "achievement_status": "NOT ACHIEVED",
      "target_achieved_at": "",
      "created_at": "2023-12-19 16:38:11",
      "updated_at": "2023-12-19 16:38:11",
      "average_value": 1,
      "daily_data_refresh_at": "2023-12-19 16:38:40",
      "amount_threshold": "0",
      "information": "Test"
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 10,
      "current_page": 1,
      "total_pages": 1,
      "links": [
        
      ]
    }
  },
  "irctc": {
    "achieved_value": "0"
  }
}
*/
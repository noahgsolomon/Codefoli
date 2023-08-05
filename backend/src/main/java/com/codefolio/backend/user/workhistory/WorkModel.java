package com.codefolio.backend.user.workhistory;

import lombok.Getter;

@Getter
public class WorkModel {
    public long id;
    public String company;
    public String position;
    public String startDate;
    public String endDate;
    public String description;
    public int orderId;
    public String image;
}
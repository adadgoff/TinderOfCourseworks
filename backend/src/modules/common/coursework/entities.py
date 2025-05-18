from enum import Enum


class CourseworkStatus(str, Enum):
    Approved = "approved"
    Cancelled = "cancelled"
    Matching = "matching"

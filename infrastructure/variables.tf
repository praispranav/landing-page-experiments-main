variable "account_id" {
  default = ""
}

variable "region" {
  default = ""
}

variable "role_name" {
  default = "automation-gha-ci"
}

variable "environment" {
  default = ""
}

variable "consumer_ids" {
  type = list
}

terraform {
  required_version = "~> 1.0.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.34.0"
    }
  }

  backend "s3" {
    key = "landing-page-experiments/global/s3/terraform.tfstate"
  }
}
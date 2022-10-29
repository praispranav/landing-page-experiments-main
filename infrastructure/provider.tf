provider "aws" {
  region              = var.region
  profile             = var.account_id
  allowed_account_ids = [var.account_id]

  default_tags {
    tags = {
      ManagedBy   = "Terraform"
      Application = "landing-page-experiments"
      Owner       = "DL-SWE-Apollo-Amsterdam@dazn.com"
      GitRepo     = "github.com/getndazn/landing-page-experiments"
      Environment = var.environment
    }
  }

  assume_role {
    role_arn = "arn:aws:iam::${var.account_id}:role/${var.role_name}"
  }
}

locals {
  tags = {
    Owner        = "DL-SWE-APOLLO-AMSTERDAM@dazn.com"
    ManagedBy    = "Terraform"
    GitRepo      = "getndazn/landing-page-experiments"
    Application  = "landing-page-experiments"
    Environment  = var.environment
  }

  s3_origin_id = "landing-page-experiments"
}

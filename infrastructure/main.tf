resource "aws_s3_bucket" "bucket" {
  bucket              = "fe-cle-images-${var.account_id}"
  acl                 = "private"
  acceleration_status = "Enabled"

  tags = local.tags
}


data "aws_iam_policy_document" "bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [for c in var.consumer_ids : "arn:aws:iam::${c}:root"]
    }

  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.bucket_policy.json
}

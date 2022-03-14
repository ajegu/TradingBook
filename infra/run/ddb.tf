resource "aws_dynamodb_table" "tradingbook" {
    name           = "${var.stage}-tradingbook"
    billing_mode   = "PROVISIONED"
    read_capacity  = 5
    write_capacity = 5
    hash_key       = "_pk"
    range_key      = "_sk"

    attribute {
        name = "_pk"
        type = "S"
    }

    attribute {
        name = "_sk"
        type = "S"
    }

    ttl {
        attribute_name = "ttl"
        enabled = true
    }

    local_secondary_index {
        name            = "lsi1"
        projection_type = "ALL"
        range_key       = "_lsi1"
    }

    attribute {
        name = "_lsi1"
        type = "S"
    }

    local_secondary_index {
        name            = "lsi2"
        projection_type = "ALL"
        range_key       = "_lsi2"
    }

    attribute {
        name = "_lsi2"
        type = "S"
    }

    local_secondary_index {
        name            = "lsi3"
        projection_type = "ALL"
        range_key       = "_lsi3"
    }

    attribute {
        name = "_lsi3"
        type = "S"
    }

    local_secondary_index {
        name            = "lsi4"
        projection_type = "ALL"
        range_key       = "_lsi4"
    }

    attribute {
        name = "_lsi4"
        type = "N"
    }

    local_secondary_index {
        name            = "lsi5"
        projection_type = "ALL"
        range_key       = "_lsi5"
    }

    attribute {
        name = "_lsi5"
        type = "N"
    }
}

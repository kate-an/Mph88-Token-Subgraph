import { BigInt } from "@graphprotocol/graph-ts"
import {
  MPHToken,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/MPHToken/MPHToken"
import { _Approval, _OwnershipTransferred, _Transfer } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let approval = _Approval.load(event.params.value.toHex())

  if (approval == null) {
    approval = new _Approval(event.params.value.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.value = event.params.value
  approval.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let ownershipTransferred = _OwnershipTransferred.load(event.params.newOwner.toHex())

  if (ownershipTransferred == null) {
    ownershipTransferred = new _OwnershipTransferred(event.params.newOwner.toHex())
    ownershipTransferred.count = BigInt.fromI32(0)
  }

  ownershipTransferred.count = ownershipTransferred.count + BigInt.fromI32(1)
  ownershipTransferred.previousOwner = event.params.previousOwner
  ownershipTransferred.newOwner = event.params.newOwner
  ownershipTransferred.save()
}

export function handleTransfer(event: Transfer): void {
  let transfer = _Transfer.load(event.params.value.toHex())

  if (transfer == null) {
    transfer = new _Transfer(event.params.value.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.value = event.params.value
  transfer.save()
}

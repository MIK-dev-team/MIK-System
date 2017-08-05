require 'rails_helper'

RSpec.describe AvailabilityNotifier, type: :model do
  let(:notifier){ FactoryGirl.build(:availability_notifier) }

  it 'is saved in db when valid' do
    notifier.save
    expect(notifier).to be_valid
    expect(AvailabilityNotifier.count).to eq(1)
  end

  it 'is saved in the db when notifier_type is any' do
    notifier.notifier_type = 'any'
    expect(notifier).to be_valid
    notifier.save
    expect(AvailabilityNotifier.count).to eq(1)
  end

  it 'is not saved in the db without plane' do
    expect(notifier).to be_valid
    notifier.plane_id = nil
    expect(notifier).to_not be_valid
  end

  it 'is not saved in the db without user' do
    expect(notifier).to be_valid
    notifier.user_id = nil
    expect(notifier).to_not be_valid
  end

  it 'is not saved in the db without start' do
    expect(notifier).to be_valid
    notifier.start = nil
    expect(notifier).to_not be_valid
  end

  it 'is not saved in the db without end' do
    expect(notifier).to be_valid
    notifier.end = nil
    expect(notifier).to_not be_valid
  end

  it 'is not saved in the db without notifier_type' do
    expect(notifier).to be_valid
    notifier.notifier_type = nil
    expect(notifier).to_not be_valid
  end

  it 'is not saved in the db when notifier_type is not either all or any' do
    expect(notifier).to be_valid
    notifier.notifier_type = 'some'
    expect(notifier).to_not be_valid
  end

  it 'is not saved in the db when start is in the past' do
    expect(notifier).to be_valid
    notifier.start = DateTime.now - 2.hours
    expect(notifier).to_not be_valid
  end
end

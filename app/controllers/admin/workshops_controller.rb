class Admin::WorkshopsController < AdminController
  before_action :set_workshop, only: [:edit, :update]
  def new
    @workshop = Workshop.new
  end

  def create
    @workshop = Workshop.new(workshop_params)
    if @workshop.save
      respond_to do |format|
        format.html { redirect_to @workshop, notice: 'Workshop created successfully' }
        format.json { render json: @workshop }
      end
    else
      respond_to do |format|
        format.html { render :new, alert: "Creation failed:  #{@workshop.errors.full_messages}" }
        format.json { render json: @workshop }
      end
    end
  end

  def edit
    @workshop = Workshop.find_by(id: params[:id])
  end

  def update
    if @workshop.update(workshop_params)
      respond_to do |format|
        format.html { redirect_to @workshop, notice: 'Workshop updated' }
        format.json { render json: @workshop }
      end
    else
      respond_to do |format|
        format.html { render :edit, alert: "Update failed:  #{@workshop.errors.full_messages}" }
        format.json { render json: @workshop }
      end
    end
  end

  private
  def workshop_params
    params.require(:workshop).permit(:name, :officer_id, :skills_attributes => [:name, :_destroy])
  end

  def set_workshop
    @workshop = Workshop.find(params[:id])
  end
end
